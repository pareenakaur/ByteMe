import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Octicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import Banner  from './Banner';
import Details from './HawkerStallDetails';
import ReportsList from './ReportsList';
import ReviewsList from './ReviewsList';
import { getHawkerStallDetails } from '../../utils/RetrieveDetails';

//need to retrieve place id from explore function --> figure out which component in which js file to import to call function and/or get place id

const Profile = ({place, navigation}) => {

    const report = {
        image: require("../../assets/HawkerStallImage.jpg"),
        username: "User1",
        date: "7 Sept 2023, 11:00 am",
        profilePic:  require("../../assets/img5.jpg"),
        upvote: 100,
        downvote: 50,
        description: "The stall is closed! Y'all should go to some other stall today!"
    }

    const review = {
        image: require("../../assets/Uncles_Best_Fried_Rice.png"),
        username: "User1",
        date: "7 Sept 2023, 11:00 am",
        profilePic: require("../../assets/img5.jpg"),
        rating: 4,
        upvote: 1,
        downvote: 1,
        description: "Very nice! Honestly the best fried rice I have eaten ever :>"
    }

    //get Hawker Stall Details from backend:
    const placeId = null; //get placeid from some function
    //const HawkerStallArray = getHawkerStallDetails(placeId);
    //also need to get reviews and reports from backend

    const HawkerStall = { // replace the stuff below HawkerStallArray values & reviews and reports
        image: require("../../assets/HawkerStallImage.jpg"),
        name: "Adam Fishball Noodle",
        cuisine: "Chinese Cuisine",
        address: "2 Adam Rd, Singapore 289876 Floor 1, Stall 25",
        contact: "9638 4934",
        openingHours: "6am - 3pm",
        rating: 4.35,
        reviews: [review, review, review, review],
        reports: [report, report, report, report],
    }

    const reportsList = HawkerStall.reports;
    const reviewsList = HawkerStall.reviews;

    return(
        <View style={styles.default} >
            <Banner image={HawkerStall.image} />
            <AntDesign style={styles.navigationButton} name="leftcircle" size={26} color="#EB6C05" onPress={() => navigation.navigate('ExplorePage')}/>
            <View style={styles.overlayContainer}>
                <View style={styles.containers}>
                    <View style={styles.details}>
                        <Details image={HawkerStall.image}
                            name={HawkerStall.name}
                            cuisine={HawkerStall.cuisine}
                            address={HawkerStall.address}
                            openingHours={HawkerStall.openingHours}
                            rating={HawkerStall.rating}
                            reviews={HawkerStall.reviews}
                            contact={HawkerStall.contact}/>
                    </View>


                    <View style={styles.reports}>
                        <View style={styles.reportContainer}>
                            <View style={styles.reportHeader}>
                                <View style={styles.reportHeaderFlex}>
                                    <Text style={styles.text}>Latest Reports</Text>
                                    <Octicons name="report" size={20} color="black" onPress={() => navigation.navigate('ReportForm')}/>
                                </View>
                            </View>
                            <View style={styles.reportMainContainer}>
                                <View style={styles.reportsNavContainer}>
                                    <View style={styles.reportViews}>
                                        <View style={styles.reportViewsContainer}>
                                            <ReportsList reports={reportsList} type={0}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.viewAllReports}>
                                <Text style={styles.viewAllReportText} onPress={() => navigation.navigate('ViewAllReports', {reportsList})}>View All</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.reviews}>
                        <View style={styles.reviewContainer}>
                            <View style={styles.reviewHeader}>
                                <View style={styles.reviewHeaderFlex}>
                                    <View style={styles.reviewTitle}>
                                        <Text style={styles.text}>Reviews</Text>
                                    </View>
                                    <View style={styles.addReviewIcon}>
                                        <Ionicons name="add-circle" size={24} color="#EB6C05" onPress={() => navigation.navigate('ReviewForm', {navigation})}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.reviewMainContainer}>
                                    <View style={styles.reviewsList}>
                                            <ReviewsList reviews={HawkerStall.reviews} />
                                    </View>

                            </View>
                            <View style={styles.viewAllReviews}>
                                <Text style={styles.viewAllReviewText} onPress={() => navigation.navigate('ViewAllReviews', {reviewsList})}>View All</Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>
        </View>
    );
};

export default Profile;

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
        top: '15%',
        width: '100%',
        height: '85%',
        backgroundColor: 'white',
    },


    containers: {
        width: '100%',
        height: '100%',
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },

    details: {
        flex: 2.5,
    },

    reports: {
        flex: 3.25,
    },
    reviews: {
        flex: 4.25
    },
    



    reportContainer: {
        flex: 7,
        margin: 5,
        height: '100%'
        
    },
    reportHeader: {
        flex: 1.8
        
    },
    reportMainContainer: {
        flex: 4,
        
    },
    viewAllReports: {
        flex: 1.2,

    },
    
    
    reportsNavContainer: {
        flex: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftNavIcon: {
        flex: 0.5,
    },
    reportViews: {
        flex: 4,
        
    },
    rightNavIcon: {
        flex: 0.5,
    },
    


    reportHeaderFlex: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    text: {
        //fontFamily: 'Open-Sans-Bold',
        fontSize: 20,
        color: '#EB6C05',

    },
    
    
   
    leftNavIconContainer: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
    },
    rightNavIconContainer: {
        flex: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    reportViewsContainer: {
        width: '100%',

    },
    
    
    
    viewAllReportText: {
       // fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
        
    },



    
    reviewContainer: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        
    },
    reviewHeader: {
        flex: 1
        
    },
    reviewMainContainer: {
        flex: 4.5,
        padding: 5,
        paddingTop: 0,
    },
    viewAllReviews: {
        flex: 0.5,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingBottom: 10,
    },




    reviewHeaderFlex: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 2
    },
    reviewTitle: {
        flex: 1.9,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    addReviewIcon: {
        flex: 1.1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 5,
        marginRight: 10
    },
    


    reviewsList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%', // Set your desired maximum width here
        overflow: 'hidden',
    },
    
    viewAllReviewText: {
        //fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },


    navContainer: {
        height: '100%',
        width: '100%',
        borderWidth: 1,
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