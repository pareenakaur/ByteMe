import { Dimensions, StyleSheet, View, ScrollView } from "react-native";
import React from 'react';

import {
  Card,
  Text,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "react-native-paper";
import { useState } from "react";
import StarRating from "../hawker-stall-profile/StarRating";

export default function HawkerCentreCard({navigation}) {
  return (
    <Card style={styles.container}>
      <Card.Cover
        style={{
          height: "30%",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={{
          uri: "https://static.wixstatic.com/media/4b5db5_f643d7fcce58409b92b4ff7497c2ff48~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85/4b5db5_f643d7fcce58409b92b4ff7497c2ff48~mv2.jpg",
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
          icon="arrow-right-thick"
          mode="contained-tonal"
          iconColor="#FA4A0C"
          size={25}
          onPress={() => navigation.navigate('Profile')} //for now
        ></IconButton>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Card.Content style={{ flex: 1.5 }}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Adam Road Food Centre
          </Text>
          <Text variant="bodySmall" style={{ color: "#FA4A0C" }}>
            2 Adam Rd, Singapore 289876
          </Text>
          <Text variant="bodySmall">Opening Hours: 6am - 3am</Text>
        </Card.Content>
        {/* Crowd Indicator */}
        <Card.Actions style={{ flex: 1.2, flexDirection: "column" }}>
          <Button
            mode="contained"
            buttonColor="#FCC827"
            textColor="#000000"
            compact={true}
            labelStyle={{ fontSize: 12 }}
          >
            Moderate Crowd
          </Button>
        </Card.Actions>
      </View>
      {/* Category tags */}
      <Card style={{ margin: 5,}}>
        <Card.Content style={styles.labelContainer}>
          <View style={styles.foodOptionsContainer}>
            <Text
              variant="titleMedium"
              style={{fontSize:12, color: "#787878", marginLeft: 5, marginBottom: 5 }}
            >
              Food Options Available
            </Text>
            <View style={styles.foodOptionsChip}>
              <Tooltip title="Halal">
                <Chip size="small" style={styles.icon} icon="food-halal">
                  Halal
                </Chip>
              </Tooltip>
              <Tooltip title="Chinese">
                <Chip size="small" style={styles.icon} icon="food-takeout-box">
                  Chinese
                </Chip>
              </Tooltip>
              <Tooltip title="Vegetarian">
                <Chip style={styles.icon} icon="leaf">
                  Vegetarian
                </Chip>
              </Tooltip>
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <StarRating rating={4.5} size={18} />
            <Text style={styles.reviewsText}>{200} Reviews</Text>
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
        <Text
          style={{
            color: "#787878",
            textDecorationLine: "underline",
            marginHorizontal: 10,
          }}
          onPress={() => navigation.navigate('MainPage')}
        >
          Too crowded? Find alternative hawker centres!
        </Text>
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
