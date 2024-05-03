import React, { useState , useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import DatePicker from 'react-native-date-picker';
import CardProductoVendido from "../../components/CardProductoVendido/index"
import Ionic from 'react-native-vector-icons/Ionicons'
import SalesApi from '../../Apis/SalesApi';
import {
	APIURL,
	BASE_URL_IMG,
	PRODUCTS_URL,
	IMGEXTENSIONS,
  } from '../../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ventas = () => {

	// variables	
	const [dateInicio, setDateInicio] = useState(new Date());
  const [openInicio, setOpenInicio] = useState(false);
  const [dateFinal, setDateFinal] = useState(new Date());
  const [openFinal, setOpenFinal] = useState(false);
  const [fechaInicioFormat, setfechaInicioFormat] = useState(null)
const [fechaFinFormat, setfechaFinFormat] = useState(null)
	const [listadoProductos, setlistadoProductos] = useState([
		{
			urlImagen:"https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg",
			titulo:"Perla Magistral 1",
			descripcion:"Perla, cemento, cremacion, traslado, hundimiento..",
			precio:"12.50",
			moneda: "$",
			cantidad: 15
		},
		{
			urlImagen:"https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg",
			titulo:"Perla Magistral 2",
			descripcion:"Perla, cemento, cremacion, traslado, hundimiento..",
			precio:"12.50",
			moneda: "$",
			cantidad: 1
		},
		{
			urlImagen:"https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg",
			titulo:"Perla Magistral 3",
			descripcion:"Perla, cemento, cremacion, traslado, hundimiento..",
			precio:"12.50",
			moneda: "$",
			cantidad: 8
		},
		{
			urlImagen:"https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg",
			titulo:"Perla Magistral 4",
			descripcion:"Perla, cemento, cremacion, traslado, hundimiento..",
			precio:"12.50",
			moneda: "$",
			cantidad: 7
		},
		{
			urlImagen:"https://cementeriosdelmar.com/wp-content/uploads/2021/07/Capillas-Sen%CC%83oriales-cementerio-en-el-mar.jpg",
			titulo:"Perla Magistral",
			descripcion:"Perla, cemento, cremacion, traslado, hundimiento..",
			precio:"12.50",
			moneda: "$",
			cantidad: 2
		}
	])

	useEffect(() => {
		obtenerVentas();
		
	  return () => {
		
	  };
	}, [])

async function obtenerVentas(){
	let fechasJSON = fechas(dateInicio,dateFinal)
	var id = await AsyncStorage.getItem('userId');
	let listaVentas = await SalesApi(fechasJSON.fechaInicia, fechasJSON.fechaFinaliza, id);
	let listaVentasMod = []
	console.log('LOG EN VENTANA DE LAS VENTAS',listaVentas)
	listaVentas.forEach(venta=>{
		listaVentasMod.push({
			urlImagen:`${BASE_URL_IMG}${PRODUCTS_URL}${venta.movements[0].idProduct._id}/${venta.movements[0].idProduct.image}`,
	titulo:venta.movements[0].description,
	descripcion:venta.movements[0].idProduct.labels.length > 0 ? venta.movements[0].idProduct.labels[0].keyword: '',
	precio:venta.movements[0].idProduct.headquarters[0].price,
	moneda: venta.movements[0].idProduct.headquarters[0].idCurrency.code,
	cantidad: venta.movements[0].quantity,
		})
	})
	console.log('LOG EN MODIFICADAS VENTAS', listaVentasMod)
	setlistadoProductos(listaVentasMod);
}
	function fechas(fechaStart, fechaFin){
    let fechaInicial = formatearFechaInicial(fechaStart)
    let fechaFinal = formatearFechaFinal(fechaFin)
	return {fechaInicia: fechaInicial, fechaFinaliza: fechaFinal}
	}

	function formatearFechaInicial(fecha){
		let monthFinal = '01';
		let dayFinal = '01';
		if (fecha.getMonth() + 1 <= 9) {
			monthFinal = `0${fecha.getMonth()+1}`;
		  } else {
			monthFinal = fecha.getMonth() + 1;
		  }
		  if (fecha.getDate() <= 9) {
			dayFinal = `0${fecha.getDate()}`;
		  } else {
			dayFinal = fecha.getDate();
		  }
		  let fechaFinal = `${fecha.getFullYear()}-${monthFinal}-${dayFinal}`;
		  setfechaInicioFormat(fechaFinal)
		  return fechaFinal
	}
	function formatearFechaFinal(fecha){
		let monthInicial = '01';
		let dayInicial = '01';
		if (fecha.getMonth() + 1 <= 9) {
			monthInicial = `0${fecha.getMonth()+1}`;
		  } else {
			monthInicial = fecha.getMonth() + 1;
		  }
		  if (fecha.getDate() <= 9) {
			dayInicial = `0${fecha.getDate()}`;
		  } else {
			dayInicial = fecha.getDate();
		  }
		  let fechaInicial = `${fecha.getFullYear()}-${monthInicial}-${dayInicial}`;
		  setfechaFinFormat(fechaInicial)
		  return fechaInicial
	}
	// Contenido
	return (
		<View style={styles.root}>
			<View>
				<Text style={styles.titulo}>Ventas</Text>
				<View style={styles.fechas}>
					<TouchableOpacity onPress={() => setOpenInicio(true)}>
						<View style={styles.viewPadre}>
							<View style={styles.viewHijo}>
								<Ionic size={18} name="calendar" style={styles.icon}/>
								<Text style={styles.texto}> Fecha Inicio: </Text>
							</View>
							<View style={styles.viewHijo2}>
								<Text style={styles.textoFecha}>
									{fechaInicioFormat}
								</Text>
								<DatePicker
									modal
									mode="date"
									open={openInicio}
									date={new Date()}
									onConfirm={dateInicio => {
										setOpenInicio(false);
										setDateInicio(dateInicio);
									}}
									onCancel={() => {
										setOpenInicio(false);
									}}
								/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setOpenFinal(true)}>
						<View style={styles.viewPadre}>
							<View style={styles.viewHijo}>
								<Ionic size={18} name="calendar" style={styles.icon}/>
								<Text style={styles.texto}> Fecha Final: </Text>
							</View>
							<View style={styles.viewHijo2}>
								<Text style={styles.textoFecha}>
									{fechaFinFormat}
								</Text>
								<DatePicker
									modal
									mode="date"
									open={openFinal}
									date={new Date()}
									onConfirm={dateFinal => {
										setOpenFinal(false);
										setDateFinal(dateFinal);
									}}
									onCancel={() => {
										setOpenFinal(false);
									}}
								/>
							</View>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.appButtonContainer} onPress={() => obtenerVentas()}>
					<Text style={styles.appButtonText}>
									Buscar
								</Text>
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				<View style={styles.ventas}>
					{
						listadoProductos.map((producto, index) => {
							return(
								<CardProductoVendido 
									key={index}
									urlImagen={producto.urlImagen}
									titulo={producto.titulo}
									descripcion={producto.descripcion}
									precio={producto.precio}
									moneda={producto.moneda}
									cantidad={producto.cantidad}
								/>
							)
						})
					}
				</View>
				{/* <View style={styles.totalProd}>
					<Text style={styles.total}> Total </Text> 
					<Text style={styles.valor}> $ 20.56 </Text> 
				</View> */}
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
	totalProd: { 
		margin: 20,
		marginLeft: 30,
		flex: 1,
		flexDirection: 'row',
	},
	total: { 
		width: "50%",
		textAlign: "left",
		fontWeight: "400",
		fontSize: 20,
	},
	valor: { 
		width: "50%",
		textAlign: "right",
		fontWeight: "bold",
		fontSize: 18,
	},
	ventas: { 
		padding: 10
	},	
	titulo: { 
		fontWeight: "bold",
		fontSize: 20,
		textAlign: "center",
		marginTop: 20
	},
	fechas: {
		alignItems: 'center',
		width: '90%',
		marginLeft: '5%',
		marginTop: 20,
		marginBottom: 20,
	},
	viewPadre: {
		width: '100%',
		height: 50,
		borderWidth: 1,
		borderColor: 'grey',
		borderRadius: 10,
		marginTop: 10,
		flexDirection: 'row',
		backgroundColor: 'white',
	},
	viewHijo: {
		flexDirection: 'row',
		justifyContent: "flex-start",
		paddingLeft: 20,
		width: '65%',
	},
	viewHijo2: {
		flexDirection: 'column',
		justifyContent: 'center',
		width: '35%',
	},
	icon: {
		alignSelf: "center",
	},
	texto: {
		fontWeight: '500',
		fontSize: 17,
		alignSelf: "center",
	},
	textoFecha: {
		fontWeight: '300',
		fontSize: 17,
	},
	appButtonContainer: {
		marginTop:'3%',
		elevation: 8,
		backgroundColor: "#009688",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	  },
	  appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase"
	  }
})

export default Ventas
