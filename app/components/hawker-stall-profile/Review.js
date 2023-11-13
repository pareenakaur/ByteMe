import React, {useState, useEffect} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import StarRating from './StarRating';

const Review = ({image, username, date, profilePic, upvote, downvote, rating, description, type, stallID}) => {

    //set style types for viewing all vs view snapshot on profile
    const styleType = type===1 ? viewStyles : styles;

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(upvote);
    const [downvoteCount, setDownvoteCount] = useState(downvote);
   

    const [reviewID, setReviewID] = useState(null);
    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch('http://127.0.0.1:5000/reviews/getUserReviews?username=' + username , {
              method: 'GET'
            });
    
            if (response.status === 200) {
              const jsonString = await response.text();
              const parsedData = JSON.parse(jsonString);
              console.log(parsedData);
              setReviewID(parsedData.list.find(stall => stall.stallID === stallID).reviewID);
            } else {
              throw new Error('Error retrieving user information: ' + response.status);
            }
          } catch (error) {
            console.error('Error getting user information:', error);
          }
        }
    
        // Call the async function
        fetchData();
      },[stallID]); 

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
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    "username": global.usrName,
                    "reviewID": stallID,
                    "upvote": true,
                    
                })
            };
            const response = await fetch('http://127.0.0.1:5000/reviews/voteReview', requestOptions);
            const data = await response.json();
            console.log(data.result);
            
        }catch (error){
            console.log(error)
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
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    "username": global.usrName,
                    "reviewID": stallID,
                    "upvote": false,
                    
                })
            };
            const response = await fetch('http://127.0.0.1:5000/reviews/voteReview', requestOptions);
            const data = await response.json();
            console.log(data.result);
            
        }catch (error){
            console.log(error)
        }
    };




    return (
        <View style={styleType.container}>
            <View style={styleType.innerContainer}>
                <Image style={styleType.image} source={{uri: `${image}`}} />
                <View style={styleType.overlayContainer}>
                    <View style={styleType.mainUserContainer} >
                        <View style={styleType.userContainer}>
                            <View style={styleType.profileLogo}>
                                <View style={styleType.profileLogoContainer}>
                                <Image style={styleType.profilePic} source={profilePic} />
                                </View>
                            </View>
                            <View style={styleType.userDetails}>
                                <Text style={styleType.name}>{username}</Text>
                                <Text style={styles.date}>{date}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styleType.descriptionContainer}>
                        <Text style={styleType.descriptionStyle} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
                    </View>
                    <View style={styleType.ratingContainer}>
                        <StarRating rating={rating} size={12}/>
                    </View>
                    <View style={styleType.votesContainer}>
                        <View style={styleType.vote}>
                            <View style={styleType.emptyView}>

                            </View>
                            <TouchableOpacity onPress={handleUpvote} disabled={downvoted}>
                                <View style={styleType.upvote}>
                                    <FontAwesome name="thumbs-o-up" size={15} color={upvoted ? 'orange' : 'black'} />
                                    <Text style={styleType.voteNum}>{upvoteCount}</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleDownvote} disabled={upvoted}>
                                <View style={styleType.downvote}>
                                    <FontAwesome name="thumbs-o-down" size={15} color={downvoted ? 'orange' : 'black'} />
                                    <Text style={styleType.voteNum}>{downvoteCount}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styleType.emptyView}>

                            </View>    
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
        borderColor: '#F4F4F8',
        borderRadius: 30,
        width: '30%',
        height: 'auto', 
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        
    },
    innerContainer: {
        borderWidth: 0,
        borderColor: '#F4F4F8',
        borderRadius: 30,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    overlayContainer: {
        zIndex: 1,
        position: 'absolute',
        top: '35%',
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        flex: 10,
        flexDirection: 'column',
    },
    mainUserContainer: {
        flex: 3,
    },
    userContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    profileLogo: {
        flex: 1,
        padding: 5,
    },
    profileLogoContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100,
        aspectRatio: 1,
        overflow: 'hidden',
    },
    profilePic: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    userDetails: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 5,
        
        
    },
    name: {
        fontSize: 12,
        //fontFamily: 'Open-Sans-Regular',
        color: 'black',
        
    },
    date: {
        fontSize: 7,
       // fontFamily: 'Open-Sans-Regular',
        color: 'black',
        
    },
    
    descriptionContainer: {
        flex: 2,
        paddingTop: 20,
        
        flexDirection: 'row',
        justifyContent: 'center',
    },

    descriptionStyle: {
        fontSize: 12,
    },
    ratingContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
    },
    votesContainer: {
        flex: 3,
        marginBottom: 10,
    },
    vote: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        
    },
    upvote: {
        flex: 1,
        alignItems: 'center',
        
    },
    downvote: {
        flex: 1,
        alignItems: 'center',

    },
    voteNum: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Regular',
    },
    voteNum: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Regular',
    },
    emptyView: {
        flex: 1
    }


});


const viewStyles = StyleSheet.create({
    container: {
        margin: 5,
        borderWidth: 2,
        borderColor: '#F4F4F8',
        borderRadius: 30,
        width: '30%',
        height: '30%', 
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
    },
    innerContainer: {
        borderWidth: 0,
        borderColor: '#F4F4F8',
        borderRadius: 30,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    overlayContainer: {
        zIndex: 1,
        position: 'absolute',
        top: '35%',
        width: '100%',
        height: '65%',
        backgroundColor: 'white',
        flex: 10,
        flexDirection: 'column',
    },
    mainUserContainer: {
        flex: 3,
    },
    userContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    profileLogo: {
        flex: 1,
        padding: 5,
    },
    profileLogoContainer: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100,
        aspectRatio: 1,
        overflow: 'hidden',
    },
    profilePic: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    userDetails: {
        flex: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 5
        
    },
    name: {
        fontSize: 12,
      //  fontFamily: 'Open-Sans-Regular',
        color: 'black',
        
    },
    date: {
        fontSize: 7,
      // fontFamily: 'Open-Sans-Regular',
        color: 'black',
        
    },
    
    descriptionContainer: {
        flex: 2,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    descriptionStyle: {
        fontSize: 12,
    },
    ratingContainer: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 5,
    },
    votesContainer: {
        flex: 3,
        marginBottom: 10,
    },
    vote: {
        flex: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 5,
    },
    upvote: {
        flex: 1,
        alignItems: 'center',
        
    },
    downvote: {
        flex: 1,
        alignItems: 'center',

    },
    voteNum: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Regular',
    },
    voteNum: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Regular',
    },
    emptyView: {
        flex: 1
    }


});

