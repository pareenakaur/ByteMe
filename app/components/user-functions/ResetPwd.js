import React, { useState } from "react";
import {Text, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-view";
import RegisterTextBox from "./RegisterTextBox";
import { emailValidator } from "../../utils/helpers/emailValidator";
import SubmitBtn from "./SubmitBtn";
import { Button, Modal, PaperProvider, Portal } from "react-native-paper";

export default function ResetPwd(){
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
        setEmail({ ...email, error: emailError })
        return
        }
        // navigation.navigate('LoginScreen')
    }
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    return(
        <SafeAreaView>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.container}>
                    <Text style={{fontSize:30, fontWeight: "bold", alignSelf: "center", paddingBottom: 10, color: "#3C4142"}}>Reset Password</Text>
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
                        description="You will receive email with password reset link."
                    />
                    <SubmitBtn label={"Send Email"}/>
                </Modal>
            </Portal>
            <Button onPress={showModal}>Show</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 350,
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 20

    }
})