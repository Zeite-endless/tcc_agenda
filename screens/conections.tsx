import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { NotFriends } from './NotFriends';
import axios from 'axios';
import { Avatar, Icon } from 'react-native-elements';
import ModalAddFriendsScreen from '../components/ModalAddFriends';
import ModalFriend from '../components/ModalFriend';
import { useSelector } from 'react-redux';
import ngrok_URL from '../store/ngrok';
export default function InitialPage({ navigation }: RootTabScreenProps<'InitialPage'>) {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [modalFriend, setModalFriend] = useState(false);
  const [modalAddFriend, setModalAddFriend] = useState(false);
  const [friend, setFriend] = useState({});
  const user = useSelector((state: any) => state.userInfo);

 

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const idUser = (id: string): string => {
      return id.substring(0, 5);
    }

    fetch(`${ngrok_URL}/api/Conexao/RecuperaConexoesPorIdGoogle/${idUser(user.userData.id)}`, { signal: signal }).then((res) => res.json()).then((res) => {
      console.log(res, idUser(user.userData.id))
      if (res.mensagem) {
        setError(res.mensagem)
      } else {
        setUsers(res);
      }
    });
    return () => controller.abort();
  }, []);

  const setToThirdDigits = (name: string) => {
    if (name.length < 30) {
      return name;
    } else if (name.length >= 30) {
      return name.substring(0, 30) + '...';
    }
  }

  

  return (
    <View style={styles.container}>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {
              friend != undefined && Object.keys(friend).length > 0 &&
              <View style={styles.btn_place_top}>
                <Icon
                  raised
                  reverse
                  // reverseColor
                  name="account-multiple-plus"
                  color="rgb(50, 255, 0)"
                  underlayColor={'rgb(50, 255, 0)'}
                  iconStyle={{ color: "black" }}
                  type="material-community"
                  onPress={() => { setModalAddFriend(true) }}
                />
                <ModalFriend visibility={modalFriend} setVisibility={setModalFriend} friend={friend} />
              </View>
            }
            {/* <ModalFriend visibility={modalFriend} setVisibility={setModalFriend} friend={friend} /> */}
          </View>
          {
            users != undefined && users.length > 0 ?
              users.map((data: any, id: number) => {
                return <View key={id}>
                  {Platform.OS == 'ios' ?
                    <TouchableOpacity onPress={() => {
                      setFriend(data);
                      if (friend != undefined) {
                        setModalFriend(true)
                      }
                    }} style={styles.askAcceptiOS}>
                      <Text style={styles.span}>{setToThirdDigits(data.name.first + " " + data.name.last)}</Text>
                      <Avatar source={{ uri: data.picture.medium }} size={64} rounded></Avatar>
                    </TouchableOpacity> :

                    <TouchableOpacity onPress={() => {
                      setFriend(data);
                      if (friend != undefined) {
                        setModalFriend(true)
                      }
                    }} style={styles.askAcceptAndroid}>
                      <Text style={styles.span}>{setToThirdDigits(data.name.first + " " + data.name.last)}</Text>
                      <Avatar source={{ uri: data.picture.medium }} size={64} rounded></Avatar>
                    </TouchableOpacity>
                  }
                </View>
              })
              :
              <NotFriends />
          }
        </ScrollView>
      </SafeAreaView>
      <ModalAddFriendsScreen visibility={modalAddFriend} setVisibility={setModalAddFriend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    marginTop: 80
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
    color: 'pink',
    width: "80%",
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
    height: "70%",
    alignSelf: 'center',
    borderColor: 'black',
    backgroundColor: 'black'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  btn_place_top: {
    backgroundColor: 'transparent',
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
