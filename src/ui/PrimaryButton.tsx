import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useThemeColors } from "../theme";

export default function PrimaryButton({
  title,
  onPress,
  disabled,
}: { title: string; onPress: () => void; disabled?: boolean }) {
  const { accent, card, text } = useThemeColors();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: disabled ? card : accent,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700" }}>{title}</Text>
    </TouchableOpacity>
  );
}
