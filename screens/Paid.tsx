import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';

type Props = {};

const Paid = (props: Props) => {
  const [amout, setAmout] = useState('');
  const [listName, setListName] = useState('');
  const [info, setInfo] = useState('');
  const [date, setDate] = useState(new Date());
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{width: '50%'}}>จำนวนเงิน</Text>
        <TextInput style={styles.input} onChangeText={setAmout} value={amout} textAlign="right"/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>ชื่อรายการ</Text>
        <TextInput style={styles.input} onChangeText={setListName} textAlign="right"/>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>วันที่</Text>
        <Text>{date.toString()}</Text>
      </View>
      <View style={{padding: 10}}>
        <Text>รายละเอียดเพิ่มเติม</Text>
        <TextInput
          style={styles.textarea}
          numberOfLines = {4}
          multiline={true}
          onChangeText={setInfo}
          textAlignVertical="top"
          textAlign="left"
        />
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
          backgroundColor: '#ff6961',
        }}>
        <Text style={{fontSize: 20, color: '#ffffff'}}>บันทึก</Text>
      </View>
    </View>
  );
};

export default Paid;

const styles = StyleSheet.create({
  input: {
    width: '50%',
    borderWidth: 1,
  },
  textarea: {
    borderWidth: 1,
  },
});
