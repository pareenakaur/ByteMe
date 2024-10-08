import {GOOGLE_API_KEY} from '@env';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from 'react';

import {
  Card,
  Text,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "react-native-paper";
import StarRating from "../hawker-stall-profile/StarRating";

export default function HawkerCentreCard({hawkerCentreInfo,  setHawkerCentreInfo, setHawkerStallInfo, navigation, crowdedColor}) {

  function decideCrowdedText(crowdedColor){
    if (crowdedColor == "rgba(255,0,0,0.15)"){
      return "Severe Crowd";
    } else if (crowdedColor == "rgba(255,95,21,0.15)"){
      return "Moderate Crowd";
    } else if (crowdedColor == "rgba(0,255,0,0.15)"){
      return "Low Crowd";
    } else {
      return "Untracked";
    }
  }

  function getDay(){
    const d = new Date();
    let day = d.getDay();
    return (day+6)%7;
  }

  function handleClose(){
    setHawkerCentreInfo(null);
    setHawkerStallInfo(null);
  }


  return (
    <Card style={styles.container}>
      <Card.Cover
        style={{
          height: "30%",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={{
          uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${hawkerCentreInfo.photo_reference}&key=${GOOGLE_API_KEY.replace('"', '')}`
        }}
      />
      <View
        style={{
          position: "absolute",
          width: "100%",
          zIndex: 9999,
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <IconButton
          style={{}}
          icon="window-close"
          mode="contained-tonal"
          iconColor="#FA4A0C"
          size={25}
          onPress={handleClose} 
        ></IconButton>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Card.Content style={{ flex: 1.6 }}>
          <Text variant="titleSmall" style={{fontWeight: "bold" }}>
            {hawkerCentreInfo["name"]}
          </Text>
          <Text variant="bodySmall" style={{ color: "#FA4A0C" }}>
            {hawkerCentreInfo["address"]}
          </Text>
          <Text variant="bodySmall" style={{}}>
            {hawkerCentreInfo["opening_hours"][getDay()]}
          </Text>
        </Card.Content>
        {/* Crowd Indicator */}
        <Card.Actions style={{ flex: 1.2, flexDirection: "column" }}>
          <Button
            mode="contained"
            buttonColor = {crowdedColor}
            textColor="#000000"
            compact={true}
            labelStyle={{ fontSize: 12 , fontWeight: "bold"}}
          >
            {decideCrowdedText(crowdedColor)}
          </Button>
        </Card.Actions>
      </View>
      {/* Category tags */}
      <Card style={{ margin: 5,}}>
        <Card.Content style={styles.labelContainer}>
          <View style={styles.foodOptionsContainer}>
            <Text
              variant="titleMedium"
              style={{fontSize:18, color: "black", marginBottom: 5 }}
            >
              Food Options Available
            </Text>
            <View style={styles.foodOptionsChip}>
              <Tooltip title="Halal">
                <Chip size="small" style={styles.icon} icon="food-halal">
                  Halal
                </Chip>
              </Tooltip>
              {hawkerCentreInfo["tags"]["vegetarian"]!=="not available"?
                <Tooltip title="Vegetarian">
                  <Chip style={styles.icon} icon="leaf">
                    Vegetarian
                  </Chip>
                </Tooltip>:null
              }
              
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <StarRating rating={hawkerCentreInfo["rating"]} size={18} />
            <Text style={styles.reviewsText}>{hawkerCentreInfo["review"]} Reviews</Text>
          </View>
        </Card.Content>
      </Card>
      <Card.Content
        style={{
          marginVertical: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate('MainPage', {hawkerCentre: hawkerCentreInfo})}>
          <Text
            style={{
              color: "#787878",
              textDecorationLine: "underline",
              marginHorizontal: 10 }}
          >
            Too crowded? Find alternative hawker centres!
          </Text>
        </TouchableOpacity>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  icon: {
    backgroundColor: "#FCC827",
    justifyContent: "center",
    width:"100%",
    // marginHorizontal:5,
  },
  labelContainer: {
    backgroundColor: "#F4F4F8",
    // borderColor: "red",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    padding:0,
  },
  foodOptionsContainer: {
    flex: 2,
    justifyContent:"center",
  },
  foodOptionsChip: {
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 5,
    
  },
  ratingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewsText: {
    color: "#EB6C05",
    fontSize: 16,
    fontWeight: "bold",
  },
});
