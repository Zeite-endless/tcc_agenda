import React, { useState } from 'react';
import { Alert, StyleSheet, Modal, Platform, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Text, View } from './Themed';
import { Audio } from 'expo-av';
import DateTimePicker from '@react-native-community/datetimepicker';
import addAgenda from '../store/api/agenda/addAgenda';
import { useSelector } from 'react-redux';

export default function ModalAddAgenda({ visibility, setVisibility }: any) {

  const [dateEvent, setDateEvent] = useState(new Date());

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    console.log(currentDate)
    setDateEvent(currentDate);
  };

  const user = useSelector((state: any) => state.user.userInfo);
  const [tituloString, setTituloString] = useState("");
  const [descriptionString, setDescriptionString] = useState("");

  const saveAgenda = () => {
    if (tituloString == "" || descriptionString == "") {
      Alert.alert("Erro", "Preencha todos os campos!");
    } else {
      addAgenda(user.id, user.id, user.email, user.name, tituloString, descriptionString, dateEvent.toString());
      setVisibility(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={visibility}>

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}>
          <ScrollView style={styles.scrollView}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >

            <Text style={styles.con}>&#128197;</Text>
            <Text style={styles.header}>Preencha os dados da Agenda</Text>

            <View style={styles.inputArea}>
              <Text style={styles.inputAreaFont}>Escolha uma data para a agenda</Text>
              <DateTimePicker
                value={dateEvent}
                mode="date"
                display="spinner"
                is24Hour={true}
                onChange={onChange}
                style={{ width: 400, height: 120 }}
              />
            </View>

            <View style={styles.inputArea}>
              <Text style={styles.inputAreaFont}>Preencha o titulo da Agenda:</Text>
              <TextInput style={styles.input} placeholder="Titulo da agenda" onChangeText={(text: string) => setTituloString(text)} value={tituloString} />
            </View>

            <View style={styles.inputArea}>
              <Text style={styles.inputAreaFont}>Preencha a descrição da agenda:</Text>
              <TextInput maxLength={150} style={[styles.input, { minHeight: 150, marginBottom: 10 }]} placeholder="Titulo da agenda (Max.: 150 Caracteres)" onChangeText={(text: string) => setDescriptionString(text)} value={descriptionString} />
            </View>

            <View style={styles.ok}>
              <TouchableOpacity

                style={styles.btn}

                onPress={() => {
                  saveAgenda();
                  // setVisibility(false);
                }}

              >
                <Text style={{ color: 'red', fontSize: 20 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setVisibility(false);
                  // setVisibility(false);
                }}>
                <Text style={{ color: 'green', fontSize: 20 }}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    width: '90%',
    height: "200%",
    marginTop: 20,
    alignSelf: 'center',
    borderColor: 'black',
    backgroundColor: 'black'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  input: {
    borderWidth: .168,
    color: "white",
    borderColor: "white",
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
  ok: {
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    width: 300,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#111',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
    margin: 10,
    borderColor: 'white',
    borderWidth: .168,
  },
  inputArea: {
    margin: 10,
    borderRadius: 5,
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
    justifyContent: 'center',
  },
});

