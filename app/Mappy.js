import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { hawkerCentreLocations } from "./hawkerCentreLocations";
import { hawkerIcon } from "./assets/hawker_icon.png";

export default function Mappy(props) {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

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

    getLocation();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.log(text);
  } else if (currentLocation) {
    text = JSON.stringify(currentLocation);
    console.log(text);
    console.log("initialRegion");
    console.log(initialRegion);
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={props.region}
      showsUserLocation={true}
      // showsMyLocationButton={true}
      // mapPadding={{top:300}}
      // onRegionChange={(reg) => props.onRegionChange(reg)}
      // initialRegion={initialRegion}
      loadingEnabled={true}
      loadingIndicatorColor="#FA4A0C"
      minZoomLevel={props.zoom}
    >
      <Marker coordinate={props.region} />
      {/* {console.log("region")}
      {console.log(props.region)} */}
      {hawkerCentreLocations.map((item, index) => (
        <Marker
          key={index}
          title= {item.name}
          description={item.address_street_name + ", Singapore " + item.address_postal_code}
          pinColor="tan"
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
        >
          {/* <Image
            source={require("./assets/hawker_icon.png")}
            style={{ width: 40, height: 40 }}
            resizeMode="contain"
          /> */}
        </Marker>
      ))}
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
