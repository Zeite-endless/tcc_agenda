import { Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

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
    });

    const loadItems = (day: DateData) => {
        const items = Items || {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;

                const strTime = timeToString(time);

                let isAtrasado: boolean = false;
                let endOfDay = new Date().setUTCHours(0, 0, 0, 0);
                if ((time - Number(endOfDay)) < 0) {
                    isAtrasado = true;
                }


                if (!items[strTime]) {
                    items[strTime] = [];

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: 80,
                            day: strTime,
                            picture: userObj.userData.picture,
                            isAtrasado: isAtrasado
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


    const renderItem = (reservation: AgendaEntry) => {
        const backgroundColor = reservation.isAtrasado ? 'pink' : '#2e99b6';

        return (
            <TouchableOpacity
                testID={testIds.agenda.ITEM}
                style={{ height: reservation.height, display: 'flex', backgroundColor: backgroundColor, flex: 1, borderRadius: 5, padding: 10, marginRight: 10, marginTop: 17 }}
                onPress={() => Alert.alert(reservation.name)}
            >

                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: backgroundColor,
                }}>
                    <Text style={{ fontSize: 16, color: 'black', backgroundColor }}>{reservation.name}</Text>
                    <Avatar source={reservation.picture ? { uri: reservation.picture } : {}} size={64} rounded></Avatar>
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
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )
    }

    const today = (): string => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        const endDate = mm + '/' + dd + '/' + yyyy;
        return endDate.toString();
    }

    return (
        <Agenda
            testID={testIds.agenda.CONTAINER}
            items={Items}
            loadItemsForMonth={loadItems}
            selected={today()}
            renderItem={renderItem}
            renderEmptyData={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
        >

        </Agenda>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
});