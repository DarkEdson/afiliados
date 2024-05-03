import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image, Text, Dimensions, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import { AuthContext } from '../../components/context';
import { BASE_URL_IMG, COMPANIES_URL } from '../../../utils/config';
import { Avatar, Icon } from '@rneui/themed';

const Perfil = ( props) => {
	const {navigation} = props;
	useEffect(() => {
		async function getUserName() {
      try {
				var nombre = await AsyncStorage.getItem('userName');
				var idUser = await AsyncStorage.getItem('userId')
				setnombreUsuario(nombre)
				setusuarioID(idUser)
				var avatar = await AsyncStorage.getItem('Avatar');
				seturlImg(avatar)
      } catch (e) {
				setnombreUsuario("")
      }
		}
		getUserName()
		if (isFocused) {
			getUserName();
			console.log('isFocused Perfil');
		  }
  }, [props, isFocused]);


	// Variables
	const { signOut } = React.useContext(AuthContext);
  const [nombreUsuario, setnombreUsuario] = useState('')
  const isFocused = useIsFocused();
  const [urlImg, seturlImg] = useState(null)
  const [usuarioID, setusuarioID] = useState(null)
  const [cargando, setcargando] = useState(false)

	
	// Funciones 
	const verAyuda = () => { 
		navigation.navigate("Ayuda")
	}

	const cerrarSesion = async () => { 
		signOut()
	}

	const verDirectorio = () => { 
		navigation.navigate("Directorio")
	}

	const editarDatos = () => { 
		navigation.navigate("Editar Datos")
	}



	// Contenido 
	return (
		<View style={styles.root}>
			<ScrollView>
				<View style={styles.avatar}>
					<TouchableOpacity
              style={styles.btnProfile}
              onPress={() => {
                console.log('editar imagen');
               // chooseImage();
              }}
            >
              {urlImg !== null ? (
                <Avatar
                  rounded
                  source={{
                    uri: `${BASE_URL_IMG}${COMPANIES_URL}${urlImg}`,
                  }}
                  size="large"
                />
              ) : (
                <Icon
                  size={65}
                  color='black'
                  type={'material-community'}
                  name="account"
                />
              )}
              <Avatar.Accessory size={23} />
            </TouchableOpacity>
					<Text style={styles.nombreUsuario}> {nombreUsuario} </Text>
					<TouchableOpacity onPress={editarDatos}>
						<Text style={styles.labelEditar}> Editar datos </Text>
					</TouchableOpacity>
				</View>

				<View style={styles.contenido}> 
					<TouchableOpacity style={styles.espacio} onPress={verAyuda}>
						<Text style={styles.textoEspacio}> Ayuda </Text> 
					</TouchableOpacity>
					<TouchableOpacity style={styles.espacio} onPress={verDirectorio}>
						<Text style={styles.textoEspacio}> Directorio de afiliados</Text> 
					</TouchableOpacity>
					<TouchableOpacity style={styles.espacio} onPress={cerrarSesion}>
						<Text style={styles.textoEspacio}> Cerrar Sesión </Text> 
					</TouchableOpacity>
				</View>

				<View style={styles.imagen}>
					<ImageBackground
						style={styles.imgTop}
						resizeMode="stretch"
						source={require('../../images/background.png')}
					>
						<Image
							style={styles.imgLogo}
							source={require('../../images/logo.png')}
						>
						</Image>
					</ImageBackground>
				</View>
			</ScrollView>
		</View>
	)

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
			let imageURI = await normalizePath(response.assets[0].uri);
			
			avatarImage ={
			  fileName: response.assets[0].fileName,
			  base64: response.assets[0].base64,
			  fileType: response.assets[0].type,
			 // fileUri: imageURI,
			 fileUri: response.assets[0].uri,
			  file: response,
			};
			setcargando(true)
			let url = `${BASE_URL}/affiliate.uploadimage/${usuarioID}`;
			try {
				var formdata = new FormData();
						formdata.append('image', {
						  name: `${response.assets[0].fileName}`,
						  type: `${response.assets[0].type}`,
						  uri: response.assets[0].uri,
						});
						var requestOptions = {
						  method: 'POST',
						  body: formdata,
						  redirect: 'follow',
						  headers: {
							'Content-Type': 'multipart/form-data',
						  },
						};
						console.log(url, {
							name: `${response.assets[0].fileName}`,
							type: `${response.assets[0].type}`,
							uri: response.assets[0].uri,
						  });
						fetch(
						  url,
						  requestOptions,
						)
						  .then(response => response.text())
						  .then(result => {
							

							Alert.alert('Success', 'Avatar Cargado', [
							  {
								text: 'OK',
								onPress: () => {},
							  },
							]);
							console.log('RESULTADO',result);
							setcargando(false)
						  })
						  .catch(error => console.log('error', error));
			  } catch (error) {
				console.error('ERROR EN API RESPUESTA CARGANDO AVATAR', error);
				setcargando(false)
			  }
		  }
		});
		console.log('HOLA');
	  }
}


const styles = StyleSheet.create({
	espacio: { 
		width: "90%",
		marginLeft: "5%",
		height: 40,
		borderBottomWidth: 0.2,
		borderRadius: 10,
		borderColor: "grey",
		justifyContent: "center",
		marginTop: 5
	},
	textoEspacio: { 
		fontSize: 16,
		fontWeight: "400",
	},
	root: { 
		width: "100%",
		height: "100%",
		backgroundColor: "white",
	},	
	nombreUsuario: { 
		fontWeight: "bold",
		fontSize: 18
		,textAlign: "center",
		marginTop: 5
	},
	contenido: { 
		height: 300,
		width: '100%',
		marginTop: 20
	},	
  avatar: {
		width: '100%',
		height: 150,
		justifyContent: "flex-end"
  },
	labelEditar: {
		fontSize: 12,
		color: "skyblue",
		fontWeight: "600",
		textAlign: "center",
		marginTop: 10
	},
	logoAvatar: { 
		width: 55,
		height: 55,
		borderWidth: 0.3,
		borderRadius: 55,
		alignSelf:"center",
		borderColor: "grey",
		marginBottom: 10,
	},
	imagen: { 
		width: '100%',
		float: 'left',
		justifyContent: "flex-end",
	},
	imgTop: {
		width: Dimensions.get('screen').width * 0.8,
		height: Dimensions.get('screen').height * 0.20,
		borderRadius: 15,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
		overflow: 'hidden',
	},	
	imgLogo: {
		width: '50%',
		height: '50%',
		alignSelf: 'center'
	},
	btnProfile: {
		marginHorizontal: '40%',
		marginTop: 20,
		height: 75,
		width: 75,
		borderRadius: 100,
		backgroundColor: '#5EC0CB',
	  },
})

export default Perfil
