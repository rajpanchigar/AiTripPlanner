import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function StartNewTripCard() {
    const router = useRouter();
  return (
    <View
    style={{
        padding:20,
        marginTop: 50,
        display:'flex',
        alignItems:'center',
        gap:20
    }}>
        
        <Ionicons name='location-sharp' size={40} style={{marginTop: 30}} color="red"></Ionicons>
       

        <Text style={{marginTop: 20, fontFamily: "outfit-medium",fontSize: 25,textAlign:"center"}}>No Trip Planned Yet </Text>

        <Text style={{marginTop: 20, fontFamily: "outfit-medium",fontSize: 15,textAlign:"center", color: "gray"}}>Look's Like It's Time To New Travel Experince!! Get Started Below</Text>

        <View style={{backgroundColor:"black",padding:20,borderRadius: 40}} >
            <TouchableOpacity onPress={()=> router.push('/create-trip/search-place')}>
                <Text style={{fontFamily:"outfit-medium",color:"white", fontSize: 15}}> Start a New Trip </Text>

            </TouchableOpacity>
        </View>




    </View>
  )
}