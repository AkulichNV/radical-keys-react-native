import { useState } from "react"
import { Pressable, StyleSheet, useColorScheme } from "react-native"
import { Image, ImageBackground } from "expo-image"

import { ThemedText } from "./ThemedText"
import { ModalDialog } from "./ModalDialog"
import { IYongziStrokes } from "@/types/IYongziStrokes"

import { yongziStrokes } from "@/assets/data/yongziStrokes.json"
import { yongzi } from "@/assets/images/yongzi/yongzi"


export const YongziTable = () => {
  const yongzi_strokes: IYongziStrokes[] = yongziStrokes;

  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const styles = getStyles(isDark);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IYongziStrokes | null>(null);

  const openModal = (item: IYongziStrokes) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <>
      {yongzi_strokes.map((item: IYongziStrokes) => {
      return (
        <Pressable key={item.id} style={styles.row} onPress={() => openModal(item)}>
          <ThemedText style={[styles.cell, styles.cell1]}>{item.chinese}{'\n'}{item.pinyin}</ThemedText>
          <Image
            source={yongzi[item.image]}
            style={[styles.cell, styles.cell2]}
            contentFit="contain"
          />
          <ThemedText style={[styles.cell, styles.cell3]}>{item.description}</ThemedText>
        </Pressable>
      )
      })}
      <ModalDialog
        isVisible={isModalVisible} 
        onClose={closeModal} 
        title={selectedItem?.description || ""}
      >
        <ImageBackground 
          source={require('@/assets/images/lightGridBackground.png')} 
          imageStyle={styles.modalImage}
          contentFit="cover"
          >
          {selectedItem && (
            <Image
              source={yongzi[selectedItem.image]}
              style={styles.modalImage}
              contentFit="contain"
            />
          )}
        </ImageBackground>
      </ModalDialog>
    </>
  )
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: isDark ? 1 : 2.5,
    borderColor: isDark ? '#272f3a' : '#cccc99',
    borderRadius: 40,
    flex: 1,
    overflow: 'hidden',
    backgroundColor: isDark ? '#010606' : '#fff6e4',
    shadowColor: isDark ? '#ffffff' : '#fce7c5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
    height: 150,
    alignItems: 'stretch',
  },
  cell1: {
    flex: 1.7,
    backgroundColor: isDark ? '#272f3a' : '#fee8c5',
    borderBottomRightRadius: 40,
    fontSize: 25,
    lineHeight: 30,
    paddingTop: '10%'
  },
  cell2: {
    flex: 1.2,
    alignSelf: 'center',
    height: 60
  },
  cell3: {
    flex: 2.1,
    textAlign: 'right',
    backgroundColor: isDark ? '#0e1211' : '#f2e7c5',
    paddingRight: 20,
    paddingLeft: 10,
    borderTopLeftRadius: 40,
    shadowColor: '#fffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,  
    elevation: 5
  },
  cell: {
    textAlign: 'center',
    paddingVertical: 10,
  },
  modalImage: {
    width: "100%",
    height: 450,
  } 
})
