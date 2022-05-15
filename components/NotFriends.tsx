import { Alert, StyleSheet, TouchableOpacity, Modal, Image, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { turnTrueModal, turnFalseModal } from '../store/user/modalAddFriends';
import ModalScreen from './ModalScreen';

import { Text, View } from './Themed';

export const NotFriends = () => {
    let user = useSelector((state: any) => state.userInfo);

    let modalAddFriends = useSelector((state: any) => state.modalAddFriends);

    // let modal = useState
    // console.log(user);
    // console.log(isVisible);
    // console.log(isVisible);
    // console.log(isVisible);
    // // console.log(modalAddFriends)

    // console.log(user)
    return (
        <View>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalAddFriends.isVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has now been closed.');
                }}>
                <Image
                    source={{ uri: "https://oespectadorrabugentoblog.files.wordpress.com/2020/05/thumb-1920-426374.jpg" }}
                    style={styles.image} />
                <Text style={styles.txt}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas eget tempus augue, a convallis velit.</Text>
                <Text
                    style={styles.closeText}
                    onPress={() => {
                        openModal(modalAddFriends.isVisible);
                    }}>Close Modal</Text>
            </Modal>
            <View style={styles.container}>
                <Text
                    style={styles.txt}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    {user.userData.given_name} parece que você não tem conexões &#128532;
                </Text>


                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                <TouchableOpacity onPress={() => {
                    Platform.OS == "ios" ?
                    setTimeout(() => {
                        openModal(modalAddFriends.isVisible);
                    }, 200) : openModal(modalAddFriends.isVisible)
                }
            } style={styles.btn}>
                    <Text style={styles.btnTxtColor}>
                        Adicionar conexões!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const openModal = (param: any) => {
    // let modalState = useSelector((state: any) => state.modalAddFriends);
    // console.log(param);
    let dispatch = useDispatch();
    if (param.isVisible) {
        dispatch(turnTrueModal());
    } else {
        dispatch(turnFalseModal());
    }
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
    image: {
        marginTop: 150,
        marginBottom: 10,
        width: '100%',
        height: 350,
    },
    txt: {
        fontSize: 14,
        marginBottom: 30,
        padding: 40,
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