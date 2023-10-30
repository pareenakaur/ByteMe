import React, { useState } from "react";
import { Text, View, StyleSheet, BackHandler } from "react-native";
import { TextInput } from "react-native-paper";

export default function TextBox({name}){
    const [myText, setText] = useState("");
    return (
        <View style={styles.container}>
            <Text style={{paddingBottom:5}}>Enter {name} Description:</Text>
            <TextInput 
            mode={"outlined"} 
            // label={"Enter Review Description:"} 
            value={myText} 
            onChangeText={myText => setText(myText)}
            // multiline={true} 
            outlineStyle={{borderColor: "#3C4142", borderRadius: 15, backgroundColor: "white", height: "relative"}}
            placeholder="Type Here!"
            placeholderTextColor={"grey"}
            error={myText.length>5}></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 325,
        // backgroundColor: "white",
        paddingVertical: 20
    },
    error: {
        backgroundColor: "red"
    }
})