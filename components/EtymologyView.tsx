import { ViewStyle, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import SvgRenderer from "./SvgRenderer";
import { evolutionSvgs } from "@/assets/images/evolution/evolutionSvgs";
import { ThemedText } from "./ThemedText";

interface IEtymologyView {
  svg: string,
  images: string[];
  title: string;
  style?: ViewStyle;
}

export const EtymologyView = ({
  svg,
  images, 
  title,
  style
}: IEtymologyView) => (
  <ThemedView style={[styles.container, style]}>
    <ThemedText type="subtitle">{title}</ThemedText>
    {images && images.map((img, index) => (
      <SvgRenderer key={index} svgName={img} svgModule={evolutionSvgs[svg]}/>
    ))}
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 15,
    paddingTop: 20,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#0a7ea4',
  },
});
