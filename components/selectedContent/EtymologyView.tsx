import { ViewStyle, StyleSheet, Pressable } from "react-native";
import { ThemedView } from "../ThemedView";
import { SvgRenderer } from "../SvgRenderer";
import { evolutionSvgs } from "@/assets/images/evolution/evolutionSvgs";
import { ThemedText } from "../ThemedText";

interface IEtymologyView {
  svg: string,
  images: string[];
  title: string;
  style?: ViewStyle;
  onEtymologyContent: () => void;
}

export const EtymologyView = ({
  svg,
  images, 
  title,
  onEtymologyContent,
  style
}: IEtymologyView) => (
  <ThemedView style={[styles.container, style]}>
    <ThemedView style={styles.imagesContainer}>
      {images && images.map((img, index) => (
        <Pressable key={index} style={styles.svg} onPress={onEtymologyContent}>
          <SvgRenderer  svgName={img} svgModule={evolutionSvgs[svg as keyof typeof evolutionSvgs]}/>
        </Pressable >
      ))}
    </ThemedView>
    <ThemedView style={styles.textContainer}>
      <ThemedText type="subtitleBlue">{title}</ThemedText>
    </ThemedView>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    paddingTop: 20,
  },
  textContainer: {
    paddingBottom: 5
  },
  imagesContainer: {
    flex: 1, 
    flexDirection: 'row', 
    gap: 15,
  },
  svg: {
    borderWidth: 1,
    borderColor: '#ECEDEE',
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 11,
  }
});
