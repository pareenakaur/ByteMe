import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import SimilarHawker from './SimilarHawker';

const SimilarHawkersList = ({similarHawkers}) => {
    
    const similarHawkersList = similarHawkers.map((hawker, index) => (
        <SimilarHawker key={index} similarHawkers={hawker} />
            
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
