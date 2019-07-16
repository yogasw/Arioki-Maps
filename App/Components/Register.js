import React, { Component } from "react";
import {Alert, AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            email : ''
        };
    }

  hideModal(){
    this.props.hide();
    this.state={
        name : '',
        email : '',
        password : ''
    }
  }
    signUp(){
        const {email, password} = this.state;
        console.log(this.state);
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((data) =>{
                Alert.alert("Alert","Registration Success");
            }).catch(e=>{
            Alert.alert("Alert","Registration Error");
        })
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
                onChangeText={(name) => this.setState({name}) }
              />
              <TextInput
                placeholder={"Email"}
                style={{ width: "70%" }}
                onChangeText={(email) => this.setState({email}) }
              />
              <TextInput placeholder={"Password"} style={{ width: "70%" }}
                         onChangeText={(password) => this.setState({password}) }/>
              <TouchableOpacity onPress={() => this.signUp()}>
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
