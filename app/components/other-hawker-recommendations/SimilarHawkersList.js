import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import SimilarHawker from './SimilarHawker';

const SimilarHawkersList = ({similarHawkers, navigation}) => {

    const [currentHawker, setCurrentHawker] = useState(similarHawkers[0]);
    const [nearbyHawkers, setNearbyHawkerCentres] = useState(similarHawkers.slice(1));
    
    similarHawkers.map(data => console.log(data));
    
    const similarHawkersList = nearbyHawkers.map((hawker, index) => (
        
        <SimilarHawker key={index} similarHawker={hawker} latitude={currentHawker.latitude} longitude={currentHawker.longitude} navigation={navigation}/>
            
    ));

    return (
        
        <View style={styles.default}>
            <View style={styles.container}>
                {similarHawkersList}
                
            </View>
        </View>
    );
};

export default SimilarHawkersList;

const styles = StyleSheet.create({
    default: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }


});
