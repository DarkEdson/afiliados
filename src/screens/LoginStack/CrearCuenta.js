import React, { useState } from 'react'
import { View, StyleSheet, Alert, Text, TouchableOpacity, ScrollView } from 'react-native'
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import PasswordInputIcon from "../../components/DataInputs/PasswordInputIcon"
import NumberInputIcon from "../../components/DataInputs/NumberInputIcon"

const CrearCuenta = () => {

	// Variables
  const [username, setusername] = useState('')
  const [email, setemail] = useState('')
  const [cel, setcel] = useState('')
  const [password, setpassword] = useState('')
  const [confPassword, setconfPassword] = useState('')


	// Funciones
	const crearCuenta = () => { 
		if(username == "" || password == "" || confPassword == "" || email == "" || cel == ""){ 
			Alert.alert( "Alerta", "Todos los campos son requeridos para crear la cuenta", [{ text: "OK" }]);
			return;
		} 
		if(password != confPassword){ 
			Alert.alert( "Alerta", "Las contraseñas no coinciden", [{ text: "OK" }]);
			return;
		} 
		const data = { 
			username:username,
			cel:cel,
			email:email,
			password:password,
			confPassword:confPassword
		}
		console.log(data)
	}


	// Contenido
	return (
		<View style={styles.root}>
			<ScrollView>
				<View style={styles.textInput}>
					<Text style={styles.titulo}> Introduce tus datos </Text>
					
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
					<PasswordInputIcon	
						placeholder="Password" 
						icon="md-lock-closed" 
						setValue={setpassword} 
						value={password}
					/>
					<PasswordInputIcon	
						placeholder="Password" 
						icon="md-lock-closed" 
						setValue={setconfPassword} 
						value={confPassword}
					/>
					<Text style={styles.label}> Envia la solicitud para crear tu usuario como afiliado de la aplicación. </Text>
				</View>
				
				<View style={styles.boton}>
					<TouchableOpacity style={styles.loginBoton} onPress={crearCuenta}>
						<Text style={styles.loginText}> ENVIAR SOLICITUD </Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
		float: 'left'
	},
	titulo: { 
		fontWeight: "bold",
		fontSize: 20,
		marginTop: 20,
		marginBottom: 20,
		alignSelf: 'center'
	},	
	boton: { 
		width: '100%',
		float: 'left',
	},
	label: { 
		height: 50,
		width: '90%',
		textAlign: 'center',
		alignSelf: 'center',
		fontWeight: '300',
		marginTop: 35,
		fontSize: 15
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

export default CrearCuenta
