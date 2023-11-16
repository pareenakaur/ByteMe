import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import StarRating from "./StarRating";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";

const Review = ({
  image,
  username,
  date,
  profilePic,
  upvote,
  downvote,
  rating,
  description,
  type,
  stallID,
}) => {
  //set style types for viewing all vs view snapshot on profile
  const styleType = type === 1 ? viewStyles : styles;

  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvote);
  const [downvoteCount, setDownvoteCount] = useState(downvote);

  const [reviewID, setReviewID] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const storage = getStorage();
  const firebaseConfig = {
    apiKey: "AIzaSyA35CAAxfnVPCZuAmD44ic9AZG_TExU8dw",
    authDomain: "sgbytes.firebaseapp.com",
    projectId: "sgbytes",
    storageBucket: "sgbytes.appspot.com",
    messagingSenderId: "766295476965",
    appId: "1:766295476965:web:131a044224867bf452e20c",
    measurementId: "G-RWGZJLPD4G"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/reviews/getUserReviews?username=" + username,
          {
            method: "GET",
          }
        );

        // if (response.status === 200) {
          const jsonString = await response.text();
          const parsedData = JSON.parse(jsonString);
          // console.log(parsedData);
          if (parsedData.result === "Success") {
            const review = parsedData.list.find(
              (stall) => stall.stallID === stallID
            );
            // console.log(
            //   "parsedData for Review: ",
            //   parsedData.list.find((stall) => stall.stallID === stallID).reviewID,
            //   review.reviewID
            // );
            setReviewID(review.reviewID);
            if (review.image) {
              const pathReference = ref(
                storage,
                "reviews/" + stallID + "_" + review.reviewID + ".jpg"
              );

              // const pathReference = ref(storage, `https://firebasestorage.googleapis.com/b/bucket/o/reports%20${stallID}_${review_id}.jpg`);

              // console.log("Path Reference " + pathReference);

              try {
                const url = await getDownloadURL(pathReference);
                setImageURL(url);
              } catch (error) {
                console.log(error);
              }
            } else {
              setImageURL("https://i.imgur.com/45cWimK.png");
            }
          }

      } catch (error) {
        console.error("Error getting user information:", error);
      }
    }

    // Call the async function
    fetchData();
    // }, []);
  }, [stallID]);

  const handleUpvote = async () => {
    if (!upvoted) {
      setUpvoteCount(upvoteCount + 1);
      if (downvoted) {
        setDownvoted(false);
        setDownvoteCount(downvoteCount - 1);
      }
    } else {
      setUpvoteCount(upvoteCount - 1);
    }
    setUpvoted(!upvoted);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: global.usrName,
          reviewID: reviewID,
          upvote: true,
        }),
      };
      const response = await fetch(
        "http://127.0.0.1:5000/reviews/voteReview",
        requestOptions
      );
      const data = await response.json();
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownvote = async () => {
    if (!downvoted) {
      setDownvoteCount(downvoteCount + 1);
      if (upvoted) {
        setUpvoted(false);
        setUpvoteCount(upvoteCount - 1);
      }
    } else {
      setDownvoteCount(downvoteCount - 1);
    }
    setDownvoted(!downvoted);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: global.usrName,
          reviewID: reviewID,
          upvote: false,
        }),
      };
      const response = await fetch(
        "http://127.0.0.1:5000/reviews/voteReview",
        requestOptions
      );
      const data = await response.json();
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styleType.container}>
      <View style={styleType.innerContainer}>
        {/* {imageURL ? (
          <Image style={styleType.image} source={{ uri: `${imageURL}` }} />
        ) : (
          <Image style={styleType.image} source={{ uri: `${image}` }} />
        )} */}
        <Image style={styleType.image} source={{ uri: `${imageURL}` }} />
        <View style={styleType.overlayContainer}>
          <View style={styleType.mainUserContainer}>
            <View style={styleType.userContainer}>
              <View style={styleType.profileLogo}>
                <View style={styleType.profileLogoContainer}>
                  <Image style={styleType.profilePic} source={profilePic} />
                </View>
              </View>
              <View style={styleType.userDetails}>
                <View styles={styleType.userInnerContainer}>
                  <View styles={styleType.nameContainer}>
                    <Text style={styleType.name}>{username}</Text>
                  </View>
                  <View styles={styleType.dateContainer}>
                    <Text style={styles.date}>{Date(date.toLocaleString("en-US", { timeZone: "Asia/Singapore" }))}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styleType.descriptionContainer}>
            <Text
              style={styleType.descriptionStyle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {description}
            </Text>
          </View>
          <View style={styleType.ratingContainer}>
            <StarRating rating={rating} size={12} />
          </View>
          <View style={styleType.votesContainer}>
            <View style={styleType.vote}>
              <View style={styleType.emptyView}></View> 
              <TouchableOpacity onPress={handleUpvote} disabled={downvoted}>
                <View style={styleType.upvote}>
                  <FontAwesome
                    name="thumbs-o-up"
                    size={15}
                    color={upvoted ? "orange" : "black"}
                  />
                  <Text style={styleType.voteNum}>{upvoteCount}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDownvote} disabled={upvoted}>
                <View style={styleType.downvote}>
                  <FontAwesome
                    name="thumbs-o-down"
                    size={15}
                    color={downvoted ? "orange" : "black"}
                  />
                  <Text style={styleType.voteNum}>{downvoteCount}</Text>
                </View>
              </TouchableOpacity>
              <View style={styleType.emptyView}></View> 
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 2,
    borderColor: "#F4F4F8",
    borderRadius: 30,
    width: "30%",
    height: "auto",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  innerContainer: {
    borderWidth: 0,
    borderColor: "#F4F4F8",
    borderRadius: 30,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    zIndex: 1,
    position: "absolute",
    top: "35%",
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    flex: 10,
    flexDirection: "column",
  },
  mainUserContainer: {
    flex: 3,
  },
  userContainer: {
    flex: 5,
    flexDirection: "row",
  },
  userInnerContainer: {
    flex: 2,
    flexDirection: "column",
  },
  profileLogo: {
    flex: 1.5,
    padding: 5,
  },
  profileLogoContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    aspectRatio: 1,
    overflow: "hidden",
  },
  profilePic: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  userDetails: {
    flex: 3.5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 5,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    //fontFamily: 'Open-Sans-Regular',
    color: "black",
    paddingRight: 2,
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 7,
    // fontFamily: 'Open-Sans-Regular',
    color: "black",
  },

  descriptionContainer: {
    flex: 2,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 20,

    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionStyle: {
    fontSize: 12,
  },
  ratingContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  votesContainer: {
    flex: 3,
    marginBottom: 10,
  },
  vote: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upvote: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
  },
  downvote: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  voteNum: {
    fontSize: 8,
    // fontFamily: 'Open-Sans-Regular',
    textAlign: 'center',
  },
  emptyView: {
    flex: 0.5,
  },
});

