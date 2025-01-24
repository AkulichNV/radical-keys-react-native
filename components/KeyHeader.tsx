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
  description: string,
  number: number
};

export const KeyHeader = ({svgName, playSound, pinyin, description, number }: IKeyHeader) => {
  return (
    <ThemedView style={styles.header}>
      <ImageBackground 
        source={require('@/assets/images/darkGridBackground.png')} 
        imageStyle={styles.background}
        resizeMode="cover"
      >
        <ThemedText type='subtitle' style={styles.numberText}>No {number}</ThemedText>
        
        <ThemedView style={styles.svg}>
          <Pressable onPress={() => {console.log('left')}}>
            <AntDesign name="caretleft" size={18} color="white" style={{borderColor: '#ffffff', borderWidth: 0.1}} />
          </Pressable>
          <SvgRenderer svgName={svgName} svgModule={Svgs} width={250} height={250} color={'#ffffff'}/>
          <Pressable onPress={() => {console.log('right')}}>
            <AntDesign name="caretright" size={18} color="white" style={{borderColor: '#ffffff', borderWidth: 0.1}}/>
          </Pressable>
        </ThemedView>
      </ImageBackground>

      <ThemedView style={styles.soundDescriptionContainer}>
        <Pressable onPress={playSound} style={styles.content}>
          <ThemedText type="subtitle">{pinyin}{' '}
            <AntDesign name="sound" size={18} color="white" />
          </ThemedText>
        </Pressable>
        <Pressable onPress={() => {console.log('description')}} style={styles.content}>
          <ThemedText type="subtitle" style={styles.contentText}>{description}</ThemedText>
        </Pressable>
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    gap: 20,
    marginBottom: 10,
  },
  svg: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    alignItems: 'center',
    overflow: 'hidden',
  },
  background: {
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
  },
  numberText: {
    textAlign: 'center'
  },
  soundDescriptionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
    
  },
  content: {
    flex: 0.5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'auto',
    marginRight:'auto',
    padding: 20,
  },
  contentText: {
    textAlign: 'center',
  }
});
