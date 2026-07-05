import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({ option, selectedOption }) {

    const isSelected = selectedOption?.id === option?.id;
    console.log(isSelected);
    return (
        <View style={[{
            padding: 30,
            paddingLeft: 20,
        },isSelected && {borderWidth: 3, borderRadius: 15, borderColor: "black"}]}>
            <View style={{ marginTop: -15, height: 110, width: 300, backgroundColor: "white", alignItems: "flex-start", padding: 20, borderRadius: 10 }}>
                <Text style={{ fontFamily: "outfit-bold", fontSize: 25, marginBottom: 10 }}> {option?.title}</Text>
                <Text style={{ fontFamily: "outfit-light", fontSize: 15 }}> {option?.desc}</Text>
            </View>
        </View>
    )
}