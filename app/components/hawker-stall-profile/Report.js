import React from 'react';
import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { getDownloadURL, getStorage, ref } from "firebase/storage"
import { initializeApp } from "firebase/app";

const Report = ({image, username, profilePic, upvote, downvote, description, date, stallID, type}) => {
 
    //set style types for viewing all vs view snapshot on profile
    const styleType = type===1 ? viewStyles : styles;
    const [reportID, setReportID] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const storage = getStorage();
    const firebaseConfig = {
        apiKey: "AIzaSyA35CAAxfnVPCZuAmD44ic9AZG_TExU8dw",
        authDomain: "sgbytes.firebaseapp.com",
        projectId: "sgbytes",
        storageBucket: "sgbytes.appspot.com",
        messagingSenderId: "766295476965",
        appId: "1:766295476965:web:131a044224867bf452e20c",
        measurementId: "G-RWGZJLPD4G"
      };
    
      // Initialize Firebase
    const app = initializeApp(firebaseConfig);


    useEffect(() => {
        async function fetchData() {
          try {
            console.log("username", username)
            const response = await fetch('http://127.0.0.1:5000/reports/getUserReports?username=' + username , {
              method: 'GET'
            });
    
            // if (response.status === 200) {
              const jsonString = await response.text();
              const parsedData = JSON.parse(jsonString);
              console.log("report", parsedData)
              if (parsedData.result === "Success"){
                const report = parsedData.list.find(stall => stall.stallID === stallID);
                setReportID(report.reportID);
                if (report.image){
                    const pathReference = ref(storage, 'reports/'+stallID+'_'+report.reportID+'.jpg');
                    try{
                        const url = await getDownloadURL(pathReference); 
                        setImageURL(url);
                    }catch(error) {console.log(error)};
                }else{
                    setImageURL("https://i.imgur.com/45cWimK.png")
                }        
    
            } 
            // }}else {
            //   throw new Error('Error retrieving user information: ' + response.status);
            // }}
          } catch (error) {
            console.error('Error getting user information:', error);
          }
        }
    
        // Call the async function
        fetchData();
        
      },[stallID]); 

    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(upvote);
    const [downvoteCount, setDownvoteCount] = useState(downvote);

    const handleUpvote = async () => {
        console.log("upvote", upvote)
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
                    "reportID": reportID,
                    "upvote": true,
                    
                })
            };
            const response = await fetch('http://127.0.0.1:5000/reports/voteReport', requestOptions);
            const data = await response.json();
            console.log(data.result);
            
        }catch (error){
            console.log(error)
        }
    };

  const handleDownvote = async () => {
    console.log("downvote", downvote)
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
                "reportID": reportID,
                "upvote": true,
                
            })
        };
        const response = await fetch('http://127.0.0.1:5000/reports/voteReport', requestOptions);
        const data = await response.json();
        console.log(data.result);
        
    }catch (error){
        console.log(error)
    }
  };

    return (
        <View style={styleType.default}>
            <View style={styleType.innerContainer}>
            <Image style={styleType.image} source={{uri: `${imageURL}`}} /> 
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
                                <Text style={styleType.date}>{Date(date.toLocaleString("en-US", { timeZone: "Asia/Singapore" }))}</Text>
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
        paddingRight: 7,

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
        paddingRight: 7,

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
        textAlign: 'center',
        //fontFamily: 'Open-Sans-Regular',
    },
    
    text: {
        fontSize: 10
    }
    

});

