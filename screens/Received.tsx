import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const Received = (props: Props) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <Text>จำนวนเงิน</Text>
        <Text>500 บาท</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <Text>ชื่อรายการ</Text>
        <Text>ข้าวไข่เจียวหมูสับ</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
        <Text>วันที่</Text>
        <Text>10/05/23</Text>
      </View>
      <View style={{justifyContent: 'space-between', padding: 10}}>
        <Text>รายละเอียดเพิ่มเติม</Text>
        <Text>ข้าวไข่เจียวหมูสับ + พิเศษไข่ดาว</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 5,
          backgroundColor: '#92CEA8'
        }}>
        <Text style={{fontSize: 20, color: '#ffffff'}}>บันทึก</Text>
      </View>
    </View>
  );
};

export default Received;

const styles = StyleSheet.create({});
