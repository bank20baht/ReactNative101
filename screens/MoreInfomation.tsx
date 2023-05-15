import {StyleSheet, Text, View, TextInput, StatusBar} from 'react-native';
import React from 'react';
import SQLite from 'react-native-sqlite-storage';
import {ErrorMessage, Formik} from 'formik';
import {number, object, string} from 'yup';

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

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({handleChange, handleSubmit, values}) => (
        <View style={{flex: 1}}>
          <StatusBar barStyle="light-content" backgroundColor="#98D8AA" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 10,
            }}>
            <Text style={{width: '50%'}}>จำนวนเงิน</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('amount')}
              value={values.amount}
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
              onChangeText={handleChange('listName')}
              value={values.listName}
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
            <Text>{new Date().toString()}</Text>
          </View>
          <View style={{padding: 10}}>
            <Text>รายละเอียดเพิ่มเติม</Text>
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

            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
                textAlign: 'center',
                padding: 5,
                backgroundColor: '#E57734',
              }}
              onPress={handleSubmit}>
              บันทึก
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default MoreInfomation;

const styles = StyleSheet.create({
  input: {
    width: '50%',
    borderWidth: 1,
  },
  textarea: {
    borderWidth: 1,
  },
});
