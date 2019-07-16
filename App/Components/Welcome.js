import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class Welcome extends Component {

    modalLogin() {
        this.props.modal("login")
    }

    modalRegister() {
        this.props.modal("register")
    }
    hideModal(){
        this.props.hide();
    }
    render() {
        return (
            <TouchableOpacity onPress={() => this.hideModal()} activeOpacity={1} style={styles.container}>
                <TouchableOpacity activeOpacity={1}>
                    <View style={styles.form}>
                        <Text style={styles.textHeader}>Welcome To Arioki Maps</Text>
                        <View style={{marginTop: 40, alignItems: 'center'}}>
                            <TouchableOpacity onPress={()=>this.modalLogin()}>
                                <Text style={styles.button}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.modalRegister()}>
                                <Text style={[styles.button, {marginTop: 20}]}>Register</Text>
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
        height: 250,
        width: 200,
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
