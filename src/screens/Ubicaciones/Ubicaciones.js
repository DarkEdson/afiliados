import React, { useState, useEffect } from 'react'
import CardSede from "../../components/CardSede/index"
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {APIURL} from "../../../utils/config"

const Ubicaciones = (props) => {
	const {navigation} = props;
		// Carga inicial de sedes y productos
		useEffect(() => {
			loadData()
			setRefreshing(false);
			if (isFocused) {
				loadData();
				console.log('isFocused SEDE');
			  }
		}, [props, isFocused]);

	// Variables
	const [search, setsearch] = useState("")
	const [listadoUbicaciones, setlistadoUbicaciones] = useState([])
	const [refreshing, setRefreshing] = useState(false);
	const isFocused = useIsFocused();
	const [idAfiliado, setidAfiliado] = useState(null)

	// ========================= Funciones ============================
	const onRefresh = React.useCallback(() => {
    setRefreshing(true);
		loadData()
  }, []);
	
	const loadData = async () => { 
		const sedes = await cargarSedes()
		setlistadoUbicaciones(sedes)
		setRefreshing(false);
	}

	// Cargar las sedes del cliente
	const cargarSedes = async () => {
		var id = await AsyncStorage.getItem('userId');
		setidAfiliado(id)
		var token = await AsyncStorage.getItem('userToken');
		let url = `${APIURL}/affiliate.headquarters.getheadquartersbyid/${id}`;
		var sedes = []
		try {
			await fetch(url, {
				method: 'GET',
				redirect: 'follow',
			})
				.then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
					sedes = response
				});
				return sedes
		} catch (error) {
			console.error(error);
			return false
		}
	}
	

	const agregarNuevaSede = () => { 
		const data = { 
			idAffiliate: idAfiliado,
			code: "",
			image: "NINGUNA",
			descripcion: "",
			idiomas: [],
			labels:[],
			nuevo: true,
		}
		navigation.navigate("Detalle Ubicación", {data})
	}

	const verDetalleSede = (producto) => {
		const data = { 
			...producto,
			idiomas: [],
			nuevo: false
		}
		navigation.navigate("Detalle Ubicación", {data})
	}


	// Contenido
	return (
		<View style={styles.root}>
			<View>
				<TextInputIcon	
					placeholder="Ubicaciones" 
					icon="md-search-outline" 
					setValue={setsearch} 
					value={search}
				/>
			</View>
			<TouchableOpacity style={styles.loginBoton} onPress={agregarNuevaSede}>
				<Text style={styles.loginText}> AGREGAR </Text>
			</TouchableOpacity>
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				{
					listadoUbicaciones.filter( producto => (search == "" || producto.labels[0].name.toUpperCase().includes(search.toUpperCase())) ).map((producto, index) => {
						return(
							<CardSede 
								key={index}
								funcion={() => verDetalleSede(producto)}
								urlImagen={producto.image}
								titulo={producto.labels[0].name}
								descripcion={producto.labels[0].description}
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

export default Ubicaciones
