import React, {Component} from 'react';
import {
    Alert, AsyncStorage,
    FlatList,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View,
} from 'react-native';
import firebase from 'firebase';
import 'firebase/auth';
import SvgUri from 'react-native-svg-uri';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            chat: [1],
            onEdit: false,
            uid: '',
            data: {},
            text: '',
            ref: '',

        };
        this.getUid();
    }

    getUid = async () => {
        await AsyncStorage.getItem('uid')
            .then(data => {
                this.setState({uid: data});
                this.getData(data, this.props.item.uid);
            });
    };

    sortUid(uidSend, uidRev){
        let ref = [uidSend, uidRev];
        ref.sort(function (a, b) {
            if (a > b) {
                return -1;
            }
            if (b > a) {
                return 1;
            }
            return 0;
        });
        return ref.join('-');
    }

    sendText(uidSend, uidRev) {
        let db = firebase.database();
        let ref = this.sortUid(uidSend,uidRev);
        const userReft = db.ref(`Chats/${ref}`);
        this.setState({ref: userReft});

        userReft.push({
            sender: uidSend,
            recipiet: uidRev,
            message: this.state.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        });
    }

    getData(uidSend, uidRev) {
        let ref = this.sortUid(uidSend,uidRev);
        const db = firebase.database();
        const useRef = db.ref(`Chats/${ref}`);
        useRef.on('value', snapshot => {
            let data = snapshot.val();
            try {
                this.setState({data: Object.values(data)});
            } catch (e) {
                this.setState({data: []});
            }
        });
    }

    hideModal() {
        this.props.hide();
    }

    render() {
        let data = this.props.item;
        console.log(this.state)
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>{data.name}</Text>
                        <FlatList
                            style={styles.chat}
                            showsVerticalScrollIndicator={false}
                            data={this.state.data?this.state.data:[]}
                            renderItem={({item, index}) =>
                                <TouchableHighlight>
                                    <View>
                                        {console.log(item)}
                                        <View>
                                            {(item.sender == data.uid) ?
                                                <View style={styles.chatSend}>
                                                    <Text style={styles.chatTextSend}>{item.message}</Text>
                                                </View> :
                                                <View style={styles.chatRev}>
                                                    <Text style={styles.chatTextRev}>{item.message}</Text>
                                                </View>
                                            }
                                            <View style={styles.margin}/>
                                        </View>
                                        <View style={styles.margin}/>
                                    </View>
                                </TouchableHighlight>
                            }/>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput
                                style={styles.inputChat}
                                multiline={true}
                                placeholder={'input pesan anda'}
                                onChangeText={(text => this.setState({text}))}
                                onFocus={() => this.setState({onEdit: true})}
                                onBlur={() => this.setState({onEdit: false})}
                            />
                            <TouchableOpacity onPress={() => this.sendText(this.state.uid, data.uid)}
                                              style={styles.iconButtom}>
                                <SvgUri
                                    width="30"
                                    height="30"
                                    source={
                                        (this.state.onEdit) ? require('../Assets/baseline-send-24px.svg') :
                                            require('../Assets/baseline-mic-24px.svg')
                                    }/>
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
        height: 450,
        width: '90%',
        backgroundColor: '#008dff',
        borderRadius: 20,
        padding: 20,
        paddingBottom: 10,
    },
    textHeader: {
        color: '#fff',
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
    inputChat: {
        width: '85%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 10,
        marginRight: 5,
    },
    iconChat: {},

    iconButtom: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4977ee',
    },
};
