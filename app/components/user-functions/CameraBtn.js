import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function CameraBtn(){
    return(
        <View style={styles.cameraContainer}>
            <IconButton icon="camera" size={30}></IconButton>
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