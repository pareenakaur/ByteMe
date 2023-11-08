import { StyleSheet, Text, View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker, Circle} from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { hawkerCentreLocations } from "./hawkerCentreLocations";
import { hawkerIcon } from "./assets/hawker_icon.png";
import data from "./hawkerCentreAvailability.json"
const hawkerUrl = "http://127.0.0.1:5000/hawkers"

// export default function Mappy(props) {
//   // const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [initialRegion, setInitialRegion] = useState(null);

//   useEffect(() => {
//     const getLocation = async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setCurrentLocation(location.coords);

//       setInitialRegion({
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.005,
//         longitudeDelta: 0.005,
//       });

//     };

//     getLocation();
//   }, []);

//   let text = "Waiting..";
//   if (errorMsg) {
//     text = errorMsg;
//     console.log(text);
//   } else if (currentLocation) {
//     text = JSON.stringify(currentLocation);
//     console.log(text);
//     console.log("initialRegion");
//     console.log(initialRegion);
//   }

//   return (
//     <MapView
//       provider={PROVIDER_GOOGLE}
//       style={styles.map}
//       region={props.region}
//       showsUserLocation={true}
//       // showsMyLocationButton={true}
//       // mapPadding={{top:300}}
//       // onRegionChange={(reg) => props.onRegionChange(reg)}
//       // initialRegion={initialRegion}
//       loadingEnabled={true}
//       loadingIndicatorColor="#FA4A0C"
//       minZoomLevel={props.zoom}
//     >
//       <Marker coordinate={props.region} />
//       {/* {console.log("region")}
//       {console.log(props.region)} */}
//       {hawkerCentreLocations.map((item, index) => (
//         <Marker
//           key={index}
//           title= {item.name}
//           description={item.address_street_name + ", Singapore " + item.address_postal_code}
//           pinColor="tan"
//           coordinate={{ latitude: item.latitude, longitude: item.longitude }}
//         >
//           {/* <Image
//             source={require("./assets/hawker_icon.png")}
//             style={{ width: 40, height: 40 }}
//             resizeMode="contain"
//           /> */}
//         </Marker>
//       ))}
//     </MapView>
//   );
// }

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//     ...StyleSheet.absoluteFillObject,
//     width: "100%",
//   },
// });

// import { StyleSheet, Text, View, Image } from "react-native";
// import MapView, {
//   PROVIDER_GOOGLE,
//   Polyline,
//   Marker,
//   Circle,
// } from "react-native-maps";
// // import MapViewDirections from "react-native-maps-directions";
// import { useState, useEffect } from "react";
// import * as Location from "expo-location";
// import { hawkerCentreLocations } from "./hawkerCentreLocations";
// import { hawkerIcon } from "./assets/hawker_icon.png";
// import data from "./hawkerCentreAvailability.json"

export default function Mappy(props) {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [availability, setAvailability] = useState(data);

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
    //Fetch data from API
    // async function getCrowdednessAll(url) {
    //   const response = await fetch(url);
    //   if (response.status != 200){
    //     throw new Error(`Error found: ${response.status}`);
    //   }
    //   const data = await response.json()
    //   console.log("availability: " + data);
    //   return data;
    // };

  //   getCrowdednessAll(myURL).then((data) => {
  //     console.log(data);
  //     setAvailability(data);
  // }).catch(err => console.log(err));

    getLocation();
  }, []);

  function decideColor(opacity) {
    if (opacity < 0.3) {
      return "rgba(255,0,0,0.35)";
    } else if (opacity >= 0.3 && opacity <= 0.6) {
      return "rgba(255,95,21,0.35)";
    } else {
      return "rgba(0,255,0,0.35)";
    }
  }

  function getCrowdedness(hawkerCentreName) {
    // console.log(hawkerCentreName)
    if (!availability.hasOwnProperty(hawkerCentreName)){
      hawkerCentreName = hawkerCentreName.substring(0,hawkerCentreName.length - 1);
    }

    let hawkerCentreData = availability[hawkerCentreName];
    if (typeof(hawkerCentreData) === "undefined") {
      return "rgba(0,0,0,0.25)"
    }

    let totalAvailableLots = 0;
    let totalLots = 0;
    // console.log(availability);
    // console.log(hawkerCentreData);
    hawkerCentreData.forEach((carpark) => {
      totalAvailableLots = totalAvailableLots + carpark["AvailableLots"];
      totalLots = totalLots + carpark["TotalLots"];
    });
    let capacity = totalAvailableLots / totalLots;
    return decideColor(capacity);
  }

  async function handleMarkerPress(item){
    // console.log("Marker pressed: " + props.region.latitude + " , " + props.region.longitude);
    loc_str = JSON.stringify(props.region, null ,4);
    console.log(loc_str)
    const response = await fetch("http://127.0.0.1:5000/hawkers/getHawkerCentreInfo?id=ChIJe4wL_OsZ2jERySoDk6jlhNQ");
    const res = await response.json();
    const formattedResponse = {'place_id': res["place_id"], 'name': item.name, 'address':item.address_street_name + ", Singapore " + item.address_postal_code, 'opening_hours': res["weekday_text"], 'rating': res["rating"], 'url':res["url"]}
    console.log(formattedResponse);
    props.userTap(true);
    return (formattedResponse)
  }

  function handleMapPress(){
    props.userTap(false);
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
      // onMarkerPress={handleMarkerPress}
      onRegionChange={handleMapPress}
    >
      <Marker coordinate={props.region} />
      {/* {console.log("region")}
      {console.log(props.region)} */}
      {hawkerCentreLocations.map((item, index) => (
        <Marker
          key={item.name}
          title={item.name}
          description={
            item.address_street_name + ", Singapore " + item.address_postal_code
          }
          style={{ opacity: 0 }}
          pinColor="tan"
          coordinate={{ latitude: item.latitude, longitude: item.longitude}}
          onPress={()=>{handleMarkerPress(item)}}
        ></Marker>
      ))}
      {hawkerCentreLocations.map((item, index) => (
        <Circle
          center={{ latitude: item.latitude, longitude: item.longitude }}
          radius={300}
          fillColor={getCrowdedness(item.name)}
          strokeColor="white"
          zIndex={99999}
        />
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
