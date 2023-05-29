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
import AntDesign from 'react-native-vector-icons/AntDesign';
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
  const [storedValueRecive, setStoredValueRecive] = useState<any>([]);
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
      console.log('storedValue 1');
      const newItem = {value: inputValueRecive};
      const updatedItems = [...storedValueRecive, newItem];
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
            value={inputValueRecive}
            onChangeText={setInputValueRecive}
            placeholder="Add item"
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
            {storedValueRecive &&
              storedValueRecive.map((item: any, index: number) => (
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
                      navigation.navigate('Received', {
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

export default ListItemRecive;

const styles = StyleSheet.create({
  input: {
    borderColor: '#644536',
    borderWidth: 2,
    fontSize: 20,
    flex: 0.9,
    backgroundColor: '#F9FBE7',
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
