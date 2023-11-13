import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const SimilarHawker = ({similarHawkers, navigation}) => {
    
    return(
        <View style={styles.detailsMainContainer}>
            <View style={styles.detailsContainer}>
                <View style={styles.mainContainer}>
                    <View style={styles.similarImageContainer}>
                        <View style={styles.imageLogoContainer}>
                            <Image  style={styles.image} 
                                    source={similarHawkers.image} />
                        </View>
                    </View>
                    <View style={styles.similarDetailsContainer}>
                        <View style={styles.similarDetailsInnerContainer}>
                            <Text style={styles.name}>{similarHawkers.name}</Text>
                            <Text style={styles.crowd}>Crowd: {similarHawkers.crowdLevel}</Text>
                            <Text style={styles.distance}>{similarHawkers.distance}km away</Text>
                        </View>
                    </View>

                    <View style={styles.rightNavIcon}>
                        <View style={styles.rightNavIconContainer}>
                            <AntDesign name="right" size={24} color="black" onPress={() => navigation.navigate('Profile')}/> 
                        </View> 
                    </View>
                </View>
               
            </View>
                   
        </View>         
      );

    

};

export default SimilarHawker;

const styles = StyleSheet.create({
    detailsMainContainer: {
        height: '25%',
        marginTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
    },
    detailsContainer: {
        //marginTop: 10,
        borderWidth: 2,
        borderRadius: 30,
        borderColor: '#F4F4F8',
        backgroundColor: 'white',
        height: '100%',
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: {
            height: 1,
            width: 1
        },
  
        
    },

    mainContainer: {
        flex: 7,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,

    },
    similarImageContainer: {
        flex: 2,
        
    },
    imageLogoContainer: {
        margin: 5,
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 100,
        aspectRatio: 1,
        overflow: 'hidden',
        
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    similarDetailsContainer: {
        flex: 4,
    },
    similarDetailsInnerContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 0
        
    },
    name: {
        //fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        paddingTop: 5
    },
    crowd: {
       // fontFamily: 'Open-Sans-Regular',
        paddingTop: 5,
        fontSize: 12
    },
    distance: {
        //fontFamily: 'Open-Sans-Regular',
        fontSize: 12
    },
    header: {
        //fontFamily: 'Open-Sans-Bold',
        fontSize: 16,
        padding: 10,
    },
    rightNavIcon: {
        flex: 1,
    },
    rightNavIconContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },

});
