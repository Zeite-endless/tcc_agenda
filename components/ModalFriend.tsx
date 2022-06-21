import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Image, Modal, Button, Platform, Vibration, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { Audio } from 'expo-av';
import { Avatar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ngrok_URL from '../store/ngrok';

export default function ModalFriend({ visibility, setVisibility, friend }: any) {

    const [sound, setSound] = useState({});
    const user = useSelector((state: any) => state.userInfo);
    
    const setToThirdDigits = (name: string) => {
        if(name != undefined){
            if (name.length < 30) {
                return name;
            } else if (name.length >= 30) {
                return name.substring(0, 30) + '...';
            }
        }
    }

    // substring to five first
    const spliceConn = (id: string) => {
        if(id != undefined){
            return id.substring(0, 5);
        }
    }

    const excluirConexao = (connectionId: number, idGoogleSolicitante: number, idGoogleSolicitado: number) => {
        var fetchString = `${ngrok_URL}/api/Conexao/DeletaConexao/${connectionId}/${idGoogleSolicitante}/${idGoogleSolicitado}`;
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var init = {
            method: "DELETE",
            headers: headers,
        }

        return fetch(fetchString, init);
    }


    const excludeFriend = async (name: any) => {
        
        Alert.alert("Excluir Conexão:", `Tem certeza que deseja excluir a conexão com ${name}?`, [
            {
                text: "Cancelar",
                onPress: async() => {
                    return
                },
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: async() => {
                    excluirConexao(1, 2, 3);
                }
            }
        ],
            { cancelable: false });
    }



    return (
    
        <View style={styles.container}>
            {
            friend != undefined &&

            <Modal
                animationType={"slide"}
                transparent={true}
                visible={visibility}
               >
                <View style={styles.container}>
                    {
                        friend.picture != undefined ?
                        <Avatar source={{ uri: friend.picture.medium }} size={150} rounded></Avatar>
                        :
                        <Avatar source={require("../assets/images/user.png")} size={150} rounded></Avatar>
                    }

                    <Text style={styles.header}>{setToThirdDigits(friend.name.first + " " + friend.name.last)}</Text>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>E-mail da conexão: </Text>
                        <Text style={[styles.input, { color: "#2e99b6" }]}>{friend.email}</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>ID de conexão: </Text>
                        <Text style={[styles.input, { color: "pink" }]}>{spliceConn(friend.login.uuid)}</Text>
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
                            onPress={() => { excludeFriend(friend.name) }}
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
        alignItems: "center",
        margin: 10,
        padding: 10
    },
    inputAreaFont: {
        fontSize: 16,
    },
    con: {
        fontSize: 50,
    },
});

