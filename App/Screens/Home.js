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
    View, AsyncStorage, FlatList, PermissionsAndroid, Button, ToastAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion, Callout} from 'react-native-maps';
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
            data: [],
            item: {},
            uid: '',
            latitude:0,
            longitude:0,
            region: new AnimatedRegion({
                latitude: -6.1753,
                longitude: 106.8271,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }),
            updateRegion:false

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

    componentDidMount() {
        this.requestAccess();
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
            console.log(e);
        }

    };
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
                        },
                    (error) => {
                        console.log('ERROR MAP',error);
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    },
                    { enableHighAccuracy: true, timeout: 60000,},
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
        this.setState({region})
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        console.log("next Props",nextProps);
        console.log("nextState",nextState);
        console.log("nextContext",nextContext);
        return false;
    }

    render() {
        let data = this.state.data;
          console.log("STATE : ", this.state);
          (this.state.uid != '') &&  this.sendLocation(this.state.uid,{
              latitude:this.state.region.latitude,
              longitude:this.state.region.longitude
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
                    //initialRegion={this.state.region}
                    ref={(mapView)=>{_mapView=mapView}}
                    style={{
                        flex: 1,
                    }}
                >
                    {(data) && data.map(data =>(
                        ((data.location)&& <Marker
                            coordinate={data.location}>
                            <View style={{width:100}}>
                                <View
                                    style={{
                                        backgroundColor:"#1976D2",
                                        position:'absolute',
                                        left:45,
                                        marginRight:45,
                                        borderRadius:10,
                                }}>
                                    <Text style={{color:'white', padding:5, textAlign:'center'}}>Yoga Setiawan</Text>
                                </View>
                                <View
                                    style={{
                                        borderRadius:100,
                                        height:20,
                                        width:20,
                                        left:15,
                                        top:5.2,
                                        position:'absolute',
                                        backgroundColor:'white',
                                    zIndex:1}}>
                                <Image
                                    source={{uri: data.userProfile}}
                                    style={{
                                        height:10,
                                        width:10,
                                        left:5,
                                        top:5,
                                        alignContent:'center'
                                    }}/>
                                </View>
                                <SvgUri
                                    source={require('../Assets/location-marker-svgrepo-com.svg')}
                                    height={50}
                                    width={50}
                                />
                                <Callout tooltip>
                                    <View style={{backgroundColor:'#FF1744'}}>
                                        <SvgUri source={require('../Assets/tooltip.svg')} height={50} width={100}/>
                                    </View>
                                </Callout>
                            </View>
                        </Marker> )

                    ))}
                </MapView>
                <View
                    style={{
                        zIndex:1,
                        position: 'absolute',//use absolute position to show button on top of the map
                        right:20,
                        top: '75%', //for center align
                        alignSelf: 'flex-end' //for align to right
                    }}
                >
                    <TouchableOpacity  onPress = {() => _mapView.animateToCoordinate({
                        latitude: -6.1753,
                        longitude: 106.8271,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }, 1000)}>
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
                        data={this.state.data?this.state.data:[]}
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
