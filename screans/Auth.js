import { View, Text, StyleSheet,TextInput, ImageBackground,Button, BackHandler} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import firebase from '../config'

const auth=firebase.auth();
export default function Auth(props) {
    var email="Arij@gmail.com",password="Arijarij";
    return (
        <ImageBackground style={styles.container} source={require("../assets/img-background.png")}>
          <View style={{
            alignItems:'center',
            justifyContent: 'center',
            height:300,
            width:"95%",
            backgroundColor:"#0005"
          }}>
           <Text style={styles.textStyle}>Bienvenue</Text>
           <TextInput onChangeText={(txt)=>{
            email=txt
           }}
            placeholder='email@site.com' keyboardType='email-address' style={styles.textInputStyle}></TextInput>
           <TextInput onChangeText={(txt)=>{
            password=txt
           }}
           placeholder='password' secureTextEntry={true} style={styles.textInputStyle}></TextInput>
           <View style={styles.buttonsStyle}>
            <Button title="submit" onPress={()=>{
                auth.signInWithEmailAndPassword(email,password)
                .then(()=>{
                    const currentid=auth.currentUser.uid;
                    
                    console.log("log for current id: "+currentid)
                    props.navigation.replace("Home",{currentid:currentid})
                })
                .catch((error)=>{alert(error)});
             

            }}></Button>
            <Button title="exit" onPress={()=>{
                BackHandler.exitApp();
            }}></Button>
           </View>
           <Text onPress={()=>{
            props.navigation.navigate("NewUser");
           }}
            style={{
            width:"100%",
            textAlign:"right",
            marginRight:10,
            fontSize:14,
            fontWeight:"bold"
            }}>Create new user</Text> 
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
    );
}
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center', //align hor
        justifyContent: 'center', //align ver
        
    },
    textStyle:{
        fontSize:54,
        color:"blue",
        fontWeight:"bold",
        fontStyle:"italic"
    },
    textInputStyle:{
        height:45,
        width:"95%",
        backgroundColor:"white",
        marginTop:10,
        borderRadius:5
    },
    buttonsStyle:{
        flexDirection:"row",
        gap:20,
        marginTop:25
    }
});