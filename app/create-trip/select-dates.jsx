import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import CalendarPicker from "react-native-calendar-picker";
import moment from 'moment';
import { Link } from 'expo-router';
import { CreateTripContext } from '../../context/createTripContext.jsx'

export default function SelectDates() {
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const { tripData, setTripData } = useContext(CreateTripContext)

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    const onDateChange = (date, type) => {
        console.log(date, type);

        if (type == 'START_DATE') {
            setStartDate(moment(date))
        }
        else {
            setEndDate(moment(date))
        }

    }

    const onDateSelection = () => {
        if (!startDate && !endDate) {
            ToastAndroid.show("Please Select Start And End Date", ToastAndroid.BOTTOM);
            return;
        }
        const totalNumberOfDays = endDate.diff(startDate, 'days');
        const updateData = {
            ...tripData,
            startDate: startDate,
            endDate: endDate,
            totalNumberOfDays: totalNumberOfDays + 1

        };
        setTripData(updateData);
        console.log(updateData);

        router.push('/create-trip/select-budget');

    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 25, marginTop: 40 }}>
                <Text
                    style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 30,
                        marginBottom: 40,
                    }}
                >
                    Select Dates
                </Text>

                <CalendarPicker
                    todayBackgroundColor="#000"
                    selectedDayColor="#000"
                    selectedDayTextColor="#fff"
                    allowRangeSelection={true}
                    maxRangeDuration={10}
                    minDate={new Date()}
                    onDateChange={onDateChange}
                />
            </View>

            <View>
                    <TouchableOpacity
                        style={{
                            marginTop: 30,
                            alignItems: "center",
                            width: 300,
                            backgroundColor: "black",
                            height: 60,
                            justifyContent: "center",
                            borderRadius: 60,
                            marginLeft: 55,
                        }}
                        onPress={onDateSelection}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: "outfit-medium",
                                color: "white",
                                justifyContent: "center"
                            }}
                        >
                            Continue
                        </Text>
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}