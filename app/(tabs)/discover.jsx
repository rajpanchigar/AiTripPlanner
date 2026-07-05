import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'
import { useRouter } from 'expo-router'
export default function Discover() {

    const router = useRouter();
    return (
        <SafeAreaView>
            <View>
                    <Text>discover</Text>
            </View>
        </SafeAreaView>
    )
}