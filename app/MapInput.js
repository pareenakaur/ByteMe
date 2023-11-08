import React, { View, Text, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const GOOGLE_APIKEY = "AIzaSyB1rVWeBKL1WRUVi7qdKLO9JbRRo5D6H_E" 

// function MapInput(props) {

//   return (
//     <GooglePlacesAutocomplete
//       placeholder="Enter starting location"
//       fetchDetails={true}
//       enablePoweredByContainer={false}
//       isRowScrollable={false}
//       autoFocus={true}
//       returnKeyType={"search"} // Can be left out for default return key
//       listViewDisplayed={false} // true/false/undefined
//       // keyboardShouldPersistTaps={"never"}
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(details.geometry.location)
//         props.notifyChange(details.geometry.location);
//       }}
//       query={{
//         key: GOOGLE_APIKEY, 
//         language: "en",
//         components: "country:sg",
//       }}
//       nearbyPlacesAPI="GooglePlacesSearch"
//       debounce={300}
//     />
//   );
// }
// export default MapInput;


// import React, { View, Text, useState } from "react";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// const GOOGLE_APIKEY = "AIzaSyB1rVWeBKL1WRUVi7qdKLO9JbRRo5D6H_E" 

function MapInput(props) {

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
        console.log(details)
        props.notifyChange(details.geometry.location);
        props.setHawkerCentreInfo(details)
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

