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
          //backgroundColor: '#FFBF9B',
          backgroundColor: '#644536',
          padding: 10,
          borderColor: 'black',
          borderRadius: 8,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}>
        <Text
          style={{
            //color: '#4D4D4D'
            color: '#E68946',
          }}>
          จำนวนเงินคงเหลือ
        </Text>
        <Text
          style={{
            fontSize: 30,
            //</View>color: '#4D4D4D',
            color: '#E68946',
          }}>
          {props.value} บาท
        </Text>
      </View>
    </View>
  );
};

export default CardBalance;

const styles = StyleSheet.create({});
