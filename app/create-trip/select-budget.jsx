import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { CreateTripContext } from '../../context/createTripContext.jsx'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { SelectBudgetOptions } from '../../constants/Options.jsx';
import OptionCard from './OptionCard.jsx';
import { FlatList } from 'react-native';
import { ToastAndroid } from 'react-native';
import { useRouter } from 'expo-router';
export default function SelectBudget() {

  const { tripData, setTripData } = useContext(CreateTripContext);
  const nevigation = useNavigation();

  const [selectBudget,setSelectBudget] = useState();

  const router = useRouter();

  useEffect(()=>{
    nevigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    })
  })

  useEffect(()=>{
    if (selectBudget) {
      setTripData({
        ...tripData,
        budget: selectBudget.title,
      });
    }
  },[selectBudget]);

  console.log(tripData);

  const onClickContinue = () => {
    if(!selectBudget){
      ToastAndroid.show('Please Select Your Budget',ToastAndroid.BOTTOM);
      return;
    }

    router.push('/create-trip/review-trip');


  }
  return (
    <SafeAreaView style = {{flex : 1}}>
      <View style={{padding: 60}}>
        <Text style={{fontSize: 30,fontFamily: "outfit-bold"}}>Budget</Text>
        <View style={{marginTop: 30,marginBottom: 10}}>
          <Text style={{fontSize: 15,fontFamily: "outfit-medium", marginBottom: 20}}>Choose Spending Habits For Your Trip</Text>
        </View>

        <FlatList data = { SelectBudgetOptions }
        renderItem = {({ item, index }) => (
          <TouchableOpacity
           onPress={()=> setSelectBudget(item)}>
            <OptionCard option={item} selectedOption={selectBudget} ></OptionCard>
          </TouchableOpacity>
        )}>

        </FlatList>

        <View style={{margin: 20,padding: 20, backgroundColor:"black",alignItems:"center",width:270,borderRadius: 40}} >
          <TouchableOpacity onPress={onClickContinue}>
            <Text style={{color: "white",fontFamily:"outfit-medium",fontSize:20}}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}