import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Card, Text, Chip, Button, IconButton, PaperProvider } from "react-native-paper";
import { useState } from "react";
import MapContainer from "../../MapContainer";
import HawkerCentreCard from "./HawkerCentreCard";
import HawkerStallCard from "./HawkerStallCard";
import { SafeAreaView } from 'react-native-safe-area-context';
//Adam postal code: 289876

const ExplorePage = ({ navigation }) => {
  const [tap, setTap] = useState(false);
  const [hawkerCentreInfo, setHawkerCentreInfo] = useState('{}');
  const [hawkerStallInfo, setHawkerStallInfo] = useState('{}');

  return (
    
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.3 }}>
          <MapContainer setHawkerCentreInfo={setHawkerCentreInfo} zoom ={tap? 15:0} userTap={setTap}/>
        </View>
        {tap ? <HawkerStallCard navigation={navigation}/>:<HawkerCentreCard navigation={navigation}/>}
      </View>
   
  );
}

export default ExplorePage;

const styles = StyleSheet.create({});
