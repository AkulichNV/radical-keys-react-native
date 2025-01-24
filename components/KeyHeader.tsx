import { ImageBackground, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { SvgRenderer } from "./SvgRenderer";
import { ThemedText } from "./ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as Svgs from '@/assets/images/svgs/svgs';

interface IKeyHeader {
  svgName: string,
  playSound: () => void,
  pinyin: string,
  hanzi: string,
  description: string,
};

export const KeyHeader = ({svgName, playSound, pinyin, hanzi, description }: IKeyHeader) => {
  return (
    <ThemedView style={styles.header}>
          <ImageBackground 
            source={require('@/assets/images/z200.png')} 
            style={styles.grid}
            resizeMode="cover"
          >
            <SvgRenderer svgName={svgName} svgModule={Svgs} />
          </ImageBackground>
          <ThemedView style={styles.description}>
          <Pressable onPress={playSound}>
            <ThemedText type="subtitle">{pinyin}{' '}
              <AntDesign name="sound" size={18} color="white" />
            </ThemedText>
          </Pressable>
          <ThemedText type="subtitle">{hanzi} = {description}</ThemedText>
          </ThemedView>
        </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  description: {
    flex: 1,
    textAlign: 'center'
  },
  grid: {
    width: 100,
    height: 100,
  }
});
