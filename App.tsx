import {View, Text} from 'react-native';
import React from 'react';
import Splash from './screens/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Paid from './screens/Paid';
import Received from './screens/Received';
import MoreInfomation from './screens/MoreInfomation';
const Stack = createNativeStackNavigator();

type Props = {};

const App = (props: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({navigation}) => ({
            title: 'My Wallet',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#644536',
            },
            headerTitleAlign: 'center',
            headerLeft: () => null, // Remove the back button
          })}
        />
        <Stack.Screen
          name="Paid"
          component={Paid}
          options={{
            title: 'Paid',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#ff6961',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="Received"
          component={Received}
          options={{
            title: 'Received',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#92CEA8',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="MoreInfomation"
          component={MoreInfomation}
          options={{
            title: 'More Infomation',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#E57734',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
