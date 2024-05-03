import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardProducto(props) {
  return (
    <TouchableOpacity style={styles.cuerpoCard} onPress={props.funcion}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image
            style={styles.imgPromocion}
            source={{uri: props.urlImagen}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.titulo}> {props.titulo} </Text>
          <Text numberOfLines={2} style={styles.descripcion}>
            {props.descripcion}
          </Text>
        </View>
        <View style={styles.precio}>
          <Text style={styles.precioVal}> {props.moneda} {props.precio} </Text>
          <Text style={styles.cantidad}> x{props.cantidad} </Text>
        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginVertical: '3%',
    width: '90%',
    marginLeft: "5%",
    marginRight: '5%',
    height: 80,
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
  cantidad: { 
    textAlign: "right",
    marginTop: 25
  },
  precioVal: {
    textAlign: "right",
    color: "skyblue"
  },
  precio: {
    width: '30%',
    height: '100%',
    paddingVertical: '1%',
    paddingRight: '3%',
    flexDirection: 'column',
    paddingLeft: '7%',
  },
  left: {
    width: '50%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: '7%',
  },
  right: {
    width: '20%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: "center"
  },
  titulo: {
    fontWeight: '700',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
  },
  descripcion: {
    fontWeight: '400',
    color: 'grey',
    fontSize: 13,
    marginBottom: 10,
  },
  imgPromocion: {
    marginVertical: '2%',
    marginLeft: '10%',
    height: 70,
    width: 70,
    alignSelf: "center",
    borderRadius: 15,
  },
});
