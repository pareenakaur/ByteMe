import React from "react";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import MapContainer from "../../MapContainer";
import HawkerCentreCard from "./HawkerCentreCard";
import HawkerStallCard from "./HawkerStallCard";
import { SafeAreaView } from 'react-native-safe-area-context';

const ExplorePage = ({ navigation }) => {
  const [tap, setTap] = useState(false);
  const [stallTap, setStallTap] = useState(false);
  const [hawkerCentreInfo, setHawkerCentreInfo] = useState(null);
  const [hawkerStallInfo, setHawkerStallInfo] = useState(null);
  const [crowdedColor, setCrowdedColor]= useState("rgba(0,0,0,0.25)");

  return (
    
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1.5 }}>
          <MapContainer setCrowdedColor={setCrowdedColor} setHawkerCentreInfo={setHawkerCentreInfo} setHawkerStallInfo={setHawkerStallInfo} zoom ={tap? 20:0} userTap={setTap} setStallTap={setStallTap}/>
        </View>
        {(!!hawkerCentreInfo || !!hawkerStallInfo)?
            stallTap ? <HawkerStallCard hawkerCentreInfo={hawkerCentreInfo} hawkerStallInfo={hawkerStallInfo} navigation={navigation} />:<HawkerCentreCard hawkerCentreInfo={hawkerCentreInfo} setHawkerCentreInfo={setHawkerCentreInfo} setHawkerStallInfo={setHawkerStallInfo} navigation={navigation} crowdedColor={crowdedColor} />
            : null
         }
       
      </SafeAreaView>
   
  );
}

export default ExplorePage;

const styles = StyleSheet.create({});
