import { Pressable, StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StrokeOrderContent } from "./StrokeOrderContent";
import { Calligraphy } from "@/types/Calligraphy";
import { EtymologyContent } from "./EtymologyContent";
import { Evolution } from "@/types/Evolution";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface IContentView {
  isStrokeOrder: boolean,
  strokeOrder: () => void,
  etymology: () => void,
  calligraphy: Calligraphy[],
  evolution: Evolution[];
  unicode: string;
};

export const ContentView = ({ 
  isStrokeOrder, 
  strokeOrder, 
  etymology, 
  calligraphy, 
  evolution, 
  unicode 
}: IContentView) => (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <Pressable onPress={strokeOrder} style={[styles.strokeOrderPress, styles.titleContent, isStrokeOrder && styles.titleActive]}>
          <ThemedText type="title"><FontAwesome5 name="pen-fancy" size={25}/></ThemedText>
          <ThemedText type="subtitle" style={styles.titleText}>Правила написания</ThemedText>
        </Pressable>
        <Pressable onPress={etymology} style={[styles.etymologyPress, styles.titleContent, !isStrokeOrder && styles.titleActive]}>
        <ThemedText type="title"><FontAwesome5 name="scroll" size={24}/></ThemedText>
          <ThemedText type="subtitle" style={styles.titleText}>Истоки символа</ThemedText>
        </Pressable>
      </ThemedView>

      <ThemedView style={styles.container}>
        {isStrokeOrder ? 
        <StrokeOrderContent calligraphy={calligraphy}  /> :
        <EtymologyContent evolution={evolution} unicode={unicode}/>
      }

      </ThemedView>
    </ThemedView>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  strokeOrderPress: {
    flex: 0.55,
  },
  etymologyPress: {
    flex: 0.45,
  },
  titleContent: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#272f3a',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:'auto',
    marginRight:'auto',
    padding: 20,
    backgroundColor: '#000000'
  },
  titleActive: {
    backgroundColor: '#272f3a'
  },
  titleText: {
    textAlign: 'center',
    paddingLeft: 10
  }
});
