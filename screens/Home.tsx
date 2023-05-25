import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Pressable, StatusBar} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {PieChart} from 'react-native-chart-kit';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CardBalance from '../components/CardBalance';
import BalanceSplite from '../components/BalanceSplit';
import Cardlist from '../components/Cardlist';

import {openDatabase, createTable} from '../utils/db';
import {formatMonthYeartoDB, readableDate} from '../utils/formatDate';

type Props = {};

const db = openDatabase();
createTable(db); // create table in first time

const Home = ({navigation}: any, props: Props) => {
  const PaidPage = () => {
    navigation.navigate('Paid');
  };

  const ReceivedPage = () => {
    navigation.navigate('Received');
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [lists, setList] = useState<any[]>([]);
  const [sumPaid, setSumPaid] = useState<number>(0);
  const [sumReceived, setSumReceived] = useState<number>(0);

  const fetchData = async () => {
    return new Promise<void>((resolve, reject) => {
      db.transaction((tx: any) => {
        tx.executeSql(
          `SELECT * FROM expenses WHERE substr(date, 1, 7) = ?`,
          [formatMonthYeartoDB(currentDate)],
          (_: any, {rows}: any) => {
            console.log('Data retrieved successfully');
            setList(rows.raw());
            console.log(rows.raw());
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

  /*
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      //setTitle(getCurrentMonthYear());
    }, []),
  );
*/
  // ...

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [currentDate]),
  );

  // ...

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
      const date = new Date(item.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!groupedLists[date]) {
        groupedLists[date] = [];
      }
      groupedLists[date].push(item);
    }

    return groupedLists;
  };

  const handlerPrivosPage = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth() - 1,
      date.getDate(),
    );
    setCurrentDate(newDate);
  };

  const handlerNextPage = (date: Date) => {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    );
    setCurrentDate(newDate);
  };

  const groupedLists = groupListsByDate(lists);

  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: '#F9FBE7'
        backgroundColor: '#ffecc9',
      }}>
      <View
        style={{
          flex: 0.1,
          backgroundColor: '#644536',
          justifyContent: 'center', // Center vertically
          alignItems: 'center', // Center horizontally
          flexDirection: 'row',
        }}>
        <AntDesign
          name="leftcircleo"
          size={20}
          color={'#E68946'}
          onPress={() => {
            console.log('previous');
            handlerPrivosPage(currentDate);
          }}
        />

        <Text
          style={{
            color: '#E68946',
            textAlign: 'center',
            fontSize: 20,
            paddingHorizontal: 10,
          }}>
          {readableDate(currentDate)}
        </Text>
        {currentDate.getMonth() == new Date().getMonth() &&
        currentDate.getFullYear() == new Date().getFullYear() ? (
          <View></View>
        ) : (
          <AntDesign
            name="rightcircleo"
            size={20}
            color={'#E68946'}
            onPress={() => {
              console.log('next');
              handlerNextPage(currentDate);
            }}
          />
        )}
      </View>
      <StatusBar barStyle="light-content" backgroundColor="#644536" />
      <View style={{flex: 0.85}}>
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
          <ScrollView style={{flex: 1}}>
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
                {Object.entries<any[]>(groupedLists)
                  .reverse()
                  .map(([date, dateLists], index: number) => (
                    <React.Fragment key={`date-${index}`}>
                      <View
                        style={{
                          backgroundColor: '#FFBF9B',
                        }}>
                        <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                          {date}
                        </Text>
                      </View>
                      {dateLists
                        .reverse()
                        .map((list: any, listIndex: number) => (
                          <Pressable
                            key={`list-${index}-${listIndex}`}
                            onPress={() => {
                              navigation.navigate('MoreInfomation', {
                                id: list.id,
                                amount: list.amount,
                                listName: list.listName,
                                info: list.info,
                                status: list.status,
                                date: list.date,
                              });
                            }}>
                            <Cardlist value={list} />
                          </Pressable>
                        ))}
                    </React.Fragment>
                  ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center', // Center vertically
              alignItems: 'center', // Center horizontally
            }}>
            <Text>ไม่มีรายการในระบบ</Text>
            <Text>สร้างรายรับรายจ่ายของคุณเลย</Text>
          </View>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          flex: 0.05,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Pressable
          onPress={PaidPage}
          style={{flex: 0.5, backgroundColor: '#FF6D60', alignItems: 'center'}}>
          <View>
            <Text style={{fontSize: 20, color: 'white'}}>รายจ่าย</Text>
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
            <Text style={{fontSize: 20, color: 'white'}}>รายรับ</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
