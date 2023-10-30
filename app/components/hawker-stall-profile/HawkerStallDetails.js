import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import StarRating from './StarRating';

SplashScreen.preventAutoHideAsync();

const Details = ({image, name, cuisine, address, contact, openingHours, rating, reviews}) => {

    //SEE IF STALL IS OPEN OR NOT
    const currentTime = new Date();

    function parseOpeningHours(openingHours){
        const [start, end] = openingHours.split(' - '); //IDK HOW THE OPENING HOURS IS SPLIT MUST CHECK API
        return { start, end };
    }

    function isOpen(openingHours) {
        const { start, end } = parseOpeningHours(openingHours);
    
        // Check if end time is on the next day
        if (end < start) {
            return currentTime >= start || currentTime <= end;
        }
    
        // Standard case: end time is on the same day
        return currentTime >= start && currentTime <= end;
    }

    const isOpenNow = isOpen(openingHours);

    const statusText = isOpenNow ? 'Open' : 'Close';



    //LOAD FONTS
    const [fontsLoaded, fontError] = useFonts({
        'Open-Sans': require('../../assets/fonts/Open_Sans/static/OpenSans-Regular.ttf'), 
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    
    if (!fontsLoaded && !fontError) {
        return null;
    }

    const numOfReviews = reviews.length;


    return (
        <View style={styles.overallContainer}>
            <View style={styles.container} onLayout={onLayoutRootView}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.keywordsContainer}>
                        <View style={styles.cuisineWord}>
                            <Text style={styles.text} >{cuisine}</Text>
                        
                        </View>
                        <View style={styles.openWord}>
                            <Text style={styles.text}>{statusText}</Text>
                        </View>   
                    </View>
                </View>
                <View style={styles.detailsMainContainer}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsSplit} >
                            <View style={styles.detailsLeftContainer}>
                                <Text style={styles.detailsAddress}>{address}</Text>
                                <Text style={styles.detailsOthers}>Contact: {contact}</Text>
                                <Text style={styles.detailsOthers}>Opening Hours: {openingHours}</Text>
                            </View>
                            <View style={styles.detailsRightContainer}>
                                <StarRating rating={rating} size={14} />
                                <Text style={styles.reviewsText} numberOfLines={1} ellipsizeMode="tail">{numOfReviews} Reviews</Text>
                            </View>
                        </View>
                    </View>
                </View>              
            </View>
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    overallContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        paddingBottom: 0
    },
    container: {
        flex: 3, //added flex
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    header: {
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        //height: '30%',
        flex: 1.4,

    },
    name: {
        fontFamily: 'Open-Sans-Regular', 
        fontSize: 24,
    },
    keywordsContainer: {
        marginTop: 2,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    cuisineWord: {
        backgroundColor: '#EB6C05',
        borderWidth: 1,
        borderColor: '#EB6C05',
        borderRadius: 1000,
        marginRight: 5,
    },
    openWord: {
        backgroundColor: '#7698CC',
        borderWidth: 1,
        borderColor: '#7698CC',
        borderRadius: 1000,
        marginRight: 5,
    },
    text: {
        color: 'white',
        padding: 4,
        fontSize: 10,
    },
    detailsMainContainer: {
        flex: 1.6,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    detailsContainer: {
        padding: 5,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#F4F4F8',
        backgroundColor: '#F4F4F8',
        height: '100%',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
        flex: 1,
        alignItems: 'center',
    },
    detailsSplit: {
        height: '100%',
        width: '100%',
        flex: 3,
        flexDirection: 'row',
    },
    detailsLeftContainer: {
        flex: 2,
        padding: 12,
        width: '100%',
        borderRightWidth: 5,
        borderRightColor: 'white',
        justifyContent: 'center'
    },
    detailsAddress: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#EB6C05',
        lineHeight: 14
    },
    detailsOthers: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#ADADAF',
        lineHeight: 14
    },
    detailsRightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewsText: {
        color: '#EB6C05',
        fontSize: 14,
        fontWeight: 'bold',
    }
});