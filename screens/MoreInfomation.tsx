import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import {ErrorMessage, Formik} from 'formik';
import {number, object, string} from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const MoreInfomation = ({route, navigation}: any, props: any) => {
  const {id, amount, listName, info, status} = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialValues = {
    amount: amount.toString(),
    listName: listName.toString(),
    info: info.toString(),
    status: status.toString(),
  };

  const handleFormSubmit = (values: any) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'UPDATE expenses SET amount = ?, listName = ?, info = ?, date = ?, status = ? WHERE id = ?',
        [
          values.amount,
          values.listName,
          values.info,
          new Date(),
          values.status,
          id,
        ],
        (_: any, result: any) => {
          console.log('Data updated successfully');
        },
        (error: any) => {
          console.error('Failed to update data: ', error);
        },
      );
    });
    navigation.navigate('Home');
  };

  const handleDelete = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        'DELETE FROM expenses WHERE id = ?',
        [id],
        (_: any, result: any) => {
          console.log('Data deleted successfully');
        },
        (error: any) => {
          console.error('Failed to delete data: ', error);
        },
      );
    });
    navigation.navigate('Home');
  };

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
          <StatusBar barStyle="light-content" backgroundColor="#644536" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={styles.label}>จำนวนเงิน</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('amount')}
              value={values.amount}
              textAlign="right"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={styles.label}>ชื่อรายการ</Text>
            <View>
              <Text>{listName.toString()}</Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
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
              value={values.info}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              flexDirection: 'column',
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'red',
                  padding: 5,
                }}
                onPress={handleDelete}>
                ลบรายการ
              </Text>
            </View>
            <Pressable
              style={{
                padding: 5,
                backgroundColor: '#644536',
              }}
              onPress={handleSubmit}>
              <View>
                <Text
                  style={{fontSize: 20, color: '#ffffff', textAlign: 'center'}}>
                  บันทึก
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default MoreInfomation;

const styles = StyleSheet.create({
  label: {
    width: '50%',
    fontSize: 20,
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: 20,
  },
  textarea: {
    padding: 5,
    fontSize: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
});
