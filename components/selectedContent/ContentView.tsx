import { Pressable, StyleSheet } from "react-native";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { StrokeOrderContent } from "./StrokeOrderContent";
import { Calligraphy } from "@/types/Calligraphy";
import { EtymologyContent } from "./EthimologyContent";
import { Evolution } from "@/types/Evolution";
import FontAwesome5 from "@expo/vector-icons/build/FontAwesome5";

interface IContentView {
  isStrokeOrder: boolean,
  strokeOrder: () => void,
  ethimology: () => void,
  calligraphy: Calligraphy[],
  evolution: Evolution[];
  unicode: string;
};

export const ContentView = ({ 
  isStrokeOrder, 
  strokeOrder, 
  ethimology, 
  calligraphy, 
  evolution, 
  unicode 
}: IContentView) => (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <Pressable onPress={strokeOrder} style={[styles.titleContent, isStrokeOrder && styles.titleActive]}>
          <FontAwesome5 name="pen-fancy" size={24} color="white" />
          <ThemedText type="subtitle" style={styles.titleText}>Правила письма</ThemedText>
        </Pressable>
        <Pressable onPress={ethimology} style={[styles.titleContent, !isStrokeOrder && styles.titleActive]}>
          <FontAwesome5 name="scroll" size={24} color="white" />
          <ThemedText type="subtitle" style={styles.titleText}>Эволюция символа</ThemedText>
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
    gap: 20,
  },
  titleContent: {
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
