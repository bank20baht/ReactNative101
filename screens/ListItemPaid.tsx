import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
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
  const [storedValue, setStoredValue] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Retrieve the stored value on component mount
    getStoredValue();
  }, []);

  const getStoredValue = async () => {
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
      const updatedItems = [...items, newItem];
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
    <View>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder="Add item"
        onSubmitEditing={storeValue}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          {storedValue &&
            storedValue.map((item: any, index: number) => (
              <View key={index} style={{margin: 2}}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Paid', {
                      value: item.value,
                    });
                  }}>
                  <ItemList value={item} />
                  <Text
                    style={styles.deleteButton}
                    onPress={() => deleteValue(item)}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 10,
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
