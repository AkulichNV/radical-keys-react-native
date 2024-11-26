import { PropsWithChildren } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

type SlideLayoutProps = PropsWithChildren<{
  values: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}>;

export const SlideLayout = ({
  children,
  values,
  selectedValue,
  setSelectedValue,
}: SlideLayoutProps) => (
  <ThemedView style={styles.container}>
    <ThemedView style={styles.row}>
      {values.map(value => (
        <Pressable
          key={value}
          onPress={() => setSelectedValue(value)}
          style={[styles.button, selectedValue === value && styles.selected]}>
          <ThemedText type="defaultSemiBold" 
            style={[
              styles.buttonLabel,
              selectedValue === value && styles.selectedLabel,
            ]}
          > 
            {value}
          </ThemedText>
        </Pressable>
      ))}
    </ThemedView>
    <ThemedView style={styles.container}>{children}</ThemedView>
  </ThemedView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    height: '100%'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    // marginHorizontal: '1%',
    marginBottom: 6,
    textAlign: 'center',
  },
  selected: {
    backgroundColor: '#0a7ea4',
    borderWidth: 0,
  },
  buttonLabel: {
    color: '#0a7ea4',
  },
  selectedLabel: {
    color: 'white',
  },

});