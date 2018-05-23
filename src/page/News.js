import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class News extends Component {
  static navigationOptions = {
    headerTitle:'资讯'
 }
  render() {
    return (
      <View style={styles.container}>
        <Text> News </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    margin:100,
    justifyContent: 'center',
    alignItems:'center',
  }
})

