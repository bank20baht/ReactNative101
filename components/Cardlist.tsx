import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Cardlist = (props: any) => {
  const {listName, amount, status} = props.value;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
      }}>
      <Text style={{color: status === 'Paid' ? 'red' : 'green'}}>
        {listName}
      </Text>
      <Text style={{color: status === 'Paid' ? 'red' : 'green'}}>
        {amount} บาท
      </Text>
    </View>
  );
};

export default Cardlist;

const styles = StyleSheet.create({});
