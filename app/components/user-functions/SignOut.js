import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';

export default function SignOut({style, navigation }) {
    return (
    <TouchableOpacity style={styles.button}>
        <Button labelStyle={styles.text} onPress={() => navigation.navigate('FirstPage')}>Sign Out</Button>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#FA4A0C",
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
})