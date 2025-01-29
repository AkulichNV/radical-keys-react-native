import { ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { SvgGif } from "../SvgGif";

interface IStrokeOrderView {
  svgSource: string;
  gifSource: string | undefined;
  strokeOrder?: string[];
  style?: ViewStyle;
}

export const StrokeOrderView = ({
  svgSource,
  gifSource,
  strokeOrder,
  style
}: IStrokeOrderView) => (
  <ThemedView style={[styles.container, style]}>
    {strokeOrder?.map((paragraph: string, index: number) => (
      <ThemedText key={index} type="defaultSemiBold" style={styles.text}>{paragraph}</ThemedText>
    ))}
    <SvgGif 
      gifSource={gifSource}
      svgSource={svgSource}
      />
    
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    marginBottom: 20
  },
  text: {
    textAlign: 'justify',
    marginBottom: 20,
  }
});
