import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSignIn = async () => {
        if (!email || !password) {
            ToastAndroid.show(
                "Please fill all fields!",
                ToastAndroid.SHORT
            );
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await AsyncStorage.setItem(
                "user",
                JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                })
            );

            console.log("Saved:", user.email);

            router.replace("/mytrip");
        } catch (error) {
            console.log(error);

            ToastAndroid.show(error.message, ToastAndroid.LONG);
        }
    };

    return (
        <SafeAreaView>

            <View style={{
                padding: 20,
                marginTop: 20,
            }}>
                <TouchableOpacity onPress={() => router.replace('/')}>
                    <Feather name="arrow-left-circle" size={25}
                        color="black" />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: "outfit-bold",
                    fontSize: 25,
                    marginTop: 20,
                }}>Let's Sign In You</Text>

                <Text style={{
                    fontFamily: "outfit-regular",
                    fontSize: 25,
                    color: "gray",
                    marginTop: 20,
                }}>Welcome Back</Text>

                <Text style={{
                    fontFamily: "outfit-regular",
                    fontSize: 25,
                    color: "gray",
                    marginTop: 20,
                }}>You've Been Missed !!</Text>

                <View style={{ marginTop: 30 }}>
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

                <View style={{ marginTop: 40, alignItems: "center", backgroundColor: "black", padding: 16, borderRadius: 50 }}>
                    <TouchableOpacity onPress={onSignIn}>
                        <Text style={{ fontFamily: "outfit-bold", color: "white", textAlign: "center", fontSize: 20 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20, alignItems: "center", backgroundColor: "white", padding: 15, borderRadius: 50, borderColor: "black", borderWidth: 1 }}>
                    <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
                        <Text style={{ fontFamily: "outfit-bold", color: "black", textAlign: "center", fontSize: 20 }}>Create Account</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}