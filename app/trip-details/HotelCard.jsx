import { View, Text, Image } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { getPhotoRef } from "../../services/GooglePlaceApi";
export default function HotelCard({ item }) {

    const [photoRef, setPhotoRef] = useState(null);
    useEffect(() => {
        GetGooglePhotos();
    }, [item])
    const GetGooglePhotos = async () => {
        try {
            const result = await getPhotoRef(item.hotelName);

            console.log("Photo Result:", result);

            if (
                result?.results?.length > 0 &&
                result.results[0]?.photos?.length > 0
            ) {
                setPhotoRef(result.results[0].photos[0].photo_reference);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <View style={styles.hotelCard}>
            <View style={styles.row}>
                <Image
                    source={{
                        uri: photoRef
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
                            : "https://via.placeholder.com/230x100",
                    }}
                    style={{
                        width: 270,
                        height: 140,
                        borderRadius: 12,
                        marginBottom: 15,
                    }}
                />
            </View>
            <View style={styles.row}>
                <Ionicons
                    name="business-outline"
                    size={20}
                    color="#2563EB"
                />
                <Text style={styles.hotelName}>{item.hotelName}</Text>
                <Ionicons name="star" size={18} color="#FBBF24" />
                <Text style={styles.rating}>{item.rating} Rating</Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="cash-outline" size={18} color="#16A34A" />
                <Text style={styles.price}>
                    {item.pricePerNight} / Night
                </Text>
            </View>

            <View style={styles.row}>
                <Ionicons name="information-circle-outline" size={20} color="#2563EB" />
                <Text numberOfLines={4} style={styles.description}>
                    {item.description}
                </Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: "#F8FAFC",
        borderRadius: 20,
        marginBottom: 20,
        padding: 10,
        margin: 10,
        height: 400

    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        marginBottom: 10,
    },

    iconContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        marginLeft: 12,
        fontSize: 20,
        fontFamily: "outfit-bold",
        color: "#111827",
    },

    listContainer: {
        paddingHorizontal: 15,
    },

    hotelCard: {
        width: 300,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginRight: 15,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        marginBottom: 5,
        height: 390
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },

    hotelName: {
        marginLeft: 8,
        flex: 1,
        fontSize: 18,
        fontFamily: "outfit-bold",
        color: "#111827",
    },

    rating: {
        marginLeft: 8,
        fontFamily: "outfit-medium",
        color: "#374151",
    },

    price: {
        marginLeft: 8,
        color: "#16A34A",
        fontFamily: "outfit-bold",
    },

    description: {
        marginTop: 10,
        color: "#6B7280",
        lineHeight: 22,
        fontFamily: "outfit",
        width: 250
    },
});

//https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}