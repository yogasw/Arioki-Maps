import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, PermissionsAndroid, Text, ToastAndroid, View} from 'react-native';


export default class SplashScreen extends Component {


    constructor() {
        super();
        this.state = {
            status:'',
            uuid:'',
            region:[]
        };
    }
    componentDidMount() {
        this.requestAccess()
    }
    async getUid() {
        let uid = await AsyncStorage.getItem('uid');
        if (uid != null) {
            return uid;
        } else {
            return '';
        }
    }
    requestAccess = async () => {
        console.log("1")
        this.setState({status:"gps checking"});
        try {
            this.setState({status:"gps checking"});
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Location permission',
                    'message': 'App needs access to your location ' +
                        'so we can show your location.'
                }
            )
            this.setState({status:"gps checking"});
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                await navigator.geolocation.getCurrentPosition(
                    (position) => {
                        let region = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        };
                        this.setState({status:"gps checking finish"});
                        this.setState({region:region})
                        this.props.navigation.navigate("Home", {
                            region:region,
                            uid:this.getUid()
                        })
                    },
                    (error) => {
                        console.log('ERROR MAP',error);
                        this.setState({status:"gps not working"});
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    },
                    { enableHighAccuracy: true, timeout: 60000,},
                );
            } else {
                this.setState({status:"gps not working"});
            }
        } catch (err) {
            this.setState({status:"gps not working"});
        }
    }

    render() {
        return (
            <View style={{backgroundColor: '#4FC3F7', flex: 1}}>
                <View style={{flex:1,flexDirection:'column',flexWrap:'wrap', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Welcome To Arioki Maps</Text>
                    <ActivityIndicator size={'large'} color={'white'} style={{marginTop:20}}/>
                    <Text style={{color: 'white', fontSize: 12, textAlign: 'center', marginTop:20, width:"40%"}}>{this.state.status}</Text>
                </View>
            </View>
        );
    }
}
