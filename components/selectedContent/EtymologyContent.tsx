import React from "react";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Evolution } from "@/types/Evolution";
import { Etymology } from "@/types/Etymology";
import { EtymologyView } from "./EtymologyView";
import { ThemedView } from "../ThemedView";
import { ModalDialog } from "../ModalDialog";
import { DescriptionView } from "../DescriptionView";

import AntDesign from "@expo/vector-icons/AntDesign";
import dataEtymology from '@/assets/data/etymology.json';

interface IEtymologyContent {
  evolution: Evolution[];
  unicode: string;
}

export const EtymologyContent = ({
  evolution,
  unicode,
}: IEtymologyContent) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [etymologyDescription, setEtymologyDescription] = useState<string[]>([""]);
  const [etymologyTitle, setEtymologyTitle] = useState<string>("");
  const [etymologyPinyin, setEtymologypinyin] = useState<string>("");

  const onModalOpen = (title: string) => {
    const findEtymology: Etymology | undefined = dataEtymology.etymology.find(item => item.title === title);
    
    if (findEtymology) {
      setEtymologyTitle(findEtymology.title);
      setEtymologypinyin(findEtymology.pinyin);
      setEtymologyDescription(findEtymology.description);
    } else {
      setEtymologyTitle(title);
      setEtymologyDescription(["Значение этого стиля не найдено"]);
    }
    setIsModalVisible(true); 
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ThemedView style={styles.container}>
      {evolution.map((item, index) => (
        <>
        <EtymologyView 
          key={index} 
          svg={unicode} 
          images={item.image} 
          title={item.title} 
          onEtymologyContent={() => onModalOpen(item.title)}
        />
        {index !== evolution.length - 1 && <AntDesign key={index+100} name="caretdown" size={50} color="white" style={{borderColor: '#ffffff', borderWidth: 0.1}} />}
        </>
      ))}
      <ModalDialog isVisible={isModalVisible} onClose={onModalClose} title={`${etymologyTitle}  (${etymologyPinyin})`}>
        <DescriptionView description={etymologyDescription} />
      </ModalDialog>
    </ThemedView>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
