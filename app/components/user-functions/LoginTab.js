import React, { useState } from "react";
import { Text, Image, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import RegisterTextBox from "./RegisterTextBox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, HelperText } from "react-native-paper";
import { emailVerifier } from "../../utils/helpers/emailVerifier";
import { passwordVerifier } from "../../utils/helpers/passwordVerifier";

export default function LoginTab({navigation}){
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const emailError = emailVerifier(email.value)
        const passwordError = passwordVerifier(email.value, password.value)
        
        if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
        }
        navigation.navigate("TabNavigation")
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.thumbnail} source={require('../../assets/thumbnail.png')}/>
            <View style={styles.container}>
            <ScrollView>
            <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Welcome Back!</Text>
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
                {email.error ? <HelperText type="error" padding='none'>{email.error}</HelperText> : null }

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
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10
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