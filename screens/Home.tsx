import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable, StatusBar} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import CardBalance from '../components/CardBalance';
import BalanceSplite from '../components/BalanceSplit';
import Cardlist from '../components/Cardlist';
import {useFocusEffect} from '@react-navigation/native';
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
    console.error('Failed to open database: ', error);
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

  const groupListsByDate = (list: any[]) => {
    const groupedLists: {[key: string]: any[]} = {};

    for (const item of list) {
      const date = new Date(item.date).toDateString();

      if (groupedLists[date]) {
        groupedLists[date].push(item);
      } else {
        groupedLists[date] = [item];
      }
    }

    return groupedLists;
  };

  const groupedLists = groupListsByDate(lists);

  return (
    <View style={{flex: 1, backgroundColor: '#F9FBE7'}}>
      <StatusBar barStyle="light-content" backgroundColor="#644536" />
      <ScrollView style={{flex: 0.95}}>
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
          {Object.entries<any[]>(groupedLists)
            .reverse()
            .map(([date, dateLists], index: number) => (
              <React.Fragment key={`date-${index}`}>
                <View
                  style={{
                    backgroundColor: 'white',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>{date}</Text>
                </View>
                {dateLists.map((list: any, listIndex: number) => (
                  <Pressable
                    key={`list-${index}-${listIndex}`}
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
                ))}
              </React.Fragment>
            ))}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flex: 0.05,
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
