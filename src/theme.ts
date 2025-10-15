import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return {
    bg: isDark ? "#0d1117" : "#ffffff",
    text: isDark ? "#f1f5f9" : "#111827",
    card: isDark ? "#161b22" : "#f9fafb",
    border: isDark ? "#30363d" : "#e5e7eb",
    accent: isDark ? "#58a6ff" : "#2563eb",
  };
};
