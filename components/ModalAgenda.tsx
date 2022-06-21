import React, { useState } from 'react';
import { Alert, StyleSheet, Modal, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import ngrok_URL from '../store/ngrok';
import { Text, View } from './Themed';

export default function ModalAgenda({ visibility, setVisibility, agenda }: any) {

    const [sound, setSound] = useState({});
    const user = useSelector((state: any) => state.userInfo);

    const setToThirdDigits = (title: string) => {
        if (title != undefined) {
            if (title.length < 30) {
                return title;
            } else if (title.length >= 30) {
                return title.substring(0, 30) + '...';
            }
        }
    }

    // Turn date to localeDateString
    const setToLocaleDateString = (date: string) => {
        if (date != undefined) {
            return new Date(date).toLocaleDateString();
        }
    }


    const excludeAgenda = async (title: string, id: string) => {

        Alert.alert("Excluir Conexão:", `Tem certeza que deseja excluir ${title}?`, [
            {
                text: "Cancelar",
                onPress: async () => {
                    return;
                },
                style: "cancel"
            },
            {
                text: "Confirmar",
                onPress: async () => {

                    var headers = new Headers();

                    headers.append("Accept", "application/json");
                    headers.append("Content-Type", "application/json");

                    const requestOptions = {
                        method: 'DELETE',
                        headers: headers
                    };

                    fetch(`${ngrok_URL}/api/Agenda/DeletaAgendaPorIdAgenda/${id}`, requestOptions)
                    Alert.alert("Agenda deletada!");
                    setTimeout(() => {
                        setVisibility(false);
                    }, 2000)
                }
            }
        ],
            { cancelable: false });
    }



    return (

        <ScrollView contentContainerStyle={styles.container}>
            {
                agenda != undefined &&
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={visibility}
                   >
                    <View style={styles.container}>
                        {/* {
                        agenda.picture != undefined ?
                        <Avatar source={{ uri: agenda.picture }} size={150} rounded></Avatar>
                        :
                        <Avatar source={require("../assets/images/user.png")} size={150} rounded></Avatar>
                    } */}

                        <Text style={styles.con}>&#128197;</Text>
                        <Text style={styles.header}>{setToThirdDigits(agenda.titulo)}</Text>

                        <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>Data da Agenda: </Text>
                        <Text style={[styles.input, { color: "#2e99b6" }]}>{setToLocaleDateString(agenda.dt_Fim)}</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>Descrição da Agenda: </Text>
                        <Text style={[styles.input, { color: "pink" }]}>{agenda.descricao}</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>

                        <Icon
                            raised
                            reverse
                            // reverseColor
                            name="cancel"
                            color="rgb(255, 0, 0)"
                            underlayColor={'rgb(50, 255, 0)'}
                            iconStyle={{ color: "black" }}
                            type="material-community"
                            onPress={() => { excludeAgenda(agenda.titulo, agenda.id_Agenda) }}
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
        </ScrollView>
    );
}




const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        paddingTop: 125,
        paddingBottom: 225
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
        fontSize: 100,
    },
});
