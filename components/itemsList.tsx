import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const itemsList = (props: any) => {
  const {value} = props.value;
  return (
    <View>
      <Text style={{color: 'black'}}>{value}</Text>
    </View>
  );
};

export default itemsList;

const styles = StyleSheet.create({});
