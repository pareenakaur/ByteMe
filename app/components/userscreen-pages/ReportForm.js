import React, { useEffect, useRef, useState } from "react";
import { Text, Image, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Button, HelperText, IconButton, TextInput } from "react-native-paper";
import DropdownCat from "../user-functions/DropdwnCat";
import { SafeAreaView } from "react-native-safe-area-context";
import { descValidator } from "../../utils/helpers/descValidator";
import { Camera } from "expo-camera";
// import * as FileSystem from 'expo-file-system';

export default function ReportForm({navigation}){
    const [myText, setText] = useState({value:'', error: ''});

    const onSubmitPressed = () => {
        
        const textError = descValidator(myText.value)        
        if (textError) {
        setText({ ...myText, error: textError })
        return
        }
        navigation.navigate("TabNavigation");
    }

    const cameraRef = useRef();
    const [photo, setPhoto] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [showCamera, setShowCam] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        console.log('Photo state:', photo);
    }, [photo]);

    const takePicture = async () => {
        if (cameraRef.current) {
        const { uri } = await cameraRef.current.takePictureAsync();
        setPhoto(uri);
        setShowCam(false);
        }
    };

    const retakePicture = () => {
        setPhoto(null);
        setShowCam(true)
    };

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    return (
        <SafeAreaView style={{flex:1}}>
            {showCamera ?
            <Camera style={{ flex: 1, width: '100%' }} type={Camera.Constants.Type.back} ratio="16:9" ref={cameraRef}>
                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <IconButton icon={"circle"} size={70} iconColor="white" onPress={takePicture} />
                </View>
            </Camera> : 
            <ScrollView>
            <View style={styles.topbar}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text style={{paddingBottom: 8, color: "#FA4A0C", fontStyle: "italic", fontSize: 18}}>return to main</Text>
                </TouchableOpacity>
                <Text style={{color: "#3C4142",fontSize: 30, fontWeight: 'bold'}}>Create A New Report</Text>
            </View>
            <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center'}}>  
                <DropdownCat />
                {!photo? 
                    <View style={styles.cameraContainer}>
                        <IconButton icon="camera" size={30} onPress={() => setShowCam(true)}></IconButton>
                        <Text>Take A Picture!</Text>
                    </View> : 
                    <View style={{ flex: 1, justifyContent: "flex-start", alignItems: 'center' }}>
                        {Platform.OS === 'web' ? (
                            <Image source={{ uri: photo }} style={{ width: 325, height: 300, marginBottom: 10 }} />
                        ) : (
                            <Image source={{ uri: 'file://' + photo }} style={{ width: 325, height: 300, marginBottom: 10 }} />
                        )}
                        <TouchableOpacity onPress={retakePicture}>
                            <Text style={{ fontSize: 20, color: '#FA4A0C', fontWeight: "bold" }}>Retake</Text>
                        </TouchableOpacity>
                    </View>
                }
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
            </ScrollView> }
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    topbar: {
        flex: 1,
        justifyContent: "space-evenly",
        // backgroundColor: "orange",
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
    cameraContainer: {
        width: 325,
        height: 300,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#3C4142",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#fff",
        marginVertical: 10
    }
})

