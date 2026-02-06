import React, { useState } from "react";
import { View, TextInput, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from "./ThemedTextInput";
import { ThemedButton } from "./ThemedButton";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ISearch {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function Search({ placeholder = "Искать...", onSearch }: ISearch) {
  const [query, setQuery] = useState("");

    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
     const styles = getStyles(isDark);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <View style={styles.container}>
      <ThemedTextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <ThemedButton
        icon={<AntDesign name="search1" size={20} color="black" />}
        onPress={handleSearch}
      />
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: isDark ? 1 : 2.5,
    borderColor: isDark ? '#272f3a' : '#cccc99',
    borderRadius: 40,
    padding: 6,
    backgroundColor: isDark ? '#010606' : '#fff6e4',
    shadowColor: isDark ? '#ffffff' : '#fce7c5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
});
