import React, { useState } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import ModalFriend from '../components/ModalFriend';
import ModalAddFriendsScreen from '../components/ModalAddFriends';
import { View, Text } from '../components/Themed';

export default function FriendList({ friends }: any) {

    const [modalFriend, setModalFriend] = useState(false);
    const [modalAddFriend, setModalAddFriend] = useState(false);
    const [friend, setFriend] = useState({});

    const setToThirdDigits = (name: string) => {
        if (name.length < 30) {
            return name;
        } else if (name.length >= 30) {
            return name.substring(0, 30) + '...';
        }
    }

    const friends_list = friends.map((data: any, id: number) => {
        return <View key={id}>
            {Platform.OS == 'ios' ?
                <TouchableOpacity onPress={() => {
                        setFriend({id: id, data: data})
                        }} style={styles.askAcceptiOS}>
                    <Text style={styles.span}>{setToThirdDigits(data.name)}</Text>
                    <Avatar source={{ uri: data.picture }} size={64} rounded></Avatar>
                </TouchableOpacity> :

                <TouchableOpacity onPress={() => {
                    setFriend({id: id, data: data})
                    }} style={styles.askAcceptAndroid}>
                    <Text style={styles.span}>{setToThirdDigits(data.name)}</Text>
                    <Avatar source={{ uri: data.picture }} size={64} rounded></Avatar>
                </TouchableOpacity>
            }
        </View>
    })

    return (
        <View>
            {friends_list}
            <ModalAddFriendsScreen visibility={modalAddFriend} setVisibility={setModalAddFriend} />
            <ModalFriend visibility={modalFriend} setVisibility={setModalFriend} friend={friend} />
            <View style={styles.btn_place_top}>
                <Icon
                    raised
                    reverse
                    // reverseColor
                    name="account-multiple-plus"
                    color="rgb(50, 255, 0)"
                    underlayColor={'rgb(50, 255, 0)'}
                    iconStyle={{color: "black"}}
                    type="material-community"
                    onPress={() => { setModalAddFriend(true) }}
                />
            </View>


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
