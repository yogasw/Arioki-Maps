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
                        <Text style={styles.textHeader}>Name</Text>
                        <View style={styles.chat}>
                            {/*<View style={styles.chatReciveText}>*/}
                            {/*    <View style={styles.chatRecive}>*/}
                            {/*        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer t</Text>*/}
                            {/*    </View>*/}
                            {/*    <View style={styles.photo}/>*/}
                            {/*</View>*/}
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
        height: 400,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    photo:{
        height: 45,
        width: 45,
        borderRadius:100,
        backgroundColor: '#403bff'
    },
    chat:{marginTop: 5, flex :1, backgroundColor:"#f4f4f4", borderRadius:20, padding:20},
    chatRecive:{
      flexDirection:row
    },
    chatReciveText:{}
};
