import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from '../../configs/FirebaseConfig'
import { signOut } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Profile() {
    const router = useRouter();
    const user = auth.currentUser;

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            await AsyncStorage.removeItem('user');
                            router.replace('/');
                        } catch (error) {
                            console.log('Logout error:', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 20 }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                }}>Profile</Text>

                {user && (
                    <View style={{ marginTop: 30 }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 15,
                        }}>
                            <Ionicons name="person-circle-outline" size={50} color="black" />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{
                                    fontFamily: 'outfit-semibold',
                                    fontSize: 18,
                                }}>{user.displayName || 'User'}</Text>
                                <Text style={{
                                    fontFamily: 'outfit-regular',
                                    fontSize: 14,
                                    color: 'gray',
                                }}>{user.email}</Text>
                            </View>
                        </View>
                    </View>
                )}

                <TouchableOpacity
                    onPress={handleLogout}
                    style={{
                        marginTop: 40,
                        backgroundColor: '#FF3B30',
                        padding: 16,
                        borderRadius: 50,
                        alignItems: 'center',
                    }}>
                    <Text style={{
                        fontFamily: 'outfit-bold',
                        color: 'white',
                        fontSize: 18,
                    }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}