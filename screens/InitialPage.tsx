import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
// import { Button } from 'react-native-elements/dist/buttons/Button';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { NotFriends } from '../components/NotFriends';
import { useSelector } from 'react-redux';

export default function InitialPage({ navigation }: RootTabScreenProps<'InitialPage'>) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
  }, []);

  return (
    <View style={styles.container}>
      {
        users.length == 0 &&
        <NotFriends/>
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
