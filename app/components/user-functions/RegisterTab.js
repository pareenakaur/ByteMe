import React, { useState } from "react";
import { ScrollView, StyleSheet, TextComponent, TouchableOpacity, View} from "react-native";
import { Text, TextInput, } from "react-native-paper";
import RegisterTextBox from "./RegisterTextBox";
import SubmitBtn from "./SubmitBtn";
import { emailValidator } from '../../utils/helpers/emailValidator';
import { passwordValidator } from '../../utils/helpers/passwordValidator';
import { nameValidator } from '../../utils/helpers/nameValidator';


export default function RegisterTab({navigation}){
    const [name, setName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        const nameError = nameValidator(name.value)
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError || nameError) {
            setName({ ...name, error: nameError })
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            return
        }
    }
    return(
        <ScrollView>
            <View style={styles.container}>
                <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Create An Account</Text>
                <RegisterTextBox 
                    label="Name"
                    returnKeyType="next"
                    value={name.value}
                    onChangeText={(text) => setName({ value: text, error: '' })}
                    error={!!name.error}
                    errorText={name.error}
                />
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
                
                <RegisterTextBox
                    label="Re-Enter Password"
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={(text) => setPassword({ value: text, error: '' })}
                    error={!!password.error}
                    errorText={password.error}
                    secureTextEntry
                />
                <SubmitBtn label={"Register"} onPress={onSignUpPressed} navigation={navigation} navigateTo={"TabNavigation"}/>
                <View style={styles.row}>
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.replace('LoginTab')}>
                    <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 325,
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
    },
    link: {
        fontWeight: "bold",
        color: "#FA4A0C"
    }
})