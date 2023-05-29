import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemList from '../components/itemsList';
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const [storedValue, setStoredValue] = useState<any>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    getStoredValue();
  }, []);

  const getStoredValue = async () => {
    console.log('storedValue 1');
    try {
      const value = await AsyncStorage.getItem('storedValue');
      if (value !== null) {
        setStoredValue(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };

  const storeValue = async () => {
    try {
      const newItem = {value: inputValue};
      const updatedItems = [...storedValue, newItem];
      await AsyncStorage.setItem('storedValue', JSON.stringify(updatedItems));
      setStoredValue(updatedItems);
      setInputValue('');
    } catch (error) {
      console.log('Error storing value:', error);
    }
  };

  const deleteValue = async (item: any) => {
    try {
      const filteredItems = storedValue.filter(
        (storedItem: any) => storedItem.value !== item.value,
      );
      await AsyncStorage.setItem('storedValue', JSON.stringify(filteredItems));
      setStoredValue(filteredItems);
    } catch (error) {
      console.log('Error deleting value:', error);
    }
  };

  return (
    <View style={{backgroundColor: '#ffecc9', flex: 1}}>
      <View
        style={{
          flex: 0.1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Add item"
            placeholderTextColor="gray"
            onSubmitEditing={storeValue}
          />
          <AntDesign
            name="plussquare"
            size={40}
            color="#644536"
            style={{flex: 0.1}}
            onPress={() => {
              storeValue();
            }}
          />
        </View>
      </View>
      <View style={{flex: 0.9}}>
        <ScrollView>
          <View style={{flex: 1}}>
            {storedValue &&
              storedValue.map((item: any, index: number) => (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 5,
                    marginVertical: 2,
                    backgroundColor: '#FFBF9B',
                    borderColor: '#644536',
                    borderRadius: 8,
                    borderWidth: 2,
                  }}>
                  <Pressable
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      navigation.navigate('Paid', {
                        value: item.value,
                      });
                    }}>
                    <ItemList value={item} />
                    <AntDesign
                      name="closecircle"
                      color={'red'}
                      size={20}
                      onPress={() => deleteValue(item)}
                    />
                  </Pressable>
                </View>
              ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  input: {
    borderColor: '#644536',
    borderWidth: 2,
    fontSize: 20,
    flex: 0.9,
    backgroundColor: '#F9FBE7',
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
  },
  deleteButton: {
    color: 'red',
    flex: 0.1,
    alignItems: 'center',
  },
});
