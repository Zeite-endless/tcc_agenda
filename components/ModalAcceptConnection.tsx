import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Image, Modal, Button, Platform, Vibration, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { Audio } from 'expo-av';
import { Avatar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import declineConnection from '../store/api/connection/declineConnection';
import acceptConnectionID from '../store/api/connection/acceptConnection';

export default function ModalAcceptFriend({ visibility, setVisibility, conn }: any) {

    const [sound, setSound] = useState({});
    const user = useSelector((state: any) => state.user.userData);

    if(Object.keys(conn).length == 0){
        setVisibility(false);
    }

    const setToThirdDigits = (name: string) => {
        if(name != undefined){
            if (name.length < 30) {
                return name;
            } else if (name.length >= 30) {
                return name.substring(0, 30) + '...';
            }
        }
    }


    const excludeFriend = async (name: any, id: any) => {
        
        Alert.alert("Excluir Conexão:", `Tem certeza que deseja excluir a conexão com ${name}?`, [
            {
                text: "Cancelar",
                onPress: async() => {
                    return;
                },
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: async() => {
                    declineConnection("trocar", id, user.id);
                    Alert.alert("Conexão recusada!")
                    setTimeout(() => {

                        setVisibility(false);
                    }, 2000)
                }
            }
        ],
            { cancelable: false });
    }

    const acceptConnection = async (name: any, id: any) => {
        
        Alert.alert("Excluir Conexão:", `Tem certeza que deseja excluir a conexão com ${name}?`, [
            {
                text: "Cancelar",
                onPress: async() => {
                    return;
                },
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: async() => {
                    acceptConnectionID("trocar", id, user.id);
                    Alert.alert("Conexão recusada!")
                    setTimeout(() => {

                        setVisibility(false);
                    }, 2000)
                }
            }
        ],
            { cancelable: false });
    }



    return (
    
        <View style={styles.container}>
            {
                conn != undefined &&

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
                        conn.picture != undefined ?
                        <Avatar source={{ uri: conn.picture }} size={150} rounded></Avatar>
                        :
                        <Avatar source={require("../assets/images/user.png")} size={150} rounded></Avatar>
                    }

                    <Text style={styles.header}>{setToThirdDigits(conn.name)}</Text>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>E-mail da conexão: </Text>
                        <Text style={[styles.input, { color: "#2e99b6" }]}>{conn.email}</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>ID de conexão: </Text>
                        <Text style={[styles.input, { color: "pink" }]}>{conn.connectionString}</Text>
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
                            onPress={() => { excludeFriend(conn.name, conn.id) }}
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
                            onPress={() => { acceptConnection(conn.name, conn.id) }}
                        />
                    </View>

                </View>
            </Modal>
            }
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
        marginTop: 20,
        color: "pink"
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