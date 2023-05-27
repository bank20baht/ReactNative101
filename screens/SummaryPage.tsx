import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {formatMonthYeartoDB, readableDate} from '../utils/formatDate';
import {openDatabase, createTable} from '../utils/db';
import Cardlist from '../components/Cardlist';
import BalanceSplit from '../components/BalanceSplit';
type Props = {};

const db = openDatabase();

const SummaryPage = (props: Props) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [itemSummary, setItemSummary] = useState<any[]>([]);
  const [sumPaid, setSumPaid] = useState<number>(0);
  const [sumReceived, setSumReceived] = useState<number>(0);

  useEffect(() => {
    const db = openDatabase();
    createTable(db);
    fetchData(db, currentDate);
  }, [currentDate]);

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
  /*
  const fetchItemSummary = (db: any, date: Date) => {
    const startDate = formatMonthYeartoDB(date);
    const endDate = formatMonthYeartoDB(
      new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    );

    db.transaction((tx: any) => {
      tx.executeSql(
        `SELECT listName, status, SUM(amount) AS amount FROM expenses WHERE date >= ? AND date < ? GROUP BY listName`,
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
 */

  const fetchData = async (db: any, date: Date) => {
    const startDate = formatMonthYeartoDB(date);
    const endDate = formatMonthYeartoDB(
      new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
    );
    try {
      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `SELECT 
                SUM(CASE WHEN status = 'Paid' AND amount > 0 THEN amount ELSE 0 END) AS sumPaid,
                SUM(CASE WHEN status = 'Received' AND amount > 0 THEN amount ELSE 0 END) AS sumReceived
            FROM 
                expenses
            WHERE 
                substr(date, 1, 7) = ?`,
            [formatMonthYeartoDB(currentDate)],
            (_: any, {rows}: any) => {
              const {sumPaid, sumReceived} = rows.item(0);
              setSumPaid(sumPaid);
              setSumReceived(sumReceived);
              resolve();
            },
            (error: any) => {
              console.error('Failed to retrieve sum data: ', error);
              reject(error);
            },
          );
        });
      });

      await new Promise<void>((resolve, reject) => {
        db.transaction((tx: any) => {
          tx.executeSql(
            `SELECT listName, status, SUM(amount) AS amount FROM expenses WHERE date >= ? AND date < ? GROUP BY listName`,
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
      });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffbf9b'}}>
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
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontStyle: 'italic',
            fontWeight: 'bold',
          }}>
          สรุปรายรับรายจ่ายประจำเดือน
        </Text>
      </View>
      <ScrollView
        style={{
          flex: 0.9,
          backgroundColor: '#ffecc9',
          margin: 10,
          elevation: 5, // Add elevation for the shadow effect
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          flexDirection: 'column',
        }}>
        <View>
          <BalanceSplit sumPaid={sumPaid} sumReceived={sumReceived} />
          <Text style={{textAlign: 'center', fontSize: 30, color: '#ffbf9b'}}>
            - - - - - - - - - - - - - - - - - - - - - -
          </Text>
        </View>
        {itemSummary
          .sort()
          .reverse()
          .map(item => (
            <Cardlist value={item} key={item.listName} />
          ))}
        <View>
          <Text
            style={{
              textAlign: 'right',
              marginRight: 10,
              fontSize: 20,
              fontStyle: 'italic',
              fontWeight: 'bold',
              marginTop: 30,
            }}>
            คงเหลือ {sumReceived - sumPaid} บาท.
          </Text>
        </View>
      </ScrollView>
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
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'gray',
    margin: 5,
  },
});
