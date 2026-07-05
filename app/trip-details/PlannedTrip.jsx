import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { GetPlacePhoto } from '../../configs/GooglePlaceApi';

export default function PlannedTrip({ dailyPlan }) {
    const [photos, setPhotos] = useState({});   // { [placeName]: photoUrl }
    const [loadingPlaces, setLoadingPlaces] = useState({}); // { [placeName]: true/false }

    useEffect(() => {
        if (!dailyPlan || dailyPlan.length === 0) return;

        // Collect every unique placeName across all days/activities
        const placeNames = new Set();
        dailyPlan.forEach((day) => {
            day.activities?.forEach((activity) => {
                if (activity.placeName) placeNames.add(activity.placeName);
            });
        });

        if (placeNames.size === 0) return;

        // Mark them all as loading
        setLoadingPlaces((prev) => {
            const next = { ...prev };
            placeNames.forEach((name) => (next[name] = true));
            return next;
        });

        let isMounted = true;

        placeNames.forEach(async (placeName) => {
            try {
                const url = await GetPlacePhoto(placeName);
                if (isMounted) {
                    setPhotos((prev) => ({ ...prev, [placeName]: url }));
                }
            } catch (error) {
                console.log("Photo load error for", placeName, error);
            } finally {
                if (isMounted) {
                    setLoadingPlaces((prev) => ({ ...prev, [placeName]: false }));
                }
            }
        });

        return () => {
            isMounted = false;
        };
    }, [dailyPlan]);

    return (
        <FlatList
            data={dailyPlan}
            keyExtractor={(day, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item: day }) => (
                <View style={styles.dayCard}>
                    <Text style={styles.dayTitle}>Day {day.day} — {day.theme}</Text>
                    <Text style={styles.dayDate}>{day.date}</Text>

                    <FlatList
                        data={day.activities}
                        keyExtractor={(activity, index) => index.toString()}
                        scrollEnabled={false}
                        renderItem={({ item: activity }) => {
                            const placeName = activity.placeName;
                            const isLoading = placeName ? loadingPlaces[placeName] : false;
                            const photoUrl = placeName ? photos[placeName] : null;

                            return (
                                <View style={styles.activityCard}>
                                    <Text style={styles.time}>{activity.time}</Text>

                                    {placeName ? (
                                        <Text style={styles.placeName}>{placeName}</Text>
                                    ) : null}

                                    {isLoading ? (
                                        <ActivityIndicator style={{ marginVertical: 10 }} />
                                    ) : photoUrl ? (
                                        <Image source={{ uri: photoUrl }} style={styles.image} />
                                    ) : null}

                                    <Text style={styles.activityText}>{activity.activity}</Text>

                                    {activity.bestTimeToVisit ? (
                                        <Text style={styles.bestTime}>
                                            ⏰ Best time: {activity.bestTimeToVisit}
                                        </Text>
                                    ) : null}
                                </View>
                            );
                        }}
                    />
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    dayCard: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#F8FAFC",
        borderRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    dayTitle: {
        fontFamily: "outfit-bold",
        fontSize: 20,
        color: "#111827",
    },
    dayDate: {
        fontFamily: "outfit",
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 10,
    },
    activityCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 14,
        marginVertical: 6,
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    time: {
        fontFamily: "outfit-semibold",
        fontSize: 16,
        color: "#2563EB",
        marginBottom: 4,
    },
    placeName: {
        fontFamily: "outfit-bold",
        fontSize: 17,
        color: "#111827",
        marginBottom: 8,
    },
    image: {
        width: "100%",
        height: 150,
        borderRadius: 12,
        marginBottom: 10,
        backgroundColor: "#E5E7EB",
    },
    activityText: {
        fontFamily: "outfit-medium",
        fontSize: 14,
        color: "#374151",
        lineHeight: 20,
    },
    bestTime: {
        fontFamily: "outfit-regular",
        fontSize: 12,
        color: "#6B7280",
        marginTop: 6,
    },
})
