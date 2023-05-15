import {
  Image,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';

type Props = {};

const Splash = ({navigation}: any, props: Props) => {
  const changePage = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#363636" />
      <View style={{flex: 0.95, justifyContent: 'center'}}>
        <Pressable onPress={changePage}>
          <Image source={require('../image/logo.png')} style={styles.logo} />
        </Pressable>
      </View>
      <View style={{flex: 0.05}}>
        <Text style={styles.text}>bank20baht</Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#644536',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: 'white',
  },
});
