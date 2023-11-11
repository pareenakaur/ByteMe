import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import FavHawkerBtn from "../user-functions/FavHawkerBtn"
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavouriteHawkers({navigation}){
    //call api to get a list of array of hawker
    const [HawkerArr, setHawkerArr] = useState([]);
    const getFavStalls = async() => {
        try {
            const response = await fetch('http://127.0.0.1:5000/hawkers/getFavouriteStalls?id='+ global.usrName);
            const data = await response.json();
            if (data.length){
                for(let i=0; i< data.length; i++){
                    const arr = [];
                    arr.push(
                        <FavHawkerBtn 
                            // key={i} 
                            name = {data[i].result.name} 
                            address={data[i].result.formatted_address} 
                            stall_id={data[i].result.place_id} />
                    )
                    console.log("done")
                    setHawkerArr(arr);
                }
                // console.log(HawkerArr)
                
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    useEffect(()=>{
        getFavStalls();
        console.log(HawkerArr)}, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: "#3C4142", fontSize: 30, fontWeight: 'bold', alignSelf:"center", paddingBottom: 20, paddingTop: 30}}>Favourite Hawkers</Text>
            <ScrollView>
                {HawkerArr}
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

