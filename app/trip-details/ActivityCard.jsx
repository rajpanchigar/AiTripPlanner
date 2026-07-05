import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';

export default function ActivityCard({ item }) {
    return (
        <View>
            {item.activities.map((activity, index) => (
                <View style={styles.tripCard} key={index}>

                    <Text
                        style={{ fontFamily: "outfit-bold", fontSize: 19 }}>{activity.time}</Text>



                    <Text style={{ fontFamily: "outfit-semibold", fontSize: 15, alignItems: "stretch" }}>{activity.activity}</Text>


                    <Text style={{ fontFamily: "outfit-semibold", fontSize: 15, alignItems: "stretch", marginTop: 10, color: "green" }}>Best Time Visit: {activity.bestTimeToVisit}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
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

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
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
        marginLeft: 20,
        fontSize: 20,
        fontFamily: "outfit-bold",
        color: "#111827",
    },

    listContainer: {
        marginTop: -40,
        marginLeft: 30,
        padding: 5,
        height: 100,
        marginBottom: -40,
    },

    tripCard: {
        width: 350,
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
        marginTop: 10,
        height: 240,
        alignItems: "center"
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
    travellCard: {
        width: 350,
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        marginBottom: 5,
    }
});