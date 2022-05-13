/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../components/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import InitialPage from '../screens/InitialPage';
import FriendListScreen from '../screens/friendListScreen';
import SchedulerScreen from '../screens/SchedulerScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import LoginScreen from '../screens/LoginScreen';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import UserProfilePage from "../screens/UserProfilePage";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const user = useSelector((state: any) => state.user);

  return (
    <Stack.Navigator>
      {(user.signedState == false) ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  const user = useSelector((state: any) => state.userInfo);
  useEffect(() => {
  }, [user]);

  return (
    <BottomTab.Navigator
      initialRouteName="InitialPage"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>

      <BottomTab.Screen
        name="InitialPage"
        component={InitialPage}
        options={({ navigation }: RootTabScreenProps<'InitialPage'>) => ({
          title: 'Conexões',
          tabBarIcon: ({ color }: any) => <TabBarIcon name="connectdevelop" color={color} />,
          headerRight: () => (
            <Avatar
              source={{
                uri: user.userData.picture ? user.userData.picture
                  : 'https://cdn-icons-png.flaticon.com/512/147/147140.png'
              }}
              size={36}
              rounded
              containerStyle={style.avatar}
              
              onPress={() => {
                navigation.navigate('UserProfile');
              }}
              
              >

            </Avatar>
          ),
        })}
      />

      <BottomTab.Screen
        name="Scheduler"
        component={SchedulerScreen}
        options={({ navigation }: RootTabScreenProps<'Scheduler'>) => ({
          onclick: () =>{
            navigation.navigate('UserProfile');
          },
          title: 'Agenda',
          tabBarIcon: ({ color }: any) => <TabBarIcon name="calendar" color={color} />,
          headerRight: () => (
            <Avatar
              source={{
                uri: user.userData.picture ? user.userData.picture
                  : 'https://cdn-icons-png.flaticon.com/512/147/147140.png'
              }}
              size={36}
              rounded
              containerStyle={style.avatar} 
              
              onPress={() => {
                navigation.navigate('UserProfile');
              }}
              
              >

            </Avatar>
          )
        })}
      />

      <BottomTab.Screen
        name="FriendList"
        component={FriendListScreen}
        options={({navigation }: RootTabScreenProps<'FriendList'>) => ({	
          onclick: () =>{
            navigation.navigate('UserProfile');
          },
          title: 'Solicitações',
          tabBarIcon: ({ color }: any) => <TabBarIcon name="plus" color={color} />,
          headerRight: () => (
            <Avatar
              source={{
                uri: user.userData.picture ? user.userData.picture
                  : 'https://cdn-icons-png.flaticon.com/512/147/147140.png'
              }}
              size={36}
              rounded
              containerStyle={style.avatar}

              onPress={() => {
                navigation.navigate('UserProfile');
              }}

              >
                
            </Avatar>
            
          )
        })}
      />
      <BottomTab.Screen
        name="UserProfile"
        component={UserProfilePage}
        options={({ navigation }: RootTabScreenProps<'UserProfile'>) => ({
          title: "Perfil",
          tabBarIcon: ({ color }: any) => <TabBarIcon name="heart" color={color} />,
          
        })}
      />

    </BottomTab.Navigator>
  );
}

const style = StyleSheet.create({
  avatar: {
    marginRight: 20,
    borderRadius: 50
  }
})
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
