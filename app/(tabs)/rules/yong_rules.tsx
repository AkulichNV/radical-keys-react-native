import { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Image, ImageBackground } from "expo-image";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from '@/components/ThemedText';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ModalDialog } from '@/components/ModalDialog';
import { YongziTable } from '@/components/YongziTable';


export default function YongScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <ParallaxScrollView
    title={'Восемь принципов Юн'}
    headerBackgroundColor={{ light: '#fff6e4', dark: '#010606' }}
    >
      <ThemedView style={styles.container} >
        <ThemedText type="default">
          永字八法 (Yǒngzì bā fǎ) — восемь простейших черт стиля кайшу, вместе образующих иероглиф 永 со значением «вечность». Считается, что постоянная практика написания этого иероглифа помогает достичь красоты в каллиграфии, путём освоения определённых приёмов движения кисти. 
        </ThemedText>
        <ImageBackground 
          source={require('@/assets/images/z100.png')} 
          imageStyle={styles.background}
          contentFit="cover"
          >
          <Image
            source={require('@/assets/images/gifs/永-calligraphic-order.gif')}
            style={styles.grid}
            contentFit="contain"
          />
        </ImageBackground>
        <ThemedText type="default">
          Существует легенда, по которой в одну ночь после долгого занятия каллиграфией к Ван Сичжи (王羲之) снизошёл старец Байюнь (白云), который начертал на его руке иероглиф 永, и сказал, что при помощи этого иероглифа возможно довести искусство каллиграфии до совершенства. В древности иероглиф обозначал поток воды, что объясняет схожее начертание с иероглифом 水 "вода".
        </ThemedText>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <ImageBackground 
            source={require('@/assets/images/lightGridBackground.png')} 
            imageStyle={styles.background}
            contentFit="cover"
            >
            <Image
                source={require('@/assets/images/strokes_of_永.png')}
                style={styles.grid}
                contentFit="contain"
            />
          </ImageBackground>
        </Pressable>

        <YongziTable/>
          
      </ThemedView>
      <ModalDialog 
        isVisible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        title={"Штрихи вместе и раздельно: порядковые номера и направления штрихов (красным)"}
      >
        <ImageBackground 
          source={require('@/assets/images/lightGridBackground.png')} 
          imageStyle={styles.modalImage}
          contentFit="cover"
          >
          <Image
              source={require('@/assets/images/strokes_of_永.png')}
              style={styles.modalImage}
              contentFit="contain"
          />
        </ImageBackground>
      </ModalDialog>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 30,
    gap: 20
  },
  background: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 20,
  },
  grid: {
    width: 200,
    height: 200,
    borderColor: '#d8caca',
    borderWidth: 1,
    borderRadius: 20,
  },
  modalImage: {
    width: "100%",
    height: 450,
  }
})