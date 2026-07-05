import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from 'expo-router'
export default function _layout() {
    const router = useRouter();
  return (
    <Tabs screenOptions={{
        headerShown : false
    }}>
        <Tabs.Screen name='mytrip' options={{
            tabBarLabel: 'My Trip',
            tabBarIcon: ({color,size})=> <Ionicons name='location-sharp' size={20}/>

        }} />

        <Tabs.Screen name='discover' options={{
            tabBarLabel: 'Discover',
            tabBarIcon: ({color,size})=> <Ionicons name="earth-sharp" size={20}/>
        }}

        listeners={{
            tabPress: (e) =>{
                e.preventDefault();
                router.push("/create-trip/search-place");
            }
        }}
        />

        <Tabs.Screen name='profile' options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({color,size})=> <Ionicons name='person-circle-outline' size={20}/>
        }}/>
    </Tabs>
  )
}