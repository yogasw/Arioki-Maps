import React, {Component} from 'react';
import {Alert, AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/database';
import {updateDataUser} from '../Helper/Database';

export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            uid: '',
            data: '',
            name: '',
           userProfile: '',
            noPhone: '',
        };
        this.getUid();
    }

    getUid = async () => {
        await AsyncStorage.getItem('uid')
            .then(data => {
                this.setState({uid: data});
                this.getData(data);
            });
    };
    logout = async () => {

        await firebase.auth().signOut()
            .then(data => {
                AsyncStorage.clear();
                Alert.alert('Alert');
            }).catch(e => {
                Alert.alert('Error');
            });
    };

    hideModal() {
        this.props.hide();
    }


    getData = (uid) => {
        const db = firebase.database();
        const usersRef = db.ref(`Users/${uid}`);

        try {
            usersRef.on('value', snapshot => {
                let data = snapshot.val();
                let item = Object.values(data);
                this.setState({data: item});
            });
        } catch (e) {
            this.setState({data: []});
        }
    };


    render() {
        {console.log("ISI STATE: ",this.state)}
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>Account</Text>
                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <TextInput
                                value={this.state.data[0]}
                                editable={false}
                                style={{width: '80%', height: 40}}
                            />
                            <TextInput
                                defaultValue={this.state.data[3]}
                                onChangeText={(name) => this.setState({name})}
                                style={{width: '80%', height: 40}}
                            />
                            <TextInput
                                defaultValue={this.state.data[4]}
                                onChangeText={(noPhone) => this.setState({noPhone})}
                                style={{width: '80%', height: 40}}
                            />
                            <TextInput
                                defaultValue={this.state.data[6]}
                                style={{width: '80%', height: 40}}
                                onChangeText={(userProfile) => this.setState({userProfile})}
                            />
                            <TouchableOpacity onPress={() => updateDataUser(
                                this.state.uid,
                                this.state.name || this.state.data[3],
                                this.state.noPhone || this.state.data[4],
                                this.state.userProfile || this.state.data[6],
                                )}>
                                <Text style={[styles.button, {marginTop: 10}]}>Change Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.logout()}>
                                <Text style={[styles.button, {marginTop: 5}]}>Logout</Text>
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
        height: 320,
        width: 250,
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
        width: 150,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 10,
        fontSize: 20,
    },
};
