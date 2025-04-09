import React from "react";
import { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import AntDesign from '@expo/vector-icons/AntDesign';

import { SvgRenderer } from "./SvgRenderer";
import { gifs } from '@/assets/images/gifs/gifs';
import * as Svgs from '@/assets/images/svgs/svgs';

interface ISvgGif {
  gifSource: string | undefined;
  svgSource: string;
  style?: ViewStyle;
}

export function SvgGif({gifSource, svgSource, style}: ISvgGif) {
  const [isGifVisible, setIsGifVisible] = useState(false);

  const gifPath = gifSource ? gifs[gifSource] : null;
  
  const onGif = () => {
    setIsGifVisible((prev) => !prev);
  };
  return (
  <ImageBackground 
    source={require('../assets/images/z200.png')} 
    imageStyle={styles.grid}
    style={style}
    resizeMode="cover"
  >
    <Pressable onPress={onGif} style={styles.playButton}>
      {isGifVisible && gifPath ? (
        <Image
          source={gifPath}
          style={styles.grid}
          contentFit="contain"
        />
      ) : (
        <>
          {gifPath && <AntDesign name="play" style={styles.icon} />}
          <View style={styles.svgView}>
            <SvgRenderer svgName={svgSource} svgModule={Svgs} width={200} height={200}/>
          </View>
        </>
      )}
    </Pressable>
  </ImageBackground>
)};

const styles = StyleSheet.create({
  grid: {
    width: 200,
    height: 200,
    borderColor: '#dbcec4',
    borderWidth: 1,
    borderRadius: 40,
  },
  playButton: {
    position: 'relative',
  },
  icon: {
    color: "#dbcec4",
    fontSize: 150,
    position: 'absolute',
    textAlign: 'center',
    left: '12%',
    top: '12%',
    zIndex: 1,
    opacity: 0.3
  },
  svgView: {
    width: '100%'
  }
});
