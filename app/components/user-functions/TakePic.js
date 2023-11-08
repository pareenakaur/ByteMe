import React, { useEffect, useRef, useState } from "react";
import { Text, View, StyleSheet, Linking, Image } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { Camera } from "expo-camera";
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaView } from "react-native-safe-area-context";

export default function TakePic(){
    let cameraRef = useRef();
    const [camAccess, setCamAccess] =  useState();
    const [mediaLib, setMediaLib] =  useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async() => {
            const camStatus = await Camera.requestCameraPermissionsAsync();
            const mediaStatus = await MediaLibrary.requestPermissionsAsync();
            setCamAccess(camStatus.status === "granted");
            setMediaLib(mediaStatus.status === "granted");
        })();
    }, []);
    
    if (camAccess === undefined){
        return <Text>Requesting Permission...</Text>
    }else if (!camAccess){
        return <Text>Permission for camera not granted. Grant access in your setting </Text>
    }

    const onCamPress = async() => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };
        let newPic = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPic);
    };

    if (photo){
        let retake = () => {
            setPhoto(undefined)
        };

        let confirm = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                //send the image back to the photo container in report/review form
                setPhoto(undefined);
                //navigate back to the form
            })
        };
        return (
            <SafeAreaView>
                <Image style={styles.preview} source={{uri: "data:image/jpg;base64," + photo.base64}}></Image>
                <View style={styles.buttonContainer}>
                    <Button onPress={retake}>Retake</Button>
                    <Button onPress={confirm}>Confirm</Button>
                </View> 
            </SafeAreaView>
        )

    }

    return(
        <Camera style={styles.cameraContainer} ref={cameraRef}> 
            <View style={styles.btn}>
                <IconButton icon={"circle"} size={70} iconColor="white" onPress={onCamPress} />
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex:1,
        justifyContent: "flex-end"
    },
    btn:{
        alignSelf:"center",
        bottom: 10,
    },
    preview:{
        flex: 1,
        alignSelf: "stretch"
    },
    buttonContainer: {
        flexDirection: "row",
        backgroundColor: "white"
    }
     
})