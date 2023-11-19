import React from 'react';
import { StyleSheet, View } from 'react-native';
import Review from './Review';

const ReviewsList = ({ image, reviews, type, stallID }) => {

    const reviewsList = reviews.map((review, index) => (
        <Review
                     key={index}
                     image={image}
                     username={review.username}
                     profilePic={require('../../assets/avatar.png')}
                     upvote={review.votes}
                     downvote={0}
                     description={review.description}
                     date={review.timestamp}
                     rating={review.rating}
                     stallID={stallID}
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
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
});