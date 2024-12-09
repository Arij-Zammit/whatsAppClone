import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MyProfile from './home/MyProfile';
import ListeProfiles from './home/ListeProfiles';
import Groupes from './home/Groupes';

const Tab=createMaterialBottomTabNavigator();
export default function Home(props) {
  console.log("current id in home: ")
  console.log(props)
  const currentid=props.route.params.currentid;
  return (
    <Tab.Navigator>
        <Tab.Screen name='ListeProfiles' component={ListeProfiles} initialParams={{currentid:currentid}}></Tab.Screen>
        <Tab.Screen name='Groupes' component={Groupes}></Tab.Screen>
        <Tab.Screen name='MyProfile' component={MyProfile} initialParams={{currentid:currentid}}></Tab.Screen>
    </Tab.Navigator>
  )
}