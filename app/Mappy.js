import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, Circle} from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
// import { hawkerCentreLocations } from "./hawkerCentreLocations";
// import { hawkerIcon } from "./assets/hawker_icon.png";
// import data from "./hawkerCentreAvailability.json"

export default function Mappy(props) {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  // const [availability, setAvailability] = useState(data);
  // const [hawkerStalls, setHawkerStalls] = useState([]);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    const getHawkerCentreLocations = async() => {
      const response = await fetch("http://127.0.0.1:5000/hawkers/getAllHawkerCentreInformation");
      const res = await response.json();
      props.setHawkerCentreLocations(res);
    }
    

    getLocation();
    getHawkerCentreLocations();
  }, []);

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

  async function handleMarkerPress(item){
   
    //Get info of hawker centre
    const response = await fetch(`http://127.0.0.1:5000/hawkers/getHawkerCentreInfo?id=${item.place_id}&format=1`);
    const res = await response.json();
    // console.log("Mappy, getHawkerCentreInfo")
    // console.log(res);
    const formattedResponse = {'place_id': item.place_id, 'name': item.name, 'address':item.formatted_address, 'opening_hours': res["opening_hours"], 'rating': res["user_rating"], 'review': res["user_review_count"], "tags": res["filter_tags"], "photo_reference": res["photo_data"][0]["photo_reference"]}
    // console.log(formattedResponse);
    props.userTap(true);
    props.changeHawkerCentreInfo(formattedResponse);
    props.changeCrowdedColor(decideColor(item.crowdedness));

    //Get stalls at hawker centre
    // console.log("mappy: "+resPlace);
    const responseStalls = await fetch(`http://127.0.0.1:5000/hawkers/getHawkerCentreStalls?id=${item.place_id}&format=1`);
    const resStalls = await responseStalls.json();
    props.setHawkerStalls(resStalls);
    props.setStallTap(false);
    

    return formattedResponse;
  }


  async function handleStallMarkerPress(item){
    // console.log(item);
    const response = await fetch("http://127.0.0.1:5000/hawkers/getStallInfo?id=" + item.place_id + "&format=1");
    const res = await response.json();
    // console.log(res);
    const formattedResponse = {'place_id': res["place_id"], 'name': res["name"], 'address':res["formatted_address"], 'opening_hours': res["opening_hours"], 'open_now': res["open_now"], 'rating': (res["user_rating"]==="User has no reviews"? res["google_rating"]: res["user_rating"]) , 'review': (res["user_review_count"]!==0? res["user_review_count"]: res["google_review_count"]), photo_reference: res["photo_data"][0]["photo_reference"], 'tags': res["filter_tags"]}
    // console.log("formatted_response: ")
    // console.log(formattedResponse);
    props.changeHawkerStallInfo(formattedResponse)
    props.setStallTap(true);
  }

  function handleMapPress(){
    props.userTap(false);
    // props.setStallTap(false);
    // (props.zoom<=10)?props.setStallTap(false):props.setStallTap(true);
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={props.region}
      showsUserLocation={true}
      loadingEnabled={true}
      loadingIndicatorColor="#FA4A0C"
      minZoomLevel={props.zoom}
      showsCompass={false}
      onRegionChange={handleMapPress}
    >
     
      {props.hawkerCentreLocations.map((item, index) => (
        <Marker
          key={item.name}
          title={item.name}
          description={
           item.formatted_address 
          }
          style={{ opacity: 0 }}
          coordinate={{ latitude: item.latitude, longitude: item.longitude}}
          onPress={()=>{handleMarkerPress(item)}}
        ></Marker>
      ))}
      {props.hawkerCentreLocations.map((item, index) => (
        <Circle
          key={item.name}
          center={{ latitude: item.latitude, longitude: item.longitude }}
          radius={300}
          fillColor={decideColor(item.crowdedness)}
          strokeColor="white"
          zIndex={99999}
        />
      ))}
      {(props.hawkerStalls.length !== 0)? 
        props.hawkerStalls.map((item, index) => (
           <Marker
            key={item.name}
            title={item.name}
            description={item.address}
            coordinate={{latitude: item.latitude, longitude: item.longitude}}
            onPress={()=>{handleStallMarkerPress(item)}}
          ></Marker>
         
        )) : null
      
      }
    </MapView>
  );
}



const styles = StyleSheet.create({
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
});
