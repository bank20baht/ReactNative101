import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import SQLite from 'react-native-sqlite-storage';

type Props = {};

const db = SQLite.openDatabase(
  {
    name: 'test2.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Faild to open database: ', error);
  },
);

const Received = ({navigation}: any, props: Props) => {
  const [amout, setAmout] = useState('');
  const [listName, setListName] = useState('');
  const [info, setInfo] = useState('');
  const [date, setDate] = useState(new Date());
  const status = 'Received';
  const insertData = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO expenses (amount, listName, info, date, status) VALUES (?, ?, ?, ?, ?)',
        [amout, listName, info, date, status],
        (_: any, result: any) => {
          console.log('Data inserted successfully');
        },
        (error: any) => {
          console.error('Failed to insert data: ', error);
        },
      );
    });
    returnPage();
  };
  db.transaction((tx: any) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, listName TEXT, info TEXT, date TEXT, status TEXT)',
      [],
      (_: any, result: any) => {
        console.log('Table created successfully');
      },
      (error: any) => {
        console.error('Failed to create table: ', error);
      },
    );
  });

  const returnPage = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{width: '50%'}}>จำนวนเงิน</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAmout}
          value={amout}
          textAlign="right"
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>ชื่อรายการ</Text>
        <TextInput
          style={styles.input}
          onChangeText={setListName}
          textAlign="right"
        />
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
      <View style={{justifyContent: 'space-between', padding: 10}}>
        <Text>รายละเอียดเพิ่มเติม</Text>
        <TextInput
          style={styles.textarea}
          numberOfLines={4}
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
          backgroundColor: '#92CEA8',
        }}>
        <Text style={{fontSize: 20, color: '#ffffff'}} onPress={insertData}>
          บันทึก
        </Text>
      </View>
    </View>
  );
};

export default Received;

const styles = StyleSheet.create({
  input: {
    width: '50%',
    borderWidth: 1,
  },
  textarea: {
    borderWidth: 1,
  },
});
