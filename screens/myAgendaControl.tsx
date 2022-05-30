import {  useState } from 'react';
import { StyleSheet } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import {  View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import MyAgenda from './MyAgenda';
import solicitarAgenda from '../store/api/agenda/getAgenda';
import { useSelector } from 'react-redux';

export default function MyAgendaControl({ navigation }: RootTabScreenProps<'MyAgendaControl'>) {


    const user = useSelector((state: any) => state.userInfo);
    // console.log(user);
    const [agendas, setAgendas] = useState(solicitarAgenda(user.id));

    return (
        <View style={styles.container}>
            {
                agendas.length > 0 &&
                <MyAgenda agendas={agendas} />
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
});
