import { View, Text, Image, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateTripContext } from '../../context/createTripContext.jsx';
import { AI_PROMPT } from '../../constants/Options.jsx';
import { chatSession } from '../../configs/AiModel.js';
import { useRouter } from 'expo-router';
import { collection, getDoc, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { auth,db } from "../../configs/FirebaseConfig.jsx";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();

  const user = auth.currentUser;
  useEffect(() => {
    if (tripData && Loading) {
      GenerateTripData();
    }
  }, [tripData]);

  const GenerateTripData = async () => {
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData?.locationInfo?.name)
        .replace('{totalDays}', tripData?.totalNumberOfDays)
        .replace('{totalNight}', tripData?.totalNumberOfDays - 1)
        .replace('{traveler}', tripData?.traveler?.title || tripData?.travelerCount)
        .replace('{budget}', tripData?.budget);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const resultText = result.response.text();
      console.log(resultText);
      const parsedTripData = JSON.parse(resultText);
      const docId = (Date.now()).toString();
      
      await setDoc(doc(db,"UserTrips",docId),{
        userEmail: user.email,
        tripData: parsedTripData
      });
      
      setLoading(false);
      setTripData([]); 
      router.push('/(tabs)/mytrip');
    } catch (error) {
      console.error("Error generating trip:", error);
      setLoading(false);
      Alert.alert("Generation Failed", "We could not generate your trip. Please try again.");
      router.push('/(tabs)/mytrip');
    }
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={{ marginTop: 50, textAlign: "center", fontSize: 30, fontFamily: "outfit-bold" }}>
          Please Wait ...
        </Text>
        <Text style={{ marginTop: 30, textAlign: "center", fontSize: 15, fontFamily: "outfit-medium" }}>
          We Are Working To Generate Your Dream Trip
        </Text>
      </View>
      <View style={{ backgroundColor: "white", marginTop: 100, width: 0 }}>
        <Image
          source={require("../../assets/images/tripe.gif")}
          style={{ borderRadius: 700, height: 400 }}
        />
      </View>
    </SafeAreaView>
  );
}