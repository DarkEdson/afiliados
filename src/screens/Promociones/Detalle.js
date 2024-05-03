import React, { useState }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native'
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import TextAreaInputIcon from "../../components/DataInputs/TextAreaInputIcon"
import NumberInputIcon from "../../components/DataInputs/NumberInputIcon"
import FilterSelect from "../../components/FilterSelect/FilterSelect"
import CardPromocion from "../../components/CardPromocion/index"
import SelectLanguage from '../../components/SelectLanguage/SelectLanguage'
import ColorPickerRead from "../../components/DataInputs/ColorPickerRead"
import ImageModal from 'react-native-image-modal';


const Detalle = (props) => {
  // Variables
  const [listadoItems, setlistadoItems] = useState([
		{ id:"233", text:"Perla Magistral 1"},
		{ id:"233", text:"Perla Magistral 4"},
		{ id:"233", text:"Perla Magistral 5"},
		{ id:"233", text:"Perla Magistral 6"},
		{ id:"233", text:"Perla Magistral 7"},
		{ id:"233", text:"Perla Magistral 8"},
		{ id:"233", text:"Perla Magistral 9"},
		{ id:"233", text:"Perla Magistral 0"},
		{ id:"233", text:"Perla Magistral 10"},
		{ id:"233", text:"Perla Magistral 156"},
		{ id:"233", text:"Perla Magistral 18"},
	])
	const [idioma, setidioma] = useState(props.route.params.data.idioma.text)
	const [producto, setproducto] = useState(props.route.params.data.producto.text)
	const [porcentDesc, setporcentDesc] = useState(props.route.params.data.porcentDesc.toString())
	const [urlImagen, seturlImagen] = useState(props.route.params.data.urlImagen)
	const [bgColor, setbgColor] = useState(props.route.params.data.bgColor)
	const [descripcion, setdescripcion] = useState(props.route.params.data.descripcion)
	const [titulo, settitulo] = useState(props.route.params.data.titulo)
  const [idPromocion, setidPromocion] = useState(props.route.params.data.id)
	const [nuevo, setnuevo] = useState(props.route.params.data.nuevo)
  const [id, setid] = useState(props.route.params.data.id)

  // Funciones 
  const crearPromocion = () => { 
    if(producto == "" || porcentDesc == "" || urlImagen == "" || bgColor == "" || descripcion == "" || idioma == "" || titulo == ""){ 
			Alert.alert( "Alerta", "Todos los datos son necesarios para crear la promoción", [ { text: "OK" } ]);
			return;
    }
    var data = { 
      idAfiliado: "pendiente",
      idioma: idioma,
      producto: producto,
      porcentDesc: porcentDesc,
      urlImagen: urlImagen,
      bgColor: bgColor,
      descripcion: descripcion
    }
    console.log("Crear nueva promocion")
    console.log(data)
  }

  const modificarPromocion = () => { 
    if(producto == "" || porcentDesc == "" || urlImagen == "" || bgColor == "" || descripcion == "" || idioma == "" || titulo == ""){ 
			Alert.alert( "Alerta", "Todos los datos son necesarios para modificar la promoción", [ { text: "OK" } ]);
			return;
    }    
    Alert.alert( "Confirmar", "Seguro que desea modificar la promoción", [{ text: "Si", onPress: () => confirmaModificar() }, {text: "Cancelar", style: 'cancel', onPress: () => {return false;},}]);
  }

  const confirmaModificar = () => { 
    var data = { 
      id: id,
      idioma: idioma,
      producto: producto,
      porcentDesc: porcentDesc,
      urlImagen: urlImagen,
      titulo: titulo,
      bgColor: bgColor,
      descripcion: descripcion
    }
    console.log("modificar promocion")
    console.log(data)
  }

  const eliminarPromocion = () => { 
    Alert.alert( "Confirmar", "Seguro que desea eliminar la promoción", [{ text: "Si", onPress: () => confirmaEliminar() }, {text: "Cancelar", style: 'cancel', onPress: () => {return false;},}]);
  }

  const confirmaEliminar = () => { 
    var data = { 
      id: id,
    }
    console.log("eliminar promocion")
    console.log(data)
  }


  // Contenido
	return (
		<View style={styles.root}>
      <ScrollView>
        <View>
          <SelectLanguage 
            placeholder="idioma" 
            icon="arrow-down-circle" 
            valor={idioma}
            seleccionado={idioma != ""}
            setValue={setidioma} 
            value={idioma}
          />
        </View>
        <View>
				  <Text style={styles.label}> Idioma</Text>
				  <Text style={styles.idioma}> {idioma.text ? idioma.text : idioma}</Text>
        </View>
        <View>
          
          <FilterSelect
            placeholder="Producto" 
            icon="arrow-down-circle" 
            items={listadoItems}
            seleccionado={producto != ""}
            setValue={setproducto} 
            value={producto}
          />
          <NumberInputIcon	
            placeholder="Porcentaje de descuento" 
            icon="scan-circle" 
            setValue={setporcentDesc} 
            value={porcentDesc}
          />
          <TextInputIcon
            placeholder="Imagen de fondo" 
            icon="images-sharp" 
            setValue={seturlImagen} 
            value={urlImagen}
          />
          <TouchableOpacity style={styles.imPrincipal}>
            <ImageModal
              style={styles.imgPromocion}
              resizeMode="contain"
              source={{
                uri: urlImagen,
              }}
            />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <ColorPickerRead
              placeholder="Color de fondo" 
              icon="color-palette-outline" 
              setValue={setbgColor} 
              value={bgColor}
            />
          </TouchableOpacity>
          <TextInputIcon
            placeholder="Titulo" 
            icon="text-outline" 
            setValue={settitulo} 
            value={titulo}
          />
          <TextAreaInputIcon
            placeholder="Descripción" 
            icon="document-text"
            setValue={setdescripcion} 
            value={descripcion}
          />
        </View>
        <View>
          <CardPromocion
            urlImagen={urlImagen}
            titulo={titulo}
            bgColor={bgColor}
            descripcion={descripcion}
          />
        </View>
        {
          nuevo ? 
            <View>
              <TouchableOpacity style={styles.loginBoton} onPress={crearPromocion}>
                <Text style={styles.loginText}> Guardar </Text>
              </TouchableOpacity>
            </View>
          : 
          <View>
            <TouchableOpacity style={styles.modificarBoton} onPress={modificarPromocion}>
              <Text style={styles.loginText}> Modificar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eliminarBoton} onPress={eliminarPromocion}>
              <Text style={styles.loginText}> Eliminar </Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%",
    padding: 15,
    backgroundColor: "white"
  },
  imPrincipal: {
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 10
  },  
  imgPromocion: {
    marginLeft: 10,
    borderRadius: 15,
    height: 120,
    width: 120,
  },
	tituloIdioma: {
    // color: "#F0D19A",
		textAlign: "right",
		marginTop: 10,
		marginBottom: 10,
		fontWeight: "200",
		fontSize: 14,
    marginRight: 20
	},
  label: { 
		textAlign: "left",
		marginTop: 10,
		marginBottom: 5,
		fontWeight: "200",
		fontSize: 14,
  },
  idioma: { 
		textAlign: "left",
		marginBottom: 10,
		fontWeight: "bold",
		fontSize: 18,
    marginBottom: 15
  },
	loginBoton: { 
		backgroundColor: '#F0D19A',
		width: '70%',
		marginLeft: '15%',
		marginTop: 20,
		height: 50,
		borderRadius: 15,
		justifyContent: 'center'
	},
	eliminarBoton: { 
		backgroundColor: '#ff545a',
		width: '70%',
		marginLeft: '15%',
		marginTop: 20,
		height: 50,
		borderRadius: 15,
		justifyContent: 'center'
	},
	modificarBoton: { 
		backgroundColor: '#8cfa9b',
		width: '70%',
		marginLeft: '15%',
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
});

export default Detalle
