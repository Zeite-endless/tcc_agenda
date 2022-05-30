import React, { useState } from 'react';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import ModalAcceptFriend from '../components/ModalAcceptConnection';
import { View, Text } from '../components/Themed';

export default function AskedFriendship({ conn }: any) {


    const [connection, setConnection] = useState(conn);
    const [ modalAcceptConnection, setModalAcceptConnection ] = useState(false);


    const setToThirdDigits = (name: string) => {
        if (name.length < 30) {
            return name;
        } else if (name.length >= 30) {
            return name.substring(0, 30) + '...';
        }
    }

    const conn_list = conn.map((data: any, id: number) => {
        return <View key={id}>
            {Platform.OS == 'ios' ?
                <TouchableOpacity onPress={() => {
                    setConnection(data);
                    if (connection != undefined) {
                        setModalAcceptConnection(true)
                    }
                }} style={styles.askAcceptiOS}>
                    <Text style={styles.span}>{setToThirdDigits(data.name)}</Text>
                    <Avatar source={{ uri: data.picture }} size={64} rounded></Avatar>
                </TouchableOpacity> :

                <TouchableOpacity onPress={() => {
                    setConnection(data);
                    if (connection != undefined) {
                        setModalAcceptConnection(true)
                    }
                }} style={styles.askAcceptAndroid}>
                    <Text style={styles.span}>{setToThirdDigits(data.name)}</Text>
                    <Avatar source={{ uri: data.picture }} size={64} rounded></Avatar>
                </TouchableOpacity>
            }
        </View>
    })

    return (
        <View>
            {
                conn_list
            }
            <ModalAcceptFriend visibility={modalAcceptConnection} setVisibility={setModalAcceptConnection} conn={connection}></ModalAcceptFriend>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    h2: {
        color: 'rgb(200, 200, 200)',
        fontSize: 28,
    },
    fixTop: {
        top: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    span: {
        color: 'pink',
        width: "80%",
        textAlign: 'center',
    },
    btn_place_top: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'transparent',
    },
    askAcceptiOS: {
        margin: 10,
        backgroundColor: '#333',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    askAcceptAndroid: {
        margin: 10,
        backgroundColor: '#333',
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
});
