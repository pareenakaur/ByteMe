import React, { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View} from "react-native";
import FavHawkerBtn from "../user-functions/FavHawkerBtn"
import { SafeAreaView } from "react-native-safe-area-context";
import { IconButton } from "react-native-paper";

export default function FavouriteHawkers({navigation}){
    const [HawkerArr, setHawkerArr] = useState([]);

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
                            handleRemove={()=>{handleRemove(data[i].place_id)}}/>
                            // handleNav={()=>{navigation.navigate("Profile", {centre: centre, place: place})}}/>
                    )
                }
                console.log("done")
                setHawkerArr(arr);
                
            }else{
                setHawkerArr([<Text style={{color: "#FA4A0C"}}>You have not added any favourite stalls</Text>]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = async(stall_id) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/user/removeFavouriteStall?username='+ global.usrName+'&stallID=' +stall_id);
            const data = await response.json();
            console.log(data.result);
            getFavStalls();
            
          }catch(error){ 
            console.log(error)
          }
    };
    
    useEffect(()=>{
        getFavStalls();
        console.log(HawkerArr)}, [])
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={{color: "#3C4142", fontSize: 30, fontWeight: 'bold', alignSelf:"center", paddingBottom: 20, paddingTop: 30}}>Favourite Hawkers</Text>
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{color: "grey"}}>Cannot see your favourite hawker stall ? </Text>
                <IconButton icon={"refresh"} iconColor={"orange"} onPress={getFavStalls}></IconButton>
            </View>
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

