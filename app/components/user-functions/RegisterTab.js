import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TextComponent, TouchableOpacity, View} from "react-native";
import { Button, HelperText, Text, TextInput, } from "react-native-paper";
import RegisterTextBox from "./RegisterTextBox";
import { emailValidator } from '../../utils/helpers/emailValidator';
import { passwordValidator } from '../../utils/helpers/passwordValidator';
import { nameValidator } from '../../utils/helpers/nameValidator';
import { passwordMatcher } from '../../utils/helpers/passwordMatcher';
import { SafeAreaView } from "react-native-safe-area-context";


export default function RegisterTab({navigation}){
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [password_, setPassword_] = useState({ value: '', error: '' })

    const onSignUpPressed = async() => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        const mismatchPassword = passwordMatcher(password.value, password_.value)
    
        if (emailError || passwordError || nameError || mismatchPassword) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPassword_({...password_, error: mismatchPassword})
            return
        }

        try {
            const requestOptions = { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ 
                    "username": name.value,
                    "email": email.value,
                    "password": password.value
                }) 
            };
            const response = await fetch('http://127.0.0.1:5000/user/register', requestOptions);
            const data = await response.json();
            console.log(data.result);
            if (data.result == "username Taken"){
                setName({...name, error: data.result});
                return
            }
            global.usrName = name.value
            navigation.navigate("TabNavigation")
        } catch (error) {
            console.error(error);
        }        
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.thumbnail} source={require('../../assets/thumbnail.png')}/>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Create An Account</Text>
                    <RegisterTextBox 
                        label="Name"
                        returnKeyType="next"
                        value={name.value}
                        onChangeText={(text) => setName({ value: text, error: '' })}
                        error={!!name.error}
                    />
                    {(name.error)? <HelperText type="error" padding='none'>{name.error}</HelperText> : null}


                    <RegisterTextBox
                        label="Email"
                        returnKeyType="next"
                        value={email.value}
                        onChangeText={(text) => setEmail({ value: text, error: '' })}
                        error={!!email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />
                    {email.error? <HelperText type="error" padding='none'>{email.error}</HelperText> : null}

                    <RegisterTextBox
                        label="Password"
                        returnKeyType="next"
                        value={password.value}
                        onChangeText={(text) => setPassword({ value: text, error: '' })}
                        error={!!password.error}
                        secureTextEntry
                    />
                    {password.error ? <HelperText type="error" padding='none'>{password.error}</HelperText>: null}
                    
                    <RegisterTextBox
                        label="Re-Enter Password"
                        returnKeyType="done"
                        value={password_.value}
                        onChangeText={(text) => setPassword_({ value: text, error: '' })}
                        error={!!password_.error}
                        secureTextEntry
                    />
                    {password_.error ? <HelperText type="error" padding='none'>{password_.error}</HelperText> : null }

                    <Button style={styles.button} labelStyle={styles.text} onPress={onSignUpPressed}>Register</Button>
                    
                    <View style={styles.row}>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.replace('LoginTab')}>
                            <Text style={styles.link}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 8,
        width: 325,
        alignSelf: "center",
        top: 30,
    },
    thumbnail: {
        flex: 3,
        width: "100%",
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
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