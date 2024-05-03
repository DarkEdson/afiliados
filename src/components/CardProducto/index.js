import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BASE_URL_IMG, PRODUCTS_URL} from '../../../utils/config';

export default function CardProducto(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.funcion}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image
            style={styles.imgPromocion}
            source={{uri: `${BASE_URL_IMG}${PRODUCTS_URL}${props.urlImagen}`}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={2} style={styles.descripcion}>
            Creado el: {props.creado.split('T')[0]}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginTop: '3%',
    width: '100%',
    height: 100,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.17,
    shadowRadius: 2,
    borderRadius: 15,
  },
  view: {
    flexDirection: 'row',
  },
  left: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: '7%',
    justifyContent: 'center',
  },
  right: {
    width: '25%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 6,
  },
  descripcion: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 13,
    marginBottom: 10,
  },
  precio: {
    fontWeight: 'bold',
    color: 'skyblue',
    fontSize: 15,
  },
  imgPromocion: {
    marginTop: '8.5%',
    marginLeft: '10%',
    borderRadius: 15,
    height: 90,
    width: 90,
    alignSelf: 'center',
  },
});
