import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { NotFriends } from './NotFriends';
import { useSelector } from 'react-redux';
import FriendList from './FriendList';

export default function InitialPage({ navigation }: RootTabScreenProps<'InitialPage'>) {

  const [users, setUsers] = useState([{ name: 'Adebayor da Silveira pereira junior moraes dias', picture: 'https://www.snatural.com.br/wp-content/uploads/2013/10/person.jpg', email: "ade@gmail.com", connectionString: "123" }, {name: "Otávio Barros", picture: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Andrzej_Person_Kancelaria_Senatu.jpg", email: "otaviobarros777@gmail.com", connectionString: "456"}]);

  // useEffect(() => {
  //   setUsers([]);
  // }, []);

  return (
    <View style={styles.container}>
      {
        users.length == 0 ?
          <NotFriends /> :
          <FriendList friends={users}/>
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
