import React from 'react'
import { Text, View, StyleSheet } from "react-native";
import { Button } from 'react-native-paper';

export default function StartBtn({ navigation }) {
    return (
    <Button style={styles.button} labelStyle={styles.text} onPress={() => navigation.navigate('LoginTab')}>Get Started Here!
    </Button>
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