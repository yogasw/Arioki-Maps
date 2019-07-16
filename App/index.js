import React, { Component } from "react";
import AppNavigator from "./Navigations/AppNavigator";

export default class noteapp extends Component {
  render() {
    console.disableYellowBox = true;
    return <AppNavigator />;
  }
}
