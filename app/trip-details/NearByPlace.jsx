import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { GetPlacePhoto } from '../../configs/GooglePlaceApi';

// One row per place. Each row fetches its OWN photo based on its OWN placeName.
function PlaceItem({ item, index }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const loadPhoto = async () => {
            try {
                if (!item?.placeName) {
                    setLoading(false);
                    return;
                }
                const url = await GetPlacePhoto(item.placeName);
                if (isMounted) setPhotoUrl(url);
            } catch (error) {
                console.log("Photo load error:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        loadPhoto();

        return () => {
            isMounted = false;
        };
    }, [item?.placeName]); // refetch if the place changes

    return (
        <View style={styles.placeCard}>
            <View style={styles.header}>
                <View style={styles.numberCircle}>
                    <Text style={styles.number}>{index + 1}</Text>
                </View>
                <Text style={styles.placeName}>{item.placeName}</Text>
            </View>

            {loading ? (
                <ActivityIndicator style={{ marginBottom: 12 }} />
            ) : photoUrl ? (
                <Image
                    source={{ uri: photoUrl }}
                    style={styles.placeImage}
                />
            ) : null}

            <Text style={styles.placeDetails}>
                {item.placeDetails}
            </Text>

            <View style={styles.infoRow}>
                <Text style={styles.label}>🎟 Ticket</Text>
                <Text style={styles.value}>{item.ticketPricing}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>🕒 Travel Time</Text>
                <Text style={styles.value}>{item.timeToTravel}</Text>
            </View>
        </View>
    );
}

export default function NearByPlace({ placesToVisitNearby }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Ionicons name="location" size={28} color="#fff" />
                </View>
                <Text style={styles.title}>Travel Near Places</Text>
            </View>

            <View style={styles.listContainer}>
                <FlatList
                    data={placesToVisitNearby}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <PlaceItem item={item} index={index} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#F8FAFC",
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
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
        fontFamily: "outfit-bold",
        fontSize: 20,
        marginLeft: 10
    },
    placeCard: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        marginVertical: 8,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    numberCircle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",
    },
    number: {
        color: "#fff",
        fontFamily: "outfit-bold",
        fontSize: 16,
    },
    placeName: {
        flex: 1,
        marginLeft: 12,
        fontSize: 20,
        fontFamily: "outfit-bold",
        color: "#111827",
    },
    placeImage: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: "#E5E7EB",
    },
    placeDetails: {
        fontSize: 15,
        fontFamily: "outfit-medium",
        color: "#6B7280",
        lineHeight: 22,
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        overflow: "hidden"
    },
    label: {
        fontSize: 15,
        fontFamily: "outfit-semibold",
        color: "#374151",
    },
    value: {
        fontSize: 15,
        fontFamily: "outfit-bold",
        color: "#2563EB",
    },
})
