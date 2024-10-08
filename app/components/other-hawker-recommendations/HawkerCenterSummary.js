import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import StarRating from '../hawker-stall-profile/StarRating';


const Summary = ({ name, crowdColor, crowdLevel, cuisineList,  address, openingHours, rating, reviews }) => {

    let foodOptions = [];
    let cuisines = [];
    if (cuisineList !== null){
        console.log(cuisineList);
        if(cuisineList["vegetarian"]!== "not available"){
            foodOptions.push("Vegetarian");
        }
        foodOptions.push("Halal");

        cuisines = foodOptions.map((cuisine, index) => (
            <View key={index} style={styles.keywordStyle}>
                <Text style={styles.text}>{cuisine}</Text>
            </View>
       ));
    }
    

    return (
        <View style={styles.overallContainer}>
            
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.keywordsContainer}>
                        <View style={styles.detailsSplit}>
                            <View style={styles.summaryLeftContainer}>
                                <Text style={styles.detailsAddress}>{address}</Text>
                                <Text style={styles.detailsOthers}>Opening Hours: {openingHours}</Text>
                            </View>
                            <View style={styles.summaryRightContainer}>
                                <View style={{backgroundColor:crowdColor, borderRadius:1000}}>
                                    <Text style={styles.crowd} >{crowdLevel}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.detailsMainContainer}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsSplit} >
                            <View style={styles.detailsLeftContainer}>
                                <Text style={styles.detailsOthers}>Food Options Available</Text>
                                <View style={styles.keywordsList}>

                                    {cuisines}

                                </View>
                            </View>
                            <View style={styles.detailsRightContainer}>
                                <StarRating rating={rating} size={18} />
                                <Text style={styles.reviewsText}>{reviews} Reviews</Text>
                            </View>
                        </View>
                    </View>
                </View>              
            </View>
        </View>

    );
};

export default Summary;

const styles = StyleSheet.create({
    overallContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
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
        flex: 1.4,

    },
    name: {
        fontSize: 26,
    },
    keywordsContainer: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    keywordStyle: {
        backgroundColor: '#EB6C05',
        borderWidth: 1,
        borderColor: '#EB6C05',
        borderRadius: 1000,
        marginRight: 3,
        marginLeft: 0,
        marginTop: 5,
        paddingLeft: 2,
        paddingRight: 2
    },
    keywordsList: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        
    },
    text: {
        color: 'white',
        padding: 4,
        fontSize: 10,
        textAlign: 'center'
    },
    detailsMainContainer: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    detailsContainer: {
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
    summaryLeftContainer: {
        flex: 2,
        paddingBottom: 10,
        width: '100%',
        justifyContent: 'center'
    },
    detailsLeftContainer: {
        flex: 2,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 5,
        width: '100%',
        borderRightWidth: 5,
        borderRightColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    detailsAddress: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#EB6C05',
        lineHeight: 17
    },
    detailsOthers: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#ADADAF',
        lineHeight: 17,
    },
    detailsRightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summaryRightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    crowdLevel: {
        backgroundColor: 'gold',
        borderRadius: 1000,
    },
    crowd: {
        color: 'black',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 10,
    },
    reviewsText: {
        color: '#EB6C05',
        fontSize: 16,
        fontWeight: 'bold',
    }
});