import React from 'react'
import { Share, Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton, Modal, Portal } from 'react-native-paper';

export default function FavHawkerBtn({name, address, photo, handleRemove}){
// export default function FavHawkerBtn({hawkerDetails}){ 
    const api_key = 'AIzaSyCl5--iXN-xsw8CoZFKjCXlnYXnDa5CyP0';
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              name+'\n'+address,
              // 'React Native | A framework for building native apps using React',
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

    return(
        <View style={styles.container}>
            <View style ={styles.stall_image}>
                <Avatar.Image size={90} source={{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${api_key}`}}></Avatar.Image>
            </View>
            <View style={styles.desc}>
              {/* <TouchableOpacity > */}
                <Text style={{fontWeight: "bold", fontSize: 17, paddingBottom: 5}}>{name}</Text>
                <Text style={{fontSize: 14, color: "#FA4A0C"}}>{address}</Text>
              {/* </TouchableOpacity> */}
            </View>
            <View style={styles.icon}>
                <IconButton icon={"dots-vertical"} size={30} onPress={onShare}></IconButton>
                <IconButton icon={"heart-minus"} size={30} iconColor={"#FA4A0C"} style={{left: -10}} onPress={handleRemove}></IconButton>
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


