import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { NotFriends } from '../components/NotFriends';
import { useSelector } from 'react-redux';

import { Avatar, Card } from 'react-native-elements';

export default function UserProfilePage() {

    const userObj = useSelector((state: any) => state.userInfo);
    type AvatarData = {
        image_url: string;
    };
    const baseImage: AvatarData = {
        image_url: userObj.userData.picture
    }

    const connectionString = userObj.userData.id.slice(0, 5);


    return (
        <View style={styles.view}>
            <Avatar source={baseImage.image_url ? { uri: baseImage.image_url } : {}} size={128} rounded></Avatar>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>
            <View>
                <Text style={styles.name}>{userObj.userData.name}</Text>
            </View>
            <View style={styles.connectionView}>
                <Text>Email: </Text>
                <Text style={styles.email}>{userObj.userData.email}</Text>
            </View>
            <View style={styles.connectionView}>
                <Text>Id de conexão: </Text>
                <Text style={styles.connection}>{connectionString}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>
            <View style={styles.learnConnect}>
                <Text style={styles.title}>3 passos para se conectar:</Text>
                <Text style={styles.pacos}>     1. Tenha em mãos o e-mail da conexão</Text>
                <Text style={styles.pacos}>     2. Tenha em mãos o Id de conexão do amigo</Text>
                <Text style={styles.pacos}>     3. Conecte-se ao seu amigo!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
        color: 'pink',
        fontWeight: 'bold'
    },
    pacos: {
        color: '#2e99b6',
        fontSize: 12,
        textAlign: 'left',
        padding: 4
    },
    connectionView: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'pink',
        marginBottom: 10,
    },
    connection: {
        fontSize: 16,
        color: '#2e99b6',
        fontWeight: 'bold',
        marginBottom: 10
    },
    email: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    avatar: {
        marginTop: 20,
        marginBottom: 20,
    },
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    learnConnect: {
        flex: 1,
        fontSize: 16,
        backgroundColor: 'black',
        width: '80%',
        justifyContent: 'center',
        borderStyle: 'dotted',
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
    }
});