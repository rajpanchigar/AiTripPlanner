import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CreateTripContext } from "./../../context/createTripContext";

export default function SearchPlace() {

    const navigation = useNavigation();
    const { tripData , setTripData } = useContext(CreateTripContext);

    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: 'Search'
        })
    }, []);

    useEffect(() => {
        console.log(setTripData);
    },[setTripData])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 20 }}>

                <GooglePlacesAutocomplete
                    placeholder='Search Place'
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        console.log(data.description);
                        console.log(details.geometry.location);
                        console.log(details.photos[0]?.photo_reference);
                        console.log(details.url);
                        setTripData({
                            locationInfo:{
                                name:data.description,
                                coordinates:details.geometry.location,
                                photo_reference:details.photos[0]?.photo_reference,
                                url:details?.url
                            }
                        })

                        router.push('/create-trip/select-traveler')
                    }}
                    query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
                        language: 'en',
                    }}
                    styles={{
                        textInput: {
                            height: 50,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            marginTop: 50
                        }
                    }}
                />

            </View>
        </SafeAreaView>
    )
}