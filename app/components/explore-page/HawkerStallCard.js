import { Dimensions, StyleSheet, View } from "react-native";
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

export default function HawkerStallCard({navigation}) {
  const [liked, setLiked] = useState(false);
  const [likeNumber, setlikeNumber] = useState(0); //Todo: update initial state with actual likes retrieved from database

  const handleLikePress = () => {
    // console.log(liked, likeNumber);
    setLiked(!liked);
    // console.log(liked, likeNumber);
    setlikeNumber(liked ? likeNumber - 1 : likeNumber + 1);
  };

  return (
    <Card style={styles.container}>
      <Card.Cover
        style={{
          height: "30%",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        source={{
          uri: "https://fastly.4sqi.net/img/general/200x200/9301872_YzBYs5OsgbuPNtrgKZOC4YgjE74Tu03KFoskwHkuZDE.jpg",
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
          icon="arrow-right-thick"
          mode="contained-tonal"
          iconColor="#FA4A0C"
          size={25}
          onPress={() => navigation.navigate('Profile')}
        ></IconButton>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Card.Content style={{ flex: 1.5 }}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            Adam Fishball Noodle
          </Text>
          <Text variant="bodySmall" style={{ color: "#FA4A0C" }}>
            2 Adam Rd, Singapore 289876, Floor 1, Stall 25
          </Text>
          <Text variant="bodySmall">Contact: 9123 4567</Text>
          <Text variant="bodySmall">Opening Hours: 6am - 3am</Text>
        </Card.Content>
        {liked ? (
          <IconButton
            icon="heart"
            iconColor="#FE251B"
            size={30}
            style={{ marginTop: 0 }}
            onPress={handleLikePress}
          ></IconButton>
        ) : (
          <IconButton
            icon="heart-outline"
            iconColor="#FE251B"
            size={30}
            style={{ marginTop: 0 }}
            onPress={handleLikePress}
          ></IconButton>
        )}
      </View>
      {/* Category tags */}
      <Card style={{ margin: 5 }}>
       
        <Card.Content style={styles.labelContainer}>
          <View style={styles.foodOptionsContainer}>
            <Text
              variant="titleMedium"
              style={{fontSize:12, color: "#787878", marginLeft: 5, marginBottom: 5 }}
            >Popular Tags</Text>
            <View style={styles.foodOptionsChip}>
              <Tooltip title="Open">
                <Chip size="small" style={styles.icon} icon="door-sliding-open">
                  Halal
                </Chip>
              </Tooltip>
              <Tooltip title="Chinese">
                <Chip size="small" style={styles.icon} icon="food-takeout-box">
                  Chinese
                </Chip>
              </Tooltip>
              <Tooltip title="Micheline 2-star">
                <Chip size="small" style={styles.icon} icon="star">
                Michelin 2-star
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
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  icon: {
    backgroundColor: "#FCC827",
    justifyContent: "center",
    // marginHorizontal:5,
  },
  // labelContainer: {
  //   backgroundColor: "#F4F4F8",
  //   // borderColor: "red",
  //   borderWidth: 1,
  //   borderRadius: 10,
  // },
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
