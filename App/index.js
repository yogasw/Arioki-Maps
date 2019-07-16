import React, { Component } from "react";
import AppNavigator from "./Navigations/AppNavigator";
import firebase from 'firebase';
import {firebaseConfig} from '../App/Configs/firebase';
firebase.initializeApp(firebaseConfig);

export default class noteapp extends Component {
  render() {
    console.disableYellowBox = true;
    return <AppNavigator />;
  }
}
