import React, { isValidElement } from "react";
import { Text, View, PermissionsAndroid, StyleSheet } from "react-native";
import MapInput from "./MapInput";
import Mappy from "./Mappy";
import {
  getLocation,
  geocodeLocationByName,
} from "./utils/services/location-service";
// import Geolocation from "react-native-geolocation-service";
import { useState, useEffect } from "react";
// import * as Location from 'expo-location';
import {
  IconButton,
  Checkbox,
  Modal,
  Portal,
  TextInput,
  HelperText,
  Button,
} from "react-native-paper";

export default function MapContainer(props) {
  const [region, setRegion] = useState({});
  const [filterOn, setFilterOn] = useState(false);
  const [halalCheck, setHalalCheck] = useState("unchecked");
  const [vegetarianCheck, setVegeterianCheck] = useState("unchecked");
  const [minimumRatingInput, setMinimumRatingInput] = useState("");
  const [validMinimumRating, setValidMinimumRating] = useState(true);

  useEffect(() => {
    // getInitialState();
    // (async () => {
    //   let { status } = await Location.requestForegroundPermissionsAsync();
    //   if (status !== "granted") {
    //     setErrorMsg("Permission to access location was denied");
    //     return;
    //   }
    //   let location = await Location.getCurrentPositionAsync({});
    //   setRegion(location);
    // })();
  }, []);

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "TrailGlide Location Permission",
  //         message:
  //           "TrailGlide needs access to your location " +
  //           "for our app to function optimally.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location");
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // function getInitialState() {
  //   requestLocationPermission();
  //   getLocation()
  //     .then((data) => {
  //       console.log(data);
  //       setRegion({
  //         latitude: data.latitude,
  //         longitude: data.longitude,
  //         latitudeDelta: 0.003,
  //         longitudeDelta: 0.003,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("API call error");
  //       alert(error.message);
  //     });
  // }

  function getCoordsFromName(loc) {
    setRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
    props.getRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  }

  // function onMapRegionChange(region) {
  //   setRegion({ region });
  // }

  //For customr navigate button
  // function getCurrentLocation() {
  //   console.log("Renavigate map to current location");
  // }

  const showModal = () => setFilterOn(true);
  const hideModal = () => setFilterOn(false);
  //Todo: Change to async function
  function hasErrors() {
    return new Promise((resolve,reject) => {
      let minimumValue = parseInt(minimumRatingInput);
      // console.log(minimumValue);
      // console.log(typeof(minimumValue));
      if (minimumValue < 1 || minimumValue > 5) {
        reject(false);
      } else {
        resolve(true);
      }
      console.log("valid min rating is "+ validMinimumRating);
      resolve("Valid minimum rating is succesfully updated!")
    });
  }

  function handleSubmit() {
    console.log("submit clicked")
    hasErrors().then((message)=> {
      setValidMinimumRating(true);
      setFilterOn(false);
      console.log("valid rating:" +validMinimumRating);
    }).catch((error) => {
      setValidMinimumRating(false);
    })
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: "absolute",
          marginTop: 5,
          width: "90%",
          zIndex: 9999,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginRight: 30,
          }}
        >
          <IconButton
            icon="filter"
            iconColor="#FA4A0C"
            size={30}
            onPress={showModal}
          />
          <MapInput notifyChange={(loc) => getCoordsFromName(loc)} />
        </View>
      </View>

      {region["latitude"] ? (
        <View style={{ flex: 1 }}>
          <Mappy
            region={region}
            // onRegionChange={(reg) => onMapRegionChange(reg)}
            zoom={props.zoom}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Mappy
            region={{
              latitude: 1.36837,
              longitude: 103.81101,
              latitudeDelta: 0.2,
              longitudeDelta: 0.35,
            }}
            // onRegionChange={(reg) => onMapRegionChange(reg)}
            zoom={props.zoom}
          />
        </View>
      )}
      {/* <IconButton
        style={{ position: "absolute", margin: 10, bottom: 0, left: 0 }}
        mode="contained"
        icon="crosshairs-gps"
        iconColor="#FA4A0C"
        size={30}
        onPress={getCurrentLocation}
      /> */}
      <Portal>
        <Modal
          visible={filterOn}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <Text style={{ marginBottom: 10 }}>
            Please select desired checkboxes to enable filtering.
          </Text>
          <View style={styles.checkboxContainer}>
            <Text> Halal</Text>
            <Checkbox
              status={halalCheck}
              color="#FA4A0C"
              onPress={() => {
                setHalalCheck(
                  halalCheck == "checked" ? "unchecked" : "checked"
                );
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text>Vegeterian</Text>
            <Checkbox
              status={vegetarianCheck}
              color="#FA4A0C"
              onPress={() => {
                setVegeterianCheck(
                  vegetarianCheck == "checked" ? "unchecked" : "checked"
                );
              }}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={{ marginRight: 10 }}>Minimum Rating</Text>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              <TextInput
                mode="outlined"
                label="Only 1 - 5"
                value={minimumRatingInput}
                onChangeText={(minimumRatingInput) => {
                  setMinimumRatingInput(minimumRatingInput);
                }}
                keyboardType="number-pad"
                maxLength={1}
              />
              {validMinimumRating ? null : (
                <HelperText type="error" visible={true}>
                  Only enter numbers betweens 1-5
                </HelperText>
              )}
            </View>
          </View>
          <Button
            style={styles.submitButton}
            mode="elevated"
            dark={true}
            buttonColor="#FA4A0C"
            onPress={handleSubmit}
          >
            Submit
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 30,
    justifyContent: "center",
  },
  submitButton: {
    marginTop: 30,
  },
});
