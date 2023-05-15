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
          backgroundColor: '#FFBF9B',
        }}>
        <View style={{alignItems: 'center', flex: 0.5}}>
          <Text style={{color: 'red'}}>รวมรายจ่าย</Text>
          <Text style={{color: 'red', fontSize: 20}}>{props.sumPaid} บาท</Text>
        </View>
        <View style={{alignItems: 'center', flex: 0.5}}>
          <Text style={{color: 'green'}}>รวมรายรับ</Text>
          <Text style={{color: 'green', fontSize: 20}}>
            {props.sumReceived} บาท
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BalanceSplit;

const styles = StyleSheet.create({});
