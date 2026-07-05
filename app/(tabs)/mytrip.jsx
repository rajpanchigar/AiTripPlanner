import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons"
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard.jsx"
import { auth, db } from "../../configs/FirebaseConfig.jsx";
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import UserTripList from '../create-trip/UserTripList.jsx'
import { useRouter, useNavigation } from 'expo-router'
export default function MyTrip() {

    const [userTrips, setUserTrips] = useState([]);
    const [loading,setLoading] = useState(false);
    const user = auth.currentUser;
    const router = useRouter();
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
            getMyTrips();
            const unsubscribe = navigation.addListener('focus', () => {
                getMyTrips();
            });
            return unsubscribe;
        }
    }, [user, navigation]);

    const getMyTrips = async() => {
        setLoading(true);
        setUserTrips([]);
        const q = query(collection(db,'UserTrips'),where('userEmail','==',user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.id, "=>", doc.data());
            setUserTrips(prev => [...prev,doc.data()] )
        })
        setLoading(false);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView 
                contentContainerStyle={{
                    padding: 20,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                    <Text style={{ fontFamily: "outfit-bold", fontSize: 30 }}>My Trips</Text>

                    <TouchableOpacity onPress={()=> router.push('/create-trip/search-place')}>
                    <Ionicons name='add-circle-sharp' size={40} style={{ marginTop: 5 }}></Ionicons>
                    </TouchableOpacity>
                </View>

                {loading&& <ActivityIndicator size={'large'} color={'black'}></ActivityIndicator>}

                {userTrips?.length == 0 ? <StartNewTripCard/> : <UserTripList userTrips={userTrips}/>}

            </ScrollView>
        </SafeAreaView>
    )
}