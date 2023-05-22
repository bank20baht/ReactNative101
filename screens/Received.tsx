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
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" backgroundColor="#98D8AA" />
          <View style={styles.row}>
            <Text style={styles.label}>จำนวนเงิน</Text>
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
            <Text style={styles.label}>ชื่อรายการ</Text>
            <View>
              {chooseItem ? (
                <Text>{chooseItem}</Text>
              ) : (
                <Text onPress={itemListPage}>go to choose page</Text>
              )}
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View style={styles.inputContainer}>
            <Text style={styles.label}>วันที่</Text>
            <TouchableOpacity
              style={{
                alignContent: 'flex-end',
              }}
              onPress={() => setShowDatePicker(true)}>
              <Text>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
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
            <Text style={styles.label}>รายละเอียดเพิ่มเติม</Text>
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
  },
  input: {
    padding: 5,
    fontSize: 20,
  },
  textarea: {},
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
