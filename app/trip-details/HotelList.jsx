import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getPhotoRef } from "../../services/GooglePlaceApi";
import HotelCard from "./HotelCard";
export default function HotelList({ hotelData }) {

    
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name="bed" size={28} color="#fff" />
                </View>

                <Text style={styles.title}>Recommended Hotels</Text>
            </View>

            {/* Horizontal Hotel Cards */}
            <FlatList
                data={hotelData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <HotelCard item={item}/>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        backgroundColor: "#F8FAFC",
        borderRadius: 20,
        marginBottom: 20,
        padding: 10,
        margin: 10,
        height: 470
        
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
        paddingHorizontal: 10,
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
            height: 4,
        },
        marginBottom:5,
        height: 500
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