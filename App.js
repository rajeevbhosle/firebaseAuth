import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Page1 } from "./component/page1";
import { Signupscreen } from "./component/signupscreen";
import { Loginscreen } from "./component/loginscreen";
import { Loadingscreen } from "./component/loadingfile";
import { FirebaseConfig } from "./config"


const AuthStack = createStackNavigator()
if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);

}


export default function App() {




  const butpress = () => {
    // navigation.toggleDrawer();

  }




  return (

    <NavigationContainer>
      <AuthStack.Navigator>



        <AuthStack.Screen name="Loadingscreen" component={Loadingscreen} options={{
          title: "Login", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',
          headerShown: false,


        }} />





        <AuthStack.Screen name="Loginscreen" component={Loginscreen} options={{
          title: "Login", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'lightgreen'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',


        }} />
        <AuthStack.Screen name="form" component={Page1} options={{
          title: "todo", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'skyblue'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',


        }} />

        <AuthStack.Screen name="Signupscreen" component={Signupscreen} options={{
          title: "SignUp", headerTitleAlign: 'center', backgroundColor: 'gray', headerStyle: {
            backgroundColor: 'skyblue'
          }, headerTintColor: 'white',
          gestureDirection: 'horizontal',


        }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );

  //   <View>
  //     <Text>hi</Text>
  //     <Page1 />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
