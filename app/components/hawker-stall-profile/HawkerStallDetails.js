import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StarRating from './StarRating';


const Details = ({name, address, openStatus, openingHours, rating, reviews}) => {

    //SEE IF STALL IS OPEN OR NOT
    const currentTime = new Date();
    const currentDay = currentTime.getDay();

    function getDay() {
        const d = new Date();
        let day = d.getDay();
        return (day + 6) % 7;
    }
    
//     function parseOpeningHours(openingHours) {
//         console.log(openingHours);
//         if (openingHours === 'Not available') {
//             return null;
//         }
    
//         const [day, timeRange] = openingHours.split(': ', 2);
//         console.log('Hello' + timeRange);
//         const [start, end] = timeRange.split('–').map(time => time.trim());; // Adjust the split based on the actual separator
//         console.log('end' + end);
//   // Add AM/PM information to the parsed result
//   const startTime = parseTimeWithAmPm(start);
//   const endTime = parseTimeWithAmPm(end);

//   return { day, start: startTime, end: endTime };
// }

// function parseTimeWithAmPm(timeString) {
//     console.log('tiemstring'+ timeString)
//   const [time, period] = timeString.split(/\s+/);
//   console.log('time'+time);
//   console.log('period'+period);

//   if (time && period) {
//     // Assuming the time is in the format HH:mm
//     const [hours, minutes] = time.split(':');
//     let parsedHours = parseInt(hours, 10);

//     // Adjust hours for PM
//     if (period.toUpperCase() === 'PM' && parsedHours !== 12) {
//       parsedHours += 12;
//     }

//     // Adjust hours for AM when it's 12 AM
//     if (period.toUpperCase() === 'AM' && parsedHours === 12) {
//       parsedHours = 0;
//     }

//     const parsedTime = new Date();
//     parsedTime.setHours(parsedHours);
//     parsedTime.setMinutes(parseInt(minutes, 10));

//     return parsedTime;
//   }

//   return null;
// }
//     function isOpen(openingHours) {
//     if (!openingHours || openingHours === 'Not available') {
//         return 'Not Available';
//     }

//     const { start, end } = parseOpeningHours(openingHours);
    
//     // Check if end time is on the next day
//     if (end < start) {
//         return currentTime >= start || currentTime <= end;
//     }

//     // Standard case: end time is on the same day
//     return currentTime >= start && currentTime <= end;
//     }

//     const isOpenNow = isOpen(openingHours[currentDay]);

//     const statusText = isOpenNow === 'Not Available' ? 'Not Available' : isOpenNow ? 'Open' : 'Closed';

    



    return (
        <View style={styles.overallContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.keywordsContainer}>
                        {/* <View style={styles.cuisineWord}>
                            <Text style={styles.text} >{cuisine}</Text>
                        
                        </View> */}
                        {openStatus===true?
                           <View style={styles.openWord}>
                            <Text style={styles.text}>Open</Text>
                            </View>
                        : <View style={styles.closeWord}>
                            <Text style={styles.text}>Not Open</Text>
                            </View>
                        }
                           
                    </View>
                </View>
                <View style={styles.detailsMainContainer}>
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailsSplit} >
                            <View style={styles.detailsLeftContainer}>
                                <Text style={styles.detailsAddress}>{address}</Text>
                                <Text style={styles.detailsOthers}>{openingHours === "not available" ? "Opening hours: Not Available" : openingHours[getDay()]}</Text>
                            </View>
                            <View style={styles.detailsRightContainer}>
                                <StarRating rating={rating} size={14} />
                                <Text style={styles.reviewsText} numberOfLines={1} ellipsizeMode="tail">{reviews} Reviews</Text>
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
        //fontFamily: 'Open-Sans-Regular', 
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
        backgroundColor: '#FCC827',
        borderRadius: 1000,
        marginRight: 5,
    },
    closeWord:{
        backgroundColor: '#FA4A0C',
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