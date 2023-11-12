import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import SignOut from "../user-functions/SignOut";
// import FavouriteHawkers from "./FavouriteHawkers";
import ProfileBtn from "../user-functions/ProfileBtn";
import SafeAreaView from "react-native-safe-area-view";
import { IconButton } from "react-native-paper";


export default function ProfilePage({navigation}){
    const [numReports, setNumRep] = useState(0);
    const [numReviews, setNumRev] = useState(0);

    const getReport = async() => {
        try{
            const response = await fetch('http://127.0.0.1:5000/reports/getUserReports?username='+ global.usrName);
            const data = await response.json();
            // console.log(data.list.length)
            if (data.result == "Success"){
                setNumRep(data.list.length);
            }
        }catch(error){
            console.log(error);
        }
    }
    
    const getReview = async() => {
        try{
            const response = await fetch('http://127.0.0.1:5000/reviews/getUserReviews?username='+ global.usrName);
            const data = await response.json();
            // console.log(data.list.length)
            if (data.result == "Success"){
                setNumRev(data.list.length);
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=> {
        getReport();
        getReview();
    }, [])
    
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
                            <Text style={{top: 5}}>{numReviews} Reviews
                            </Text>
                            <Text style={{top: 5}}>{numReports} Reports
                            </Text>
                            <Text style={{top: 5}}>0 Upvotes
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container_bottom}>
                    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("FavouriteHawkers")}>
                        <Text style={styles.text}>Favourite Hawkers</Text>
                        <IconButton icon={"chevron-right"}></IconButton>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("ViewAllReviews")}>
                        <Text style={styles.text}>Past Reviews</Text>
                        <IconButton icon={"chevron-right"}></IconButton>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("ViewAllReports")}>
                        <Text style={styles.text}>Past Reports</Text>
                        <IconButton icon={"chevron-right"}></IconButton>
                    </TouchableOpacity>
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
    },
    button: {
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        backgroundColor: "white",
        flexDirection: "row",
        paddingLeft: 20
    },
    text: {
        flex:1,
        fontSize: 18,
        color: 'black',
    },
})