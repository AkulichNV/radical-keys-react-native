import { ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

interface IDescriptionView {
  description: string[];
  style?: ViewStyle;
}

export const DescriptionView = ({
  description,
  style
}: IDescriptionView) => (
  <ThemedView style={style}>
    {description?.map((paragraph: string, index: number) => (
      <ThemedText key={index} type="defaultSemiBold" style={styles.description}>{paragraph}</ThemedText>
    ))}
  </ThemedView>
);

const styles = StyleSheet.create({
  description: {
    textAlign: 'justify',
    padding: 20
  }
});
