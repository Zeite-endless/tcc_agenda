import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ModalScreen from './ModalScreen';

import { Text, View } from './Themed';

export const NotFriends = () => {
    let user = useSelector((state: any) => state.userInfo);
    console.log(user)
    return (
        <View>
            <View style={styles.container}>
                <Text
                    style={styles.txt}
                    lightColor="rgba(0,0,0,0.8)"
                    darkColor="rgba(255,255,255,0.8)">
                    {user.userData.given_name} parece que você não tem conexões &#128532;
                </Text>

                
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                
                <TouchableOpacity onPress={openModal} style={styles.btn}>
                    <Text style={styles.btnTxtColor}>
                        Adicionar conexões!
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const openModal = () => {
    return(
        <ModalScreen></ModalScreen>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 16,
        color: 'white'
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