import React, { useState, useEffect }  from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView,Image, Alert } from 'react-native'
import TextInputIcon from "../../components/DataInputs/TextInputIcon"
import {Icon,FAB} from '@rneui/themed';
import TextAreaInputIcon from "../../components/DataInputs/TextAreaInputIcon"
import SelectLanguage from '../../components/SelectLanguage/SelectLanguage'
import CardSede from "../../components/CardSede/index"
import ImageModal from 'react-native-image-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIURL, BASE_URL_IMG} from "../../../utils/config"
import Ionic from 'react-native-vector-icons/Ionicons'
import SelectDropdown from 'react-native-select-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';


const Detalle = (props) => {

  // Carga inicial de sedes y productos
	useEffect(() => {
    console.log( 'SEDE', sede)
		const loadData = async () => { 
			const idiomas = await cargarIdiomasApp()
      const paises = await cargarPaisesApp()
      let myLabels=[];
      let nombrePais='';
			setidiomas(idiomas)
      setpaises(paises)
      if (sede.idCountry){
        paises.forEach(pais=>{
          if (sede.idCountry == pais._id){
            console.log('PAIS', pais)
            nombrePais == pais.name
            setnombrePais(pais.name)
          }
        })
    }
      if (sede.labels.length >0){
        sede.labels.forEach(label=>{
          idiomas.forEach(idioma=>{
            if (label.idLanguage == idioma._id){
              myLabels.push({...label,languajeName:idioma.name})
            }
          })
        })
      console.log('MyLABELS',myLabels)
      setsede(prevState => ({
        ...prevState,
        labels: myLabels,
        countryName: nombrePais
      })); 
      }
    
      console.log('RESPUESTA IDIOMAS',idiomas)
		}
		loadData()
  }, []);

  // Variables
  const [sede, setsede] = useState(props.route.params.data)
	const [nuevo, setnuevo] = useState(props.route.params.data.nuevo)
	const [agregarIdioma, setagregarIdioma] = useState(false)
  const [idiomas, setidiomas] = useState([])
  const [paisesApp, setpaises] = useState([])
  const [nombrePaisApp, setnombrePais] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [principalImage, setprincipalImage] = useState({
    fileName: null,
    base64: null,
    fileType: null,
    fileUri: null,
    file: null,
  });

  
  // Funciones 
  const cargarIdiomasApp = async () => { 
		var token = await AsyncStorage.getItem('userToken');
		let url = `${APIURL}/language.index`;
		var idiomas = []
		try {
			await fetch(url, {
				method: 'GET',
				redirect: 'follow',
			}).then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
					idiomas = response
				});
				return idiomas
		} catch (error) {
			console.error(error);
		}
  }

  const cargarPaisesApp = async () => { 
		var token = await AsyncStorage.getItem('userToken');
		let url = `${APIURL}/country.index`;
		var paises = []
		try {
			await fetch(url, {
				method: 'GET',
				redirect: 'follow',
			}).then(res => res.json())
				.catch(error => console.error('Error', error))
				.then(response => {
					paises = response
				});
				return paises
		} catch (error) {
			console.error(error);
		}
  }


  const crearUbicacion = () => { 
    if(sede.code == ""){ 
			Alert.alert( "Alerta", "Ingresa codigo de la sede", [ { text: "OK" } ]);
			return;
    }
    if(principalImage.fileName == null){ 
			Alert.alert( "Alerta", "carga una imagen", [ { text: "OK" } ]);
			return;
    }
    if(!sede.idCountry){ 
			Alert.alert( "Alerta", "selecciona un pais", [ { text: "OK" } ]);
			return;
    }
    if(sede.labels.length<1){ 
			Alert.alert( "Alerta", "al menos elija 1 idioma de sede", [ { text: "OK" } ]);
			return;
    }
    let data = normalizarJson();
    console.log("Crear nuevo producto")
    crearUbicacionApi(data)
  }

  const crearUbicacionApi = async ubicacion => {
    setisLoading(true)
    var token = await AsyncStorage.getItem('userToken');
    console.log('Sede A CREAR API', ubicacion);
    let url = `${APIURL}/affiliate.headquarters.create`;
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(ubicacion),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          console.log(response);
          if (response._id) {
            var formdata = new FormData();
            formdata.append('image', {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            console.log(`${APIURL}/affiliate.headquarters.uploadimage/${response._id}`, {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            fetch(
              `${APIURL}/affiliate.headquarters.uploadimage/${response._id}`,
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                console.log('RESULTADO DE CARGA IMAGEN PRINCIPAL')
                setisLoading(false)
                Alert.alert('Success', 'Sede creada correctamente', [
                  {
                    text: 'OK',
                    onPress: () => {
                      props.navigation.replace('Ubicaciones');
                    },
                  },
                ]);

                console.log(result);
              })
              .catch(error => console.log('error', error));
          }
        });
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
  };

  const modificarUbicacion = () => { 
    if(sede.code == "" || sede.code == null){ 
			Alert.alert( "Alerta", "Todos los datos son necesarios para modificar la ubicación", [ { text: "OK" } ]);
			return;
    }
    Alert.alert( "Confirmar", "Seguro que desea modificar la ubicación", [{ text: "Si", onPress: () => enviarDatosModificados() }, {text: "Cancelar", style: 'cancel', onPress: () => {return false;},}]);
  }

  const enviarDatosModificados = () => { 
    let data= normalizarJson()
    console.log("modificar ubicacion")
    confirmarModificarUbicacionAPI(data)
    
  }

  const confirmarModificarUbicacionAPI = async data => {
    setisLoading(true)
    console.log('modificar producto', data);
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/affiliate.headquarters.update/${sede._id}`;
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
        .then(response => {
          console.log(response);
          if (response._id) {
            if (principalImage.fileUri == null){
              setisLoading(false)
              Alert.alert('Success', 'Sede actualizada correctamente', [
                {
                  text: 'OK',
                  onPress: () => props.navigation.replace('UBICACIONES'),
                },
              ]);
              console.log('IMAGEN NULA',response, principalImage.fileUri);
            }else{
              var formdata = new FormData();
            formdata.append('image', {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            console.log(`${APIURL}/affiliate.headquarters.uploadimage/${response._id}`, {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            fetch(
              `${APIURL}/affiliate.headquarters.uploadimage/${response._id}`,
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                setisLoading(false)
                Alert.alert('Success', 'Sede actualizada correctamente', [
                  {
                    text: 'OK',
                    onPress: () => props.navigation.replace('Ubicaciones'),
                  },
                ]);

                console.log(result);
              })
              .catch(error => console.log('error', error));
            }
            
          }
        });
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
  };

  const eliminarUbicacion = () => { 
    Alert.alert( "Confirmar", "Seguro que desea eliminar la ubicación", [{ text: "Si", onPress: () => confirmarEliminaUbicacionApp() }, {text: "Cancelar", style: 'cancel', onPress: () => {return false;},}]);
  }

  const confirmaEliminaUbicacion = () => { 
    console.log("eliminar ubicacion")
    console.log(sede._id)
    Alert.alert('Success', 'Sede Eliminada correctamente', [
      {
        text: 'OK',
        onPress: () => {
          props.navigation.replace('Ubicaciones');
        },
      },
    ]);
  }
  
  async function confirmarEliminaUbicacionApp(){
    setisLoading(true)
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/affiliate.headquarters.destroy/${sede._id}`;
    try {
      await fetch(url, {
        method: 'DELETE',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(() => {
          setisLoading(false)
          Alert.alert('Success', 'Sede Eliminada correctamente', [
            {text: 'OK', onPress: () => props.navigation.replace('Ubicaciones')},
          ]);
        });
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
  }

  function normalizarJson(){
    let idiomas=[];
    if (sede.nuevo){
      sede.labels.forEach(label=>{
        idiomas.push({idLanguage: label.idLanguage,
        name: label.name,
      description: label.description,
    address: label.address,
  state: label.state,
  town: label.town})
      })
    }else{
      sede.labels.forEach(label=>{
        if (label._id == label.idLanguage){
          idiomas.push({idLanguage: label.idLanguage,
            name: label.name,
          description: label.description,
        address: label.address,
      state: label.state,
      town: label.town})
        }else{
          idiomas.push({
            id: label._id,
            idLanguage: label.idLanguage,
            name: label.name,
          description: label.description,
        address: label.address,
      state: label.state,
      town: label.town})
        }
        
      })
    }
   
    let sedeJSON={
      idAffiliate: sede.idAffiliate,
      idCountry: sede.idCountry,
      code: sede.code,
      image: principalImage.fileName,
      labels: idiomas,

    }
    console.log('JSON A ENVIAR',sedeJSON)
    return sedeJSON;
  }

  const actualizarTituloIdioma = async (idioma, cambio) => { 
    var indexProducto = sede.labels.indexOf(sede.labels.filter(id => id.name == idioma.name)[0])
    sede.labels[indexProducto].name = cambio
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
  }

  const actualizarCodigo = async ( cambio) => { 
    setsede(prevState => ({
      ...prevState,
      code: cambio
    }));
  }

  const actualizarDescripcionIdioma = async (idioma, cambio) => { 
    var indexProducto = sede.labels.indexOf(sede.labels.filter(id => id.name == idioma.name)[0])
    sede.labels[indexProducto].description = cambio
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
  }

  const actualizarDireccionIdioma = async (idioma, cambio) => { 
    var indexProducto = sede.labels.indexOf(sede.labels.filter(id => id.name == idioma.name)[0])
    sede.labels[indexProducto].address = cambio
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
  }

  const actualizarCiudadIdioma = async (idioma, cambio) => { 
    var indexProducto = sede.labels.indexOf(sede.labels.filter(id => id.name == idioma.name)[0])
    sede.labels[indexProducto].town = cambio
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
  }
  
  const actualizarEstadoIdioma = async (idioma, cambio) => { 
    var indexProducto = sede.labels.indexOf(sede.labels.filter(id => id.name == idioma.name)[0])
    sede.labels[indexProducto].state = cambio
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
  }
  

  const eliminarIdiomaProducto = (detalle) => { 
    var indexIdioma = sede.labels.indexOf(sede.labels.filter(idioma => idioma._id == detalle._id)[0])
    sede.labels.splice(indexIdioma, 1)
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
    setagregarIdioma(false)
  }

  const agregarNuevoIdioma = async (nuevo) => { 
    let mySede = JSON.parse(JSON.stringify(sede));
    let sedes = [];
    sedes = mySede.labels.filter(
      hq => hq.languajeName === nuevo.name,
    );
    console.log(sedes);
    console.log(nuevo)


    if (sedes.length == 0) {
      sede.labels.push({
				_id: nuevo._id,
        idLanguage: nuevo._id,
				languajeName: nuevo.name,
        address: "",
        state: "",
        town: "",
				name: "",
				descripcion: ""
    })
    setsede(prevState => ({
      ...prevState,
      labels: sede.labels
    }));
    } else {
      console.log('idioma repetido, elija otro');
      Alert.alert(
        'Error en seleccion de Idioma',
        'Idioma Repetido, elija otro',
      );
    }
    setagregarIdioma(false)


  }

  function chooseImage() {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, async response => {
      console.log('Response = ', response.assets);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.assets};
        console.log('response', JSON.stringify(response));
        console.log(
          'PRINCIPAL IMAGE',
          principalImage.fileName,
          principalImage.fileUri,
        );
        let imageURI = await normalizePath(response.assets[0].uri);
        setprincipalImage({
          fileName: response.assets[0].fileName,
          base64: response.assets[0].base64,
          fileType: response.assets[0].type,
          fileUri: imageURI,
          file: response,
        });
      }
    });
    console.log('HOLA');
  }

  async function normalizePath(path) {
    console.log('ENTRE A NORMALIZAR EL PATH');
    if (Platform.OS === 'ios') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
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

        <View style={styles.espacioProducto}>
          <CardSede 
            urlImagen={sede.image}
            titulo={sede.labels.length>0?sede.labels[0].name:''}
            descripcion={sede.labels.length>0?sede.labels[0].description:''}
          />
          <SelectDropdown
              data={paisesApp}
              //     defaultValue={defaultLanguage}
              //   defaultValueByIndex={0}
              defaultButtonText={
                sede.idCountry? nombrePaisApp: 'Pais'
              }
              buttonTextStyle={{
                textAlign: 'left',
                color: '#A4A4A4',
                marginLeft: 3,
              }}
              buttonStyle={styles.btnDropStyle}
              dropdownStyle={{
                marginLeft: 2,
                position: 'absolute',
                backgroundColor: '#EEEEEE',
                paddingHorizontal: 0,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: '#444',
              }}
              renderDropdownIcon={isOpened => {
                return (
                  <Icon
                    style={{marginRight: 15}}
                    type={'font-awesome'}
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={20}
                  />
                );
              }}
              dropdownIconPosition="right"
              onSelect={(selectedItem, index) =>
                {setsede(prevState => ({
                  ...prevState,
                  idCountry: selectedItem._id,
                  countryName: selectedItem.name
                }))
              setnombrePais(selectedItem.name)}
              }
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
            />
          <TextInputIcon
                    placeholder="Titulo" 
                    icon="text-outline"
                    value={sede.code}
                    setValue={(val) => actualizarCodigo(val)}
                  />
          <View style={styles.seccionIdiomas}>
            <TouchableOpacity style={styles.addLanguage} onPress={chooseImage}>
              <Text style={styles.labelAgregar}>
                {' '}
                Modificar Imagen Principal{' '}
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <Image
                  style={styles.imgPromocion}
                  source={{
                    uri:
                      principalImage.base64 == null
                        ? sede.image == 'NINGUNA'
                          ? `${BASE_URL_IMG}logo.png`
                          : `${BASE_URL_IMG}sedes/${sede.image}`
                        : 'data:image/jpeg;base64,' + principalImage.base64,
                  }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </View>      
        </View>



        {/* Seleccionar idiomas */}
        <View style={styles.seccionIdiomas}>
          <TouchableOpacity style={styles.addLanguage} onPress={() => setagregarIdioma(!agregarIdioma)}>
              <Text style={styles.labelAgregar}> + Agregar Idioma</Text>
          </TouchableOpacity>
          {
            agregarIdioma ? 
            <View>
              <SelectLanguage 
                placeholder="idioma" 
                icon="arrow-down-circle" 
                idiomas={idiomas}
                setValue={agregarNuevoIdioma}
              />
            </View>
            : 
            null
          }
        </View>
        {/* Espacio para los idiomas */}
        {
          sede.labels.map((idioma, key) => { 
            return (
              <View style={styles.espacioIdioma} key={key}>
                <Ionic size={25} name="close" style={styles.Icon} onPress={() => eliminarIdiomaProducto(idioma)}/>
                <View>
                  <Text style={styles.label}> Idioma</Text>
                  <Text style={styles.idioma}> {idioma.languajeName}  </Text>
                  <Text style={styles.label}> Titulo</Text>
                  <TextInputIcon
                    placeholder="Titulo" 
                    icon="text-outline"
                    value={idioma.name}
                    setValue={(val) => actualizarTituloIdioma(idioma, val)}
                  />
                  <Text style={styles.label}> Estado</Text>
                  <TextInputIcon
                    placeholder="Estado" 
                    icon="text-outline"
                    value={idioma.state}
                    setValue={(val) => actualizarEstadoIdioma(idioma, val)}
                  />
                  <Text style={styles.label}> Ciudad</Text>
                  <TextInputIcon
                    placeholder="Ciudad" 
                    icon="text-outline"
                    value={idioma.town}
                    setValue={(val) => actualizarCiudadIdioma(idioma, val)}
                  />
                  <Text style={styles.label}> Direccion</Text>
                  <TextInputIcon
                    placeholder="Dirección" 
                    icon="text-outline"
                    value={idioma.address}
                    setValue={(val) => actualizarDireccionIdioma(idioma, val)}
                  />
                  <Text style={styles.label}> Descripcion</Text>
                  <TextAreaInputIcon
                    placeholder="Descripción" 
                    icon="document-text"
                    value={idioma.description}
                    setValue={(val) => actualizarDescripcionIdioma(idioma, val)}
                  />
                </View> 
              </View>
            )
          })
        }
        


        {
          nuevo ? 
            <View>
              <TouchableOpacity style={styles.loginBoton} onPress={crearUbicacion}>
                <Text style={styles.loginText}> Guardar </Text>
              </TouchableOpacity>
            </View>
          : 
          <View>
            <TouchableOpacity style={styles.modificarBoton} onPress={modificarUbicacion}>
              <Text style={styles.loginText}> Modificar </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.eliminarBoton} onPress={eliminarUbicacion}>
              <Text style={styles.loginText}> Eliminar </Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>}
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

  seccionIdiomas: { 
    marginTop: 30
  },
  addLanguage: { 
    marginBottom: 20
  },
  labelAgregar: { 
    alignSelf: "flex-end",
    marginRight: 20
  },  
  espacioIdioma: { 
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    borderColor: "grey"
  },
	Icon: {
    color: "red"
	},


  espacioProducto: { 
    marginTop: 20
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
  , btnDropStyle: {
    marginTop:10,
    marginHorizontal:'5%',
    width: '90%',
    borderColor: '#F8F8F8',
    borderRadius: 15,
  },
});

export default Detalle
