import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { SelectTravelList } from '../../constants/Options'
import { FlatList } from 'react-native'
import OptionCard from "../create-trip/OptionCard.jsx"
import { CreateTripContext } from '../../context/createTripContext.jsx'
import { Link } from 'expo-router'
export default function SelectTraveler() {

    const navigation = useNavigation();
    const [selectedTraveler, setSelectedTraveler] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    useEffect(() => {
        if (selectedTraveler) {
            setTripData({
                ...tripData,
                travelerCount: selectedTraveler.title,
                traveler: selectedTraveler
            })
        }
    }, [selectedTraveler])

    useEffect(() => {
        console.log(tripData)

    }, [tripData])
    return (
        <SafeAreaView>
            <View style={{ padding: 30, paddingTop: 60 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>Who's Travelling</Text>
            </View>

            <View style={{ padding: 35, marginTop: -40 }}>
                <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>Choose Your Traveles </Text>

                <FlatList data={SelectTravelList}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => setSelectedTraveler(item)}>
                            <OptionCard option={item} selectedOption={selectedTraveler}></OptionCard>
                        </TouchableOpacity>


                    )}
                />
            </View>


            <TouchableOpacity
                style={{
                    marginTop: -30,
                    alignItems: "center",
                    width: 300,
                    backgroundColor: "black",
                    height: 60,
                    justifyContent: "center",
                    borderRadius: 60,
                    marginLeft: 55,
                }}
            >
                <Link href="/create-trip/select-dates"
                style={{textAlign:"center",width: "100%"}}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: "outfit-medium",
                            color: "white",
                            justifyContent: "center"
                        }}
                    >
                        Continue
                    </Text>
                </Link>
            </TouchableOpacity>
        </SafeAreaView>
    )
}