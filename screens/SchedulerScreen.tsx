import { Alert, StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import React, { useState } from 'react';
import { Avatar, Card } from 'react-native-elements';



export default function SchedulerScreen({ navigation }: RootTabScreenProps<'Scheduler'>) {
    const [Items, setItems] = useState<any>({});

    const loadItems = () => {
        const items = Items || {};

        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = new Date().getTime() + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];

                    let esta_atrasado = false;

                    let calculo_atrasado = 2343123 - 33241212

                    if(calculo_atrasado < 0){
                        esta_atrasado = true;
                    }

                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                            day: strTime,
                            atrasado: esta_atrasado
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
        image_url: 'https://cdn-icons-png.flaticon.com/512/147/147140.png'
    }


    const renderItem = (reservation: AgendaEntry) => {

        return (
            <TouchableOpacity>
                <Card >

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: 'black'}}>{reservation.name}</Text>
                        <Avatar source={baseImage.image_url ? {uri: baseImage.image_url}: {}} size={64} rounded containerStyle={{
                            backgroundColor: 'green'
                        }}></Avatar>
                    </View>
                </Card>

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

    return (
        <View style={styles.container}>
            <Agenda
                items={Items}
                loadItemsForMonth={loadItems}
                renderItem={renderItem}
                selected={'2022-02-21'}
                rowHasChanged={rowHasChanged}
            />
        </View>
    );
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
    }
});