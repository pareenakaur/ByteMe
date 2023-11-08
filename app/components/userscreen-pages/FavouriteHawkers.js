import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import FavHawkerBtn from "../user-functions/FavHawkerBtn"
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavouriteHawkers({navigation}){
    //call api to get a list of array of hawker
    const getFavStalls = async() => {
        try {
            const requestOptions = { 
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    "id": global.usrName
                })
            };
            const response = await fetch('http://127.0.0.1:5000/hawkers/getFavouriteStalls', requestOptions);
            const data = await response.json();
            console.log(data.result);
            if (data.favourite_stalls.length()){
                return data.favourite_stalls.length()}
        } catch (error) {
            console.error(error);
            return 
        }
    };

    const HawkerComps = [];
    // let favStalls = getFavStalls();
    let favStalls = 1;
    if (favStalls){
        for (let i = 0; i < 6; i++) {
            HawkerComps.push(
                <FavHawkerBtn key={i}/>);
        }
    }
    
    
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: "#3C4142", fontSize: 30, fontWeight: 'bold', alignSelf:"center", paddingBottom: 20, paddingTop: 30}}>Favourite Hawkers</Text>
            <ScrollView>
                {/* <Text style={{paddingBottom: 8, color: "#FA4A0C", fontStyle: "italic", fontSize: 18}} onPress={() => navigation.navigate('Profile')}>return to profile</Text> */}
                {HawkerComps}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F8',
        alignItems: 'center',
    },
})

