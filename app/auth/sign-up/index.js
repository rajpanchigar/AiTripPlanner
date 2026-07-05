import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { auth } from '../../../configs/FirebaseConfig'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Feather from '@expo/vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUp() {

  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const router = useRouter();

  const createAccount = async () => {

    if (!fullName || !email || !password) {
      ToastAndroid.show('Please All Fields Are Required!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update profile with full name
      await updateProfile(user, { displayName: fullName });

      // Save user session to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: fullName,
      }));

      console.log('Account created & saved:', user.email);
      router.replace('/(tabs)/mytrip');
    } catch (error) {
      console.log(error);
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }
  }
  return (
    <SafeAreaView>
      <View style={{
        padding: 20,
        marginTop: 20,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left-circle" size={25}
            color="black" />
        </TouchableOpacity>

        <Text style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          marginTop: 10,
        }}>Create Account</Text>


        <View style={{ marginTop: 30 }}>
          <Text style={{ fontFamily: "outfit-semibold", fontSize: 19, marginBottom: 5 }}>Full Name</Text>
          <TextInput
            placeholder='Enter Email'
            style={{ borderWidth: 1, borderRadius: 20, padding: 10, height: 60 }}
            onChangeText={(value) => setFullName(value)}>
          </TextInput>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit-semibold", fontSize: 19, marginBottom: 5 }}>Email</Text>
          <TextInput
            placeholder='Enter Email'
            style={{ borderWidth: 1, borderRadius: 20, padding: 10, height: 60 }}
            onChangeText={(value) => setEmail(value)}>
          </TextInput>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "outfit-semibold", fontSize: 19, marginBottom: 5 }}>Password</Text>
          <TextInput
            placeholder='Enter Password'
            secureTextEntry={true}

            style={{ borderWidth: 1, borderRadius: 20, padding: 10, height: 60 }}
            onChangeText={(value) => setPassword(value)}>
          </TextInput>
        </View>

        <View style={{ marginTop: 30, alignItems: "center", backgroundColor: "black", padding: 15, borderRadius: 50, borderColor: "white" }}>
          <TouchableOpacity onPress={createAccount}>
            <Text style={{ fontFamily: "outfit-bold", color: "white", textAlign: "center", fontSize: 20 }}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20, alignItems: "center", backgroundColor: "white", padding: 16, borderRadius: 50, borderWidth: 1 }}>
          <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
            <Text style={{ fontFamily: "outfit-bold", color: "black", textAlign: "center", fontSize: 20 }}>Sign In</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>

  )
}
