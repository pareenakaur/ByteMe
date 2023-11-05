import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, IconButton } from 'react-native-paper';

export default function ProfileBtn({label,style }) {
    return (
    <View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>{label}</Text>
            <IconButton icon={"chevron-right"}></IconButton>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: 20
    },
    text: {
        // fontWeight: 'bold',
        flex:1,
        fontSize: 18,
        color: 'black',
        // alignSelf: "left"
    },
  })