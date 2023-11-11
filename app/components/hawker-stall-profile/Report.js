import React from 'react';
import { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Report = ({image, username, profilePic, upvote, downvote, description, date, type}) => {
 
    //set style types for viewing all vs view snapshot on profile
    const styleType = type===1 ? viewStyles : styles;

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(upvote);
    const [downvoteCount, setDownvoteCount] = useState(downvote);

    const handleUpvote = () => {
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
    };

  const handleDownvote = () => {
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
  };



    return (
        <View style={styleType.default}>
            <View style={styleType.innerContainer}>
                <Image style={styleType.image} source={image} />
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
                                <Text style={styleType.date}>{date}</Text>
                            </View>
                            <View style={styleType.votesContainer}>
                                <View style={styleType.vote}>
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
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styleType.descriptionContainer}>
                        <Text style={styleType.text} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Report;

const styles = StyleSheet.create({
    default: {
        margin: 5,
        borderWidth: 1,
        borderColor: '#F4F4F8',
        borderRadius: 30,
        width: '45%',
        height: '90%', 
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
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
        top: '25%',
        width: '100%',
        height: '75%',
        backgroundColor: 'white',
        flex: 2,
        flexDirection: 'column',
    },
    mainUserContainer: {
        flex: 1.3,
    },
    descriptionContainer: {
        flex: 0.7,
        padding: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },


    userContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    profileLogo: {
        flex: 1,
        padding: 5,
    },
    userDetails: {
        flex: 2.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 5
        
    },
    votesContainer: {
        flex: 1.5,

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
    
    name: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Bold',
        color: 'black',

    },
    date: {
        fontSize: 8,
      //  fontFamily: 'Open-Sans-Regular',
        color: 'black',
    },
    
    vote: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    
    text: {
        fontSize: 10
    }
    

});


const viewStyles = StyleSheet.create({
    default: {
        
        margin: 5,
        borderWidth: 1,
        borderColor: '#F4F4F8',
       
        borderRadius: 30,
        width: '45%',
        height: '16%', 
        //overflow: 'hidden', // Clip any content that overflows the container
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
        top: '25%',
        width: '100%',
        height: '75%',
        backgroundColor: 'white',
        flex: 2,
        flexDirection: 'column',
    },
    mainUserContainer: {
        flex: 1.3,
    },
    descriptionContainer: {
        flex: 0.7,
        padding: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        
    },


    userContainer: {
        flex: 5,
        flexDirection: 'row',
    },
    profileLogo: {
        flex: 1,
        padding: 5,
    },
    userDetails: {
        flex: 2.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 5
        
    },
    votesContainer: {
        flex: 1.5,

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
    
    name: {
        fontSize: 8,
        //fontFamily: 'Open-Sans-Bold',
        color: 'black',

    },
    date: {
        fontSize: 8,
       // fontFamily: 'Open-Sans-Regular',
        color: 'black',
    },
    
    vote: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        //fontFamily: 'Open-Sans-Regular',
    },
    
    text: {
        fontSize: 10
    }
    

});

