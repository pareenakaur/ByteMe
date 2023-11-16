import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';

const Banner = ({image}) => {
    
    return (
        <View style={styles.default}>
            <View style={styles.container}>
                <Image
                    source={{ uri: `${image}`}}//{require('../assets/HawkerStallImage.jpg') /*image*/ }
                    style={styles.image}
                />
            </View>
        </View>
    );
};

export default Banner;

const styles = StyleSheet.create({
    default: {
        width: '100%',
        height: '100%',
    },
    container: { //image container stretches across the screen and takes up half of the screen to display full image
        width: '100%',
        height: '50%',
        position: 'relative', //to contain overlap containers
    },
    image: {
        width: '100%', //take up full image container and cover the space
        height: '100%',
        resizeMode: 'cover',
    },

});
