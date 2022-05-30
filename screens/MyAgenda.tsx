import React, { useState } from "react";
import { Platform, TouchableOpacity, StyleSheet } from "react-native";
import { View, Text } from '../components/Themed';
import ModalAgenda from '../components/ModalAgenda';
import { Icon } from "react-native-elements";
import ModalAddAgenda from "../components/ModalAddAgenda";


export default function MyAgenda({ agendas }: any) {

  //Create function that return array ordinated by given object date-time based on locale utc
  const sortByDate = (array: any): Array<any> => {
    let ordinated_arr: Array<any> = []
    if (array != undefined && array.length > 0) {
      return ordinated_arr = array.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      });
    }
    return ordinated_arr;
  }

  const [modalAddAgenda, setModalAddAgenda] = useState(false);

  const [agenda, setAgenda] = useState(sortByDate(agendas));
  const [modalAgenda, setModalAgenda] = useState(false);
  const [agendaData, setAgendaData] = useState({});

  const setToThirdDigits = (title: string) => {
    if (title != undefined) {
      if (title.length < 30) {
        return title;
      } else if (title.length >= 30) {
        return title.substring(0, 30) + '...';
      }
    }
  }

  const agenda_view = agenda.map((data: any, id: number) => {
    return <View key={id}>
      {Platform.OS == 'ios' ?
        <TouchableOpacity onPress={() => {
          setAgendaData(data);
          setModalAgenda(true)
        }} style={styles.askAcceptiOS}>
          <Text style={styles.span}>{setToThirdDigits(data.title)}</Text>
          <Text style={styles.con}>&#128197;</Text>
        </TouchableOpacity> :

        <TouchableOpacity onPress={() => {
          setAgendaData(data);
          setModalAgenda(true)
        }} style={styles.askAcceptAndroid}>
          <Text style={styles.span}>{setToThirdDigits(data.title)}</Text>
          <Text style={styles.con}>&#128197;</Text>
        </TouchableOpacity>
      }
    </View>
  })

  return (
    <View style={styles.container}>
      <View style={styles.fixTop}>
        <Text style={styles.h2}>
          Suas agendas ficam aqui
        </Text>

        {
          agenda_view
        }
        {
          agendaData != undefined &&
          <ModalAgenda visibility={modalAgenda} setVisibility={setModalAgenda} agenda={agendaData} />
        }
        <ModalAddAgenda visibility={modalAddAgenda} setVisibility={setModalAddAgenda} />
        <View style={styles.btn_place_top}>
          <Icon
            raised
            reverse
            // reverseColor
            name="calendar-plus"
            color="rgb(50, 255, 0)"
            underlayColor={'rgb(50, 255, 0)'}
            iconStyle={{ color: "black" }}
            type="material-community"
            onPress={() => { setModalAddAgenda(true) }}
          />
        </View>
      </View>
    </View>
  );
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
    color: 'pink',
    width: "80%",
    textAlign: 'center',
  },
  btn_place_top: {
    position: 'absolute',
    bottom: 70,
    right: 4,
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
  },
  con: {
    fontSize: 28
  }
});