import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {
  sumPaid: number;
  sumReceived: number;
};

const BalanceSplit = (props: Props) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: 10,
        }}>
        <View style={{alignItems: 'center', flex: 0.5}}>
          <Text>รวมรายจ่าย</Text>
          <Text>{props.sumPaid} บาท</Text>
        </View>
        <View style={{alignItems: 'center', flex: 0.5}}>
          <Text>รวมรายรับ</Text>
          <Text>{props.sumReceived} บาท</Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceSplit;

const styles = StyleSheet.create({});
