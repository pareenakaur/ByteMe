// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const ViewPastReports = ({navigation}) => {
    
//      // State variable to store stallId
//   const [storedReports, setStoredReports] = useState(null);

//   // Use useEffect to set the storedStallId when stallId changes
//   useEffect(() => {
//     getUserReports();
//   }, []);

    
//     const getUserReports = async() => {
//         try{
//             const response = await fetch("http://127.0.0.1:5000/reports/getUserReports?username="+global.usrName);
//             const data = await response.json();
//             console.log(data.result)
//             const arr = []
//             if(data.result === "Success"){
//                 setStoredReports(data.list);
//                 for (let i=0; i<data.list.length; i++){
                    
//                     arr.push(
//                             <View style={styleType.default}>
//                                 <View style={styleType.innerContainer}>
//                                 <Image style={styleType.image} source={{uri: `${imageURL}`}} /> 
//                                     <View style={styleType.overlayContainer}>
//                                         <View style={styleType.mainUserContainer} >
//                                             <View style={styleType.userContainer}>
//                                                 <View style={styleType.profileLogo}>
//                                                     <View style={styleType.profileLogoContainer}>
//                                                     <Image style={styleType.profilePic} source={profilePic} />
//                                                     </View>
//                                                 </View>
//                                                 <View style={styleType.userDetails}>
//                                                     <Text style={styleType.name}>{username}</Text>
//                                                     <Text style={styleType.date}>{date}</Text>
//                                                 </View>
//                                                 <View style={styleType.votesContainer}>
//                                                     <View style={styleType.vote}>
//                                                         <TouchableOpacity onPress={handleUpvote} disabled={downvoted}>
//                                                             <View style={styleType.upvote}>
//                                                             <FontAwesome name="thumbs-o-up" size={15} color={upvoted ? 'orange' : 'black'} />
//                                                             <Text style={styleType.voteNum}>{upvoteCount}</Text>
//                                                             </View>
//                                                         </TouchableOpacity>
                    
//                                                         <TouchableOpacity onPress={handleDownvote} disabled={upvoted}>
//                                                             <View style={styleType.downvote}>
//                                                                 <FontAwesome name="thumbs-o-down" size={15} color={downvoted ? 'orange' : 'black'} />
//                                                                 <Text style={styleType.voteNum}>{downvoteCount}</Text>
//                                                             </View>
//                                                         </TouchableOpacity>
//                                                     </View>
//                                                 </View>
//                                             </View>
//                                         </View>
//                                         <View style={styleType.descriptionContainer}>
//                                             <Text style={styleType.text} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         );
//                     };
//                 }
                
//             }
//         }catch(error){
//             console.log(error);
//         }
//     }
//     const HawkerStall = { 
//         image: require("../../assets/HawkerStallImage.jpg"),
//         //name: stallData.name,
//         //address: stallData.formatted_address,
//         //contact: stallData.formatted_phone_number,
//         //openingHours: "6am - 3pm",
//         //rating: stallData.rating,
//         //reviews: reviews1,
//         //reports: reports1,
//     }
    
//     return(
//         <View style={styles.default}>
//             <View style={styles.header}>
//                 <Text style={styles.text}>All Reports</Text>
//             </View>
//             <View style={styles.reportContainer}>
//                 {storedReports && <ReportsList reports={storedReports} image={image} stallID={stallID} type={1} />}
//             </View>
//             <View style={styles.textContainer}>
//                 <IconButton icon={"chevron-left-box"} size={30} iconColor ={"orange"} onPress={() => navigation.navigate('ProfilePage')}>Back</IconButton>
//             </View>
//         </View>
//     );
// }

// export default ViewAllReports;

// const styles = StyleSheet.create({
//     default: {
//       width: '100%',
//       height: '100%',
//       flex: 2.1,
//       flexDirection: 'column',
//       marginTop: 35
//     },
//     header: {
//         flex: 0.1,
//     },
//     reportContainer: {
//         flex: 1.9,        
//     },
//     textContainer: {
//         flex: 0.1,
//         justifyContent: "flex-start",
//         alignItems: "flex-end"
//     },
//     text: {
//        // fontFamily: 'Open-Sans-Bold',
//        fontWeight: 'bold',
//         fontSize: 20,
//         color: '#EB6C05',
//         textAlign: 'center'

//     },
//     viewAllReportText: {
//       //  fontFamily: 'Open-Sans-Regular',
//         color: 'black',
//         textDecorationLine: 'underline',
//         textAlign: 'center',
//         paddingBottom: 15,
//     },
    
//   });
  