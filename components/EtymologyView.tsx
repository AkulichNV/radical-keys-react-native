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
    <ThemedView style={styles.textContainer}>
      {title.split('').map((char, index) => <ThemedText key={index} type="subtitleBlue">{char}</ThemedText>)}
    </ThemedView>
    <ThemedView style={styles.imagesContainer}>
      {images && images.map((img, index) => (
        <ThemedView key={index} style={styles.svg}>
          <SvgRenderer  svgName={img} svgModule={evolutionSvgs[svg]}/>
          </ThemedView >
      ))}
    </ThemedView>
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
  textContainer: {
    flex: 0.06, 
    flexDirection: 'column',
  },
  imagesContainer: {
    flex: 1, 
    flexDirection: 'row', 
    gap: 15
  },
  svg: {
    borderWidth: 1,
    borderColor: '#ECEDEE',
  }
});
