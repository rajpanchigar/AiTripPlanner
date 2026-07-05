import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import { Colors } from '@/constants/theme'
import { useRouter } from 'expo-router'
export default function index() {

    const router = useRouter();
    return (
        <SafeAreaView>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Image source={require('../assets/images/trip.png')}
                    style={{ height: 600, width: 450, borderRadius: 10 }} />
                <View style={style.container}>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 27, marginTop: 10 }}>AI Travel Planner</Text>

                    <View style={{ width: 250, marginTop: 20 }}>
                        <Text style={{ fontFamily: "outfit-light", color: "gray", textAlign: "center", fontSize: 16 }}>"Explore the world with confidence using intelligent recommendations and customized travel experiences."</Text>
                    </View>

                    <View style={{ width: 350, height: 50, marginTop: 40, backgroundColor: "black", borderRadius: 50 }}>
                        <TouchableOpacity onPress={()=>router.push('/auth/sign-in')}>
                            <Text style={{ fontFamily: "outfit-medium", color: "white", textAlign: "center", fontSize: 20, marginTop: 10 }}> Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: -100,
        borderRadius: 60,
        height: '60%',
        padding: 20,
        width: "100%",
        alignItems: "center",
        textAlign: "center",
        
    }

});