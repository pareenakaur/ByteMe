import React, { useState } from "react";
import { Text, Image, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import RegisterTextBox from "./RegisterTextBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText } from "react-native-paper";
import { nameValidator } from "../../utils/helpers/nameValidator";
import { passwordValidator } from "../../utils/helpers/passwordValidator";

export default function LoginTab({navigation}){
    const [name, setName] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = async() => {
        
        const nameError = nameValidator(name.value)
        const passwordError = passwordValidator(password.value)
        
        //frontend checking
        if (nameError || passwordError) {
        setName({ ...name, error: nameError })
        setPassword({ ...password, error: passwordError })
        return
        }
        //backend checking
        try {
            const requestOptions = { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    "username": name.value,
                    "password": password.value
                })
            };
            const response = await fetch('http://127.0.0.1:5000/user/login', requestOptions);
            const data = await response.json();
            console.log(data.result);
            if (data.result == "Invalid username"){
                setName({...name, error: data.result});
                return
            }else if (data.result == "Wrong password"){
                setPassword({...password, error: data.result});
                return
            }
            global.usrName = name.value
            navigation.navigate("TabNavigation")
        } catch (error) {
            console.error(error);
        }
        // navigation.navigate("TabNavigation")
    }

    
    return(
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.thumbnail} source={require('../../assets/thumbnail.png')}/>
            <View style={styles.container}>
            <ScrollView>
            <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Welcome Back!</Text>
                <RegisterTextBox
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                />
                {name.error ? <HelperText type="error" padding='none'>{name.error}</HelperText> : null }

                <RegisterTextBox
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    secureTextEntry
                />
                {password.error ? <HelperText type="error" padding='none'>{password.error}</HelperText> : null }

                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('ResetPassword')}
                    >
                    <Text style={{color: "grey"}}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <Button style={styles.button} labelStyle={styles.text} onPress={onLoginPressed}>Login</Button>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('RegisterTab')}>
                        <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 8,
        width: 325,
        alignSelf: "center", 
        top: 30
    },
    thumbnail: {
        flex: 3,
        width: "100%",
    }, 
    forgotPassword: {
        alignSelf: "flex-end",
    },
    row: {
        flexDirection: "row",
        alignSelf: "center"
    },
    link: {
        fontWeight: "bold",
        color: "#FA4A0C"
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
    }
})