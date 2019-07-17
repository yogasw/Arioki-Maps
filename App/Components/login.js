import firebase from 'firebase';
import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View, AppRegistry, AsyncStorage, Alert} from 'react-native';
import 'firebase/auth';
import 'firebase/database';
import {createDataUser} from '../Helper/Database';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password:'',
            uid:''
        };
    }

    hideModal() {
        this.props.hide();
    }

    onLogin() {
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then( async data => {
                this.setState({
                    email: data.user.email,
                    uid:data.user.uid
                });

                await AsyncStorage.setItem(
                    'uid', this.state.uid
                );
                Alert.alert("sukses login");
            }).catch(e=>{
                console.log(e);
            Alert.alert('Error',e.message)
        })
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => this.hideModal()}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>Login</Text>
                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <TextInput placeholder={'Email'}
                            onChangeText={(email)=>this.setState({email})}/>
                            <TextInput placeholder={'Password'}
                                       onChangeText={(password)=>this.setState({password})}/>
                            <TouchableOpacity onPress={()=>this.onLogin()}>
                                <Text style={[styles.button, {marginTop: 10}]}>Login</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        height: 250,
        width: 200,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#9E98C9',
        paddingTop: 10,
        paddingBottom: 10,
        width: 100,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 10,
        fontSize: 20,
    },
};
