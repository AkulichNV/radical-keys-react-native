import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="strokes"
        options={{
          title: 'Strokes',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flower' : 'flower-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="keys"
        options={{
          title: 'Keys',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flame' : 'flame-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="keys/[key]"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="table"
        options={{
          title: 'Table Keys',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'flame' : 'flame-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
