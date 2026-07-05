import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetPlacePhoto } from '../../configs/GooglePlaceApi'
import { useRouter } from 'expo-router'

export default function UserTripCard({ trip }) {
    const router = useRouter();
    const [photoUrl, setPhotoUrl] = useState(null);
    const tripData = trip?.tripData;

    useEffect(() => {
        const loadPhoto = async () => {
            try {
                const url = await GetPlacePhoto(tripData.location);
                setPhotoUrl(url);
            } catch (error) {
                console.log("Card photo load error:", error);
            }
        };

        if (tripData?.location) {
            loadPhoto();
        }
    }, [tripData]);

    return (
        <TouchableOpacity 
            onPress={() => router.push({
                pathname: '/trip-details',
                params: {
                    tripData: JSON.stringify(trip),
                    photoUrl: photoUrl
                }
            })}
            style={{
                marginTop: 15,
                display: 'flex',
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
                elevation: 3,
            }}
        >
            <Image 
                source={photoUrl ? { uri: photoUrl } : require('../../assets/images/trip.png')}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 12
                }}
            />
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 16,
                    color: '#000'
                }} numberOfLines={1}>
                    {tripData?.location || 'Unknown Location'}
                </Text>
                
                {tripData?.traveler && (
                    <Text style={{
                        fontFamily: 'outfit-regular',
                        fontSize: 13,
                        color: 'gray',
                        marginTop: 4
                    }}>
                        {tripData.traveler}
                    </Text>
                )}
                
                {tripData?.budget && (
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 13,
                        color: '#DAA520',
                        marginTop: 2
                    }}>
                        Budget: {tripData.budget}
                    </Text>
                )}
            </View>
        </TouchableOpacity>
    )
}
