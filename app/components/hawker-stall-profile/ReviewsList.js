import React from 'react';
import { StyleSheet, View } from 'react-native';
import Review from './Review';

const ReviewsList = ({ reviews, type }) => {
    // Map the array of reports to Report components
    const reviewsList = reviews.map((reviewObj, index) => (
      <Review
        key={index}
        image={reviewObj.image}
        username={reviewObj.username}
        profilePic={reviewObj.profilePic}
        upvote={reviewObj.upvote}
        downvote={reviewObj.downvote}
        description={reviewObj.description}
        date={reviewObj.date}
        rating={reviewObj.rating}
        type={type}
      />
    ));
  
    return (<View style={styles.default}>
                <View style={styles.container}>
                    {reviewsList}
                </View>
            </View>);
};

export default ReviewsList;

const styles = StyleSheet.create({
    default: {
        width: '100%',
        height: '100%',
        
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
});