const viewStyles = StyleSheet.create({
  container: {
    margin: 5,
    borderWidth: 2,
    borderColor: "#F4F4F8",
    borderRadius: 30,
    width: "30%",
    height: "30%",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  innerContainer: {
    borderWidth: 0,
    borderColor: "#F4F4F8",
    borderRadius: 30,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  overlayContainer: {
    zIndex: 1,
    position: "absolute",
    top: "35%",
    width: "100%",
    height: "65%",
    backgroundColor: "white",
    flex: 10,
    flexDirection: "column",
  },
  mainUserContainer: {
    flex: 3,
  },
  userContainer: {
    flex: 5,
    flexDirection: "row",
  },
  userInnerContainer: {
    flex: 2,
    flexDirection: "column",
  },
  profileLogo: {
    flex: 1,
    padding: 5,
  },
  profileLogoContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 100,
    aspectRatio: 1,
    overflow: "hidden",
  },
  profilePic: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  userDetails: {
    flex: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    paddingTop: 5,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 12,
    //  fontFamily: 'Open-Sans-Regular',
    color: "black",
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    fontSize: 7,
    // fontFamily: 'Open-Sans-Regular',
    color: "black",
  },

  descriptionContainer: {
    flex: 2,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "center",
  },

  descriptionStyle: {
    fontSize: 12,
  },
  ratingContainer: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
  },
  votesContainer: {
    flex: 3,
    marginBottom: 10,
  },
  vote: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  upvote: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: 10,
  },
  downvote: {
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  voteNum: {
    fontSize: 8,
    textAlign: 'center',
    // fontFamily: 'Open-Sans-Regular',
  },
  emptyView: {
    flex: 0.5,
  },
});
