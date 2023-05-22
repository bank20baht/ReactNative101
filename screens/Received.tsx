import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {Formik} from 'formik';
import {number, object, string} from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
    console.error('Failed to open database: ', error);
  },
);

const Received = ({route, navigation}: any, props: Props) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [chooseItem, setChooseItem] = useState('');
  const {value} = route.params || '';

  const itemListPage = () => {
    navigation.navigate('ListItemRecive');
  };

  useEffect(() => {
    // Update chooseItem when the value from route.params changes
    if (value) {
      setChooseItem(value);
    }
  }, [value]);

  const initialValues = {
    amount: '',
    info: '',
    status: 'Received',
  };

  const handleFormSubmit = (values: any) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO expenses (amount, listName, info, date, status) VALUES (?, ?, ?, ?, ?)',
        [
          values.amount,
          chooseItem,
          values.info,
          selectedDate.toISOString().split('T')[0],
          values.status,
        ],
        (_: any, result: any) => {
          console.log('Data inserted successfully');
        },
        (error: any) => {
          console.error('Failed to insert data: ', error);
        },
      );
    });
    navigation.navigate('Home');
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

  const handleDateChange = (event: any, selected: Date | undefined) => {
    const currentDate = selected || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);

    return `${day}/${month}/${year}`;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({handleChange, handleSubmit, values}) => (
        <View
          style={{
            flex: 1,
            //backgroundColor: '#F9FBE7'
            backgroundColor: '#ffecc9',
          }}>
          <StatusBar barStyle="light-content" backgroundColor="#92CEA8" />
          <View style={styles.row}>
            <View style={{flexDirection: 'row', paddingLeft: 5}}>
              <FontAwesome5 name="coins" color={'gray'} size={20} />
              <Text style={styles.label}>จำนวนเงิน</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('amount')}
              value={values.amount}
              textAlign="right"
              keyboardType="numeric"
              placeholder="0.00"
            />
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.row}>
            <View style={{flexDirection: 'row', paddingLeft: 5}}>
              <FontAwesome5
                name="file-invoice-dollar"
                color={'gray'}
                size={20}
              />
              <Text style={styles.label}>ชื่อรายการ</Text>
            </View>
            <View style={{flexDirection: 'row', paddingRight: 5}}>
              <View>
                {chooseItem ? (
                  <Text onPress={itemListPage} style={{paddingRight: 5}}>
                    {chooseItem}
                  </Text>
                ) : (
                  <Text onPress={itemListPage} style={{paddingRight: 5}}>
                    เลือก
                  </Text>
                )}
              </View>
              <FontAwesome5 name="angle-right" color={'gray'} size={20} />
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.inputContainer}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="calendar" color={'gray'} size={20} />
              <Text style={styles.label}>วันที่</Text>
            </View>
            <Pressable
              style={{
                alignContent: 'flex-end',
                flexDirection: 'row',
                paddingRight: 5,
              }}
              onPress={() => setShowDatePicker(true)}>
              <Text style={{paddingRight: 5}}>{formatDate(selectedDate)}</Text>
              <FontAwesome5 name="angle-right" color={'gray'} size={20} />
            </Pressable>
          </View>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.lineStyle} />
          <View style={{padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <AntDesign name="profile" color={'gray'} size={20} />
              <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
            </View>

            <TextInput
              style={styles.textarea}
              numberOfLines={4}
              multiline={true}
              onChangeText={handleChange('info')}
              textAlignVertical="top"
              textAlign="left"
            />
          </View>
          <Pressable style={styles.buttonContainer} onPress={handleSubmit}>
            <View>
              <Text style={styles.button}>บันทึก</Text>
            </View>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default Received;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  label: {
    width: '50%',
    fontSize: 20,
    paddingLeft: 8,
  },
  input: {
    padding: 5,
    fontSize: 20,
  },
  textarea: {
    padding: 5,
    fontSize: 20,
    borderWidth: 1,
    margin: 5,
    borderColor: 'gray',
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#92CEA8',
  },
  button: {
    fontSize: 20,
    color: '#ffffff',
  },
  lineStyle: {
    borderWidth: 0.2,
    borderColor: 'gray',
    margin: 5,
  },
});
