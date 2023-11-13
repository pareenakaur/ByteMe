import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Banner  from './Banner';
import Details from './HawkerStallDetails';
import ReportsList from './ReportsList';
import ReviewsList from './ReviewsList';
import { getReports, getReviews, getImage } from '../testing-for-stall/main';

//need to retrieve place id from explore function --> figure out which component in which js file to import to call function and/or get place id

const Profile = ({placeId1, stallId1, navigation}) => {

    const placeId = 'ChIJv4Mk4QYa2jERx51-KDobWrA';
    const stallId = '9oQZA2Gxr9NCFMi4lBtW';
    //const API_KEY = 'AIzaSyCl5--iXN-xsw8CoZFKjCXlnYXnDa5CyP0';
    
    
    const [stallData, setStallData] = useState(null);
    const [stallImage, setStallImage] = useState(null);
    

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:5000/hawkers/getStallInfo?id=' + placeId, {
          method: 'GET'
        });

        if (response.status === 200) {
          const jsonString = await response.text();
          const parsedData = JSON.parse(jsonString);
          console.log(parsedData);
        //   if (parsedData.photoReference) {
        //     const imageUrl = await retrieveImageUrl(parsedData.photos[0].photo_reference);
        //     setImage(imageUrl);
        //   }
          setStallData(parsedData);
          
        } else {
          throw new Error('Error retrieving stall information: ' + response.status);
        }
      } catch (error) {
        console.error('Error getting stall information:', error);
      }
    }

    

    // Async function to retrieve image URL
    // async function retrieveImageUrl(photoReference) {
    //     const url = `https://maps.googleapis.com/maps/api/image?photoreference=${photoReference}&size=2048x1536&key=${API_KEY}`;
    //     const response = await fetch(url);
  
    //     if (response.ok) {
    //       const json = await response.json();
    //       const imageUrl = json.url;
    //       console.log(imageUrl);
    //       return imageUrl;
    //     } else {
    //       console.error(`Error: ${response.status}`);
    //       return null;
    //     }
    //   }
  

    // Call the async function
    fetchData();
  },[placeId]); 

  const [image, setImage] = useState(null);
  
