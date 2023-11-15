import React, { useState, useEffect } from "react";
// import JSONPath from 'jsonpath'
import { StyleSheet, Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Banner from "./Banner";
import Details from "./HawkerStallDetails";
import ReportsList from "./ReportsList";
import ReviewsList from "./ReviewsList";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
// import { getReports, getReviews, getImage } from '../testing-for-stall/main';

//need to retrieve place id from explore function --> figure out which component in which js file to import to call function and/or get place id

const Profile = ({navigation, route}) => {
  
  const firebaseConfig = {
    apiKey: "AIzaSyCpNGxq6dkVp0A-hvBbBc5LZleOL-c_4-c",
    authDomain: "byte-403ce.firebaseapp.com",
    databaseURL:
      "https://byte-403ce-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "byte-403ce",
    storageBucket: "byte-403ce.appspot.com",
    messagingSenderId: "777425915236",
    appId: "1:777425915236:web:7cc5b449392ee76696fe71",
    measurementId: "G-CBGM27NVK3",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const { centre, place } = route.params;
    // const placeId = navigation.getParam('placeId', 'NO-ID');
  // const placeId = 'ChIJv4Mk4QYa2jERx51-KDobWrA';
  // const stallId = '9oQZA2Gxr9NCFMi4lBtW';
  console.log(place);
  const API_KEY = "AIzaSyCl5--iXN-xsw8CoZFKjCXlnYXnDa5CyP0";

  const [stallData, setStallData] = useState(null);
  const [stallImage, setStallImage] = useState(null);

  useEffect(() => {
    function fetchData(){
        setStallData(place);
        setStallImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photo_reference}&key=${API_KEY}`);
    };

    fetchData();
  }, [place]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch(
//           "http://127.0.0.1:5000/hawkers/getStallInfo?id=" + placeId,
//           {
//             method: "GET",
//           }
//         );

//         if (response.status === 200) {
//           const jsonString = await response.text();
//           const parsedData = JSON.parse(jsonString);
//           console.log(parsedData);

//           setStallData(parsedData);
//           console.log(parsedData.photos[0].photo_reference);
//           setStallImage(
//             `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${parsedData.photos[0].photo_reference}&key=${API_KEY}`
//           );
//         } else {
//           throw new Error(
//             "Error retrieving stall information: " + response.status
//           );
//         }
//       } catch (error) {
//         console.error("Error getting stall information:", error);
//       }
//     }

//     // Call the async function
//     fetchData();
//   }, [placeId]);

  const [reports1, setStallReports] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/reports/getStallReports?stallID=" + place["place_id"],
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const jsonString = await response.text();
          const parsedData = JSON.parse(jsonString);
          console.log(parsedData);
          if (parsedData.res == "Stall has no reports") {
            setStallReports(null);
          }
          setStallReports(parsedData.list);
        } else {
          throw new Error(
            "Error retrieving stall information: " + response.status
          );
        }
      } catch (error) {
        console.error("Error getting stall information:", error);
      }
    }

    // Call the async function
    fetchData();
  }, [place]);

  const [reviews1, setStallReviews] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/reviews/getStallReviews?stallID=" + place["place_id"],
          {
            method: "GET",
          }
        );

        if (response.status === 200) {
          const jsonString = await response.text();
          const parsedData = JSON.parse(jsonString);
          console.log(parsedData.list);
          setStallReviews(parsedData.list);
        } else {
          throw new Error(
            "Error retrieving stall information: " + response.status
          );
        }
      } catch (error) {
        console.error("Error getting stall information:", error);
      }
    }

    // Call the async function
    fetchData();
  }, [place]);

  // const report = {
  //     image: require("../../assets/HawkerStallImage.jpg"),
  //     username: "User1",
  //     date: "7 Sept 2023, 11:00 am",
  //     profilePic:  require("../../assets/img5.jpg"),
  //     upvote: 100,
  //     downvote: 0,
  //     description: "The stall is closed! Y'all should go to some other stall today!"
  // }

  // const review = {
  //     image: require("../../assets/Uncles_Best_Fried_Rice.png"),
  //     username: "User1",
  //     date: "7 Sept 2023, 11:00 am",
  //     profilePic: require("../../assets/img5.jpg"),
  //     rating: 4,
  //     upvote: 1,
  //     downvote: 1,
  //     description: "Very nice! Honestly the best fried rice I have eaten ever :>"
  // }

  return (
    <View style={styles.default}>
      <Banner image={stallImage} />
      <AntDesign
        style={styles.navigationButton}
        name="leftcircle"
        size={26}
        color="#EB6C05"
        onPress={() => navigation.navigate("ExplorePage")}
      />
      <View style={styles.overlayContainer}>
        <View style={styles.containers}>
          <View style={styles.details}>
            {/* {console.log("Details: "+ stallData[""])} */}
            {stallData && stallImage && reviews1 && (
              <Details
                name={stallData["name"]}
                address={stallData["address"]}
                openStatus ={stallData["open_now"]}
                openingHours={stallData["opening_hours"]}
                rating={stallData["rating"]}
                reviews={reviews1}
                
              />
            )}
          </View>

          <View style={styles.reports}>
            <View style={styles.reportContainer}>
              <View style={styles.reportHeader}>
                <View style={styles.reportHeaderFlex}>
                  <View style={styles.reportTitle}>
                    <Text style={styles.text}>Latest Reports</Text>
                  </View>
                  <View style={styles.addReportIcon}>
                    <Octicons
                      name="report"
                      size={20}
                      color="black"
                      onPress={() => navigation.navigate("ReportForm", {centre: centre, place: place})}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.reportMainContainer}>
                <View style={styles.reportsNavContainer}>
                  <View style={styles.reportViews}>
                    <View style={styles.reportViewsContainer}>
                      {stallData && stallImage && reports1 && (
                        <ReportsList
                          reports={reports1}
                          image={stallImage}
                          stallID={place["place_id"]}
                          type={0}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.viewAllReports}>
                {reports1 && stallImage && stallData && (
                  <Text
                    style={styles.viewAllReportText}
                    onPress={() => {
                      if (reports1 != null) {
                        navigation.navigate("ViewAllReports", {
                          reports1: reports1,
                          image: stallImage,
                          stallID: place["place_id"],
                          centre: centre,
                          place: place
                        });
                      } else {
                        // Handle the case where reports1 is null or
                        console.warn("reports1 is null or undefined");
                      }
                    }}
                  >
                    View All
                  </Text>
                )}
              </View>
            </View>
          </View>
          <View style={styles.reviews}>
            <View style={styles.reviewContainer}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewHeaderFlex}>
                  <View style={styles.reviewTitle}>
                    <Text style={styles.text}>Reviews</Text>
                  </View>
                  <View style={styles.addReviewIcon}>
                    <Ionicons
                      name="add-circle"
                      size={24}
                      color="#EB6C05"
                      onPress={() =>
                        navigation.navigate("ReviewForm", {centre: centre, place:place})
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.reviewMainContainer}>
                <View style={styles.reviewsList}>
                  {reviews1 && stallData && stallImage && (
                    <ReviewsList
                      reviews={reviews1}
                      image={stallImage}
                      stallID={place["place_id"]}
                    />
                  )}
                </View>
              </View>
              <View style={styles.viewAllReviews}>
                <Text
                  style={styles.viewAllReviewText}
                  onPress={() => {
                    if (reviews1 != null) {
                      navigation.navigate("ViewAllReviews", {
                        reviews1: reviews1,
                        image: stallImage,
                        stallID: place["place_id"],
                        centre: centre,
                        place: place
                      });
                    } else {
                      // Handle the case where reviews1 is
                      console.warn("reviews1 is null or undefined");
                    }
                  }}
                >
                  View All
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  default: {
    width: "100%",
    height: "100%",
  },
  navigationButton: {
    position: "absolute",
    top: "7%",
    left: "5%",
  },
  overlayContainer: {
    zIndex: 1,
    position: "absolute",
    top: "15%",
    width: "100%",
    height: "85%",
    backgroundColor: "white",
  },

  containers: {
    width: "100%",
    height: "100%",
    flex: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  details: {
    flex: 2.5,
  },

  reports: {
    flex: 3.25,
  },
  reviews: {
    flex: 4.25,
  },

  reportContainer: {
    flex: 7,
    margin: 5,
    height: "100%",
  },
  reportHeader: {
    flex: 1.8,
  },
  reportMainContainer: {
    flex: 4,
  },
  viewAllReports: {
    flex: 1.2,
  },

  reportsNavContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftNavIcon: {
    flex: 0.5,
  },
  reportViews: {
    flex: 4,
  },
  rightNavIcon: {
    flex: 0.5,
  },

  reportHeaderFlex: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  reportTitle: {
    flex: 2.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    
  },
  addReportIcon: {
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 3
    
    
  },
  text: {
    //fontFamily: 'Open-Sans-Bold',
    fontWeight: "bold",
    fontSize: 20,
    color: "#EB6C05",
  },

  leftNavIconContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
  rightNavIconContainer: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-end",
  },
  reportViewsContainer: {
    width: "100%",
  },

  viewAllReportText: {
    // fontFamily: 'Open-Sans-Regular',
    color: "black",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  reviewContainer: {
    flex: 6,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  reviewHeader: {
    flex: 1,
  },
  reviewMainContainer: {
    flex: 4.5,
    padding: 5,
    paddingTop: 0,
  },
  viewAllReviews: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingBottom: 10,
  },

  reviewHeaderFlex: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 2,
  },
  reviewTitle: {
    flex: 1.9,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addReviewIcon: {
    flex: 1.1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginLeft: 5,
    marginRight: 10,
  },

  reviewsList: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%", // Set your desired maximum width here
    overflow: "hidden",
  },

  viewAllReviewText: {
    //fontFamily: 'Open-Sans-Regular',
    color: "black",
    textDecorationLine: "underline",
    textAlign: "center",
  },

  navContainer: {
    height: "100%",
    width: "100%",
    borderWidth: 1,
    borderColor: "gold",
    backgroundColor: "gold",
  },

  iconsContainer: {
    flex: 3,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
