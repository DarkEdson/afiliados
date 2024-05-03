import React, { useState , useEffect} from 'react'
import { View, StyleSheet, Alert, Text, TouchableOpacity, ScrollView } from 'react-native'
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import {Icon,FAB} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage'
import NumberInputIcon from "../../components/DataInputs/NumberInputIcon"
import { APIURL } from '../../../utils/config'

const EditarDatos = (props) => {

	// Variables
  const [id, setid] = useState('')
  const [username, setusername] = useState(null)
  const [usuario, setusuario] = useState(null)
  const [idUsuario, setidUsuario] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [email, setemail] = useState(null)
  const [cel, setcel] = useState(null)


	// Funciones
	const editarDatos = () => { 
		if(username == "" || email == "" || cel == ""){ 
			Alert.alert( "Alerta", "Todos los campos son requeridos para editar los datos", [{ text: "OK" }]);
			return;
		} 
		Alert.alert( "Confirmar", "Seguro que desea editar los datos", [{ text: "Si", onPress: () => enviarDatosModificados() }, {text: "Cancelar", style: 'cancel', onPress: () => {return false;},}]);
	}

	const enviarDatosModificados = async () => { 
		setisLoading(true)
		const data = { 
      username: username,
			phone:cel,
			email:email
		}
    console.log("Editar datos")
		console.log(data)

	let url = `${APIURL}/user.update/${idUsuario}`;
    try {
      await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(async response => {
          console.log(response);
		  let respUser = response.value
		  setemail(respUser.email)
		  setcel(respUser.phone)
		  setusername(respUser.username)
		  setusuario(respUser)
		  setisLoading(false)
		  await AsyncStorage.setItem('userName', respUser.username);
		  Alert.alert('Success', 'Perfil actualizado correctamente', [
            {text: 'OK', onPress: () => props.navigation.replace('Perfil')},
          ]);
        });
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
	}

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
			  setusername(response.username)
			  setusuario(usuario)
					});
					return usuario
			} catch (error) {
				console.error(error);
				return {}
			}
	  }


	// Contenido
	return (
		<View style={styles.root}>
			 {isLoading ? <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%',
          }}
        >
          <FAB
            loading
            color={'#5EC0CB'}
            visible={isLoading}
            icon={{name: 'add', color: 'white'}}
            size="small"
          />
        </View> :
			<ScrollView>
				<View style={styles.textInput}>
					
					<TextInputIcon	
						placeholder="Usuario" 
						icon="person" 
						setValue={setusername} 
						value={username}
					/>
					<TextInputIcon	
						placeholder="Correo Electrónico" 
						icon="mail" 
						setValue={setemail} 
						value={email}
					/>
					<NumberInputIcon	
						placeholder="Número de Teléfono" 
						icon="md-phone-portrait" 
						setValue={setcel} 
						value={cel}
					/>
				</View>
				
				<View style={styles.boton}>
					<TouchableOpacity style={styles.loginBoton} onPress={editarDatos}>
						<Text style={styles.loginText}> Editar Datos </Text>
					</TouchableOpacity>
				</View>
			</ScrollView>}
		</View>
	)
}

const styles = StyleSheet.create({
	root: { 
		width: '100%',
		height: '100%',
		backgroundColor: "white"
	},	
	textInput: {
		width: '100%',
		height: '85%',
		float: 'left',
    marginTop: 40
	},	
	boton: { 
		width: '100%',
		float: 'left',
	},
	loginBoton: { 
		backgroundColor: '#F0D19A',
		width: '90%',
		marginLeft: '5%',
		marginTop: 20,
		height: 50,
		borderRadius: 15,
		justifyContent: 'center'
	},
	loginText: {
		color: 'white',
		alignSelf: 'center',
		fontWeight: "bold",
		fontSize: 18
	}
})

export default EditarDatos
