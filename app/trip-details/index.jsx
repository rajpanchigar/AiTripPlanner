import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import { useNavigation } from 'expo-router'
import { GetPlacePhoto } from '../../configs/GooglePlaceApi';
import FlightInfo from './FlightInfo'
import HotelList from './HotelList'
import PlannedTrip from './PlannedTrip'
import NearByPlace from './NearByPlace'
export default function index() {
    const { tripData, photoUrl } = useLocalSearchParams();

    const [tripDetails, setTripDetails] = useState([]);
    console.log("details", tripData);
    const navigation = useNavigation();
    console.log("this is my tripdata", tripData)
    console.log("PlacesVisitToNearBy",tripData)


    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        })

        setTripDetails(JSON.parse(tripData));
        console.log("finalTRipDATA", tripData?.placesToVisitNearby);

    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Image
                        source={
                            photoUrl
                                ? { uri: photoUrl }
                                : require('../../assets/images/trip.png')
                        }
                        style={{
                            width: 400,
                            height: 350,
                            borderRadius: 10,
                            margin: 5,
                            padding: 10
                        }}
                    />
                    <View style={{ padding: 10, borderRadius: 20 }}>
                        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>{tripDetails?.tripData?.location}</Text>
                    </View>

                    <FlightInfo flightData={tripDetails?.tripData?.flightDetails} />

                    <HotelList hotelData={tripDetails?.tripData?.hotelOptions} />

                    <PlannedTrip dailyPlan={tripDetails?.tripData?.dailyPlan} />

                    <NearByPlace placesToVisitNearby={tripDetails?.tripData?.placesToVisitNearby} />


                </View>
            </ScrollView>

        </SafeAreaView>
    )
}