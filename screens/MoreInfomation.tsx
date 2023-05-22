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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  console.log(route.params);
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
        <View
          style={{
            flex: 1,
            //backgroundColor: '#F9FBE7'
            backgroundColor: '#ffecc9',
          }}>
          <StatusBar barStyle="light-content" backgroundColor="#644536" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
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
            />
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <View style={{flexDirection: 'row', paddingLeft: 5}}>
              <FontAwesome5
                name="file-invoice-dollar"
                color={'gray'}
                size={20}
              />
              <Text style={styles.label}>ชื่อรายการ</Text>
            </View>
            <View>
              <Text style={{fontSize: 20}}>{listName.toString()}</Text>
            </View>
          </View>
          <View style={styles.lineStyle} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
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
    paddingLeft: 8,
  },
  input: {
    flex: 1,
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
});
