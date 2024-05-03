import React, { useState } from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';

export default function CardAfiliado(props) {
  // Variables 
  const [expand, setexpand] = useState(false)


  // Contenido
  return (
    <TouchableOpacity style={expand ? styles.cuerpoCardExpand : styles.cuerpoCard} onPress={() => setexpand(!expand)}>
      <View style={{...styles.view, backgroundColor: props.bgColor}}>
        <View style={styles.right}>
          <Image
            style={styles.imgPromocion}
            source={{uri: props.urlImagen}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.left}>
          <Text style={styles.titulo}> {props.nombre} </Text>
          <Text numberOfLines={4} style={styles.descripcion}>
            {props.descripcion}
          </Text>
        </View>
      </View>
      {
        expand ? 
          <View style={styles.info}>
            <Text style={styles.tituloContacto}> Contacto  </Text>
            <View style={styles.showTextIcon}>
			        <Ionic size={18} name="md-phone-portrait" style={styles.Icon}/>
              <Text style={styles.input}> {props.contacto.cel}  </Text>
            </View>
            <View style={styles.showTextIcon}>
			        <Ionic size={18} name="mail" style={styles.Icon}/>
              <Text style={styles.input}>  {props.contacto.email}  </Text>
            </View>
          </View>
        : 
          null
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tituloContacto: { 
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 15
  },
  info: { 
    borderWidth: 1,
    borderColor: "grey",
    margin: 10,
    marginTop: 15,
    padding: 10,
    borderRadius: 20
  },  
  showTextIcon: {
		width: '100%',
		height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
	input: {
		flex: 1,
	},
	Icon: {
    padding: 10,
	},
  cuerpoCardExpand: { 
    marginTop: '3%',
    width: '100%',
    height: 270,
    elevation: 2,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#333',
    shadowOpacity: 0.17,
    shadowRadius: 2,
    borderRadius: 15,
  },
  cuerpoCard: {
    marginTop: '3%',
    width: '100%',
    height: 120,
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
    height: 100
  },
  left: {
    width: '65%',
    height: '100%',
    flexDirection: 'column',
    paddingLeft: '7%',
  },
  right: {
    width: '25%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: "center"
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
    height: 90,
    width: 90,
    alignSelf: "center",
    borderRadius: 15,
  },
});
