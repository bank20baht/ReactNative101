import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  value: number;
};

const CardBalance = (props: Props) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#FFBF9B',
          padding: 10,
          borderColor: 'black',
        }}>
        <Text style={{color: '#4D4D4D'}}>จำนวนเงินคงเหลือ</Text>
        <Text style={{fontSize: 30, color: '#4D4D4D'}}>{props.value} บาท</Text>
      </View>
    </View>
  );
};

export default CardBalance;

const styles = StyleSheet.create({});
