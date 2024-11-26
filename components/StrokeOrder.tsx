import { ViewStyle, Image, StyleSheet, ImageBackground } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { SvgGif } from "./SvgGif";

interface IStrokeOrder {
  svgSource: string;
  gifSource: string | undefined;
  strokeOrder?: string;
  style?: ViewStyle;
}

export const StrokeOrder = ({
  svgSource,
  gifSource,
  strokeOrder,
  style
}: IStrokeOrder) => (
  <ThemedView style={[styles.container, style]}>
    <SvgGif 
      gifSource={gifSource}
      svgSource={svgSource}
      />
    {strokeOrder && <ThemedText type="defaultSemiBold" style={styles.text}>{strokeOrder}</ThemedText>}
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#0a7ea4',
    marginBottom: 20
  },
  text: {
    textAlign: 'justify'
  }
});
