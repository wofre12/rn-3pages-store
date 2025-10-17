import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./src/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./src/query/client";
import { enablePersistence } from "./src/query/persist";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

import { setLocked } from "./src/store/lock.slice";
import { getMMKV } from "./src/store/mmkv";
import { signedIn } from "./src/store/session.slice";
import Toast from "./src/ui/Toast";

import LoginScreen from "./src/screens/LoginScreen";
import AllProductsScreen from "./src/screens/AllProductsScreen";
import CategoryScreen from "./src/screens/CategoryScreen";
import LockOverlay from "./src/screens/LockOverlay";
import SignOutScreen from "./src/screens/SignOutScreen";

enablePersistence();

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function TabsRoot() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="AllProducts"
        component={AllProductsScreen}
        options={{ title: "All Products" }}
      />
      <Tabs.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: "Category" }}
      />
      <Tabs.Screen
        name="SignOut"
        component={SignOutScreen}
        options={{ title: "Sign out" }}
      />
    </Tabs.Navigator>
  );
}

function Boot() {
  const dispatch = useDispatch();
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  // Restore token → show biometric lock if exists
  useEffect(() => {
    const token = getMMKV("token");
    const user = getMMKV("user");
    const superadmin = getMMKV("superadmin") === "1";
    if (token && user) {
      dispatch(signedIn({ token, user: JSON.parse(user), superadmin }));
      dispatch(setLocked(true));
    }
  }, []);

  // Background lock
  useEffect(() => {
    const sub = AppState.addEventListener("change", (next) => {
      if (appState.current.match(/active/) && next.match(/inactive|background/)) {
        dispatch(setLocked(true));
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, []);

  // Idle lock (10s) – works for web/dev; background lock covers native
  useEffect(() => {
    const reset = () => {
      if (timerId.current) clearTimeout(timerId.current);
      timerId.current = setTimeout(() => dispatch(setLocked(true)), 10_000);
    };
    const events = ["touchstart", "mousedown", "keydown"];
    const handlers = events.map((e) => {
      const h = () => reset();
      // @ts-ignore
      document?.addEventListener?.(e, h, true);
      return { e, h };
    });
    reset();
    return () =>
      handlers.forEach(({ e, h }) =>
        document?.removeEventListener?.(e, h, true)
      );
  }, []);

  // ✅ Biometric unlock function
  async function promptBiometric() {
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available, biometryType } = await rnBiometrics.isSensorAvailable();

      if (!available) return false;

      const { success } = await rnBiometrics.simplePrompt({
        promptMessage:
          biometryType === "FaceID"
            ? "Unlock with Face ID"
            : "Unlock with fingerprint",
      });

      return !!success;
    } catch {
      return false;
    }
  }

  // ✅ Attempt biometric when locked
  const locked = useSelector((s: any) => s.lock.locked);

  useEffect(() => {
    async function auth() {
      const ok = await promptBiometric();
      if (ok) {
        dispatch(setLocked(false));
      }
    }
    if (locked) auth();
  }, [locked]);

  return null;
}

function RootNav() {
  const token = useSelector((s: any) => s.session.token);
  const locked = useSelector((s: any) => s.lock.locked);

  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Tabs" component={TabsRoot} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
      <LockOverlay visible={!!token && locked} />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={DefaultTheme}>
          <Boot />
          <RootNav />
          <Toast />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}
