import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Image, Modal, Button, Platform, Vibration, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import {Audio} from 'expo-av';

export default function ModalAddFriendsScreen({ visibility, setVisibility }: any) {

  // let modalState = useSelector((state: any) => state.modalAddFriends)

  const [email, setEmail] = useState("");
  const [connectionString, setConnectionString] = useState("");
  const [colorB, setColorB] = useState("white");
  const [sound, setSound] = useState({});

  

  const saveConnection = async() => {

    const {sound} = await Audio.Sound.createAsync(
      require("../assets/sounds/popupfalse.wav"),
    )

    setSound(sound);

    
    if (email == "otaviobarros777@gmail.com" && connectionString == "123") {
      const {sound} = await Audio.Sound.createAsync(
        require("../assets/sounds/popupok.wav"),
      )
  
      setSound(sound);
      setColorB("green");
      Alert.alert("Conexão feita com sucesso:", "Pedido de conexão enviado com sucesso!");
      setTimeout(() => {
        setColorB("white");
        setVisibility(false);
      }, 3000);
      await sound.playAsync();
    } else if (email == "" || connectionString == "") {
     
      Alert.alert("Falha ao conectar: ","Preencha os campos conforme solicitado!")
      setColorB("red");
      Vibration.vibrate();
      await sound.playAsync();
    } else if (email == "otaviobarros777@gmail.com" && connectionString != "123") {
      Alert.alert("Falha ao conectar: ", "Parece que as credenciais de conexão não batem! Verifique e tente novamente...")
      setColorB("red");
      Vibration.vibrate();
      await sound.playAsync();
    } else if (email != "otaviobarros777gmail.com" && connectionString == "123") {
      Alert.alert("Falha ao conectar: ", "Parece que as credenciais de conexão não batem! Verifique e tente novamente...");
      setColorB("red");
      Vibration.vibrate();
      await sound.playAsync();
    } else if (email != "otaviobarros777gmail.com" && connectionString != "123") {
      Alert.alert("Falha ao conectar: ", "Credenciais não encontradas!")
      setColorB("red");
      Vibration.vibrate();
      await sound.playAsync();
    }
  }


  return (
    <View style={styles.container}>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visibility}
        onRequestClose={() => {
          Alert.alert('O Modal foi fechado!');
          setVisibility(false);
        }}>
        <View style={styles.container}>

          <Text style={styles.con}>&#128591;</Text>
          <Text style={styles.header}>Preencha os dados da conexão</Text>

          <View style={styles.inputArea}>
            <Text style={styles.inputAreaFont}>Preencha o E-mail da conexão: </Text>
            <TextInput style={[{ borderColor: colorB }, styles.input]} placeholder="E-mail" onChangeText={(text: string) => setEmail(text)} value={email} />
          </View>

          <View style={styles.inputArea}>
            <Text style={styles.inputAreaFont}>Preencha o ID de conexão: </Text>
            <TextInput style={[{ borderColor: colorB }, styles.input]} placeholder="ID de conexão" onChangeText={(text: string) => setConnectionString(text)} value={connectionString} />
          </View>

          <TouchableOpacity onPress={() => {
            saveConnection();
          }
          } style={styles.btn}>
            <Text style={styles.btnTxtColor}>
              Adicionar conexão!
            </Text>
          </TouchableOpacity>

          <Button

            title="Cancelar"
            onPress={() => {
              setVisibility(false);
            }}>
          </Button>

        </View>
      </Modal>



    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "black"
  },
  input: {
    borderWidth: 1,
    color: "white",
    padding: 5,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "black",
    fontSize: 16,
    width: 300,
  },
  header: {
    fontSize: 20,
  },
  btnTxtColor: {
    color: 'black',
    fontSize: 20
  },
  btn: {
    backgroundColor: 'rgb(50, 255, 0)',
    padding: 20,
    borderRadius: 50,
    margin: 10
  },
  inputArea: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: "black",
    fontSize: 16,
    textAlign: "center",
    alignItems: "center"
  },
  inputAreaFont: {
    fontSize: 16,
    margin: 4
  },
  con: {
    fontSize: 100,
  },
});

