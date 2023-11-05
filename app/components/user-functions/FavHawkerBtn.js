import React from 'react'
import { Share, Alert, Text, View, StyleSheet } from "react-native";
import { Avatar, IconButton } from 'react-native-paper';

export default function FavHawkerBtn({}){
// export default function FavHawkerBtn({hawkerDetails}){ 
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              //change to address of the hawker stall
              'React Native | A framework for building native apps using React',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    const hawkerDetails = {stallName: "Adam Fishball Noodle", address: "Adam Road Hawker Centre", unit: "Floor 1, Stall 25", imageLink: "../../assets/stall.png"}
    return(
        <View style={styles.container}>
            <View style ={styles.stall_image}>
                <Avatar.Image size={90} source={require('../../assets/stall.png')}></Avatar.Image>
            </View>
            <View style={styles.desc}>
                <Text style={{fontWeight: "bold", fontSize: 17, paddingBottom: 5}}>{hawkerDetails.stallName}</Text>
                <Text style={{fontSize: 14, color: "#FA4A0C"}}>{hawkerDetails.address}</Text>
                <Text style={{fontSize: 14, color: "#FA4A0C"}}>{hawkerDetails.unit}</Text>
            </View>
            <View style={styles.icon}>
                <IconButton icon={"dots-vertical"} size={30} onPress={onShare}></IconButton>
                <IconButton icon={"chevron-right"} size={30}></IconButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 120,
        flexDirection: "row",
        borderRadius: 20,
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 10,
        width: 325,
    },
    stall_image: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 10
    },
    desc : {
        flex: 7,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-start",
        // backgroundColor: "orange"
    },
    icon: {
        flex: 1,
        justifyContent: "space-around",
        // alignItems: "flex-start",
        // backgroundColor: "white"
    }
})


