import React from 'react'
import { Text, View, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { Button } from 'react-native-paper';

export default function SubmitBtn({label, navigation, navigateTo}) {
    return (
    <Button style={styles.button} labelStyle={styles.text} onPress={() => navigation.navigate(navigateTo)}>{label}</Button>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 325,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: "#FA4A0C",
        marginVertical: 20
    },
    text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'white',
    },
})