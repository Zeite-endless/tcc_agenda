import { useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, Modal, Image, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { turnFalseModal, turnTrueModal } from '../store/user/modalAddFriends';
import ModalAddfriendsScreen from '../components/ModalAddFriends';

import { Text, View } from '../components/Themed';

export const NotFriends = () => {
    let user = useSelector((state: any) => state.userInfo);

    // let modalAddFriends = useSelector((state: any) => state.modalAddFriends);

    let [modalAddFriends, setModalAddFriends] = useState(false);

    return (
        <View>
            {
                modalAddFriends ?

                    <ModalAddfriendsScreen visibility={modalAddFriends} setVisibility={setModalAddFriends}/> :
                    <View style={styles.container}>
                        <Text
                            style={styles.txt}
                            lightColor="rgba(0,0,0,0.8)"
                            darkColor="rgba(255,255,255,0.8)">
                            {user.userData.given_name} parece que você não tem conexões &#128532;
                        </Text>
                        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                        <TouchableOpacity onPress={() => {
                           setModalAddFriends(true)
                        }
                        } style={styles.btn}>
                            <Text style={styles.btnTxtColor}>
                                Adicionar conexões!
                            </Text>
                        </TouchableOpacity>
                    </View>

            }

        </View>
    );
}




const styles = StyleSheet.create({
    closeText: {
        fontSize: 24,
        color: '#00479e',
        textAlign: 'center',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txt: {
        fontSize: 14,
    },
    btn: {
        backgroundColor: 'rgb(50, 255, 0)',
        padding: 20,
        borderRadius: 50
    },
    btnTxtColor: {
        color: 'black'
    }
});