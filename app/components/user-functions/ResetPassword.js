import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, TextComponent, TouchableOpacity, View} from "react-native";
import { Button, HelperText, IconButton, Text, TextInput, } from "react-native-paper";
import RegisterTextBox from "./RegisterTextBox";
import { passwordValidator } from '../../utils/helpers/passwordValidator';
import { passwordMatcher } from '../../utils/helpers/passwordMatcher';
import { SafeAreaView } from "react-native-safe-area-context";
import { emailVerifier } from "../../utils/helpers/emailVerifier";


export default function ResetPassword({navigation}){
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [password_, setPassword_] = useState({ value: '', error: '' })

    const onSubmitPressed = () => {
        const emailError = emailVerifier(email.value)
        const passwordError = passwordValidator(password.value)
        const mismatchPassword = passwordMatcher(password.value, password_.value)
    
        if (emailError || passwordError || mismatchPassword) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setPassword_({...password_, error: mismatchPassword})
            return
        }
        //send api to update the new password
        navigation.navigate("LoginTab")
       
    }
    return(
        <SafeAreaView style={{flex:1}}>
            <Image style={styles.thumbnail} source={require('../../assets/thumbnail.png')}/>
            <View style={{justifyContent: "flex-end"}}>
                <IconButton icon={"chevron-left-box"} iconColor="black" size={35} onPress={()=>navigation.navigate("LoginTab")} style={{position: "absolute", justifyContent: "center"}} ></IconButton>
            </View>
            <View style={styles.container}>
                <ScrollView>
                    <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Reset Password</Text>
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

                    <Button style={styles.button} labelStyle={styles.text} onPress={onSubmitPressed}>Submit</Button>
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