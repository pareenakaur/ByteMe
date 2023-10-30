import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import FavHawkerBtn from "../user-functions/FavHawkerBtn"

export default function FavouriteHawkers({navigation}){
    return (
        <View style={styles.container}>
            <View>
                <View style = {styles.topbar}>
                    <Text style={{paddingBottom: 8, color: "#FA4A0C", fontStyle: "italic", fontSize: 18}} onPress={() => navigation.navigate('Profile')}>return to profile</Text>
                    <Text style={{color: "#3C4142",fontSize: 30, fontWeight: 'bold'}}>Favourite Hawkers</Text>
                </View>
                {/* <ScrollView > */}
                    <View style={styles.main}>
                        <FavHawkerBtn />
                        <FavHawkerBtn />
                        <FavHawkerBtn />
                    </View>
                {/* </ScrollView> */}
                <View style={styles.areaBottom}></View>
                <View style={styles.navBar}></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F8',
        alignItems: 'center',
    },

    topbar: {
        flex: 2.5,
        justifyContent: "flex-end",
    },
    main: {
        flex:8.5,
        justifyContent: "space-between",
        paddingVertical: 20
    },
    areaBottom: {
        flex: 3.5
    },
    navBar: {
        flex:2,
        // backgroundColor: "black"
    }
})

