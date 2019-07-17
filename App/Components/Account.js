import React, {Component} from 'react';
import {Alert, AsyncStorage, Text, TextInput, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/database';
export default class Account extends Component {
    constructor() {
        super();
        this.state = {
            uid: "",
            data:""
        };
        this.getUid();
    }
    getUid = async () => {
        await AsyncStorage.getItem('uid')
            .then(data => {
                this.setState({uid:data})
                this.getData(data);
            }).catch(e => {
                console.log(e);
            });
    };
    logout = async () =>{

        await firebase.auth().signOut()
            .then(data =>{
                AsyncStorage.clear()
                Alert.alert('Alert')
            }).catch(e=>{
                Alert.alert("Error")
                console.log(e)
            });
    }
    hideModal() {
        this.props.hide();
    }

    getData = (uid) =>{
        const usersRef = firebase.database().ref(`Users/${uid}`);
        usersRef.on('value', snapshot =>{
            let data = snapshot.val();
            let item =  Object.values(data);
            this.setState({data:item})
        })
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>Account</Text>
                        <View style={{marginTop: 20, alignItems: 'center'}}>
                            <TextInput
                                value={this.state.data[1]}
                                editable={false}
                                style={{width: '70%'}}
                            />
                            <TextInput
                                value={this.state.data[0]}
                                editable={false}
                                style={{width: '70%'}}
                            />
                            <TextInput
                                value={this.state.data[2]}
                                editable={false}
                                style={{width: '70%'}}
                            />
                            <TouchableOpacity onPress={()=>this.logout()}>
                                <Text style={[styles.button, {marginTop: 10}]}>Logout</Text>
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
        height: 280,
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
        paddingTop: 10,
        paddingBottom: 10,
        width: 100,
        textAlign: 'center',
        color: '#fff',
        borderRadius: 10,
        fontSize: 20,
    },
};
