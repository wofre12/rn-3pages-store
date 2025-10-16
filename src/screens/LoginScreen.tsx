import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { signedIn } from "../store/session.slice";
import { setMMKV } from "../store/mmkv";
import { login, me } from "../api/auth";
import { useThemeColors } from "../theme";
import PrimaryButton from "../ui/PrimaryButton";
import { toast } from "../ui/Toast";

const SUPERADMIN_USERNAME = "superadmin";

export default function LoginScreen(){
  const [username,setUsername]=useState("kminchelle");
  const [password,setPassword]=useState("0lelplR");
  const [loading,setLoading]=useState(false);
  const dispatch = useDispatch();
  const { bg, text, border } = useThemeColors();

  const onLogin = async ()=>{
    try{
      setLoading(true);
      const auth = await login(username, password);
      const profile = await me();
      const superadmin = username === SUPERADMIN_USERNAME;
      setMMKV("token", auth.token);
      setMMKV("user", JSON.stringify(profile));
      setMMKV("superadmin", superadmin?"1":"0");
      dispatch(signedIn({ token:auth.token, user:profile, superadmin }));
      toast.success("Logged in");
    }catch(e:any){
      toast.error("Login failed");
    }finally{ setLoading(false); }
  };

  return (
    <View style={{ flex:1, backgroundColor:bg, padding:16, justifyContent:"center" }}>
      <Text style={{ fontSize:24, fontWeight:"700", color:text, marginBottom:16 }}>Sign in</Text>
      <TextInput
        placeholder="Username"
        placeholderTextColor={text+"99"}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth:1, borderColor: border, color: text, padding:12, marginBottom:12, borderRadius:8 }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={text+"99"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth:1, borderColor: border, color: text, padding:12, marginBottom:16, borderRadius:8 }}
      />
      <PrimaryButton title={loading ? "Signing in..." : "Sign in"} onPress={onLogin} />
      <Text style={{ marginTop:12, opacity:0.6, color:text }}>
        Demo users at DummyJSON docs (e.g., kminchelle / 0lelplR).
      </Text>
    </View>
  );
}
