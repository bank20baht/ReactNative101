import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatMonthYeartoDB, readableDate} from '../utils/formatDate';
import {openDatabase, createTable} from '../utils/db';

type Props = {};

const SummaryPage = (props: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [itemSummary, setItemSummary] = useState<any[]>([]);

  useEffect(() => {
    const db = openDatabase();
    createTable(db);
    fetchItemSummary(db, currentDate);
  }, [currentDate]);

  const fetchItemSummary = (db: any, date: Date) => {
    const startDate = formatMonthYeartoDB(date);
    const endDate = formatMonthYeartoDB(
      new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    );

    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT listName, SUM(amount) AS totalAmount FROM expenses WHERE date >= ? AND date < ? GROUP BY listName`,
        [startDate, endDate],
        (
          _: any,
          {rows}: {rows: {length: number; item: (index: number) => any}},
        ) => {
          const data = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          setItemSummary(data);
        },
        (error: any) => {
          console.error('Failed to fetch item summary: ', error);
        },
      );
    });
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

  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <AntDesign
          name="leftcircleo"
          size={20}
          color={'#E68946'}
          onPress={() => {
            console.log('previous');
            handlerPrivosPage(currentDate);
          }}
        />

        <Text style={styles.headerText}>{readableDate(currentDate)}</Text>
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
      <View style={{flex: 0.9}}>
        {itemSummary.map(item => (
          <Text key={item.listName}>{`${
            item.listName
          }: $${item.totalAmount.toFixed(2)}`}</Text>
        ))}
      </View>
    </View>
  );
};

export default SummaryPage;

const styles = StyleSheet.create({
  header: {
    flex: 0.1,
    backgroundColor: '#644536',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    color: '#E68946',
    textAlign: 'center',
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
