import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const itemsList = (props: any) => {
  const {value} = props.value;
  return (
    <View
      style={{
        padding: 5,
        margin: 2,
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'black', fontSize: 20}}>{value}</Text>
    </View>
  );
};

export default itemsList;

const styles = StyleSheet.create({});
