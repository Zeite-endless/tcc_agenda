import React from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { View, Text } from '../components/Themed';

export default function FriendListScreen() {


  const userObj = useSelector((state: any) => state.userInfo);

  return (
    <View style={styles.container}>
      <View style={styles.fixTop}>
        <Text style={styles.h2}>
          Minhas solicitações de conexão
        </Text>

        {
          userObj.userData.picture &&

          <SafeAreaView style={styles.container}>
            {Platform.OS == 'ios' ?
              <TouchableOpacity onPress={alert} style={styles.askAcceptiOS}>
                <Text style={{ textAlign: 'center' }}>Parece que <Text style={styles.span}>{userObj.userData.name}</Text> está tentando adicioná-lo a sua rede de conexões</Text>
                <Avatar source={{ uri: userObj.userData.picture }} size={64} rounded></Avatar>
              </TouchableOpacity> :

              <TouchableOpacity onPress={alert} style={styles.askAcceptAndroid}>
                <Text style={{ textAlign: 'center' }}>Parece que <Text style={styles.span}>{userObj.userData.name}</Text> está tentando adicioná-lo a sua rede de conexões</Text>
                <Avatar source={{ uri: userObj.userData.picture }} size={64} rounded></Avatar>
              </TouchableOpacity>

            }

          </SafeAreaView>

        }
      </View>
    </View>
  );
}

const alert = () => {
  Alert.alert('Fazer modal de aceitar conexão!')
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  fixTop: {
    top: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  span: {
    color: 'pink'
  },
  askAcceptiOS: {
    margin: 40,
    backgroundColor: '#333',
    flexDirection: 'row',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  askAcceptAndroid: {
    margin: 40,
    backgroundColor: '#333',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  }
});
