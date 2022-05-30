import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import getSolicitacao from '../store/api/connection/getSolicitacao';
import { RootTabScreenProps } from '../types';
import AskedFriendship from './askedFriendship';

export default function AskedFriendshipControl({ navigation }: RootTabScreenProps<'askedFriendshipControl'>) {

    const user = useSelector((state: any) => state.user.userData)
    const [connections, setConnections] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        // fetch("https://randomuser.me/api/?results=10", { signal: signal })
        //   .then((res) => res.json())
        //   .then((res) => setUsers(res.results))
        //   .catch((err) => setError(err));
    
        getSolicitacao(user.id, signal).then((connections: any) => {
          setConnections(connections);
        }).catch((err: any) => setError(err));
    
        return () => controller.abort();
      }, []);


    return (
        <View style={styles.container}>
            {
                connections.length > 0 &&
                <AskedFriendship conn={connections} />
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
