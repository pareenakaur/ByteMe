import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import RegisterTextBox from "./RegisterTextBox";
import SubmitBtn from "./SubmitBtn";
import { emailValidator } from '../../utils/helpers/emailValidator'
import { passwordValidator } from '../../utils/helpers/passwordValidator'
import ResetPwd from "./ResetPwd";

export default function LoginTab({navigation}){
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
        setEmail({ ...email, error: emailError })
        setPassword({ ...password, error: passwordError })
        return
        }
    }
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Welcome Back!</Text>
                <RegisterTextBox
                    label="Email"
                    returnKeyType="next"
                    value={email.value}
                    onChangeText={(text) => setEmail({ value: text, error: '' })}
                    error={!!email.error}
                    errorText={email.error}
                    autoCapitalize="none"
                    autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />
                <RegisterTextBox
                    label="Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <View style={styles.forgotPassword}>
                    <TouchableOpacity
                    // onPress={() => navigation.navigate('ResetPasswordScreen')}
                    >
                    <Text style={{color: "grey"}}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <SubmitBtn label={"Login"} onPress={onLoginPressed} navigation={navigation} navigateTo={"TabNavigation"}/>
                <View style={styles.row}>
                    <Text>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('RegisterTab')}>
                    <Text style={styles.link}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 325,
        alignSelf: "center"
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
    }

})