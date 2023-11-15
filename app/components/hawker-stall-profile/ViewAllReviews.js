import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReviewsList from './ReviewsList';

const ViewAllReviews = ({navigation, route}) => {
    const { reviews1, image, stallID, centre, place } = route.params;
     // State variable to store stallId
  const [storedReviews, setStoredReviews] = useState(null);

  // Use useEffect to set the storedStallId when stallId changes
  useEffect(() => {
    setStoredReviews(reviews1);
  }, [reviews1]);

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
    return(
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.text}>All Reviews</Text>
            </View>
            <View style={styles.reviewContainer}>
                {reviews1 &&  <ReviewsList reviews={reviews1} image={image} stallID={stallID} type={1} />}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.viewAllReviewsText} onPress={() => navigation.navigate('Profile', {centre: centre, place: place})}>Hide All</Text>
            </View>
        </View>
    );
}



export default ViewAllReviews;

const styles = StyleSheet.create({
    default: {
      width: '100%',
      height: '100%',
      flex: 2.1,
      flexDirection: 'column',
      marginTop: 35
    },
    header: {
        flex: 0.1,
    },
    reviewContainer: {
        flex: 1.9,
        
        
    },
    textContainer: {
        flex: 0.1,
        
        
    },
    text: {
      //  fontFamily: 'Open-Sans-Bold',
      fontWeight: 'bold',
        fontSize: 20,
        color: '#EB6C05',
        textAlign: 'center'

    },
    viewAllReviewsText: {
      //  fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingBottom: 15,
    },
  });
  