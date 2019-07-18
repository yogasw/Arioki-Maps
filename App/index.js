import React, { Component } from "react";
import AppNavigator from "./Navigations/AppNavigator";
import firebase from 'firebase';
import {firebaseConfig} from '../App/Configs/firebase';
firebase.initializeApp(firebaseConfig);
navigator.geolocation = require('@react-native-community/geolocation');
export default class noteapp extends Component {
  render() {
    console.disableYellowBox = true;
    return <AppNavigator />;
  }
}
