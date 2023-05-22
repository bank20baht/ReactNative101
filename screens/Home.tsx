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
    // Create the "expenses" table if it doesn't exist
    db.transaction((tx: any) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, listName TEXT, info TEXT, status TEXT, date TEXT)',
        [],
        (_: any, result: any) => {
          console.log('Table created successfully');
        },
        (_: any, error: any) => {
          console.error('Failed to create table: ', error);
        },
      );
    });
  },
  (error: any) => {
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
        const currentDate = new Date(); // Get the current date
        const currentMonth = currentDate.getMonth() + 1; // Get the current month (1-indexed)
        const currentYear = currentDate.getFullYear();
        const currentMonthFormatted =
          currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;

        tx.executeSql(
          `SELECT * FROM expenses WHERE substr(date, 1, 7) = ?`,
          [`${currentYear}-${currentMonthFormatted}`],
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
    <View
      style={{
        flex: 1,
        //backgroundColor: '#F9FBE7'
        backgroundColor: '#ffecc9',
      }}>
      <StatusBar barStyle="light-content" backgroundColor="#644536" />
      <ScrollView style={{flex: 0.95}}>
        <View
          style={{
            backgroundColor: '#8B4513',
            borderRadius: 8,
            padding: 2,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            margin: 5,
          }}>
          <CardBalance value={sumReceived - sumPaid} />
          <BalanceSplite sumPaid={sumPaid} sumReceived={sumReceived} />
        </View>

        {lists && lists.length > 0 ? (
          <View>
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
            <View
              style={{
                backgroundColor: '#ffecc9',
                borderRadius: 8,
                padding: 2,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
                margin: 5,
                borderColor: '#8B4513',
                borderWidth: 2,
              }}>
              <View
                style={{
                  borderRadius: 8,
                  borderBottomRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  backgroundColor: '#644536',
                }}>
                <Text
                  style={{
                    //color: '#4D4D4D'
                    color: '#E68946',
                    textAlign: 'center',
                  }}>
                  รายการ
                </Text>
              </View>
              {Object.entries<any[]>(groupedLists).map(
                ([date, dateLists], index: number) => (
                  <React.Fragment key={`date-${index}`}>
                    <View
                      style={{
                        backgroundColor: '#FFBF9B',
                      }}>
                      <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                        {date}
                      </Text>
                    </View>
                    {dateLists.reverse().map((list: any, listIndex: number) => (
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
                ),
              )}
            </View>
          </View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              alignContent: 'center',
            }}>
            <Text>ไม่มีรายการในระบบ</Text>
            <Text>สร้างรายรับรายจ่ายของคุณเลย</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flex: 0.05,
        }}>
        <Pressable
          onPress={PaidPage}
          style={{flex: 0.5, backgroundColor: '#FF6D60', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 20, color: 'white'}}>จ่าย</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={ReceivedPage}
          style={{
            flex: 0.5,
            backgroundColor: '#98D8AA',
            alignItems: 'center',
          }}>
          <View>
            <Text style={{fontSize: 20, color: 'white'}}>รับ</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
