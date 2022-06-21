import React, { useCallback, useEffect, useState } from 'react';
import { Platform, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useSelector } from 'react-redux';
import ngrok_URL from '../store/ngrok';
import ModalAddAgenda from '../components/ModalAddAgenda';
import { Icon } from 'react-native-elements';
import ModalAgenda from '../components/ModalAgenda';

const wait = (timeout: any) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
};

export default function MyAgendaControl({ navigation }: RootTabScreenProps<'MyAgendaControl'>) {


    const user = useSelector((state: any) => state.userInfo);
    const [agendas, setAgendas] = useState([]);
    const [error, setError] = useState("");

    const [modalAddAgenda, setModalAddAgenda] = useState(false);
    const [agendaData, setAgendaData] = useState({});

    //   const [modalAddAgenda, setModalAddAgenda] = useState(false);
    const [modalAgenda, setModalAgenda] = useState(false);

    const [counter, setCounter] = useState(0);



    //Create function that return array ordinated by given object date-time based on locale utc
    const sortByDate = (array: any): Array<any> => {
        let ordinated_arr: Array<any> = []
        if (array != undefined && array.length > 0) {
            return ordinated_arr = array.sort((a: any, b: any) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA.getTime() - dateB.getTime();
            });
        }
        return ordinated_arr;
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

    const idUser = (id: string): string => {
        return id.substring(0, 5)
    }

    const fetchAgendas = () => {
        return fetch(`${ngrok_URL}/api/Agenda/RecuperaAgendasPorIdGoogle/${idUser(user.userData.id)}`)
    }
    var agenda_view;

    const load_agenda_to_comp = () => {
        return agenda_view = sortByDate(agendas).map((data: any, id: number) => {
            return <View key={id}>
                {Platform.OS == 'ios' ?
                    <TouchableOpacity onPress={() => {
                        setAgendaData(data);
                        setModalAgenda(true)
                    }} style={styles.askAcceptiOS}>
                        <Text style={styles.span}>{setToThirdDigits(data.titulo)}</Text>
                        <Text style={styles.con}>&#128197;</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={() => {
                        setAgendaData(data);
                        setModalAgenda(true)
                    }} style={styles.askAcceptAndroid}>
                        <Text style={styles.span}>{setToThirdDigits(data.titulo)}</Text>
                        <Text style={styles.con}>&#128197;</Text>
                    </TouchableOpacity>
                }
            </View>
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchAgendas().then((res) => res.json()).then((res) => {
                if(res.mensagem){
                    setError(res.mensagem);
                } else {
                    setAgendas(res);
                }
            })
            setCounter((prevCounter) => prevCounter + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, []);
    
    return (
        <View style={styles.container}>
            <ModalAddAgenda visibility={modalAddAgenda} setVisibility={setModalAddAgenda}></ModalAddAgenda>
            {
                agendaData != undefined &&
                <ModalAgenda visibility={modalAgenda} setVisibility={setModalAgenda} agenda={agendaData} />
            }
            {
                agendas.length > 0 ?

                    <SafeAreaView style={styles.container}>
                        <ModalAddAgenda visibility={modalAddAgenda} setVisibility={setModalAddAgenda} />
                        <ScrollView contentContainerStyle={styles.fixTop}

                        >
                            <Text style={styles.h2}>
                                Suas agendas ficam aqui
                            </Text>

                            {
                                load_agenda_to_comp()
                            }
                            <View style={styles.btn_place_top}>
                                <Icon
                                    raised
                                    reverse
                                    // reverseColor
                                    name="calendar-plus"
                                    color="rgb(50, 255, 0)"
                                    underlayColor={'rgb(50, 255, 0)'}
                                    iconStyle={{ color: "black" }}
                                    type="material-community"
                                    onPress={() => { setModalAddAgenda(true) }}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                    :
                    // <MyAgenda agendas={agendas} /> :
                    (

                        <ScrollView contentContainerStyle={styles.container}
                        >

                            <Text>{error} &#128532;</Text>
                            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255, 0.1)" />
                            <TouchableOpacity onPress={() => {
                                setModalAddAgenda(true)
                            }
                            } style={styles.btn}>
                                <Text style={styles.btnTxtColor}>
                                    Adicionar Agendas!
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 20,
        height: 1,
        width: '80%',
    },
    btn_place_top: {
        backgroundColor: 'transparent',
        // top: 100,
    },
    btn: {
        backgroundColor: 'rgb(50, 255, 0)',
        padding: 20,
        borderRadius: 50,
        margin: 10
    },
    btnTxtColor: {
        color: 'black'
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
    },
    span: {
        color: 'pink',
        width: "80%",
        textAlign: 'center',
    },
    h2: {
        color: 'rgb(200, 200, 200)',
        fontSize: 28,
    },
    fixTop: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    con: {
        fontSize: 28
    }
});

