/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
    Alert,
    Text,
    Image,
    Modal,
    TouchableOpacity,
    View, AsyncStorage, FlatList, KeyboardAvoidingView,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Welcome from '../Components/Welcome';
import Login from '../Components/login';
import Register from '../Components/Register';
import Account from '../Components/Account';
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import {createDataUser} from '../Helper/Database';
import Chat from '../Components/Chat';
export default class Home extends Component {
    constructor() {
        super();
        this.showModal =  this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            modal: false,
            isModal: '',
            login: false,
            data :{}
        };
        this.getAllUser();

    }

    showModal(form) {
        this.setState({modal: true, isModal: form});
    }

    hideModal() {
        this.setState({modal: false});
    }

    async showAccount() {
        let email = await AsyncStorage.getItem('uid');
        if (email!=null) {
            this.showModal('account');
        } else {
            this.showModal('welcome');
        }
    }

    writeUserData = () =>{
        createDataUser("QNAO4R6ilpgYSVFHqQ1EVfaZlzp1","Yoga","yoga@gmail.com",'082329949292')
    }

    getAllUser = async () =>{
        const db = firebase.database();
        const usersRef = db.ref("Users");

        await usersRef.on('value', snapshot=>{
            let data = snapshot.val();
            let item = Object.values(data);
            this.setState({data:item});
        });
        this.setState({data:[1,2,3]});
    }

    render() {
        console.log(this.state.data);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.showAccount()}>
                        <Image
                            style={{height: 40, width: 40}}
                            source={require('../Assets/Account.png')}
                        />
                    </TouchableOpacity>
                    <View
                        style={{
                            flexDirection: 'row',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}
                    >
                        <TouchableOpacity>
                            <Image
                                source={require('../Assets/ico-search-big.png')}
                                style={{height: 40, width: 40}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../Assets/setting.png')}
                                style={{height: 40, width: 40}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        flex: 1,
                    }}
                />
                <View style={styles.footer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={this.keyExtractor}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) =>
                            <TouchableOpacity onPress={()=>this.showModal('chat')} style={{paddingRight:15}}>
                                <View style={styles.iconFooter}/>
                            </TouchableOpacity>
                        }
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => this.hideModal()}>
                    {/*<KeyboardAvoidingView behavior="padding">*/}
                    {(this.state.isModal=='login') && <Login modal={this.showModal} hide={this.hideModal} /> }
                    {(this.state.isModal=='welcome') && <Welcome modal={this.showModal} hide={this.hideModal}/> }
                    {(this.state.isModal=='register') && <Register modal={this.showModal} hide={this.hideModal}/> }
                    {(this.state.isModal=='account') && <Account modal={this.showModal} hide={this.hideModal}/> }
                    {(this.state.isModal=='chat') && <Chat modal={this.showModal} hide={this.hideModal}/> }
                {/*</KeyboardAvoidingView>*/}
                </Modal>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        zIndex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        padding: 20,
        zIndex: 1,
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
    },
    iconFooter: {
        height: 40,
        width: 40,
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: '#00eee5',
    },
};
