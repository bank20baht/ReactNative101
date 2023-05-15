import {View, Text, ScrollView, Pressable, StatusBar} from 'react-native';
import React, {useState} from 'react';
import SQLite from 'react-native-sqlite-storage';
import CardBalance from '../components/CardBalance';
import BalanceSplite from '../components/BalanceSplit';
import Cardlist from '../components/Cardlist';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';

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

const Home = ({navigation}: any, props: Props) => {
  const PaidPage = () => {
    navigation.navigate('Paid');
  };

  const ReceivedPage = () => {
    navigation.navigate('Received');
  };

  const [lists, setList] = useState<any[]>([]);
  const [sumPaid, setSumPaid] = useState<number>(0);
  const [sumReceived, setSumReceived] = useState<number>(0);

  const fetchData = async () => {
    return new Promise<void>((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          'SELECT * FROM expenses',
          [],
          (_: any, {rows}: any) => {
            console.log('Data retrieved successfully');
            setList(rows.raw());

            let sumPaid = 0;
            let sumReceived = 0;

            for (let i = 0; i < rows.length; i++) {
              if (rows.item(i).status === 'Paid') {
                sumPaid += rows.item(i).amount;
              } else if (rows.item(i).status === 'Received') {
                sumReceived += rows.item(i).amount;
              }
            }
            setSumPaid(sumPaid);
            setSumReceived(sumReceived);
            resolve();
          },
          (error: any) => {
            console.error('Failed to retrieve data: ', error);
            reject(error);
          },
        );
      });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
  };

  const data = [
    {
      name: 'Paid',
      amount: sumPaid,
      color: '#FF6D60',
    },
    {
      name: 'Received',
      amount: sumReceived,
      color: '#98D8AA',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#F9FBE7'}}>
      <StatusBar barStyle="light-content" backgroundColor="#644536" />
      <ScrollView>
        <CardBalance value={sumReceived - sumPaid} />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <PieChart
            data={data}
            width={300}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>

        <BalanceSplite sumPaid={sumPaid} sumReceived={sumReceived} />
        <View>
          <View>
            {lists ? (
              lists
                .slice(0)
                .reverse()
                .map((list: any, index: number) => {
                  return (
                    <Pressable
                      key={`list-${index}`}
                      onPress={() => {
                        navigation.navigate('MoreInfomation', {
                          id: list.id,
                          amount: list.amount,
                          listName: list.listName,
                          info: list.info,
                          status: list.status,
                        });
                      }}>
                      <Cardlist value={list} />
                    </Pressable>
                  );
                })
            ) : (
              <View>
                <Text>No list found in datase.</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          flexDirection: 'row',

          justifyContent: 'space-evenly',
        }}>
        <View
          style={{flex: 0.5, backgroundColor: '#FF6D60', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}} onPress={PaidPage}>
            จ่าย
          </Text>
        </View>
        <View
          style={{flex: 0.5, backgroundColor: '#98D8AA', alignItems: 'center'}}>
          <Text style={{fontSize: 20, color: 'white'}} onPress={ReceivedPage}>
            รับ
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;
