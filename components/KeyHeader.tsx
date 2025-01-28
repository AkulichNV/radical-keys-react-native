import { ImageBackground, Modal, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { SvgRenderer } from "./SvgRenderer";
import { ThemedText } from "./ThemedText";
import AntDesign from "@expo/vector-icons/AntDesign";

import * as Svgs from '@/assets/images/svgs/svgs';
import { useState } from "react";

interface IKeyHeader {
  svgName: string,
  playSound: () => void,
  descriptionOpenModal: () => void,
  pinyin: string,
  description: string,
  number: number
};

export const KeyHeader = ({svgName, playSound, descriptionOpenModal, pinyin, description, number }: IKeyHeader) => {
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
          <AntDesign name="sound" size={100} color="#0a131a" />
          <ThemedText type="subtitle" style={styles.contentText}>{pinyin}</ThemedText>
        </Pressable>
        <Pressable onPress={descriptionOpenModal} style={styles.content}>
          <AntDesign name="book" size={100} color="#0a131a" />
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#272f3a',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonClose: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
    padding: 10,
    position: "relative",
    backgroundColor: '#000000'
  },
  contentText: {
    textAlign: 'center',
    position: "absolute",
    width: '100%'
  }
});
