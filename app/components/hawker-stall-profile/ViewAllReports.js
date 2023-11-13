import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReportsList from './ReportsList';

const ViewAllReports = ({navigation, route }) => {
    const { reports1, image, stallID } = route.params;
    
     // State variable to store stallId
  const [storedReports, setStoredReports] = useState(null);

  // Use useEffect to set the storedStallId when stallId changes
  useEffect(() => {
    setStoredReports(reports1);
  }, [reports1]);

    

    const HawkerStall = { 
        image: require("../../assets/HawkerStallImage.jpg"),
        //name: stallData.name,
        //address: stallData.formatted_address,
        //contact: stallData.formatted_phone_number,
        //openingHours: "6am - 3pm",
        //rating: stallData.rating,
        //reviews: reviews1,
        //reports: reports1,
    }
    
    return(
        <View style={styles.default}>
            <View style={styles.header}>
                <Text style={styles.text}>All Reports</Text>
            </View>
            <View style={styles.reportContainer}>
                {reports1 && <ReportsList reports={reports1} image={image} stallID={stallID} type={1} />}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.viewAllReportText} onPress={() => navigation.navigate('Profile')}>Hide All</Text>
            </View>
        </View>
    );
}

export default ViewAllReports;

const styles = StyleSheet.create({
    default: {
      width: '100%',
      height: '100%',
      flex: 2.1,
      flexDirection: 'column',
      marginTop: 35
    },
    header: {
        flex: 0.1,
    },
    reportContainer: {
        flex: 1.9,
        
        
    },
    textContainer: {
        flex: 0.1,
        
        
    },
    text: {
       // fontFamily: 'Open-Sans-Bold',
       fontWeight: 'bold',
        fontSize: 20,
        color: '#EB6C05',
        textAlign: 'center'

    },
    viewAllReportText: {
      //  fontFamily: 'Open-Sans-Regular',
        color: 'black',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingBottom: 15,
    },
  });
  