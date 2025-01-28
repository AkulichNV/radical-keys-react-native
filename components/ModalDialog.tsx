import { PropsWithChildren } from "react";
import { ThemedView } from "./ThemedView";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { AntDesign } from "@expo/vector-icons";

type IModalDialog = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export const ModalDialog = ({isVisible, children, onClose }: IModalDialog) => (
  <Modal animationType="slide" transparent={true} visible={isVisible}>
    <Pressable style={styles.overlay} onPress={onClose}>
    <ThemedView style={styles.modalContent}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText style={styles.title}>Значение иероглифа</ThemedText>
        <Pressable onPress={onClose}>
          <AntDesign name="close" color="#fff" size={22} />
        </Pressable>
      </ThemedView>
      {children}
    </ThemedView>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    height: '41%',
    width: '100%',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
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
});
