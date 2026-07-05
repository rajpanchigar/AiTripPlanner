import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet } from 'react-native';
import { Linking } from 'react-native';

export default function FlightInfo({flightData}) {
  return (
    <View style={styles.card}>
      
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="airplane" size={22} color="#fff" />
        </View>

        <Text style={styles.title}>Flight Details</Text>

      <TouchableOpacity onPress={()=> Linking.openURL("https://www.goindigo.in/")}>
        <View style={styles.container}>
          <Text style={{color:"white",fontFamily:"outfit-medium"}}>Book Here</Text>
        </View>
      </TouchableOpacity>
      </View>

      
      <View style={styles.divider} />

      
      <View style={styles.infoRow}>
        <Ionicons name="cash-outline" size={20} color="#0F9D58" />
        <Text style={styles.label}>Price</Text>
        <Text style={styles.value}>
          {flightData?.flightPrice} approx amount
        </Text>
      </View>

      
      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={20} color="#4285F4" />
        <Text style={styles.label}>Destination </Text>
        <Text style={styles.value}>
          {flightData?.destinationCity}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    elevation: 8, // Android Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    color: "#1F2937",
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  label: {
    fontSize: 15,
    color: "#6B7280",
    fontFamily: "outfit-medium",
    marginLeft: 10,
    width: 90,
  },

  value: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    fontFamily: "outfit-bold",
    marginLeft: 20
  },

  container:{
    width: 100,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 40,
    color:"white"
  }
});
