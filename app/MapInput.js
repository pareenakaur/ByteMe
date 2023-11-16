import React, { View, Text, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const GOOGLE_APIKEY = "AIzaSyB1rVWeBKL1WRUVi7qdKLO9JbRRo5D6H_E" 

function MapInput(props) {

  function decideColor(capacity) {
      if (capacity === "not available"){
        return "rgba(0,0,0,0.15)"
      } else if (capacity < 0.3) {
        return "rgba(255,0,0,0.15)";
      } else if (capacity >= 0.3 && capacity <= 0.6) {
        return"rgba(255,95,21,0.15)";
      } else {
        return "rgba(0,255,0,0.15)";
      }
    }

  async function handleInput(place_id){
    console.log("map input: " + place_id);
    //Get info of hawker centre
    const response = await fetch(`http://127.0.0.1:5000/hawkers/getHawkerCentreInfo?id=${place_id}&format=1`);
    const res = await response.json();
    console.log(res);
    // const formattedResponse = {'place_id': res["place_id"], 'name': res["name"], 'address':res["formatted_address"], 'opening_hours': "placeholder", 'rating': res["rating"], 'url':res["url"]}
    const formattedResponse = {'place_id': res["place_id"], 'name': res["name"], 'address':res["formatted_address"], 'opening_hours': res["opening_hours"], 'rating': res["user_rating"], 'review': res["user_review_count"], "tags": res["filter_tags"], "photo_reference": res["photo_data"][0]["photo_reference"]}
    // console.log(formattedResponse);
    props.userTap(true);
    props.changeHawkerCentreInfo(formattedResponse);
    props.changeCrowdedColor(decideColor(res["crowdedness"]));

    //Get stalls at hawker centre
    const responseStalls = await fetch(`http://127.0.0.1:5000/hawkers/getHawkerCentreStalls?id=${place_id}&format=1`);
    const resStalls = await responseStalls.json();
    props.setHawkerStalls(resStalls);
    props.setStallTap(false);

    return formattedResponse;
  }

  return (
    <GooglePlacesAutocomplete
      placeholder="Enter starting location"
      fetchDetails={true}
      enablePoweredByContainer={false}
      isRowScrollable={false}
      autoFocus={true}
      returnKeyType={"search"} // Can be left out for default return key
      listViewDisplayed={false} // true/false/undefined
      // keyboardShouldPersistTaps={"never"}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data["place_id"])
        handleInput(data["place_id"])
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key:  GOOGLE_APIKEY,
        language: "en",
        components: "country:sg",
      }}
      nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
    />
  );
}
export default MapInput;