// async function retrieveImageUrl(photoReference) {
//   const url = `https://maps.googleapis.com/maps/api/image?photoreference=${photoReference}&size=2048x1536&key=${API_KEY}`;
//   const response = await fetch(url);
//   if (response.ok) {
//       const json = await response.json();
//       const imageUrl = json.url;
//       console.log(imageUrl);
//   } else {
//       console.error(`Error: ${response.status}`);
//   }
// }
// //retrieveImageUrl(photoReference[0]);


    const [reports1, setStallReports] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('http://127.0.0.1:5000/reports/getStallReports?stallID=' + stallId, {
              method: 'GET'
            });
    
            if (response.status === 200) {
              const jsonString = await response.text();
              const parsedData = JSON.parse(jsonString);
              console.log(parsedData.list);
              setStallReports(parsedData.list);
            } else {
              throw new Error('Error retrieving stall information: ' + response.status);
            }
          } catch (error) {
            console.error('Error getting stall information:', error);
          }
        }
    
        // Call the async function
        fetchData();
      },[stallId]); 
    

    const [reviews1, setStallReviews] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('http://127.0.0.1:5000/reviews/getStallReviews?stallID=' + stallId, {
              method: 'GET'
            });
    
            if (response.status === 200) {
              const jsonString = await response.text();
              const parsedData = JSON.parse(jsonString);
              console.log(parsedData.list);
              setStallReviews(parsedData.list);
            } else {
              throw new Error('Error retrieving stall information: ' + response.status);
            }
          } catch (error) {
            console.error('Error getting stall information:', error);
          }
        }
    
        // Call the async function
        fetchData();
      },[stallId]); 
    


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


    
    //accesss first value of array
    const HawkerStall = { 
        image: require("../../assets/HawkerStallImage.jpg"),
        //name: stallData.name,
        //address: stallData.formatted_address,
        //contact: stallData.formatted_phone_number,
        //openingHours: "6am - 3pm",
        //rating: stallData.rating,
        //reviews: reviews1,
        //reports: reports1,
    }

    //const reportsList = HawkerStall.reports;
    //const reviewsList = HawkerStall.reviews;

    return(
        <View style={styles.default} >
            <Banner image={HawkerStall.image} />
            <AntDesign style={styles.navigationButton} name="leftcircle" size={26} color="#EB6C05" onPress={() => navigation.navigate('ExplorePage')}/>
            <View style={styles.overlayContainer}>
                <View style={styles.containers}>
                    <View style={styles.details}>
                        {stallData && reviews1 && <Details image={HawkerStall.image}
                            name={stallData.name}
                            address={stallData.formatted_address}
                            openingHours={'6am - 3pm'}
                            rating={stallData.rating}
                            reviews={reviews1}
                            contact={stallData.formatted_phone_number}/>}
                    </View>


                    <View style={styles.reports}>
                        <View style={styles.reportContainer}>
                            <View style={styles.reportHeader}>
                                <View style={styles.reportHeaderFlex}>
                                    <Text style={styles.text}>Latest Reports</Text>
                                    <Octicons name="report" size={20} color="black" onPress={() => navigation.navigate('ReportForm')}/>
                                </View>
                            </View>
                            <View style={styles.reportMainContainer}>
                                <View style={styles.reportsNavContainer}>
                                    <View style={styles.reportViews}>
                                        <View style={styles.reportViewsContainer}>
                                            {stallData && reports1  && <ReportsList reports={reports1} hawkerStall ={HawkerStall} type={0}/>}
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.viewAllReports}>
                              {reports1 && <Text style={styles.viewAllReportText} onPress={() => {
                                    if (reports1 != null) {
                                    navigation.navigate('ViewAllReports', { reports1 });
                                    } else {
                                    // Handle the case where reports1 is null or
                                    console.warn('reports1 is null or undefined');
                                    }
                                }}>View All</Text>}
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
                                        <Ionicons name="add-circle" size={24} color="#EB6C05" onPress={() => navigation.navigate('ReviewForm', {navigation})}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.reviewMainContainer}>
                                    <View style={styles.reviewsList}>
                                        {reviews1 && stallData && <ReviewsList reviews={reviews1} hawkerStall={HawkerStall}/>}
                                    </View>

                            </View>
                            <View style={styles.viewAllReviews}>
                            <Text
                                style={styles.viewAllReviewText}
                                onPress={() => {
                                    if (reviews1 != null) {
                                    navigation.navigate('ViewAllReviews', { reviews1 });
                                    } else {
                                    // Handle the case where reviews1 is 
                                    console.warn('reviews1 is null or undefined');
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
        width: '100%',
        height: '100%',
    },
    navigationButton: {
        position: 'absolute',
        top: '7%',
        left: '5%'
    },
    overlayContainer: {
        zIndex: 1,
        position: 'absolute',
        top: '15%',
        width: '100%',
        height: '85%',
        backgroundColor: 'white',
    },


    containers: {
        width: '100%',
        height: '100%',
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },

    details: {
        flex: 2.5,
    },

    reports: {
        flex: 3.25,
    },
    reviews: {
        flex: 4.25
    },
    



    reportContainer: {
        flex: 7,
        margin: 5,
        height: '100%'
        
    },
    reportHeader: {
        flex: 1.8
        
    },
    reportMainContainer: {
        flex: 4,
        
    },
    viewAllReports: {
        flex: 1.2,

    },
    
    
    reportsNavContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        //fontFamily: 'Open-Sans-Bold',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#EB6C05',

    },
    
    
   
    leftNavIconContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
    },
    rightNavIconContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    reportViewsContainer: {
        width: '100%',

    },
    
    
    
    viewAllReportText: {
       // fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
        
    },



    
    reviewContainer: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },
    reviewHeader: {
        flex: 1
        
    },
    reviewMainContainer: {
        flex: 4.5,
        padding: 5,
        paddingTop: 0,
    },
    viewAllReviews: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 10,
    },




    reviewHeaderFlex: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2
    },
    reviewTitle: {
        flex: 1.9,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    addReviewIcon: {
        flex: 1.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 5,
        marginRight: 10
    },
    


    reviewsList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%', // Set your desired maximum width here
        overflow: 'hidden',
    },
    
    viewAllReviewText: {
        //fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },


    navContainer: {
        height: '100%',
        width: '100%',
        borderWidth: 1,
        borderColor: 'gold',
        backgroundColor: 'gold'
    },


    iconsContainer: {
        flex: 3,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});