import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReviewsList from './ReviewsList';

const ViewAllReviews = ({navigation, route}) => {
    const {reviewsList} = route.params;
    return(
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.text}>All Reviews</Text>
            </View>
            <View style={styles.reviewContainer}>
                <ReviewsList reviews={reviewsList} type={1} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.viewAllReviewsText} onPress={() => navigation.navigate('Profile')}>Hide All</Text>
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
        fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#EB6C05',
        textAlign: 'center'

    },
    viewAllReviewsText: {
        fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingBottom: 15,
    },
  });
  