import { Dimensions, StyleSheet, View } from "react-native";
import {
  Card,
  Text,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "react-native-paper";
import { useState, useEffect } from "react";
import StarRating from "../hawker-stall-profile/StarRating";

//Todo: hawkerStallInfo 
export default function HawkerStallCard({ hawkerStallInfo, navigation }) {
  const [liked, setLiked] = useState(false);
  // const [likeNumber, setLikeNumber] = useState(false);
  const [foundHawker, setFoundHawker] = useState(null);

  useEffect(() => {
    const getUserLike = async() => {
    const response = await fetch(`http://127.0.0.1:5000/user/getFavouriteStalls?id=${global.usrName}&format=1`);
    // const response = await fetch(`http://127.0.0.1:5000/user/getFavouriteStalls?id=seung&format=1`);
    const res = await response.json();
    // console.log(res);
    return res;
    }

    const result = getUserLike();

    for (let i =0; i<result.length; i++){
      if (hawkerStallInfo["name"] === result[i]["name"]){
        console.log(`This stall is liked! ${hawkerStallInfo["name"]} matches with ${result[i]["name"]}`)
        setFoundHawker(result[i]);
        setLiked(true);
        break;
      }
    }

  }, []);

 

  function getDay() {
    const d = new Date();
    let day = d.getDay();
    return (day + 6) % 7;
  }

  async function handleLikePress(){
    // console.log(liked, likeNumber);
    setLiked(!liked);
    if (liked !== true){
      const response = await fetch('http://127.0.0.1:5000/user/addFavouriteStall?username='+ global.usrName+'&stallID=' + hawkerStallInfo["place_id"]);
      // const response = await fetch('http://127.0.0.1:5000/user/addFavouriteStall?username=seung'+'&stallID=' + hawkerStallInfo["place_id"]);
      const data = await response.json();
      console.log(data.result);
      setFoundHawker(hawkerStallInfo);
    }
    else if (liked !== false){
      // const response = await fetch('http://127.0.0.1:5000/user/removeFavouriteStall?username='+ global.usrName+'&stallID=' + hawkerStallInfo["place_id"]);
      const response = await fetch('http://127.0.0.1:5000/user/removeFavouriteStall?username=seung'+'&stallID=' + hawkerStallInfo["place_id"]);
      const data = await response.json();
      console.log(data.result);
      setFoundHawker(null);
    }

    // console.log(liked, likeNumber);
    // setLikeNumber(liked ? likeNumber - 1 : likeNumber + 1);
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
          // uri: "https://fastly.4sqi.net/img/general/200x200/9301872_YzBYs5OsgbuPNtrgKZOC4YgjE74Tu03KFoskwHkuZDE.jpg",
          uri: (hawkerStallInfo["photo_reference"] !== undefined?
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${hawkerStallInfo.photo_reference}&key=AIzaSyB1rVWeBKL1WRUVi7qdKLO9JbRRo5D6H_E`
          : "https://i.imgur.com/45cWimK.png")
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
          onPress={() => navigation.navigate("Profile")}
        ></IconButton>
      </View>
      <View style={{ flexDirection: "row", marginVertical: 5 }}>
        <Card.Content style={{ flex: 1.5 }}>
          <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
            {/* Adam Fishball Noodle */}
            {hawkerStallInfo["name"]}
          </Text>
          <Text variant="bodySmall" style={{ color: "#FA4A0C" }}>
            {/* 2 Adam Rd, Singapore 289876, Floor 1, Stall 25 */}
            {hawkerStallInfo["address"]}
          </Text>
          <Text variant="bodySmall">
            {/* Opening Hours: 6am - 3am */}
            {hawkerStallInfo["opening_hours"] === "not available" ? "Opening hours: Not Available" : hawkerStallInfo["opening_hours"][getDay()]}
          </Text>
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
              style={{
                fontSize: 12,
                color: "#787878",
                marginLeft: 5,
                marginBottom: 5,
              }}
            >
              Popular Tags
            </Text>
            <View style={styles.foodOptionsChip}>
              {hawkerStallInfo["open_now"]===true?
                <Tooltip title="Open">
                <Chip size="small" style={styles.icon} icon="door-sliding-open">
                  Open
                </Chip>
              </Tooltip>
              : <Chip size="small" style={styles.closedIcon} icon="door-sliding-open">
                  Not Open
                </Chip>
              }
              {hawkerStallInfo["tags"]["vegetarian"]!=="not available"?
                <Tooltip title="Vegetarian">
                  <Chip style={styles.icon} icon="leaf">
                    Vegetarian
                  </Chip>
                </Tooltip>:null
              }
            </View>
          </View>
          <View style={styles.ratingContainer}>
            <StarRating rating={hawkerStallInfo["rating"]} size={18} />
            <Text style={styles.reviewsText}>{hawkerStallInfo["review"]} Reviews</Text>
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
  closedIcon:{
    backgroundColor: "#FA4A0C",
    justifyContent: "center",
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
    padding: 0,
  },
  foodOptionsContainer: {
    flex: 2,
    justifyContent: "center",
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
