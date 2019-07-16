import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default class Register extends Component {
  hideModal(){
    this.props.hide();
  }
  render() {
    return (
      <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
        <TouchableOpacity activeOpacity={1}>
          <View style={styles.form}>
            <Text style={styles.textHeader}>Register</Text>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <TextInput
                placeholder={"Name"}
                underlineColorAndroid={"#ff0404"}
                style={{ width: "70%" }}
              />
              <TextInput
                placeholder={"Phone Number"}
                style={{ width: "70%" }}
              />
              <TextInput placeholder={"Password"} style={{ width: "70%" }} />
              <TouchableOpacity>
                <Text style={[styles.button, { marginTop: 10 }]}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    height: 280,
    width: 210,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20
  },
  textHeader: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20
  },
  button: {
    backgroundColor: "#9E98C9",
    paddingTop: 10,
    paddingBottom: 10,
    width: 100,
    textAlign: "center",
    color: "#fff",
    borderRadius: 10,
    fontSize: 20
  }
};
