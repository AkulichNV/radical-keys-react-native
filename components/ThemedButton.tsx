import React, { ReactElement } from "react";
import {
  Pressable,
  type PressableProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";

export type ThemedButtonProps = PressableProps & {
  title?: string;
  icon?: ReactElement;
  iconPosition?: "left" | "right";

  type?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";

  style?: ViewStyle;
};

export function ThemedButton({
  title,
  icon,
  iconPosition = "left",
  type = "primary",
  size = "md",
  style,
  disabled,
  ...rest
}: ThemedButtonProps) {
  const tint = useThemeColor({}, "tint");
  const text = useThemeColor({}, "text");
  const background = useThemeColor({}, "background");
  const border = useThemeColor({}, "borderColor");

  const backgroundColor =
    type === "primary"
      ? tint
      : type === "secondary"
      ? background
      : type === "danger"
      ? "#d9534f"
      : "transparent";

  const borderColor =
    type === "ghost" || type === "secondary" ? border : "transparent";

  const textColor =
    type === "primary" || type === "danger" ? background : text;

  const sizeStyle =
    size === "sm" ? styles.sm : size === "lg" ? styles.lg : styles.md;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        sizeStyle,
        {
          backgroundColor,
          borderColor,
          opacity: disabled ? 0.4 : pressed ? 0.7 : 1,
        },
        style,
      ]}
      disabled={disabled}
      {...rest}
    >
      <View style={styles.content}>
        {icon && iconPosition === "left" && (
          <View style={title ? styles.iconLeft : undefined}>{icon}</View>
        )}

        {title && (
          <ThemedText
            style={[styles.text, { color: textColor }]}
            type="defaultSemiBold"
          >
            {title}
          </ThemedText>
        )}

        {icon && iconPosition === "right" && (
          <View style={title ? styles.iconRight : undefined}>{icon}</View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    textAlign: "center",
  },

  iconLeft: {
    marginRight: 8,
  },

  iconRight: {
    marginLeft: 8,
  },

  sm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  md: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  lg: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
});
