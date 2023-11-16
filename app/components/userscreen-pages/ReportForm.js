import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Button, HelperText, IconButton, TextInput } from "react-native-paper";
import DropdownCat from "../user-functions/DropdwnCat";
import { SafeAreaView } from "react-native-safe-area-context";
import { descValidator } from "../../utils/helpers/descValidator";
import { Camera } from "expo-camera";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

export default function ReportForm({ navigation , route}) {
  const firebaseConfig = {
    // ...
    apiKey: "AIzaSyA35CAAxfnVPCZuAmD44ic9AZG_TExU8dw",
    authDomain: "sgbytes.firebaseapp.com",
    projectId: "sgbytes",
    storageBucket: "sgbytes.appspot.com",
    messagingSenderId: "766295476965",
    appId: "1:766295476965:web:131a044224867bf452e20c",
    measurementId: "G-RWGZJLPD4G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage();

  const {centre, place} = route.params;
  console.log(centre["place_id"]);
  console.log(place["place_id"]);
  
  // const stall_id = "ChIJ7V2oIU892jERriBUTEBU-JE";
  const [myText, setText] = useState({ value: "", error: "" });
  const [imgUploaded, setImg] = useState(false);
  const cameraRef = useRef();
  const [photo, setPhoto] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCam] = useState(false);
  const [cat, setCat] = useState("");
  const [reportID, setReportID] = useState("");

  const onSubmitPressed = async () => {
    const textError = descValidator(myText.value);
    if (textError) {
      setText({ ...myText, error: textError });
      return;
    }
    console.log(JSON.stringify({
        "username": global.usrName,
        "centreID": centre["place_id"],
        "stallID": place["place_id"],
        "category": cat,
        "description": myText.value,
        "image": imgUploaded,
      }));
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "username": global.usrName,
          "centreID": centre["place_id"],
          "stallID": place["place_id"],
          "category": cat,
          "description": myText.value,
          "image": imgUploaded,
        }),
      };
      const response = await fetch(
        "http://127.0.0.1:5000/reports/createReport",
        requestOptions
      );
      const data = await response.json();
      // console.log(data.result);
      setReportID(data.result);
      if (data.result == "user has already reported the stall") {
        Alert.alert(
          "Sorry!",
          "You have already submitted one report. ONE user can only upload ONE report for each stall :)",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Profile", {centre: centre, place: place}), //back to explore or back to the stall page ?
              style: "cancel",
            },
          ]
        );
      } else if (data.result) {
        Alert.alert("Success!", "You submitted one report :)", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Profile", {centre: centre, place: place}), //back to explore or back to the stall page ?
            style: "cancel",
          },
        ]);

        if (photo) {
          const storageRef = ref(
            storage,
            "reports/" + place["place_id"] + "_" + data.result + ".jpg"
          );
          const response = await fetch(photo);
          const blob = await response.blob();
          const metadata = {
            contentType: "image.jpeg",
          };

          // Upload the file and metadata
          const uploadTask = uploadBytes(storageRef, blob, metadata);
          console.log("picture uploaded");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log("Photo state:", photo);
  }, [photo]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync();
      setPhoto(uri);
      setImg(true);
      setShowCam(false);
    }
  };

  const retakePicture = () => {
    setPhoto(null);
    setImg(false);
    setShowCam(true);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showCamera ? (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ratio="16:9"
          ref={cameraRef}
        >
          <View style={styles.takePicContainer}>
            <IconButton
              icon={"circle"}
              size={70}
              iconColor="white"
              onPress={takePicture}
            />
          </View>
        </Camera>
      ) : (
        <ScrollView>
          {/* <View flex={1}> */}
          <View style={styles.topbar}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile", {centre: centre, place: place})}>
              <Text
                style={{
                  paddingBottom: 8,
                  color: "#FA4A0C",
                  fontStyle: "italic",
                  fontSize: 18,
                }}
              >
                return to main
              </Text>
            </TouchableOpacity>
            <Text
              style={{ color: "#3C4142", fontSize: 30, fontWeight: "bold" }}
            >
              Create A New Report
            </Text>
          </View>

          <View style={styles.main}>
            {!photo ? (
              <View style={styles.cameraContainer}>
                <IconButton
                  icon="camera"
                  size={30}
                  onPress={() => setShowCam(true)}
                ></IconButton>
                <Text>Take A Picture!</Text>
              </View>
            ) : (
              <View style={styles.imageContainer}>
                {Platform.OS === "web" ? (
                  <Image source={{ uri: photo }} style={styles.image} />
                ) : (
                  <Image
                    source={{ uri: "file://" + photo }}
                    style={styles.image}
                  />
                )}
                <TouchableOpacity onPress={retakePicture}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#FA4A0C",
                      fontWeight: "bold",
                    }}
                  >
                    Retake
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.boxContainer}>
              <DropdownCat
                setCatInReport={(cat) => {
                  setCat(cat);
                }}
              />
              <Text style={{ paddingBottom: 5 }}>
                Enter Report Description:
              </Text>
              <TextInput
                mode={"outlined"}
                value={myText.value}
                onChangeText={(text) => setText({ value: text, error: "" })}
                outlineStyle={{
                  borderColor: "#3C4142",
                  borderRadius: 15,
                  backgroundColor: "white",
                  height: "relative",
                }}
                placeholder="Type Here!"
                placeholderTextColor={"grey"}
                error={!!myText.error}
              ></TextInput>
            </View>
            {myText.error ? (
              <HelperText type="error" padding="none">
                {myText.error}
              </HelperText>
            ) : null}
            <Button
              style={styles.button}
              labelStyle={styles.text}
              onPress={onSubmitPressed}
            >
              Submit
            </Button>
          </View>
          {/* </View> } */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topbar: {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  takePicContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  main: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 325,
    height: 300,
    marginBottom: 10,
  },
  boxContainer: {
    width: 325,
    paddingTop: 20,
  },
  button: {
    width: 325,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FA4A0C",
    marginVertical: 20,
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
    marginVertical: 10,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});
