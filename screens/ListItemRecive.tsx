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

const itemsRecive = [
  {
    value: 'พี่ให้',
  },
  {
    value: 'ถูกหวย',
  },
  {
    value: 'ลงทุน',
  },
  {
    value: 'ขายของ',
  },
  {
    value: 'เเม่ให้',
  },
  {
    value: 'พ่อให้',
  },
];

const ListItemRecive: React.FC<Props> = ({navigation}: any) => {
  const [storedValueRecive, setStoredValueRecive] = useState<any>(null);
  const [inputValueRecive, setInputValueRecive] = useState('');

  useEffect(() => {
    // Retrieve the stored value on component mount
    getStoredValue();
  }, []);

  const getStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('storedValueRecive');
      if (value !== null) {
        setStoredValueRecive(JSON.parse(value));
      }
    } catch (error) {
      console.log('Error retrieving stored value:', error);
    }
  };

  const storeValue = async () => {
    try {
      const newItem = {value: inputValueRecive};
      const updatedItems = [...itemsRecive, newItem];
      await AsyncStorage.setItem(
        'storedValueRecive',
        JSON.stringify(updatedItems),
      );
      setStoredValueRecive(updatedItems);
      setInputValueRecive('');
    } catch (error) {
      console.log('Error storing value:', error);
    }
  };

  const deleteValue = async (item: any) => {
    try {
      const filteredItems = storedValueRecive.filter(
        (storedItem: any) => storedItem.value !== item.value,
      );
      await AsyncStorage.setItem('storedValue', JSON.stringify(filteredItems));
      setStoredValueRecive(filteredItems);
    } catch (error) {
      console.log('Error deleting value:', error);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={inputValueRecive}
        onChangeText={setInputValueRecive}
        placeholder="Add item"
        onSubmitEditing={storeValue}
      />
      <ScrollView>
        <View style={{flex: 1}}>
          {storedValueRecive &&
            storedValueRecive.map((item: any, index: number) => (
              <View key={index} style={{margin: 2}}>
                <Pressable
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: 'white',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('Received', {
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

export default ListItemRecive;

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
