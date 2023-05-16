import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const itemsList = (props: any) => {
  const {item} = props.value;
  return (
    <View>
      <Text>{item}</Text>
    </View>
  );
};

export default itemsList;

const styles = StyleSheet.create({});
