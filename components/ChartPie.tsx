import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-chart-kit';

type Props = {
  sumPaid: number;
  sumReceived: number;
};

const ChartPie = (props: Props) => {
  const data = [
    {
      name: 'Paid',
      amount: props.sumPaid,
      color: '#FF6D60',
    },
    {
      name: 'Received',
      amount: props.sumReceived,
      color: '#98D8AA',
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
  };

  return (
    <PieChart
      data={data}
      width={300}
      height={220}
      chartConfig={chartConfig}
      accessor="amount"
      backgroundColor="transparent"
      paddingLeft="15"
    />
  );
};

export default ChartPie;
