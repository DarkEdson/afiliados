import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}


const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginTop: 5,
    marginBottom: 5,
  },
  cardContenido: {
    marginHorizontal: 0,
    marginVertical: 0,
  }
})