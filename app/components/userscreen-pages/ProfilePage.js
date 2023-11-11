import React, { useState } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import SignOut from "../user-functions/SignOut";
import FavouriteHawkers from "./FavouriteHawkers";
import ProfileBtn from "../user-functions/ProfileBtn";
import SafeAreaView from "react-native-safe-area-view";


export default function ProfilePage({navigation}){
    // const [showFavHawkers, setFavHawkers] = useState(false);

    // function handlePressFavHawkers(){
    //     setFavHawkers(true);
    // };
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={styles.topbar}>
                    <Text style={{color: "#3C4142",fontSize: 35, fontWeight: 'bold'}}>Welcome Back</Text>
                </View>
                <View style={styles.editProfile}>
                    <View style={{flex: 1}}><Text style={{fontSize: 20, color: "#3C4142"}}>My Profile </Text></View>
                    <View style={{flex: 1, alignItems: "flex-end"}}><Text style={{color: "grey"}}>edit</Text></View>
                </View>
                <View style={styles.container_top}>
                    <View style={styles.avatar}>
                    <Image style={styles.image} source={require('../../assets/avatar.png')}></Image>
                    </View>
                    <View style={styles.detailSection}>
                        <View style={{borderBottomColor: "grey", borderBottomWidth: 1}}>
                            <Text style={{fontSize: 20, bottom: 5}}>{global.usrName}</Text>
                        </View>
                        <View style={styles.badge}>
                            <Text style={{fontWeight: "bold"}}>Superstar</Text>
                        </View>
                        <View style={{top: 20, borderTopWidth: 1, borderTopColor: "grey"}}> 
                            <Text style={{top: 5}}>10 Reviews
                            </Text>
                            <Text style={{top: 5}}>3 Reports
                            </Text>
                            <Text style={{top: 5}}>140 Upvotes
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container_bottom}>
                    <ProfileBtn label={"Favourite Hawkers"} navigation={navigation} navigateTo={"FavouriteHawkers"}></ProfileBtn>
                    {/* if (showFavHawkers) {
                            <FavouriteHawkers />
                        } */}
                    <ProfileBtn label={"Past Reviews"}> </ProfileBtn>
                    <ProfileBtn label={"Past Reports"}> </ProfileBtn>
                    <SignOut navigation={navigation}/>

                </View>
            </SafeAreaView>
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
        justifyContent: "flex-end"
    },
    editProfile: {
        flex: 1.2,
        flexDirection: 'row',
        alignItems: "flex-end"
    },
    container_top: {
        flex:4,
        backgroundColor: 'orange',
        width : 325,
        height: 250,
        top: 5,
        borderRadius: 30,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    image: {
        width: 120,
        height: 120, 
    },
    avatar: {
        flex: 3,
        top: 5,
        alignItems: "center"
    },
    detailSection:{
        flex: 4,
        paddingTop: 15,
        paddingLeft: 5,
        paddingRight: 15,
    },
    badge: {
        width: 125,
        height: 30,
        backgroundColor: "gold",
        borderRadius: 20,
        top: 10,
        bottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    container_bottom: {
        flex:8,
        paddingTop: 5,
        justifyContent: "space-evenly"

    }
})