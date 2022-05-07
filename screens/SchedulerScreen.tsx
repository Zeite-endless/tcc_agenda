import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import React, { useState } from 'react';
import { Avatar, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import testIds from '../constants/testIds';



export default function SchedulerScreen({ navigation }: RootTabScreenProps<'Scheduler'>) {
    const [Items, setItems] = useState<any>({});
    const userObj = useSelector((state: any) => state.userInfo);

    const [state, setState] = useState<AgendaSchedule>({
        items: []
    })

    // render(){
    //     return  (

    //     )
    // }

    const loadItems = (day: DateData) => {
        const items = Items || {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    // let esta_atrasado = false;

                    // let calculo_atrasado = 2343123 - 33241212

                    // if(calculo_atrasado < 0){
                    //     esta_atrasado = true;
                    // }

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: 80,
                            day: strTime,
                            picture: userObj.userData.picture
                            // atrasado: esta_atrasado
                        });
                    }
                }
            }

            const newItems: AgendaSchedule = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    }

    type AvatarData = {
        image_url: string;
    };

    const baseImage: AvatarData = {
        image_url: userObj.userData.picture
    }


    const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {

        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';
        return (
            <TouchableOpacity
                testID={testIds.agenda.ITEM}
                style={[styles.item, { height: reservation.height, display: 'flex' }]}
                onPress={() => Alert.alert(reservation.name)}
            >
                {/* <Text style={{ fontSize, color }}>{reservation.name}</Text>
                <Avatar source={baseImage.image_url ? { uri: baseImage.image_url } : {}} size={64} rounded></Avatar> */}
                {/* <Card> */}

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-around'
                    }}>
                        <Text style={{fontSize, color}}>{reservation.name}</Text>
                        <Avatar source={baseImage.image_url ? { uri: baseImage.image_url } : {}} size={64} rounded></Avatar>
                    </View>
                {/* </Card> */}

            </TouchableOpacity>
        );
    }

    const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time: number) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text>Parece que não há agendas</Text>
            </View>
        )
    }

    return (
        <Agenda
            testID={testIds.agenda.CONTAINER}
            items={Items}
            loadItemsForMonth={loadItems}
            selected={'2022-04-29'}
            renderItem={renderItem}
            renderEmptyData={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
        >

        </Agenda>
    )

    // return (
    //     <View style={styles.container}>
    //         <Agenda
    //             items={Items}
    //             loadItemsForMonth={loadItems}
    //             renderItem={renderItem}
    //             selected={'2022-04-29'}
    //             rowHasChanged={rowHasChanged}
    //         />
    //     </View>
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    }
});