import React, { useState } from 'react'
import CardPromocion from "../../components/CardPromocion/index"
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'

const Promociones = ({ navigation }) => {

	// Variables
	const [listadoPromociones, setlistadoPromociones] = useState([
		{
			id: "Asdasdff",
			idioma: {id: "123jh41j23h", text: "Ingles"},
			producto: {text: "Perla Magistral 4", id: "233"},
			titulo:"30% de descuento",
			descripcion:"Descuesto en momentos y memorias al adquir un espacio en el cementerio",
			bgColor:"#fadf8e",
			porcentDesc: 30,
			urlImagen:"https://cdn-icons-png.flaticon.com/512/124/124196.png"
		},
		{
			id: "Asdasdff",
			idioma: {id: "123jh41j23h", text: "Ingles"},
			producto: {text: "Perla Magistral 4", id: "233"},
			titulo:"30% de descuento",
			descripcion:"Descuesto en momentos y memorias al adquir un espacio en el cementerio",
			bgColor:"#fadf8e",
			porcentDesc: 30,
			urlImagen:"https://cdn-icons-png.flaticon.com/512/124/124196.png"
		},
		{
			id: "Asdasdff",
			idioma: {id: "123jh41j23h", text: "Ingles"},
			producto: {text: "Perla Magistral 4", id: "233"},
			titulo:"30% de descuento",
			porcentDesc: 30,
			descripcion:"Descuesto en momentos y memorias al adquir un espacio en el cementerio",
			bgColor:"#fadf8e",
			urlImagen:"https://st4.depositphotos.com/18674256/22454/v/450/depositphotos_224548286-stock-illustration-motorboat-vector-linear-icon-isolated.jpg"
		},
		{
			id: "Asdasdff",
			idioma: {id: "123jh41j23h", text: "Ingles"},
			producto: {text: "Perla Magistral 4", id: "233"},
			titulo:"30% de descuento",
			porcentDesc: 30,
			descripcion:"Descuesto en momentos y memorias al adquir un espacio en el cementerio",
			bgColor:"#a4de9e",
			urlImagen:"https://cdn-icons-png.flaticon.com/512/124/124196.png"
		},
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			producto: {text: "Perla Magistral 4", id: "233"},
			titulo:"30% de descuento",
			porcentDesc: 30,
			descripcion:"Descuesto en momentos y memorias al adquir un espacio en el cementerio",
			bgColor:"#fadf8e",
			urlImagen:"https://cdn-icons-png.flaticon.com/512/124/124196.png"
		},
	])


	// Funciones 
	const agregarNuevaPromocion = () => { 
		const data = { 
			idioma: {text: "", id: ""},
			producto: {text: "", id: ""},
			porcentDesc: 0,
			titulo: "",
			urlImagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk2WMD5sGevkn4mUQVF5be6H6dUvZA5GZcKCDq1ATInglFacznrVBugmrd1h_SoaCXYE4&usqp=CAU",
			bgColor: "#fff1ab",
			descripcion: "",
			nuevo: true,
		}
		navigation.navigate("Detalle Promoción", {data})
	}

	const verDetallePromocion = (promocion) => {
		const data = { 
			...promocion,
			nuevo: false
		}
		navigation.navigate("Detalle Promoción", {data})
	}


	// Contenido
	return (
		<View style={styles.root}>
			<TouchableOpacity style={styles.loginBoton} onPress={agregarNuevaPromocion}>
				<Text style={styles.loginText}> AGREGAR </Text>
			</TouchableOpacity>
			<ScrollView>
				{
					listadoPromociones.map((promocion, index) => {
						return(
							<CardPromocion 
								key={index}
								funcion={() => verDetallePromocion(promocion)}
								urlImagen={promocion.urlImagen}
								titulo={promocion.titulo}
								descripcion={promocion.descripcion}
								bgColor={promocion.bgColor}
							/>
						)
					})
				}
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
	loginBoton: { 
		backgroundColor: '#F0D19A',
		width: '90%',
		marginLeft: '5%',
		marginTop: 20,
		marginBottom: 50,
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
});

export default Promociones
