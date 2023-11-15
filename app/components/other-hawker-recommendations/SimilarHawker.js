import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const SimilarHawker = ({similarHawker, latitude, longitude, navigation}) => {
    const API_KEY = 'AIzaSyD3YKpWEopq3wrYDEj8c2AAajWoXPTl2zo';


    useEffect(() => {
    //    console.log(similarHawker);
        // const c = decideColor(similarHawker.crowdedness);
        // console.log(c);
        console.log(decideCrowdText('rgba(0,255,0,0.15)'));
        console.log(decideTextColor(similarHawker.crowdedness));
      },[]); 
    // const [image, setImage] = useState(null);
    // const [distanceAway, setDistanceAway] = useState(null);
    // const [crowdLevel, setCrowdLevel] = useState(null);
    
    // if(similarHawkers !== null){
    //     setImage(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${similarHawkers.photos[0].photo_reference}&key=${API_KEY}`);

    //     setDistanceAway(calculateDistance(similarHawkers.latitude, similarHawkers.longitude, latitude, longitude));

    //     setCrowdLevel(decideColor(similarHawkers.crowdedness));
    // }
    
    

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      
        const distance = R * c; // Distance in kilometers
      
        return distance.toFixed(2);
      }

      
      
      
      function degToRad(degrees) {
        return degrees * (Math.PI / 180);
      }
      
      

    // function decideColor(capacity) {
    //     if (capacity === "not available"){
    //     return "rgba(0,0,0,0.15)"
    //     } else if (capacity < 0.3) {
    //     return "rgba(255,0,0,0.15)";
    //     } else if (capacity >= 0.3 && capacity <= 0.6) {
    //     return"rgba(255,95,21,0.15)";
    //     } else {
    //     return "rgba(0,255,0,0.15)";
    //     }
    // }

    function decideCrowdText(capacity){
        if (capacity === "not available"){
            return "Untracked"
        } else if (capacity < 0.3) {
            return "Severe Crowd";
        } else if (capacity >= 0.3 && capacity <= 0.6) {
            return "Moderate Crowd";
        } else {
            return "Low Crowd";
        }
    }

    function decideTextColor(capacity) {
        if (capacity === "not available"){
        return "rgba(0,0,0,0.75)"
        } else if (capacity < 0.3) {
        return "rgba(255,0,0,0.75)";
        } else if (capacity >= 0.3 && capacity <= 0.6) {
        return"rgba(255,95,21,0.75)";
        } else {
        return "rgba(0,255,0,0.75)";
        }
    }


    
    return(
       
        <View style={styles.detailsMainContainer}>
            {similarHawker && <View style={styles.detailsContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.similarImageContainer}>
                        <View style={styles.imageLogoContainer}>
                            {similarHawker && <Image  style={styles.image} 
                                    source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${similarHawker.photo_data[0].photo_reference}&key=${API_KEY}`}} /> }
                        </View>
                    </View>
                    <View style={styles.similarDetailsContainer}>
                        <View style={styles.similarDetailsInnerContainer}>
                            <Text style={styles.name}>{similarHawker.name}</Text>
                            <Text style={{ paddingTop: 5, fontSize: 12, color: decideTextColor(similarHawker.crowdedness)}}>Crowd: {decideCrowdText(similarHawker.crowdedness)}</Text>
                            <Text style={styles.distance}>{calculateDistance(similarHawker.latitude, similarHawker.longitude, latitude, longitude)}km away</Text>
                        </View>
                    </View>

                    <View style={styles.rightNavIcon}>
                        <View style={styles.rightNavIconContainer}>
                            <AntDesign name="right" size={24} color="black" onPress={() => navigation.navigate('ExplorePage', { placeId: similarHawker.place_id })}/> 
                        </View> 
                    </View>
                </View>
               
            </View>
                   }
        </View>         
       );

    

};

export default SimilarHawker;

const styles = StyleSheet.create({
    detailsMainContainer: {
        height: '25%',
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    detailsContainer: {
        //marginTop: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#F4F4F8',
        backgroundColor: 'white',
        height: '100%',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
  
        
    },

    mainContainer: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,

    },
    similarImageContainer: {
        flex: 2,
        
    },
    imageLogoContainer: {
        margin: 5,
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100,
        aspectRatio: 1,
        overflow: 'hidden',
        
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    similarDetailsContainer: {
        flex: 4,
    },
    similarDetailsInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 0
        
    },
    name: {
        //fontFamily: 'Open-Sans-Bold',
        fontSize: 13,
    
    },
    crowd: {
       // fontFamily: 'Open-Sans-Regular',
        paddingTop: 5,
        fontSize: 12
    },
    distance: {
        //fontFamily: 'Open-Sans-Regular',
        fontSize: 12
    },
    header: {
        //fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        padding: 10,
    },
    rightNavIcon: {
        flex: 1,
    },
    rightNavIconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

});
