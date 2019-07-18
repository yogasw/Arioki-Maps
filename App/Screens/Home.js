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
    View, AsyncStorage, FlatList, PermissionsAndroid, Button,
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
import _ from 'lodash'
import SvgUri from 'react-native-svg-uri';
export default class Home extends Component {
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.state = {
            modal: false,
            isModal: '',
            login: false,
            data: {},
            item: {},
            uid: '',
            latitude:0,
            longitude:0,
            region: {
                latitude: -6.175392,
                longitude: 106.827153,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            myLocation: null
        };
        this.getAllUser();
        this.getUid();
        this.requestAccess()
    }

    async showModal(form, item = '') {
        let uid = await AsyncStorage.getItem('uid');
        if (form=='chat' && uid==null){
            form = 'welcome';
        }
        this.setState({
            modal: true,
            isModal: form,
            item: item,
        });
    }

    hideModal() {
        this.setState({modal: false});
    }

    async showAccount() {
        let email = await AsyncStorage.getItem('uid');
        if (email != null) {
            this.showModal('account');
        } else {
            this.showModal('welcome');
        }
    }

    async getUid() {
        let uid = await AsyncStorage.getItem('uid');
        if (uid != null) {
            this.setState({uid: uid});
        } else {
            this.setState({uid: ''});
        }
    }

    writeUserData = () => {
        createDataUser('QNAO4R6ilpgYSVFHqQ1EVfaZlzp1', 'Yoga', 'yoga@gmail.com', '082329949292');
    };

    getAllUser = async () => {
        const db = firebase.database();
        const usersRef = db.ref('Users');

        try {
            await usersRef.on('value', snapshot => {
                let data = snapshot.val();
                try {
                    let item = Object.values(data);
                    this.setState({data: item});
                } catch (e) {

                }
            });
        } catch (e) {
            this.setState({data: [1, 2, 3]});
        }
        this.setState({data: [1, 2, 3]});
    };

    componentDidMount() {
        this.requestAccess();
    }

    requestAccess = async () => {
        try {
            console.log('1');
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location permission',
                    'message': 'App needs access to your location ' +
                        'so we can show your location.'
                }
            )

            console.log('2');
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('3');
                await navigator.geolocation.getCurrentPosition(
                    (position) => {
                        let region = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        };
                        this.onRegionChange(region)
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            error: null,
                        });

                        },
                    (error) => console.log('ERROR MAP',error),
                    { enableHighAccuracy: true, timeout: 60000, maximumAge:0 },
                );
            } else {
                console.log('5');
                console.log("Location permission denied")
            }
        } catch (err) {
            console.log('6');
            console.warn(err)
        }
    }

    sendLocation = async(ref, location) =>{
        let db = firebase.database().ref(`Users/${ref}`);
        db.update({location:location})
            .then(result=>{

            }).catch(error => {
            })
    };

    onRegionChange = (region) => {
        console.log("onRegionChange :", region)
        this.setState({region})
    }
    render() {
          console.log("STATE : ", this.state);
          (this.state.uid != '') &&  this.sendLocation(this.state.uid,{
              latitude:this.state.latitude,
              longitude:this.state.longitude
          });
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
                    region={this.state.region}
                    style={{
                        flex: 1,
                    }}
                    onUserLocationChange={this.onRegionChange}
                    showsMyLocationButton={true}
                />
                <View
                    style={{
                        zIndex:1,
                        position: 'absolute',//use absolute position to show button on top of the map
                        right:20,
                        top: '75%', //for center align
                        alignSelf: 'flex-end' //for align to right
                    }}
                >
                    <TouchableOpacity onPress={()=>this.requestAccess()}>
                    <SvgUri
                        source={require('../Assets/outline-gps_fixed-24px.svg')}
                        height={30}
                        width={30}
                        style={{
                            backgroundColor:'white',
                            padding:10,
                            borderRadius:100,
                        }}
                    />
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={this.keyExtractor}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item, index}) =>
                            (this.state.uid != item.uid) && (
                                <TouchableOpacity onPress={() => this.showModal('chat', item)} style={{paddingRight: 15}}>
                                    <Image source={{uri: item.userProfile}} style={styles.iconFooter}/>
                                </TouchableOpacity>
                            )
                        }
                    />
                </View>
                <Modal
                    animationType={'slide'}
                    transparent={true}
                    visible={this.state.modal}
                    onRequestClose={() => this.hideModal()}>
                    {/*<KeyboardAvoidingView behavior="padding">*/}
                    {(this.state.isModal == 'login') && <Login modal={this.showModal} hide={this.hideModal}/>}
                    {(this.state.isModal == 'welcome') && <Welcome modal={this.showModal} hide={this.hideModal}/>}
                    {(this.state.isModal == 'register') && <Register modal={this.showModal} hide={this.hideModal}/>}
                    {(this.state.isModal == 'account') && <Account modal={this.showModal} hide={this.hideModal}/>}
                    {(this.state.isModal == 'chat') &&
                    <Chat modal={this.showModal} hide={this.hideModal} item={this.state.item}/>}
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
