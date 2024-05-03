import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState , useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, Linking, Touch, TouchableOpacity } from 'react-native'
import { APIURL } from '../../../utils/config'

const Ayuda = () => {
  // Variables
  const [cel, setcel] = useState('308952032')
  const [email, setemail] = useState('senoriales@gmail.com')
  const [idUsuario, setidUsuario] = useState(null)
  const [texto, settexto] = useState('  Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.')

  useEffect(() => {
    datosUsuarioAPI()
    return () => {
      
    };
  }, [])

  async function datosUsuarioAPI(){
    var id = await AsyncStorage.getItem('idUser');
    setidUsuario(id)
		var token = await AsyncStorage.getItem('userToken');
		let url = `${APIURL}/user.show/${id}`;
		var usuario = {}
		try {
			await fetch(url, {
				method: 'GET',
				redirect: 'follow',
			})
				.then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
          console.log(response)
					usuario = response
          setemail(response.email)
          setcel(response.phone)
				});
				return usuario
		} catch (error) {
			console.error(error);
			return {}
		}
  }

const handlePress = ()=>{
  Linking.openURL(`tel:${cel}`)
}
const handleEmailPress = ()=>{
  Linking.openURL(`mailto:${email}`)
}

  // Contenido 
	return (
		<View style={styles.root}>
      <ScrollView>
        <Text style={styles.titulo}>   </Text>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.subTit}> Telefono: 
        </Text>
        <TouchableOpacity onPress={handlePress}><Text  style={styles.link}>{cel}</Text></TouchableOpacity> 
        </View> 
        <View style={{flexDirection:'row'}}>
        <Text style={styles.subTit}> Correo: </Text>
        <TouchableOpacity onPress={handleEmailPress}><Text  style={styles.link}> {email}</Text></TouchableOpacity> 
        </View> 
        
        {/* <Text style={styles.texto}>  {texto} </Text> */}
      </ScrollView>
		</View>
	)
}



const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: "100%",
    backgroundColor: "white",
    padding: 15
  },
  titulo: { 
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  subTit: {
    fontWeight: "400",
    fontSize: 15,
    marginTop: 10
  }, 
  link: {
    color:'blue',
    fontWeight: "400",
    fontSize: 15,
    marginTop: 10
  }, 
  texto: { 
    fontWeight: "200",
    marginTop: 50,
    textAlign: "justify",
    margin: 10
  }
});

export default Ayuda
