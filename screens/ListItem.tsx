import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ItemList from '../components/itemsList';

type Props = {};

const items = ['ข้าว', 'น้ำ', 'ขนม', 'ค่าน้ำมัน', 'ค่าเดินทาง', 'การเรียน'];

const ListItem: React.FC<Props> = ({navigation}: any) => {
  return (
    <View style={{flex: 1}}>
      {items.map((item: string, index: number) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate('MoreInfomation');
            }}>
            <ItemList value={item} />
          </Pressable>
        );
      })}
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({});
