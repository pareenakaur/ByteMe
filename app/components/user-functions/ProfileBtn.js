import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, IconButton } from 'react-native-paper';

export default function ProfileBtn({label, navigation, navigateTo}) {
    return (
    <View>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(navigateTo)}>
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
        flex:1,
        fontSize: 18,
        color: 'black',
    },
  })