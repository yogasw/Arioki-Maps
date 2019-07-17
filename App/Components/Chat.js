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
            onEdit:false,
            uid:'',
            data:{},
            text:''
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
    sendText (){
        console.log(this.state)
        let db = firebase.database();
        const userReft = db.ref(`Chat/${this.state.uid}`)

    }
    getData(uid){

    }
    hideModal() {
        this.props.hide();
    }

    render() {
        let data = this.props.item;
        console.log(this.state);
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>{data.name}</Text>
                        <FlatList style={styles.chat} showsVerticalScrollIndicator={false} data={this.state.chat}
                                  renderItem={({item, index}) =>
                                      <TouchableHighlight>
                                          <View>
                                              <View>
                                                  <View style={styles.chatSend}>
                                                      <Text style={styles.chatTextSend}>Lorem Ipsum is simply dummy text
                                                          of the</Text>
                                                  </View>
                                                  <View style={styles.margin}/>
                                                  <View style={styles.chatRev}>
                                                      <Text style={styles.chatTextRev}>Lorem Ipsum is simply dummy text
                                                          of the </Text>
                                                  </View>
                                              </View>
                                              <View style={styles.margin}/>
                                          </View>
                                      </TouchableHighlight>
                                  }/>
                        <View style={{flexDirection: 'row', alignItems:'center'}}>
                            <TextInput
                                style={styles.inputChat}
                                multiline={true}
                                placeholder={'input pesan anda'}
                                onChangeText={(text => this.setState({text}))}
                                onFocus={()=>this.setState({onEdit:true})}
                                onBlur={()=>this.setState({onEdit:false})}
                            />
                           <TouchableOpacity onPress={()=>this.sendText()} style={styles.iconButtom}>
                            <SvgUri
                                width="30"
                                height="30"
                                source={
                                    (this.state.onEdit)?require('../Assets/baseline-send-24px.svg'):
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
        width:'85%',
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingRight: 5,
        paddingLeft: 10,
        marginRight: 5,
    },
    iconChat: {

    },

    iconButtom:{
        padding:10,
        borderRadius:50,
        backgroundColor:"#4977ee"
    }
};
