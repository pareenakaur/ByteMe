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
  const [vegetarianCheck, setVegeterianCheck] = useState("unchecked");
  const [minimumRatingInput, setMinimumRatingInput] = useState("");
  const [validMinimumRating, setValidMinimumRating] = useState(true);
  const [hawkerStalls, setHawkerStalls] = useState([]);
  const [hawkerCentreLocations, setHawkerCentreLocations] = useState([]);

  function getCoordsFromName(loc) {
    setRegion({
      latitude: loc.lat,
      longitude: loc.lng,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    });
  }

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

  async function getFilteredLocations (){

    minRating = parseInt(minimumRatingInput);
    const filtering = ((vegetarianCheck === "unchecked" && isNaN(minRating)) ? false : true);
    // console.log(`filtering: ${filtering}`)
    const veg_filter = (vegetarianCheck==="checked"? true : false);
    const rating_filter = (isNaN(minRating) ? 0 : minRating);

    if (filtering) {
      console.log(`http://127.0.0.1:5000/hawkers/getAllHawkerCentreInformation?filter=${filtering}&vegetarian=${veg_filter}&minrating=${rating_filter}`)
      const response = await fetch(`http://127.0.0.1:5000/hawkers/getAllHawkerCentreInformation?filter=${filtering}&vegetarian=${veg_filter}&minrating=${rating_filter}`);
      const res = await response.json();
      console.log(res);
      setHawkerCentreLocations(res);
    } 
    else{
      const response = await fetch(`http://127.0.0.1:5000/hawkers/getAllHawkerCentreInformation`);
      const res = await response.json();
      setHawkerCentreLocations(res);
    }
  }

  function handleSubmit() {
    console.log("submit clicked")
    hasErrors().then((message)=> {
      setValidMinimumRating(true);
      setFilterOn(false);
      console.log("valid rating: " + validMinimumRating);
      getFilteredLocations();
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
          <MapInput changeHawkerCentreInfo={props.setHawkerCentreInfo} userTap={props.userTap} setHawkerStalls={setHawkerStalls} notifyChange={(loc) => getCoordsFromName(loc)} />
        </View>
      </View>

      {region["latitude"] ? (
        <View style={{ flex: 1 }}>
          <Mappy
            region={region}
            // onRegionChange={(reg) => onMapRegionChange(reg)}
            zoom={props.zoom}
            userTap={props.userTap}
            setStallTap={props.setStallTap}
            changeHawkerCentreInfo = {props.setHawkerCentreInfo}
            changeHawkerStallInfo = {props.setHawkerStallInfo}
            changeCrowdedColor = {props.setCrowdedColor}
            hawkerStalls = {hawkerStalls}
            setHawkerStalls = {setHawkerStalls}
            hawkerCentreLocations = {hawkerCentreLocations}
            setHawkerCentreLocations = {setHawkerCentreLocations}
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
            changeRegion = {setRegion}
            zoom={props.zoom}
            userTap={props.userTap}
            setStallTap={props.setStallTap}
            changeHawkerCentreInfo = {props.setHawkerCentreInfo}
            changeHawkerStallInfo = {props.setHawkerStallInfo}
            changeCrowdedColor = {props.setCrowdedColor}
            hawkerStalls = {hawkerStalls}
            setHawkerStalls = {setHawkerStalls}
            hawkerCentreLocations = {hawkerCentreLocations}
            setHawkerCentreLocations = {setHawkerCentreLocations}
          />
        </View>
      )}
      
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
            <Text>Vegetarian</Text>
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
