import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { IconButton } from "react-native-paper";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';

export default function CameraBtn({navigation}){
    return(
        <View style={styles.cameraContainer}>
            <IconButton icon="camera" size={30} onPress={()=> {navigation.navigate("TakePic")}}></IconButton>
            <Text>Take A Picture!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        width: 325,
        height: 200,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#3C4142",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    }
})