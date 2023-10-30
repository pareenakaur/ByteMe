import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Banner from '../hawker-stall-profile/Banner';
import Summary from './HawkerCenterSummary';
import SimilarHawkersList from './SimilarHawkersList';


const MainPage = ({nearbyHawkers, navigation}) => {

    const report = {
        image: require("../../assets/HawkerStallImage.jpg"),
        username: "User1",
        date: "7 Sept 2023, 11:00 am",
        profilePic:  require("../../assets/img5.jpg"),
        upvote: 100,
        downvote: 50,
        description: "It's CLOSED!"
    }

    const review = {
        image: require("../../assets/Uncles_Best_Fried_Rice.png"),
        username: "User1",
        date: "7 Sept 2023, 11:00 am",
        profilePic: require("../../assets/img5.jpg"),
        rating: 4,
        upvote: 1,
        downvote: 1,
        description: "Very nice"
    }

    const HawkerCentre = {
        image: require("../../assets/adam-food-centre.jpg"),
        name: "Adam Road Food Centre",
        crowdLevel: "Moderate",
        cuisineList: ["Halal", "Vegetarian", "Chinese Cuisine", "Indian Cuisine"],
        address: "2 Adam Rd, Singapore 289876",
        openingHours: "6am - 3pm",
        rating: 4.35,
        reviews: [review, review, review, review],
    }

    const similarHawkerDetails = {
        image: require("../../assets/adam-food-centre.jpg"),
        name: "Adam Road Food Centre",
        crowdLevel: "Moderate",
        distance: 3
    }

    const similarHawkers = [similarHawkerDetails, similarHawkerDetails, similarHawkerDetails];


    return(
        <View style={styles.default} >
            <Banner image={HawkerCentre.image} />
            <AntDesign style={styles.navigationButton} name="leftcircle" size={26} color="#EB6C05" onPress={() => navigation.navigate('ExplorePage')}/>
            <View style={styles.overlayContainer}>
                <View style={styles.containers}>
                    <View style={styles.details}>
                        <Summary
                            name={HawkerCentre.name}
                            crowdLevel={HawkerCentre.crowdLevel}
                            cuisineList={HawkerCentre.cuisineList}
                            address={HawkerCentre.address}
                            openingHours={HawkerCentre.openingHours}
                            rating={HawkerCentre.rating}
                            reviews={HawkerCentre.reviews}
                            />
                    </View>
                    <View style={styles.similarHawkers}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>Similar Hawkers Nearby</Text>
                        </View>
                        <SimilarHawkersList similarHawkers={similarHawkers}/> 
                    </View>
                    
                    
                </View>
            </View>

        </View>
    );
};

export default MainPage;

const styles = StyleSheet.create({
    default: {
        width: '100%',
        height: '100%',
    },
    navigationButton: {
        position: 'absolute',
        top: '7%',
        left: '5%'
    },
    overlayContainer: {
        zIndex: 1,
        position: 'absolute',
        top: '16%',
        width: '100%',
        height: '84%',
        backgroundColor: 'white',
    },


    containers: {
        width: '100%',
        height: '100%',
        flex: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },
    details: {
        flex: 3,
    },

    similarHawkers: {
        flex: 5,
        
    },
    


    header: {
        marginTop: 10,
        marginLeft: 15,
        padding: 10,
        paddingBottom: 0
    },
    headerText: {
        fontFamily: 'Open-Sans-Regular',
        fontSize: 26
    },
    


    navContainer: {
        height: '70%',
        width: '80%',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: 'gold',

        backgroundColor: 'gold'
    },
    iconsContainer: {
        flex: 3,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});