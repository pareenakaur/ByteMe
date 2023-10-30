import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";
// import { Rating } from '@rneui/themed';
import Camera from 'react-native-camera';
import { Rating } from "react-native-ratings";
import CameraBtn from "../user-functions/CameraBtn";
import TextBox from "../user-functions/TextBox";
import SubmitBtn from "../user-functions/SubmitBtn";

export default function ReviewForm({navigation}){
    const [ratings, setRatings] = useState(0);
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.topbar}>
                    <Text style={{paddingBottom: 8, color: "#FA4A0C", fontStyle: "italic", fontSize: 18}} onPress={() => navigation.navigate('Profile')}>return to main</Text>
                    <Text style={{color: "#3C4142",fontSize: 30, fontWeight: 'bold'}}>Create A New Review</Text>
                </View>
                <View style={styles.main}>
                    <Rating type={"custom"} showRating={true} tintColor={"#F5F5F8"} ratingTextColor={"#FA4A0C"} ratingColor={"#FA4A0C"} startingValue={0} style={{paddingVertical: 20}} onFinishRating={setRatings}/>
                    <CameraBtn/>
                    <TextBox name={"Review"}/>
                    <SubmitBtn label={"Submit"} navigation={navigation} navigateTo={"Profile"}/>
                </View>                
                <View style={styles.navbar}></View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    topbar: {
        flex: 2.5,
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F8"
    },
    main: {
        flex:12,
        // backgroundColor: "orange",
        alignItems:"center",
        paddingHorizontal: 10,
    },
    navbar: {
        flex: 2,
    }

})

