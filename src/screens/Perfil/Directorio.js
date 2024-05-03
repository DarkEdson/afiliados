import React, { useState } from 'react'
import CardAfiliado from "../../components/CardAfiliado/index"
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'

const Directorio = ({ navigation }) => {

	// Variables
	const [search, setsearch] = useState("")
	const [listadoAfiliados, setlistadoAfiliados] = useState([
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			sede: { text: "Mexico", id: "242jfas4kj"},
			urlMultimedia: ["Asd", "asdf"],
			urlImagen:"https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			nombre:"Cementerios Oceanicos",
			descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
			contacto: { email: "delMar@gmail.com", cel: "506548456"}
		},
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			sede: { text: "Mexico", id: "242jfas4kj"},
			urlMultimedia: ["Asd", "asdf"],
			urlImagen:"https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			nombre:"Viajes en lancha",
			descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
			contacto: { email: "lancha@gmail.com", cel: "506548456"}
		},
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			sede: { text: "Mexico", id: "242jfas4kj"},
			urlMultimedia: ["Asd", "asdf"],
			urlImagen:"https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			nombre:"Clases de diving",
			descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
			contacto: { email: "diving@gmail.com", cel: "506548456"}
		},
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			sede: { text: "Mexico", id: "242jfas4kj"},
			urlMultimedia: ["Asd", "asdf"],
			urlImagen:"https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			nombre:"Afiliado 1",
			descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
			contacto: { email: "Afiliado1@gmail.com", cel: "506548456"}
		},
		{
			id: "Asdasdff",
			idioma: { text: "Espanol", id: "Asdf34fsadf"},
			sede: { text: "Mexico", id: "242jfas4kj"},
			urlMultimedia: ["Asd", "asdf"],
			urlImagen:"https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			nombre:"Afiliado 2",
			descripcion:"Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.",
			contacto: { email: "Afiliado2@gmail.com", cel: "506548456"}
		}
	])


	// Funciones 
	const agregarNuevaPromocion = () => { 
		const data = { 
			idioma: {text: "", id: ""},
			sede: { text: "", id: ""},
			urlMultimedia: "",
			titulo: "",
			urlImagen: "https://www.nauticalnewstoday.com/wp-content/uploads/2017/09/perlas-naturales.jpg",
			descripcion: "",
			precio: 0.00,
			nuevo: true,
		}
		navigation.navigate("Detalle Producto", {data})
	}

	const verDetalleProducto = (producto) => {
		const data = { 
			...producto,
			nuevo: false
		}
		navigation.navigate("Detalle Producto", {data})
	}


	// Contenido
	return (
		<View style={styles.root}>
			<View style={styles.buscador}>
				<TextInputIcon	
					placeholder="Afiliados" 
					icon="md-search-outline" 
					setValue={setsearch} 
					value={search}
				/>
			</View>
			<ScrollView>
				{
					listadoAfiliados.filter( producto => (search == "" || producto.nombre.toUpperCase().includes(search.toUpperCase())) ).map((producto, index) => {
						return(
							<CardAfiliado 
								key={index}
								urlImagen={producto.urlImagen}
								nombre={producto.nombre}
								descripcion={producto.descripcion}
								contacto={producto.contacto}
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

export default Directorio
