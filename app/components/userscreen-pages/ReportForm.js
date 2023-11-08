import React, { useState } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import CameraBtn from "../user-functions/CameraBtn";
import DropdownCat from "../user-functions/DropdwnCat";
import { SafeAreaView } from "react-native-safe-area-context";
import { descValidator } from "../../utils/helpers/descValidator";

export default function ReportForm({navigation}){
    const [myText, setText] = useState({value:'', error: ''});

    const onSubmitPressed = async() => {
        
        const textError = descValidator(myText.value)        
        if (textError) {
        setText({ ...myText, error: textError })
        return
        }
        navigation.navigate("TabNavigation");
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.topbar}>
                    <Text style={{paddingBottom: 8, color: "#FA4A0C", fontStyle: "italic", fontSize: 18}} onPress={() => navigation.navigate('Profile')}>return to main</Text>
                    <Text style={{color: "#3C4142",fontSize: 30, fontWeight: 'bold'}}>Create A New Report</Text>
                </View>
                <View style={styles.main}>
                    <DropdownCat />
                    <CameraBtn navigation={navigation}/>
                    <View style={styles.boxContainer}>
                        <Text style={{paddingBottom:5}}>Enter Report Description:</Text>
                        <TextInput 
                        mode={"outlined"}  
                        value={myText.value} 
                        onChangeText={(text) => setText({value: text, error: ''})}
                        outlineStyle={{borderColor: "#3C4142", borderRadius: 15, backgroundColor: "white", height: "relative"}}
                        placeholder="Type Here!"
                        placeholderTextColor={"grey"}
                        error={!!myText.error}></TextInput>
                    </View>
                    {myText.error ? <HelperText type="error" padding='none'>{myText.error}</HelperText> : null}
                    <Button style={styles.button} labelStyle={styles.text} onPress={onSubmitPressed}>Submit</Button>
                </View>                
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topbar: {
        flex: 2.5,
        justifyContent: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 30
    },
    container: {
        flex: 1,
        backgroundColor: "#F5F5F8"
    },
    main: {
        flex:12,
        alignItems:"center",
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    boxContainer:{
        width: 325,
        // backgroundColor: "white",
        paddingTop: 20
    },
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

