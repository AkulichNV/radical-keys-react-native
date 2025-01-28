import { ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface IDescriptionView {
  description: string;
  style?: ViewStyle;
}

export const DescriptionView = ({
  description,
  style
}: IDescriptionView) => (
  <ThemedView style={style}>
    <ThemedText type="defaultSemiBold" style={styles.description}>{description}</ThemedText>
  </ThemedView>
);

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    padding: 20
  }
});
