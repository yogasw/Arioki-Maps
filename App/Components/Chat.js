import React, {Component} from 'react';
import {Alert, FlatList, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import {createDataUser} from '../Helper/Database';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            chat: [1, 2, 3, 4, 1, 2, 3, 4],
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
        const {name, email, password, noPhone} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                createDataUser(data.user.uid, name, email, noPhone);
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
                        <FlatList style={styles.chat} showsVerticalScrollIndicator={false} data={this.state.chat} renderItem={({item, index}) =>
                            <TouchableHighlight>
                                <View>
                                <View>
                                    <View style={styles.chatSend}>
                                        <Text style={styles.chatTextSend}>Lorem Ipsum is simply dummy text of the
                                            printing and
                                            typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever
                                            since the 1500s, when an unknown printer t</Text>
                                    </View>
                                    <View style={styles.margin}/>
                                    <View style={styles.chatRev}>
                                        <Text style={styles.chatTextRev}>Lorem Ipsum is simply dummy text of the printing and
                                            typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever
                                            since the 1500s, when an unknown printer t</Text>
                                    </View>
                                </View>
                                    <View style={styles.margin}/>
                                </View>
                            </TouchableHighlight>
                        }/>
                        <TextInput multiline={true} placeholder={"input pesan anda"}/>
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
        height: 450,
        width: '90%',
        backgroundColor: '#008dff',
        borderRadius: 20,
        padding: 20,
    },
    textHeader: {
        color:"#fff",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    chat: {
        marginTop: 20,
        flex: 1,
    },
    chatRev: {
        backgroundColor: '#d25000',
        justifyContet: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        borderBottomRightRadius: 0,
        padding: 10,
        marginRight: 40,
    },
    chatTextRev: {
        color: '#fff',
    },
    chatSend: {
        backgroundColor: '#7b88ff',
        justifyContet: 'space-between',
        flexDirection: 'row',
        borderRadius: 10,
        borderBottomLeftRadius: 0,
        padding: 10,
        marginLeft: 40,
    },
    chatTextSend: {
        color: '#fff',
    },
    margin: {
        marginTop: 20,
    },
};
