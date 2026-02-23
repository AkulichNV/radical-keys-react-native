import React from "react";
import {
  TextInput,
  type TextInputProps,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;

  // input background
  lightBgColor?: string;
  darkBgColor?: string;

  // input border
  lightBorderColor?: string;
  darkBorderColor?: string;

  type?: "default" | "search" | "cell" | "subtitle";
  containerStyle?: ViewStyle;
};

export function ThemedTextInput({
  style,
  containerStyle,

  lightColor,
  darkColor,

  lightBgColor,
  darkBgColor,

  lightBorderColor,
  darkBorderColor,

  type = "default",
  placeholderTextColor,
  ...rest
}: ThemedTextInputProps) {
  // text color from theme
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  // background + border are not usually in your theme keys, so we provide sensible defaults
  const backgroundColor = useThemeColor(
    { light: lightBgColor ?? "#ffffff", dark: darkBgColor ?? "#0e1211" },
    "background"
  );

//   const borderColor = useThemeColor(
//     { light: lightBorderColor ?? "#cccc99", dark: darkBorderColor ?? "#272f3a" },
//     "background"
//   );

  // placeholder color default
  const phColor =
    placeholderTextColor ??
    useThemeColor({ light: "#6b7280", dark: "#9ca3af" }, "text");

  return (
    <View style={[styles.containerBase, { backgroundColor }, containerStyle]}>
      <TextInput
        style={[
          { color: textColor },
          type === "default" ? styles.inputDefault : undefined,
          type === "search" ? styles.inputSearch : undefined,
          type === "cell" ? styles.inputCell : undefined,
          type === "subtitle" ? styles.inputSubtitle : undefined,
          style,
        ]}
        placeholderTextColor={phColor}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    borderRadius: 40
  },

  inputDefault: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputSearch: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  inputCell: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 50,
  },
});
