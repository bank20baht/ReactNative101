import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

type Props = {};

const Home = ({navigation}: any, props: Props) => {

  SQLite.openDatabase({
    name: 'test.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully')
  },
  error => {
    console.error('Faild to open database: ', error)
  })


  const PaidPage = () => {
    navigation.navigate('Paid');
  };

  const ReceivedPage = () => {
    navigation.navigate('Received');
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: 10,
            borderColor: 'black'
          }}>
          <Text>จำนวนเงินคงเหลือ</Text>
          <Text style={{fontSize: 30}}>20 บาท</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            margin: 10,
          }}>
          <View style={{alignItems: 'center', flex: 0.5}}>
            <Text>รวมรายจ่าย</Text>
            <Text>2000.00 บาท</Text>
          </View>
          <View style={{alignItems: 'center', flex: 0.5}}>
            <Text>รวมรายรับ</Text>
            <Text>4000.00 บาท</Text>
          </View>
        </View>
        <View>
        <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
          <Text>10</Text>
          <View>
            <Text>วันพุธ</Text>
            <Text>พฤษภาคม 2023</Text>
          </View>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
          <Text>ข้าวไข่เจียวหมูสับ</Text>
          <Text>40 บาท</Text>
        </View>
        </View>

      </ScrollView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <View style={{flex: 0.5, backgroundColor: '#ff6961', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}} onPress={PaidPage}>
            จ่าย
          </Text>
        </View>
        <View
          style={{flex: 0.5, backgroundColor: '#92CEA8', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}} onPress={ReceivedPage}>
            รับ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
