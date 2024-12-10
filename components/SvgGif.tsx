import { ImageBackground, Pressable, StyleSheet, ViewStyle } from "react-native";
import { Image } from "expo-image";
import SvgRenderer from "./SvgRenderer";
import { useState } from "react";

import { gifs } from '@/assets/images/gifs/gifs';
import * as Svgs from '@/assets/images/svgs/svgs';

interface ISvgGif {
  gifSource: string | undefined;
  svgSource: string;
  style?: ViewStyle;
}

export function SvgGif({gifSource, svgSource, style}: ISvgGif) {
  const [isGif, setIsGif] = useState(false);

   const gifPath = gifSource ? gifs[gifSource] : null;
  
  const onGif = () => {
    setIsGif((prev) => !prev);
  };
  return (
  <ImageBackground 
          source={require('../assets/images/z200.png')} 
          style={[styles.grid, style]}
          resizeMode="cover"
          >
            <Pressable onPress={onGif}>
              {isGif && gifPath ? (
                <Image
                  source={gifPath}
                  style={styles.grid}
                  contentFit="contain"
                />
              ) : (
                <SvgRenderer svgName={svgSource} svgModule={Svgs} />
              )}
            </Pressable>
          </ImageBackground>
)};

const styles = StyleSheet.create({
  grid: {
    width: 100,
    height: 100,
  },
});