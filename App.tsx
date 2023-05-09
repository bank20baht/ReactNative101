import { View, Text } from 'react-native'
import React from 'react'
import Splash from './screens/Splash'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
const Stack = createNativeStackNavigator();

type Props = {}

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
        options={{title: 'Welcome'}}
      />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App