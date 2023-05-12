import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    value: number
}

const CardBalance = (props: Props) => {
  return (
    <View>
      <View
          style={{
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: 10,
            borderColor: 'black',
          }}>
          <Text>จำนวนเงินคงเหลือ</Text>
          <Text style={{fontSize: 30}}>{props.value} บาท</Text>
        </View>
    </View>
  )
}

export default CardBalance

const styles = StyleSheet.create({})