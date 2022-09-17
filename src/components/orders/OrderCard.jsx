import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from './../common/Card';

export default function OrderCard(props) {
  const {data} = props;
  return (
    <View style={styles.listContainer}>
      <Card data={data} displayMode={props.displayMode}/>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%'
  }
})