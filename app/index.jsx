import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Login from "../components/Login.jsx"
import { Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Index() {

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserLogin();
  }, []);

  const checkUserLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.log('Error reading user from AsyncStorage:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'black'} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View>
        {user ? <Redirect href={'/(tabs)/mytrip'} /> : <Login />}
      </View>
    </SafeAreaView>
  )
}
