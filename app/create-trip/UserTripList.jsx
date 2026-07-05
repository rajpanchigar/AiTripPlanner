import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { GetPlacePhoto } from '../../configs/GooglePlaceApi';
import { useRouter } from 'expo-router';
import UserTripCard from '../../components/MyTrips/UserTripCard.jsx';

export default function UserTripList({ userTrips }) {
    const LatestTrip = userTrips?.[0]?.tripData;

    const [photoUrl, setPhotoUrl] = useState(null);
    const router = useRouter();

    console.log("this", userTrips);

    const loadPhoto = async () => {
        try {
            if (!LatestTrip?.location) return;

            const url = await GetPlacePhoto(LatestTrip.location);
            setPhotoUrl(url);
        } catch (error) {
            console.log("Photo load error:", error);
        }
    };

    useEffect(() => {
        loadPhoto();
    }, [LatestTrip]);

    return (
        <View style={{ marginTop: 20, paddingBottom: 40 }}>

            {/* IMAGE */}
            <Image
                source={
                    photoUrl
                        ? { uri: photoUrl }
                        : require('../../assets/images/trip.png')
                }
                style={{
                    width: 370,
                    height: 250,
                    borderRadius: 20,
                }}
            />

            {/* DETAILS */}
            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
                    {LatestTrip?.location || 'Unknown Location'}
                </Text>
            </View>

            <TouchableOpacity onPress={()=>router.push({pathname:'/trip-details',params:{
                tripData:JSON.stringify(userTrips[0]),
                photoUrl: photoUrl,
            }}) }>
                <View style={{ padding: 15, backgroundColor: "black", marginTop: 20, borderRadius: 10 }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: 20, fontFamily: "outfit-bold" }}>See Your Plans</Text>
                </View>
            </TouchableOpacity>

            {/* PREVIOUS TRIPS */}
            {userTrips?.length > 1 && (
                <View style={{ marginTop: 30 }}>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 22, marginBottom: 10 }}>
                        Previous Trips
                    </Text>
                    {userTrips.slice(1).map((trip, index) => (
                        <UserTripCard trip={trip} key={index} />
                    ))}
                </View>
            )}

        </View>
    );
}