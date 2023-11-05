import React from "react";
import { Text, View, Image, StyleSheet, ScrollView } from "react-native";
import StartBtn from "../user-functions/StartBtn";
import { SafeAreaView } from "react-native-safe-area-context";


export default function FirstPage({ navigation }){
    return(
        <SafeAreaView style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/logo.png')}/>
                    </View>
                    <View style={{flex: 1, top:10, left: 25, justifyContent:"center"}}>
                        <Text style={{color: "white", fontWeight: "bold", fontSize: 45}}>FOOD FOR</Text>
                        <Text style={{color: "white", fontWeight: "bold",  fontSize: 45}}>SINGAPORE</Text>
                    </View>
                    <View style={styles.picContainer}>
                        <Image style={styles.food} source={require('../../assets/food.png')}/>
                        <Image style={styles.merlion} source={require('../../assets/merlion.png')}/>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <StartBtn navigation={ navigation }/>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF4B3A",
    },
    main:{
        flex:7,
    }, 
    logoContainer: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 25
    },
    picContainer: {
        flex: 7,
    },
    food: {
        top: 40,
        alignSelf: "center"
    },
    merlion: {
        flex: 1,
        alignSelf: "flex-end",
        top: 140,
        position: "absolute"
    },
    bottom: {
        flex: 1,
        alignItems: "center"
        // backgroundColor: "white"
    }
})