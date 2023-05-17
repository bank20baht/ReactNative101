import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemList from '../components/itemsList';

type Props = {};

const items = [
  {
    value: 'ข้าว',
  },
  {
    value: 'เดินทาง',
  },
  {
    value: 'น้ำมัน',
  },
  {
    value: 'น้ำ',
  },
  {
    value: 'การเรียน',
  },
  {
    value: 'ขนม',
  },
  {
    value: 'หนังสือ',
  },
  {
    value: 'เครื่องดื่ม',
  },
];

const ListItem: React.FC<Props> = ({navigation}: any) => {
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        {items.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <ItemList value={item} />
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
