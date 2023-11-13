import React from 'react';
import { StyleSheet, View } from 'react-native';
import Review from './Review';

const ReviewsList = ({ hawkerStall, reviews, type }) => {

    const reviewsList = reviews.map((review, index) => (
        <Review
                     key={index}
                     image={hawkerStall.image}
                     username={review.username}
                     profilePic={require('../../assets/avatar.png')}
                     upvote={review.votes}
                     downvote={0}
                     description={review.description}
                     date={review.timestamp}
                     rating={review.rating}
                     type={type}
                   />
      ));
            
        
    
    
    // Map the array of reports to Report components
//     const reviewsList = reviews.map((reviewObj, index) => {
//         const review = reviewObj[index];
//       <Review
//         key={index}
//         image={hawkerStall.image}
//         username={review.username}
//         profilePic={'app/assets/avatar.png'}
//         upvote={review.upvote}
//         downvote={0}
//         description={review.description}
//         date={"7 Sept 2023, 11:00 am"}
//         rating={review.rating}
//         type={type}
//       />
// });
  
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
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },
});