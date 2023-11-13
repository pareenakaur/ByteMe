import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import FavHawkerBtn from "../user-functions/FavHawkerBtn"
import { SafeAreaView } from "react-native-safe-area-context";

export default function FavouriteHawkers({navigation}){
    //call api to get a list of array of hawker
    const [HawkerArr, setHawkerArr] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const handleRemove = async(stall_id) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/user/removeFavouriteStall?username='+ global.usrName+'&stallID=' +stall_id);
            const data = await response.json();
            console.log(data.result);
            setRefresh((prev)=>prev+1);
            
          }catch(error){ 
            console.log(error)
          }
    };

    const getFavStalls = async() => {
        try {
            console.log(global.usrName);
            const response = await fetch('http://127.0.0.1:5000/user/getFavouriteStalls?id='+ global.usrName+ '&format=1');
            const data = await response.json();
            console.log(data[0])
            if (data.length){
                const arr = [];
                for(let i=0; i< data.length; i++){
                    arr.push(
                        <FavHawkerBtn 
                            key={i} 
                            name = {data[i].name} 
                            address={data[i].formatted_address} 
                            photo={data[i].photo_data[0].photo_reference}
                            handleRemove={()=>{handleRemove(data[i].place_id)}}
                            handleNav={()=>{navigation.navigate("Profile", {placeId1 : data[i].place_id, stallId1 : data[i].place_id, navigation: navigation})}}/>
                    )
                }
                console.log("done")
                setHawkerArr(arr);
                
            }else{
                setHawkerArr([]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    useEffect(()=>{
        getFavStalls();
        console.log(HawkerArr)}, [refresh])
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: "#3C4142", fontSize: 30, fontWeight: 'bold', alignSelf:"center", paddingBottom: 20, paddingTop: 30}}>Favourite Hawkers</Text>
            <ScrollView>
                {HawkerArr.length ? {HawkerArr} : <Text style={{color: "#FA4A0C"}}>You have not added any favourite stalls</Text>}

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

