import React ,{Component} from 'react';
import {Text,View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import {FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID} from '@env'

import * as firebase from 'firebase';
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}
const Stack= createStackNavigator();

export class App extends Component {
  constructor (props){
    super(props);
    this.state={
      loaded:false
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(!user){
        this.setState({
          loaded:true,
          loggedin:false
        })

      }else{
        this.setState({
          loaded:true,
          loggedin:true
        })

      }
    })
  }
  render() {
    const{loaded,loggedin}=this.state
    if(!loaded){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
          <Text>
            Loading...
          </Text>
        </View>
      )

    }
    if(loggedin){
      return (
        <View style={{flex:1,justifyContent:'center'}}>
          <Text>
            User Profile
          </Text>
        </View>
      )
    }
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={LandingScreen} options={{headerShown:false}} />
          <Stack.Screen name="Register" component={RegisterScreen}  />
          <Stack.Screen name="Login" component={LoginScreen}  />

        </Stack.Navigator>

    </NavigationContainer>
    )
  }
}

export default App

