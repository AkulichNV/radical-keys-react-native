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
          title: 'Каллиграфия',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'brush' : 'brush-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="strokes"
        options={{
          title: 'Порядок черт',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'receipt' : 'receipt-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="keys"
        options={{
          title: 'Радикалы',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'grid' : 'grid-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="keys/[key]"
        options={{
          href: null,
          tabBarStyle: { display: 'none' }
        }}
      />
      <Tabs.Screen
        name="table"
        options={{
          title: 'Справочник',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
