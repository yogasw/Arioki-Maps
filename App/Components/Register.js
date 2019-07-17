import React, {Component} from 'react';
import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import {createDataUser} from '../Helper/Database';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
        };
    }

    hideModal() {
        this.props.hide();
        this.state = {
            name: '',
            email: '',
            password: '',
            noPhone: '',
        };
    }

    signUp() {
        const {name,email, password,noPhone} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                createDataUser(data.user.uid,name, email, noPhone)
                Alert.alert('Alert', 'Registration Success');
            }).catch(e => {
            Alert.alert('Alert', e.message);
        });

    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>Register</Text>
                        <View style={{marginTop: 5, alignItems: 'center'}}>
                            <TextInput
                                placeholder={'Name'}
                                underlineColorAndroid={'#ff0404'}
                                style={{width: '70%'}}
                                onChangeText={(name) => this.setState({name})}
                            />
                            <TextInput
                                placeholder={'Email'}
                                style={{width: '70%'}}
                                onChangeText={(email) => this.setState({email})}
                            />
                            <TextInput
                                placeholder={'No Phone'}
                                style={{width: '70%'}}
                                onChangeText={(noPhone) => this.setState({noPhone})}
                            />
                            <TextInput
                                secureTextEntry={true}
                                placeholder={'Password'} style={{width: '70%'}}
                                onChangeText={(password) => this.setState({password})}/>
                            <TouchableOpacity onPress={() => this.signUp()}>
                                <Text style={[styles.button, {marginTop: 10}]}>Register</Text>
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
        height: 300,
        width: 210,
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
        paddingTop: 5,
        paddingBottom: 5,
        width: 100,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 10,
        fontSize: 20,
    },
};
