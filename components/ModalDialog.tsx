import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import { Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { AntDesign } from "@expo/vector-icons";

type IModalDialog = PropsWithChildren<{
  isVisible: boolean;
  title: string;
  onClose: () => void;
}>;

export const ModalDialog = ({isVisible, title, children, onClose }: IModalDialog) => (
  <Modal animationType="slide" transparent={true} visible={isVisible}>
    <ThemedView style={styles.overlay}>
      <Pressable style={styles.backgroundClose} onPress={onClose} />
      <ThemedView style={styles.modalContent} onStartShouldSetResponder={() => true}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <Pressable onPress={onClose}>
            <AntDesign name="close" color="#fff" size={22} />
          </Pressable>
        </ThemedView>
        <ScrollView 
          style={styles.scrollContainer} 
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
        >
          {children}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  backgroundClose: {
    flex: 1,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: 50,
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  }
});
