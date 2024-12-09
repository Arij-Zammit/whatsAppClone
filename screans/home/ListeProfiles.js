import { View, Text, ImageBackground,StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect ,useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import firebase from '../../config';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

const database=firebase.database();
const ref_lesprofiles=database.ref("lesprofiles");

export default function ListeProfiles(props) {
  const currentid=props.route.params.currentid;

  const [data, setData] = useState([])
  const d=[];
  useEffect(()=>{
    //importer les donnees
    ref_lesprofiles.on("value",(snapshot)=>{
      const d=[];
      snapshot.forEach((unProfile)=>{
        if(unProfile.val().id!=currentid){
          d.push(unProfile.val());
        }
      });
      setData(d);
    });
    return ()=>{
      ref_lesprofiles.off();
    };
  })

  const renderProfileItem = ({ item }) => (
    <View style={styles.profileContainer}>
      {/* Image de profil */}
      <Image source={{uri:item.uriImage|| "../../assets/userImg.png"}} style={styles.profileImage} />

      {/* Informations utilisateur */}
      <View style={styles.infoContainer}>
        <Text style={styles.profileName}>{item.nom}</Text>
        <Text style={styles.profileNumber}>{item.telephone}</Text>
        {/* Boutons avec icônes */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#4CAF50" }]}>
            <Icon name="call" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: "#2196F3" }]} onPress={()=>{
              props.navigation.navigate("Chat",{currentUser:currentid,secondUser:item})
            }}>
            <Icon name="message" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );


  return (
    <ImageBackground
      source={require("../../assets/img-background.png")}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.textstyle}>My Account</Text>
      <FlatList 
      data={data}
      renderItem={renderProfileItem}
      keyExtractor={(item, index) => index.toString()}
      style={{
        backgroundColor: "white",
        width: "95%",
      }} ></FlatList>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  textinputstyle: {
    fontWeight: "bold",
    backgroundColor: "#0004",
    fontSize: 20,
    color: "#fff",
    width: "75%",
    height: 50,
    borderRadius: 10,
    margin: 5,
  },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    textstyle: {
      fontSize: 24,
      fontWeight: "bold",
      color: "white",
      marginVertical: 20,
    },
    profileContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 10,
      marginVertical: 8,
      marginHorizontal:"2.5%",
      borderRadius: 10,
      width:"95%"
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
    },
    infoContainer: {
      flex: 1,
      justifyContent: "space-between",
    },
    profileName: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
    },
    profileNumber: {
      fontSize: 14,
      color: "#777",
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "space-between",
    },
    button: {
      justifyContent: "center", // Centrer horizontalement
      alignItems: "center", // Centrer verticalement
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      width: "30%",
    },
});
