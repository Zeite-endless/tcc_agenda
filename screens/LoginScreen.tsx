import React, { useEffect, useState } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { RootTabScreenProps } from "../types";
import { Text, View } from "../components/Themed";
import { turnTrue } from '../store/user/userState';
import { useDispatch } from 'react-redux';
import { saveToUser } from '../store/services';


const LoginScreen = ({ navigation }: RootTabScreenProps<'Login'>) => {

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '695950178174-hrb712dkb6rm327hufq15dn7men33fk4.apps.googleusercontent.com',
        iosClientId: '695950178174-1s4asbs2p1hfeiad6h6rpca4ci1u6egn.apps.googleusercontent.com',
        androidClientId: '695950178174-kaa2mfa2c5cajskfrn5knbcsl979jaff.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
    });
    
    getLogin(response);
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/284/284301.png' }} style={styles.logo}>

            </Image>
            <TouchableOpacity style={styles.btn} disabled={!request} onPress={() => {
                promptAsync({ showInRecents: false  });
            }}>
                <Image source={{ uri: 'https://cdn.pixabay.com/photo/2015/12/11/11/43/google-1088004_960_720.png' }} style={{ width: 50, height: 50 }}></Image>
                <Text>Login com Google</Text>
            </TouchableOpacity>

        </View>
    );
};

const getLogin = (props: any) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props?.type === 'success') {
            let accessToken = props.authentication.accessToken;
            let data = getUserInformation(accessToken);
            data.then(result => {
                dispatch(saveToUser(result));
            })
            dispatch(turnTrue());
        }
    }, [props]);
}

async function getUserInformation(accessToken: string) {
    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return userInfoResponse.json();
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 256,
        width: 256,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn: {
        width: 250,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 4,
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultImg: {
        height: 64,
        width: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    resultTxt: {
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});