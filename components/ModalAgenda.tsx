import React from 'react';
import { Alert, StyleSheet, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import deleteAgenda from '../store/api/agenda/deleteAgenda';
import { Text, View } from './Themed';

export default function ModalAgenda({ visibility, setVisibility, agenda }: any) {
    if (agenda == undefined) {
        setVisibility(false);
    }


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


    const excludeAgenda = async (title: any) => {

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
                    deleteAgenda(agenda.id)
                }
            }
        ],
            { cancelable: false });
    }



    return (

        <View style={styles.container}>
            {
                agenda != undefined &&

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={visibility}
                    onRequestClose={() => {
                        Alert.alert('O Modal foi fechado!');
                        setVisibility(false);
                    }}>
                    <View style={styles.container}>
                        {/* {
                        agenda.picture != undefined ?
                        <Avatar source={{ uri: agenda.picture }} size={150} rounded></Avatar>
                        :
                        <Avatar source={require("../assets/images/user.png")} size={150} rounded></Avatar>
                    } */}

                        <Text style={styles.con}>&#128197;</Text>
                        <Text style={styles.header}>{setToThirdDigits(agenda.title)}</Text>

                        <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>Data da Agenda: </Text>
                        <Text style={[styles.input, { color: "#2e99b6" }]}>{setToLocaleDateString(agenda.date)}</Text>
                    </View>

                    <View style={styles.inputArea}>
                        <Text style={styles.inputAreaFont}>Descrição da Agenda: </Text>
                        <Text style={[styles.input, { color: "pink" }]}>{agenda.description}</Text>
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
                            onPress={() => { excludeAgenda(agenda.title) }}
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
