import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ModalAcceptConnection from '../components/ModalAcceptConnection';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import ngrok_URL from '../store/ngrok';
import { RootTabScreenProps } from '../types';

export default function AskedFriendshipControl({ navigation }: RootTabScreenProps<'askedFriendshipControl'>) {

    const user = useSelector((state: any) => state.userInfo)
    const [connections, setConnections] = useState([]);
    const [error, setError] = useState(false);
    const [connection, setConnection] = useState();
    const [counter, setCounter] = useState(0);
    const [modalAcceptConnection, setModalAcceptConnection] = useState(false);


    const fetchConnectionsAsk = () => {
        return fetch(`${ngrok_URL}/api/Conexao/RecuperaSolicitacoesConexoesEmAbertoPorIdGoogle/${idUser(user.userData.id)}`)
    }


    const idUser = (id: string): string => {
        return id.substring(0, 5);
    }

    var connectionAskedList;

    const setToThirdDigits = (name: string) => {
        if (name.length < 30) {
            return name;
        } else if (name.length >= 30) {
            return name.substring(0, 30) + '...';
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchConnectionsAsk().then((res) => res.json()).then((res) => {
                if (res.mensagem) {
                    setError(res.mensagem)
                } else {
                    setConnections(res);
                }
            })
            setCounter((prevCounter) => prevCounter + 1);
        }, 2500);
        return () => clearInterval(interval);
    }, []);


    const load_data_connection = () => {
        return connectionAskedList = connections.map((data: any, id: number) => {
            console.log(data)
            return <View key={id}>
                {Platform.OS == 'ios' ?
                    <TouchableOpacity onPress={() => {
                        setConnection(data);
                        if (connection != undefined) {
                            setModalAcceptConnection(true)
                        }
                    }} style={styles.askAcceptiOS}>
                        <Text style={styles.span}>{setToThirdDigits(data.nome_Solicitante_FK)}</Text>
                        <Avatar source={{ uri: decodeURIComponent(data.FOTO_CONEXAO_FK)}} size={64} rounded></Avatar>
                    </TouchableOpacity> :

                    <TouchableOpacity onPress={() => {
                        setConnection(data);
                        if (connection != undefined) {
                            setModalAcceptConnection(true)
                        }
                    }} style={styles.askAcceptAndroid}>
                        <Text style={styles.span}>{setToThirdDigits(data.nome_Solicitante_FK)}</Text>
                        <Avatar source={{ uri: decodeURIComponent(data.FOTO_CONEXAO_FK) }} size={64} rounded></Avatar>
                    </TouchableOpacity>
                }
            </View>
        });
    }


    return (
        <View style={styles.container}>
            {
                connections.length > 0 ?
                    <SafeAreaView style={styles.container}>
                        <ModalAcceptConnection visibility={modalAcceptConnection} setVisibility={setModalAcceptConnection} conn={connection}></ModalAcceptConnection>
                        <Text style={styles.h2}>
                            Suas solicitações ficam aqui
                        </Text>

                        {
                            load_data_connection()
                        }

                    </SafeAreaView> :
                    <View style={styles.container}>
                        <Text>Para que você não tem novas solicitações...</Text>
                    </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    span: {
        color: 'pink',
        width: "80%",
        textAlign: 'center',
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
