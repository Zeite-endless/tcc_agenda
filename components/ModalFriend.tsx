import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Image, Modal, Button, Platform, Vibration, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { Audio } from 'expo-av';
import { Avatar, Icon } from 'react-native-elements';

export default function ModalFriend({ visibility, setVisibility, friend }: any) {

    const [sound, setSound] = useState({});
    const [this_friend, setThis_friend] = useState(friend);

    const excludeFriend = async (user: { name: string, picture: string, email: string, connectionString: string }) => {
        const { sound } = await Audio.Sound.createAsync(
            require("../assets/sounds/popupfalse.wav"),
        );

        setSound(sound);

        Alert.alert("Excluir Conexão:", `Tem certeza que deseja excluir a conexão com ${user.name}?`, [
            {
                text: "Cancelar",
                onPress: () => console.log("Operação cancelada!"),
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: () => console.log("Operação confirmada!")
            }
        ],
            { cancelable: false });
    }



    return (
        <View style={styles.container}>
            <Modal
                animationType={"slide"}
                transparent={true}
                visible={visibility}
                onRequestClose={() => {
                    Alert.alert('O Modal foi fechado!');
                    setVisibility(false);
                }}>
                <View style={styles.container}>
                    {
                        this_friend.data.picture != undefined ?
                        <Avatar source={{ uri: this_friend.data.picture }} size={64} rounded></Avatar>
                        :
                        <Avatar source={require("../assets/images/user.png")} size={64} rounded></Avatar>
                    }

                    <Text style={styles.header}>{this_friend.data.name}</Text>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>E-mail da conexão: </Text>
                        <Text style={[styles.input, { color: "#2e99b6" }]}>{this_friend.data.email}</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>ID de conexão: </Text>
                        <Text style={[styles.input, { color: "pink" }]}>{this_friend.data.connectionString}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>

                        <Icon
                            raised
                            reverse
                            // reverseColor
                            name="account-cancel"
                            color="rgb(255, 0, 0)"
                            underlayColor={'rgb(50, 255, 0)'}
                            iconStyle={{ color: "black" }}
                            type="material-community"
                            onPress={() => { excludeFriend(this_friend.data) }}
                        />
                        <Icon
                            raised
                            reverse
                            // reverseColor
                            name="check"
                            color="rgb(50, 255, 0)"
                            underlayColor={'rgb(50, 255, 0)'}
                            iconStyle={{ color: "black" }}
                            type="material-community"
                            onPress={() => { setVisibility(false) }}
                        />
                    </View>

                </View>
            </Modal>
        </View>
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        color: "white",
        padding: 5,
        margin: 5,
        borderRadius: 5,
        backgroundColor: "black",
        fontSize: 16,
        width: 300,
        textAlign: "center"
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
    },
    btnTxtColor: {
        color: 'black',
        fontSize: 20
    },
    btn: {
        backgroundColor: 'rgb(50, 255, 0)',
        padding: 20,
        borderRadius: 50,
        margin: 10
    },
    inputArea: {
        borderRadius: 5,
        backgroundColor: "black",
        fontSize: 16,
        textAlign: "center",
        alignItems: "center"
    },
    inputAreaFont: {
        fontSize: 16,
    },
    con: {
        fontSize: 50,
    },
});

