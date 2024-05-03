import React from 'react';
import Card from '../Card/index';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function CardPromocion(props) {
  return (
    <TouchableOpacity
      style={styles.cuerpoCard}
      onPress={props.funcion}>
      <Card>
        <View style={{...styles.view, backgroundColor: props.bgColor}}>
          <View style={styles.right}>
            <Image
              style={styles.imgPromocion}
              source={{uri: props.urlImagen}}
              resizeMode="stretch"
            />
          </View>
          <View style={styles.left}>
            <Text style={styles.titulo}> {props.titulo} </Text>
            <Text style={styles.subTitulo}> {props.descripcion} </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cuerpoCard: {
    marginLeft: '5%',
    width: '90%',
    height: 150,
    borderRadius: 12,
    marginTop: 20
  },
  view: {
    flexDirection: 'row',
    borderRadius: 12,
  },
  left: {
    width: '65%',
    height: 150,
    flexDirection: 'column',
  },
  right: {
    width: '35%',
    height: 150,
    flexDirection: 'column',
    justifyContent: "center"
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 24,
    marginLeft: 13,
    marginBottom: 12,
  },
  subTitulo: {
    fontWeight: '300',
    color: 'grey',
    fontSize: 13,
    marginLeft: 13,
    marginRight: 10,
  },
  imgPromocion: {
    alignSelf: "center",
    height: 100,
    width: 100,
    borderRadius: 12,
  },
});
