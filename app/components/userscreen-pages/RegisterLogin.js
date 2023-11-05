// import React from "react";
// import {Text, Image, StyleSheet, View} from "react-native"
// import { TabView, TabBar, TextView, SceneMap } from 'react-native-tab-view';
// import RegisterTab from "../user-functions/RegisterTab";
// import LoginTab from "../user-functions/LoginTab";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function RegisterLogin({ navigation}){
//     // function Login(){
//     //     <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
//     // };
      
//     // function Register(){
//     //     <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
//     // };
    
//     // const renderScene = SceneMap({
//     // login: Login,
//     // register: Register,
//     // });
    
//     // const [index, setIndex] = React.useState(0);
//     // const [routes] = React.useState([
//     //     { key: 'login', title: 'Login' },
//     //     { key: 'register', title: 'Register' },
//     // ]);


//     return(
//         <View style={styles.container}>
//             {/* <Image style={styles.thumbnail} source={require('../../assets/thumbnail.png')}/> */}
//             {/* <View style={styles.main}> */}
//                 {/* <TabView
//                     style={{backgroundColor: "#F5F5F8"}}
//                     navigationState={{ index, routes }}
//                     renderScene={renderScene}
//                     onIndexChange={setIndex}
//                     renderTabBar={props => 
//                     <TabBar {...props}
//                      style={{backgroundColor: '#FA4A0C', borderBottomLeftRadius: 20, borderBottomRightRadius:20 }}/>}
//                 /> */}
//                 <LoginTab navigation={navigation}/>
//             {/* </View> */}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex:1,
//         justifyContent:"center"
//     },
//     thumbnail:{
//         flex: 3,
//         width: "100%",
//         borderBottomLeftRadius: 15,
//         borderBottomRightRadius: 15,
//     },
//     main:{
//         flex: 8,
//         top: 30
//         // paddingVertical: 10,

//     },
//     // tab:{
//     //     flex:7,
//     //     justifyContent: "flex-start"
//     // }

// })