import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { CreateTripContext } from './../context/createTripContext.jsx';
import { useState } from "react";

export default function RootLayout(){

    useFonts({
        'outfit-black':require("../assets/fonts/Lexend-Black.ttf"),
        'outfit-bold':require("../assets/fonts/Lexend-Bold.ttf"),
        'outfit-extrabold':require("../assets/fonts/Lexend-ExtraBold.ttf"),
        'outfit-light':require("../assets/fonts/Lexend-Light.ttf"),
        'outfit-medium':require("../assets/fonts/Lexend-Medium.ttf"),
        'outfit-regular':require("../assets/fonts/Lexend-Regular.ttf"),
        'outfit-semibold':require("../assets/fonts/Lexend-SemiBold.ttf"),
        'outfit-thin':require("../assets/fonts/Lexend-Thin.ttf"),
    })

    const [tripData, setTripData] = useState([]);
    return(
        <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack screenOptions={{ headerShown : false}}>
            <Stack.Screen name="index"/>
        </Stack>
        </CreateTripContext.Provider>
    )
}