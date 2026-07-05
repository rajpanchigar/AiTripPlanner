import { View, Text } from 'react-native'
import React from 'react'
import { useContext, useEffect, useState } from 'react';
import { CreateTripContext } from '../../context/createTripContext.jsx'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default function ReviewTrip() {
    const { tripData, setTripData } = useContext(CreateTripContext);

    const router = useRouter();

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    })


    console.log("This Is Your Trip Data", tripData);
    return (
        <SafeAreaView>
            <View style={{ padding: 30, marginTop: 30 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>Review Your Trip</Text>
            </View>
            <View style={{ marginLeft: 30, marginTop: 5, width: 300 }}>
                <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Before Generating Your Trip,  Please Review  Your Selection</Text>
            </View>
            <View style={{ padding: 40, marginTop: 20 }}>
                <Ionicons name="location-sharp" size={30} color="red"></Ionicons>
                <Text style={{ marginLeft: 50, marginTop: -35, fontFamily: "outfit-medium", fontSize: 20, color: "gray" }}>Destination</Text>
                <Text style={{ marginLeft: 50, fontSize: 20, fontFamily: "outfit-medium" }}>{tripData?.locationInfo?.name}</Text>
            </View>

            <View style={{ padding: 40, marginTop: -30, width: 500 }}>
                <Ionicons name="calendar-number-sharp" size={30}color="#28A745"></Ionicons>
                <Text style={{ marginLeft: 50, marginTop: -35, fontFamily: "outfit-medium", fontSize: 20, color: "gray" }}>Travel Date</Text>
                <Text style={{ marginLeft: 50, fontSize: 20, fontFamily: "outfit-medium" }}>{tripData?.startDate?.format('DD-MM-YY')} To {tripData?.endDate?.format('DD-MM-YY')},
                    ({tripData?.totalNumberOfDays} days)
                </Text>
            </View>

            <View style={{ padding: 40, marginTop: -20 }}>
                <Ionicons name="person" size={30} color="#00CED1"></Ionicons>
                <Text style={{ marginLeft: 50, marginTop: -35, fontFamily: "outfit-medium", fontSize: 20, color: "gray" }}>Who Is Travelling</Text>
                <Text style={{ marginLeft: 50, fontSize: 20, fontFamily: "outfit-medium" }}>{tripData?.travelerCount}</Text>
            </View>

            <View style={{ padding: 40, marginTop: -20 }}>
                <FontAwesome5 name="money-check-alt" size={30} color="#DAA520" />
                <Text style={{ marginLeft: 52, marginTop: -35, fontFamily: "outfit-medium", fontSize: 20, color: "gray" }}>Budget</Text>
                <Text style={{ marginLeft: 52, fontSize: 20, fontFamily: "outfit-medium" }}>{tripData?.budget}</Text>
            </View>

            <View style={{alignItems: "center",padding:20,backgroundColor:"black",borderRadius: 50,width:350,justifyContent:"center",margin: "auto"}}>
                <TouchableOpacity onPress={() => router.push('/create-trip/generate-trip')}>
                    <Text style={{color:"white",textAlign:"center",fontFamily:"outfit-medium",
                    fontSize:20
                    }}>Build My Trip</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}


/*

 LOG  This Is Your Trip Data {"budget": "Luxury", "endDate": "2026-06-25T06:30:00.000Z", "locationInfo": {"coordinates": {"lat": 21.1702401, "lng": 72.83106070000001}, "name": "Surat, Gujarat, India", "photo_reference": "AaVGc3mZaRjQbaqgSkcILdZJ8Vo-pUYCIUVmVVoEFUftCMVtfgx4zO9MDyvY2_e1ifZ6g7y2EjDMB4RQogylNg2LAyhhAgQNP69YZu7I6xNcszDD663YDJIJe8vFe0KE3GO_NadNm0Ua0kYZlOo8AzhB959T4U7cojwbkxJ3UW4A3qkJH_gm9Gkg2j1CO9vfPWUBrdFOfrcpRpA2mBv-V2r_NVLPCJt3hApy9KxgexqmR-OKeAL3NiNGgmPv1MBJnIANb9xjtFp5es9kEQCWTu37vmxKNXHWr20FYxp0opvqUgiWiIhD132H0XArhiPd6LqEgHI7DIutZLE8BkSudXn7ZsevzXkQJFDVFE4ImGO05gbXCV9spn1ugLoLthQ0guWH8g7gDNDoqKR0Cn8pt3H1PlbxBz2aaZ78bXX-j15oUBTAPg", "url": "https://maps.google.com/?cid=18322147592298344514"}, "startDate": "2026-06-23T06:30:00.000Z", "totalNumberOfDays": 3, "travelerCount": "Friends"}
*/