import { ImageBackground, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { Image } from "expo-image";
import { SvgRenderer } from "./SvgRenderer";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

import { gifs } from '@/assets/images/gifs/gifs';
import * as Svgs from '@/assets/images/svgs/svgs';
import React from "react";

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
    style={[styles.grid, style]}
    resizeMode="cover"
  >
    <Pressable onPress={onGif}>
      {isGifVisible && gifPath ? (
        <Image
          source={gifPath}
          style={styles.grid}
          contentFit="contain"
        />
      ) : (
        <>
          <AntDesign name="play" style={styles.icon} />
          <View style={styles.svgView}>
            <SvgRenderer svgName={svgSource} svgModule={Svgs} />
          </View>
        </>
      )}
    </Pressable>
  </ImageBackground>
)};

const styles = StyleSheet.create({
  grid: {
    width: 100,
    height: 100,
  },
  icon: {
    color: "#d8caca",
    fontSize: 24,
    padding: 3
  },
  svgView: {
    marginTop: -30,
  }
});