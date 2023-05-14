import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Cardlist = (props: any) => {
  const {listName, amount, status} = props.value;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        margin: 5,
      }}>
      <Text
        style={{
          fontSize: 20,
          color: status === 'Paid' ? 'red' : 'green',
        }}>
        {listName}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: status === 'Paid' ? 'red' : 'green',
        }}>
        {amount} บาท
      </Text>
    </View>
  );
};

export default Cardlist;

const styles = StyleSheet.create({});
