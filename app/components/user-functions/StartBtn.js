import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';

export default function StartBtn({style, navigation, ...props }) {
    return (
    <View style={styles.button}>
        <Button labelStyle={styles.text} onPress={() => navigation.navigate('RegisterLogin')} >Get Started Here!</Button>
    </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 325,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "white",
        elevation: 20,
        shadowColor: "black",
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FA4A0C',
    },
})