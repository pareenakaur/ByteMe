import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Banner from '../hawker-stall-profile/Banner';
import Summary from './HawkerCenterSummary';
import SimilarHawkersList from './SimilarHawkersList';
import { getNearbyHawkerCenters, getHawkerStallDetails } from '../../utils/RetrieveDetails';

//need to retrieve place id from explore function --> figure out which component in which js file to import to call function and/or get place id

const MainPage = ({route, navigation}) => {

    const {hawkerCentre} = route.params;
    
    const [nearbyHawkerCentres, setNearbyHawkerCentres] = useState(null);
    const distance = 5000;
    useEffect(() => {
        async function fetchData() {
            console.log(hawkerCentre);
            try {
                const url = `http://127.0.0.1:5000/hawkers/getNearbyHawkerCentres?id=${hawkerCentre.place_id}&distance=${distance}&format=1`;
            
                const response = await fetch(url, {
                  method: 'GET'
                });
            
                if (response.status === 200) {
                  const jsonString = await response.text();
                  const parsedData = JSON.parse(jsonString);
                  setNearbyHawkerCentres(parsedData);
                  
                  
                  
                  
                } else {
                  throw new Error('Error retrieving stall information: ' + response.status);
                }
              } catch (error) {
                console.error('Error getting stall information:', error);
              }
          }
    
        // Call the async function
        fetchData();
      },[hawkerCentre]); 

    function getDay(){
        const d = new Date();
        let day = d.getDay();
        return (day+6)%7;
    }

    function decideColor(capacity) {
        if (capacity === "not available"){
        return "rgba(0,0,0,0.15)"
        } else if (capacity < 0.3) {
        return "rgba(255,0,0,0.15)";
        } else if (capacity >= 0.3 && capacity <= 0.6) {
        return"rgba(255,95,21,0.15)";
        } else {
        return "rgba(0,255,0,0.15)";
        }
    }

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

    
    return(
        <View style={styles.default} >

            <Banner image={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${hawkerCentre.photo_reference}&key=AIzaSyD3YKpWEopq3wrYDEj8c2AAajWoXPTl2zo`} /><AntDesign style={styles.navigationButton} name="leftcircle" size={26} color="#EB6C05" onPress={() => navigation.navigate('ExplorePage')} /><View style={styles.overlayContainer}>
                    <View style={styles.containers}>
                        <View style={styles.details}>
                            {nearbyHawkerCentres && hawkerCentre && <Summary
                                name={hawkerCentre["name"]}
                                crowdColor = {decideColor(hawkerCentre["crowdedness"])}
                                crowdLevel={decideCrowdedText(decideColor(hawkerCentre["crowdedness"]))}
                                cuisineList={hawkerCentre["tags"]}
                                address={hawkerCentre["address"]}
                                openingHours={hawkerCentre["opening_hours"][getDay()]}
                                rating={hawkerCentre["rating"]}
                                reviews={hawkerCentre["review"]} />}
                        </View>
                        <View style={styles.similarHawkers}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>Similar Hawkers Nearby</Text>
                            </View>
                            {nearbyHawkerCentres && hawkerCentre && <SimilarHawkersList similarHawkers={nearbyHawkerCentres} navigation={navigation} />}
                        </View>


                    </View>
                </View>

        </View>
    );
};

export default MainPage;

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
        top: '16%',
        width: '100%',
        height: '84%',
        backgroundColor: 'white',
    },


    containers: {
        width: '100%',
        height: '100%',
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },
    details: {
        flex: 3,
    },

    similarHawkers: {
        flex: 5,
        
    },

    header: {
        marginTop: 10,
        marginLeft: 15,
        padding: 10,
        paddingBottom: 0
    },
    headerText: {
       // fontFamily: 'Open-Sans-Regular',
        fontSize: 26
    },
    


    navContainer: {
        height: '70%',
        width: '80%',
        borderWidth: 1,
        borderRadius: 40,
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