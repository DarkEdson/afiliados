/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  LayoutAnimation,
  Platform,
} from 'react-native';
import TextInputIcon from '../../components/DataInputs/TextInputIcon';
import TextAreaInputIcon from '../../components/DataInputs/TextAreaInputIcon';
import CardProducto from '../../components/CardProducto/index';
import SelectLanguage from '../../components/SelectLanguage/SelectLanguage';
import ImageModal from 'react-native-image-modal';
import {FAB} from '@rneui/themed';
import {
  APIURL,
  BASE_URL_IMG,
  PRODUCTS_URL,
  IMGEXTENSIONS,
} from '../../../utils/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionic from 'react-native-vector-icons/Ionicons';
import SelectSede from '../../components/SelectSede/SelectSede';
import Snackbar from 'react-native-snackbar';
import {launchImageLibrary} from 'react-native-image-picker';

const Detalle = props => {
  // Carga inicial de sedes y productos
  useEffect(() => {
    console.log('PRODUCTO', props.route.params.data);
    console.log('PARAMS PROPS', props.route.params);
    console.log('Headquarters PROPS', props.route.params.data.headquarters);
    console.log(
      'IDIOMAS LANGUAJE',
      props.route.params.data.labels.length > 0
        ? props.route.params.data.labels[0].idLanguage
        : '',
    );
    const loadData = async () => {
      const idiomas = await cargarIdiomasApp();
      const sedes = await cargarsedesAfiliado();
      const moneda = await cargarListadoMonedas();
      const categorias = await cargarListadoCategorias();
      var cat = [];
      categorias.forEach(c => {
        cat.push({
          _id: c._id,
          labels: c.labels,
          name: c.labels[0].name,
          code: c.code,
          image: c.image,
        });
      });
      setsedes(sedes);
      setidiomas(idiomas);
      setmonedas(moneda);
      setcategorias(cat);
    };
    loadData();
  }, []);

  // Variables
  const [productoDetalle, setproductoDetalle] = useState(
    props.route.params.data,
  );
  const [imagenEliminar, setimagenEliminar] = useState('');
  const [monedas, setmonedas] = useState([]);
  const [idiomas, setidiomas] = useState([]);
  const [sedes, setsedes] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const [categorias, setcategorias] = useState([]);
  const [nuevo, setnuevo] = useState(props.route.params.data.nuevo);
  const [agregarIdioma, setagregarIdioma] = useState(false);
  const [agregarSede, setagregarSede] = useState(false);
  const [agregarFinanciamiento, setAgregarFinanciamiento] = useState(false);
  const [modificarMoneda, setmodificarMoneda] = useState(false);
  const [cambiarCategoria, setcambiarCategoria] = useState(false);
  const [principalImage, setprincipalImage] = useState({
    fileName: null,
    base64: null,
    fileType: null,
    fileUri: null,
    file: null,
  });

  const [multimediaProducto, setmultimediaProducto] = useState([]);

  // Funciones
  const crearProductoAPI = async producto => {
    setisLoading(true)
    var token = await AsyncStorage.getItem('userToken');
    console.log('PRODUCTO A CREAR API', producto);
    let url = `${APIURL}/product.create`;
    try {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(producto),
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
            formdata.append('multimedia', {
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
            console.log(`${APIURL}/product.upload_multimedia/${response._id}`, {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            fetch(
              `${APIURL}/product.upload_multimedia/${response._id}/1`,
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                console.log('RESULTADO DE CARGA IMAGEN PRINCIPAL')
                if (multimediaProducto.length>0){
                  multimediaProducto.map(async (img,key)=>{
                    await cargarMultimedias(response._id,img,key)
                    console.log('SE CARGO UN MULTIMEDIA')
                  })
                }
                setisLoading(false)
                Alert.alert('Success', 'Producto creado correctamente', [
                  {
                    text: 'OK',
                    onPress: () => {
                      props.navigation.replace('Producto');
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
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';

function randomLetter() {
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
}
  async function cargarMultimedias(productID, multim, key){
            var formdata = new FormData();
            formdata.append('multimedia', {
              name: `${multim.fileName}`,
              type: `${multim.fileType}`,
              uri: multim.fileUri,
            });
            let letra1=randomLetter()
            let letra2=randomLetter()
            formdata.append('code',`${productoDetalle.code}-${key}${letra1}${letra2}`)
            formdata.append('description',`${multim.fileName}`)
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            };
            console.log(`${APIURL}/product.upload_multimedia/${productID}`, {
              name: `${multim.fileName}`,
              type: `${multim.fileType}`,
              uri: multim.fileUri,
            });
            await fetch(
              `${APIURL}/product.upload_multimedia/${productID}/2`,
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                console.log(result);
              })
              .catch(error => console.log('error', error));
  }

  function pruebacargaimg() {
    var formdata = new FormData();
    formdata.append('multimedia', {
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
    console.log(
      {
        name: `${principalImage.fileName}`,
        type: `${principalImage.fileType}`,
        uri: principalImage.fileUri,
      },
      `${APIURL}/product.upload_multimedia/${productoDetalle._id}`,
      formdata,
    );
    fetch(
      `${APIURL}/product.upload_multimedia/${productoDetalle._id}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        Alert.alert('Success', 'Imagen Cargada', [
          {
            text: 'OK',
            onPress: () => {
              //              props.navigation.replace('Producto');
            },
          },
        ]);

        console.log(result);
      })
      .catch(error => console.log('error', error));
  }

  const cargarListadoCategorias = async () => {
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/category.index`;
    var categorias = [];
    try {
      await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          categorias = response;
        });
      return categorias;
    } catch (error) {
      console.error(error);
    }
  };

  const cargarListadoMonedas = async () => {
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/currency.index`;
    var monedas = [];
    try {
      await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          monedas = response;
        });
      return monedas;
    } catch (error) {
      console.error(error);
    }
  };

  const cargarIdiomasApp = async () => {
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/language.index`;
    var idiomas = [];
    try {
      await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          idiomas = response;
        });
      return idiomas;
    } catch (error) {
      console.error(error);
    }
  };

  const cargarsedesAfiliado = async () => {
    var id = await AsyncStorage.getItem('userId');
    let languageID = '633225cf5531aa122f71a7e4';
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/affiliate.headquarters.getheadquartersbyid/${id}/${languageID}`;
    var sedes = [];
    try {
      await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          console.log('RESPUESTA EN GET SEDES', response);
          console.log('RESPUESTA EN LABELS GET SEDES', response[0].labels[0]);
          sedes = response;
        });
      return sedes;
    } catch (error) {
      console.error(error);
    }
  };

  const confirmaEliminaProducto = async () => {
    setisLoading(true)
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/product.destroy/${productoDetalle._id}`;
    try {
      await fetch(url, {
        method: 'DELETE',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(() => {
          setisLoading(false)
          Alert.alert('Success', 'Producto eliminado correctamente', [
            {text: 'OK', onPress: () => props.navigation.replace('Producto')},
          ]);
        });
    } catch (error) {
      setisLoading(false)
      console.error(error);
    }
  };

  const crearProducto = async () => {
    if (productoDetalle.code == '') {
      Alert.alert('Alerta', 'El Codigo del producto es neecesario', [
        {text: 'OK'},
      ]);
      return;
    }
    if (!productoDetalle.idCategory) {
      Alert.alert('Alerta', 'La categoria del producto es neecesaria', [
        {text: 'OK'},
      ]);
      return;
    }

    if (productoDetalle.image == 'NINGUNA' && principalImage.fileName == null) {
      Alert.alert('Alerta', 'La Imagen del producto es neecesaria', [
        {text: 'OK'},
      ]);
      return;
    }
    if (productoDetalle.labels.length < 1) {
      Alert.alert(
        'Alerta',
        'se debe definir al menos un idioma con el titulo del producto',
        [{text: 'OK'}],
      );
      return;
    }
    if (productoDetalle.headquarters.length < 1) {
      Alert.alert('Alerta', 'La Sede del producto es necesaria', [
        {text: 'OK'},
      ]);
      return;
    }
    productoDetalle.headquarters.map(hq => {
      if (hq.idCurrency == '') {
        Alert.alert(
          'Alerta',
          'La Sede del producto no tiene moneda definida y es necesaria',
          [{text: 'OK'}],
        );
        return;
      }
    });

    let myData = reestructurarProducto('crear');
    crearProductoAPI(myData);
  };

  const reestructurarProducto = prodtyp => {
    // Reestructurar data
    console.log('PRODUCTO A REESTRUCTURAR', productoDetalle);
    console.log('PRODUCTO A REESTRUCTURAR HEADQUARTERS', productoDetalle.headquarters);
    let myProdDet = JSON.parse(JSON.stringify(productoDetalle));
    var labels = [];
    var headquarters = [];
    if (prodtyp == 'crear') {
      myProdDet.labels.forEach(lab => {
        labels.push({
          keyword: lab.keyword,
          idLanguage: lab.idLanguage._id,
          name: lab.name,
          description: lab.description,
        });
      });
      myProdDet.headquarters.forEach(lab => {
        console.log('QUE TRAE EL ID HEADQUARTER', lab.idHeadquarter);
        headquarters.push({
          idHeadquarter: prodtyp == 'crear' ? lab._id : lab.idHeadquarter._id,
          idCurrency: lab.idCurrency._id,
          price: lab.price,
        });
      });
    } else {
      myProdDet.labels.forEach(lab => {
        if (lab._id) {
          labels.push({
            id: lab._id,
            keyword: lab.keyword,
            idLanguage: lab.idLanguage._id,
            name: lab.name,
            description: lab.description,
          });
        } else {
          labels.push({
            keyword: lab.keyword,
            idLanguage: lab.idLanguage._id,
            name: lab.name,
            description: lab.description,
          });
        }
      });
      myProdDet.headquarters.forEach(lab => {
        console.log('QUE TRAE EL ID HEADQUARTER en MOD', lab.idHeadquarter);
        console.log('QUE TRAE EL ID HEADQUARTER en MOD', lab);
        headquarters.push({
          id: prodtyp == 'crear' ? lab._id : lab._id,
          idHeadquarter: prodtyp == 'crear' ? lab._id : lab.idHeadquarter._id,
          idCurrency: lab.idCurrency._id,
          price: lab.price,
        });
      });
    }
  

    var financings = [];
    myProdDet.financing.forEach(lab => {
      financings.push({
        number_of_installments: lab.number_of_installments,
        percentage: lab.percentage,
      });
    });

    let tipoFinanciado = '1';
    if (financings.length > 0) {
      tipoFinanciado = '2';
    }
    var data = {}
    if (prodtyp !== 'crear') {
      data = {
        idAffiliate: myProdDet.idAffiliate,
        code: myProdDet.code,
        image:
          principalImage.fileName == null
            ? myProdDet.image
            : principalImage.fileName,
        labels: labels,
        headquarters: headquarters,
        financing: financings,
        type: tipoFinanciado,
        idCategory: productoDetalle.idCategory._id,
      };
    }else{
      data = {
        idAffiliate: myProdDet.idAffiliate,
        code: myProdDet.code,
        image:
          principalImage.fileName == null
            ? myProdDet.image
            : principalImage.fileName,
        multimedia:  [] ,
        labels: labels,
        headquarters: headquarters,
        financing: financings,
        type: tipoFinanciado,
        idCategory: productoDetalle.idCategory._id,
      };
    }

    if (prodtyp !== 'crear') {
      console.log('PRODUCTO A MODIFICAR', data);

    }else{
      console.log('PRODUCTO A CREAR', data);

    }
    
    return data;
  };

  const modificarProducto = () => {
    if (productoDetalle.code == '') {
      Alert.alert('Alerta', 'Es necesario que el producto tenga código', [
        {text: 'OK'},
      ]);
      return;
    }
    let myData = reestructurarProducto('editar');

    Alert.alert('Confirmar', 'Seguro que desea modificar el producto', [
      {
        text: 'Si',
        onPress: () => {
          confirmaModificarProducto(myData);
        },
      },
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {
          return false;
        },
      },
    ]);
  };

  const confirmaModificarProducto = async data => {
    setisLoading(true)
    console.log('modificar producto', data);
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/product.update/${productoDetalle._id}`;
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
              if (multimediaProducto.length>0){
                multimediaProducto.map(async (img,key)=>{
                  await cargarMultimedias(productoDetalle._id,img,key)
                  console.log('SE CARGO UN MULTIMEDIA')
                })
              }
              setisLoading(false)
              Alert.alert('Success', 'Producto actualizado correctamente', [
                {
                  text: 'OK',
                  onPress: () => props.navigation.replace('Producto'),
                },
              ]);
              console.log('IMAGEN NULA',response, principalImage.fileUri);
            }else{
              var formdata = new FormData();
            formdata.append('multimedia', {
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
            console.log(`${APIURL}/product.upload_multimedia/${response._id}`, {
              name: `${principalImage.fileName}`,
              type: `${principalImage.fileType}`,
              uri: principalImage.fileUri,
            });
            fetch(
              `${APIURL}/product.upload_multimedia/${response._id}/1`,
              requestOptions,
            )
              .then(response => response.text())
              .then(result => {
                if (multimediaProducto.length>0){
                  multimediaProducto.map(async (img,key)=>{
                    await cargarMultimedias(productoDetalle._id,img,key)
                    console.log('SE CARGO UN MULTIMEDIA')
                  })
                }
                setisLoading(false)
                Alert.alert('Success', 'Producto actualizado correctamente', [
                  {
                    text: 'OK',
                    onPress: () => props.navigation.replace('Producto'),
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

  const eliminarProducto = () => {
    Alert.alert('Confirmar', 'Seguro que desea eliminar el producto', [
      {text: 'Si', onPress: () => confirmaEliminaProducto()},
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {
          return false;
        },
      },
    ]);
  };

  const eliminarImagen = imgpath => {
    setimagenEliminar(imgpath);
    Alert.alert('Confirmar', 'Seguro que desea eliminar la imagen', [
      {text: 'Si', onPress: () => confirmaEliminarImagen()},
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {
          return false;
        },
      },
    ]);
  };

  const confirmaEliminarImagen = () => {
    console.log('ver detalle Imagen1');
    console.log(imagenEliminar);
  };

  const eliminarIdiomaProducto = detalle => {
    console.log('eliminar idioma');
    console.log(productoDetalle.labels);
    var indexIdioma = productoDetalle.labels.indexOf(
      productoDetalle.labels.filter(idioma => idioma._id == detalle._id)[0],
    );
    productoDetalle.labels.splice(indexIdioma, 1);
    setproductoDetalle(prevState => ({
      ...prevState,
      labels: productoDetalle.labels,
    }));
    setagregarIdioma(false);
  };

  const agregarNuevoIdioma = async nuevo => {
    let myProdDet = JSON.parse(JSON.stringify(productoDetalle));
    let idioma = [];
    idioma = myProdDet.labels.filter(
      languaje => languaje.idLanguage.name === nuevo.name,
    );
    console.log(idioma);
    if (idioma.length == 0) {
      productoDetalle.labels.push({
        name: '',
        keyword: '',
        idLanguage: {_id: nuevo._id, code: nuevo.code, name: nuevo.name},
        description: '',
      });
      setproductoDetalle(prevState => ({
        ...prevState,
        labels: productoDetalle.labels,
      }));
    } else {
      console.log('idioma repetido, elija otro');
      Alert.alert(
        'Error en seleccion de Idioma',
        'Idioma Repetido, elija otro',
      );
    }
    setagregarIdioma(false);
  };

  const eliminarSedeProducto = sede => {
    var indexSede = productoDetalle.headquarters.indexOf(
      productoDetalle.headquarters.filter(s => s._id == sede._id)[0],
    );
    productoDetalle.headquarters.splice(indexSede, 1);
    setproductoDetalle(prevState => ({
      ...prevState,
      sedes: productoDetalle.headquarters,
    }));
    setagregarSede(false);
  };

  const eliminarFinanciamientoProducto = financiamiento => {
    var indexFinancing = productoDetalle.financing.indexOf(
      productoDetalle.headquarters.filter(
        s => s.percentage == financiamiento.percentage,
      )[0],
    );
    productoDetalle.financing.splice(indexFinancing, 1);
    setproductoDetalle(prevState => ({
      ...prevState,
      financing: productoDetalle.financing,
    }));
    setAgregarFinanciamiento(false);
  };

  const agregarNuevaSede = async nuevo => {
    let myProdDet = JSON.parse(JSON.stringify(productoDetalle));
    console.log(
      'nueva SEDE elejida',
      nuevo,
      '------------------------',
      nuevo.labels[0].name,
      myProdDet.headquarters.map(sed => sed),
    );
    let sede = [];
    sede = myProdDet.headquarters.filter(
      sed => sed.idHeadquarter.labels[0].name === nuevo.labels[0].name,
    );
    console.log(sede);

    if (sede.length == 0) {
      productoDetalle.headquarters.push({
        _id: nuevo._id,
        headquarterId: nuevo.labels[0]._id,
        idHeadquarter: {
          _id: nuevo._id,
          labels: nuevo.labels,
        },
        price: '0.00',
        idCurrency: '',
      });
      setproductoDetalle(prevState => ({
        ...prevState,
        headquarters: productoDetalle.headquarters,
      }));
    } else {
      console.log('Sede repetida, elija otra');
      Alert.alert('Error en seleccion de Sede', 'Sede Repetida, elija otra');
    }

    setagregarSede(false);
  };

  const agregarNuevoFinanciamiento = async () => {
    console.log('FINANCIAMIENTO A AGREGAR?');
    productoDetalle.financing.push({
      percentage: '0',
      number_of_installments: '0',
    });
    setproductoDetalle(prevState => ({
      ...prevState,
      financing: productoDetalle.financing,
    }));
    setAgregarFinanciamiento(!agregarFinanciamiento);
  };

  const modificarMonedaSede = async (sede, moneda) => {
    var indexProducto = productoDetalle.headquarters.indexOf(
      productoDetalle.headquarters.filter(
        id =>
          id.idHeadquarter.labels[0].name == sede.idHeadquarter.labels[0].name,
      )[0],
    );
    productoDetalle.headquarters[indexProducto].idCurrency = moneda;
    setproductoDetalle(prevState => ({
      ...prevState,
      headquarters: productoDetalle.headquarters,
    }));
    setmodificarMoneda(false);
  };

  const actualizarTituloIdioma = async (idioma, cambio) => {
    var indexProducto = productoDetalle.labels.indexOf(
      productoDetalle.labels.filter(
        id => id.idLanguage.name == idioma.idLanguage.name,
      )[0],
    );
    productoDetalle.labels[indexProducto].name = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      labels: productoDetalle.labels,
    }));
  };

  const actualizarKeywordsIdioma = async (idioma, cambio) => {
    var indexProducto = productoDetalle.labels.indexOf(
      productoDetalle.labels.filter(
        id => id.idLanguage.name == idioma.idLanguage.name,
      )[0],
    );
    productoDetalle.labels[indexProducto].keyword = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      labels: productoDetalle.labels,
    }));
  };

  const actualizarDescripciondioma = async (idioma, cambio) => {
    var indexProducto = productoDetalle.labels.indexOf(
      productoDetalle.labels.filter(
        id => id.idLanguage.name == idioma.idLanguage.name,
      )[0],
    );
    productoDetalle.labels[indexProducto].description = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      labels: productoDetalle.labels,
    }));
  };

  const actualizarPrecioSede = async (sede, cambio) => {
    var indexProducto = productoDetalle.headquarters.indexOf(
      productoDetalle.headquarters.filter(
        id =>
          id.idHeadquarter.labels[0].name == sede.idHeadquarter.labels[0].name,
      )[0],
    );
    productoDetalle.headquarters[indexProducto].price = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      sedes: productoDetalle.headquarters,
    }));
  };

  const actualizarPorcentajeFinanciamiento = async (financiamiento, cambio) => {
    var indexProducto = productoDetalle.financing.indexOf(
      productoDetalle.financing.filter(
        id => id.percentage == financiamiento.percentage,
      )[0],
    );
    productoDetalle.financing[indexProducto].percentage = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      financing: productoDetalle.financing,
    }));
  };

  const actualizarCuotasFinanciamiento = async (financiamiento, cambio) => {
    var indexProducto = productoDetalle.financing.indexOf(
      productoDetalle.financing.filter(
        id =>
          id.number_of_installments == financiamiento.number_of_installments,
      )[0],
    );
    productoDetalle.financing[indexProducto].number_of_installments = cambio;
    setproductoDetalle(prevState => ({
      ...prevState,
      financing: productoDetalle.financing,
    }));
  };

  const modificarCategoria = async val => {
    let valorCategoria = {
      _id: val._id,
      labels: val.labels,
      code: val.code,
      image: val.image,
      createdAt: val.createdAt,
      updatedAt: val.updatedAt,
      __v: val.__v,
    };
    console.log('valor categoria', valorCategoria);
    setproductoDetalle(prevState => ({
      ...prevState,
      idCategory: valorCategoria,
    }));
    setcambiarCategoria(false);
  };

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

  function chooseMultimedia() {
    let options = {
      includeBase64: true,
      mediaType: 'image/video',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    let multimediaTemp = multimediaProducto;
    launchImageLibrary(options,  response => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.assets};
        console.log('response', JSON.stringify(response.assets[0].fileName));
        console.log(
          'MULTIMEDIA',
          response.fileName
        );
    //    let imageURI =  normalizePath(response.assets[0].uri);
        let archivoMultim = {
          fileName: response.assets[0].fileName,
          base64: response.assets[0].base64,
          fileType: response.assets[0].type,
          fileUri: response.assets[0].uri,
        }
        const existe = multimediaTemp.some((img)=>{
          console.log(img.fileName, archivoMultim.fileName)
          return img.base64 === archivoMultim.base64 && img.fileUri === archivoMultim.fileUri
        })
        if(!existe){
          console.log('No Repetido')
          multimediaTemp.push(archivoMultim);
          productoDetalle.multimedia.push(archivoMultim);
        }
        
        setproductoDetalle(prevState => ({
          ...prevState,
          multimedia: productoDetalle.multimedia,
        }));
        setmultimediaProducto(multimediaTemp);
      }
    });
    console.log('HOLA MULTIMEDIA');
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
        {/* Detalle general */}
        <View>
          <TouchableOpacity
            style={styles.imPrincipal}
            onPress={() => chooseImage()}
          >
            <View style={styles.espacioProducto}>
              <CardProducto
                urlImagen={`${productoDetalle._id}/${productoDetalle.image}`}
                titulo={productoDetalle.code}
                creado={productoDetalle.createdAt}
              />
            </View>
          </TouchableOpacity>
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
                        ? productoDetalle.image == 'NINGUNA'
                          ? `${BASE_URL_IMG}logo.png`
                          : `${BASE_URL_IMG}${PRODUCTS_URL}${productoDetalle._id}/${productoDetalle.image}`
                        : 'data:image/jpeg;base64,' + principalImage.base64,
                  }}
                  resizeMode="cover"
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.seccionIdiomas}>
            <TouchableOpacity
              style={styles.addLanguage}
              onPress={() => setcambiarCategoria(!cambiarCategoria)}
            >
              <Text style={styles.labelAgregar}> Modificar Categoria </Text>
              <Text style={styles.labelAgregarCat}>
                {' '}
                {productoDetalle.idCategory
                  ? productoDetalle.idCategory.labels[0].name
                  : 'Ninguna'}
              </Text>
            </TouchableOpacity>
            {cambiarCategoria ? (
              <View>
                <SelectLanguage
                  placeholder="Categoria"
                  icon="arrow-down-circle"
                  idiomas={categorias}
                  setValue={modificarCategoria}
                />
              </View>
            ) : null}
          </View>
          {/* <TextInputIcon
            placeholder="Imagen de Encabezado" 
            icon="images-sharp"
          /> */}
          <TextInputIcon
            placeholder="Codigo Producto"
            icon="text-outline"
            editable={nuevo}
            value={productoDetalle.code}
            setValue={val =>
              setproductoDetalle(prevState => ({
                ...prevState,
                code: val,
              }))
            }
          />
        </View>
        <View style={styles.Multimedia}>
          <TouchableOpacity onPress={chooseMultimedia}>
            <Text>Cargar Multimedia</Text>
          </TouchableOpacity>
          {productoDetalle.multimedia ? (
            <ScrollView horizontal={true}>
              {productoDetalle.multimedia.map((img, key) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // eliminarImagen(img)
                    }}
                    key={key}
                  >
                    {/* <Ionic size={25} name="close-outline" style={styles.Icon} /> */}
                    {
                      img.hasOwnProperty('_id')?<ImageModal
                      style={styles.imgPromocion}
                      resizeMode="contain"
                      source={{
                        uri: `${BASE_URL_IMG}${PRODUCTS_URL}${productoDetalle._id}/${img.name}`,
                      }}
                    />:<ImageModal
                    style={styles.imgPromocion}
                    resizeMode="contain"
                    source={{
                      uri: 'data:image/jpeg;base64,' + img.base64,
                    }}
                  />
                    }
                    
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null}
        </View>

        {/* Seleccionar idiomas */}
        <View style={styles.seccionIdiomas}>
          <TouchableOpacity
            style={styles.addLanguage}
            onPress={() => setagregarIdioma(!agregarIdioma)}
          >
            <Text style={styles.labelAgregar}> + Agregar Idioma</Text>
          </TouchableOpacity>
          {agregarIdioma ? (
            <View>
              <SelectLanguage
                placeholder="idioma"
                icon="arrow-down-circle"
                idiomas={idiomas}
                setValue={agregarNuevoIdioma}
              />
            </View>
          ) : null}
        </View>
        {/* Espacio para los idiomas */}
        {productoDetalle.labels.map((idioma, key) => {
          return (
            <View style={styles.espacioIdioma} key={key}>
              {nuevo ? (
                <Ionic
                  size={25}
                  name="close"
                  style={styles.Icon}
                  onPress={() => {
                    if (nuevo) {
                      eliminarIdiomaProducto(idioma);
                    } else {
                      console.log('no se eliminan idiomas');
                    }
                  }}
                />
              ) : null}

              <View>
                <Text style={styles.label}> Idioma</Text>
                <Text style={styles.idioma}> {idioma.idLanguage.name} </Text>

                <TextInputIcon
                  placeholder="Titulo Producto"
                  icon="text-outline"
                  value={idioma.name}
                  setValue={val => actualizarTituloIdioma(idioma, val)}
                />
                <TextInputIcon
                  placeholder="Keywords"
                  icon="text-outline"
                  value={idioma.keyword}
                  setValue={val => actualizarKeywordsIdioma(idioma, val)}
                />
                <TextAreaInputIcon
                  placeholder="Descripción"
                  icon="document-text"
                  value={idioma.description}
                  setValue={val => actualizarDescripciondioma(idioma, val)}
                />
              </View>
            </View>
          );
        })}

        {/* Seleccionar sedes */}
        <View style={styles.seccionIdiomas}>
          <TouchableOpacity
            style={styles.addLanguage}
            onPress={() => setagregarSede(!agregarSede)}
          >
            <Text style={styles.labelAgregar}> + Agregar Sede</Text>
          </TouchableOpacity>
          {agregarSede ? (
            <View>
              <SelectSede
                placeholder="sedes"
                icon="arrow-down-circle"
                sedes={sedes}
                setValue={agregarNuevaSede}
              />
            </View>
          ) : null}
        </View>
        {/* Espacio para las sedes */}
        {productoDetalle.headquarters.map((sede, key) => {
          return (
            <View style={styles.espacioIdioma} key={key}>
              <Ionic
                size={25}
                name="close"
                style={styles.Icon}
                onPress={() => eliminarSedeProducto(sede)}
              />
              <View>
                <Text style={styles.label}> Sede</Text>
                <Text style={styles.idioma}>
                  {' '}
                  {sede.idHeadquarter
                    ? sede.idHeadquarter.labels[0].name
                    : null}{' '}
                </Text>

                <TouchableOpacity
                  style={styles.addLanguage}
                  onPress={() => setmodificarMoneda(!modificarMoneda)}
                >
                  <Text style={styles.labelAgregar}>
                    {' '}
                    Modificar Moneda{' '}
                    {sede.idCurrency ? sede.idCurrency.name : null}
                  </Text>
                </TouchableOpacity>
                {modificarMoneda ? (
                  <View>
                    <SelectLanguage
                      placeholder="Monedas"
                      icon="arrow-down-circle"
                      idiomas={monedas}
                      setValue={val => modificarMonedaSede(sede, val)}
                    />
                  </View>
                ) : null}

                <TextInputIcon
                  placeholder="Precio"
                  icon="cash-outline"
                  value={sede.price}
                  setValue={val => actualizarPrecioSede(sede, val)}
                />
              </View>
            </View>
          );
        })}
        {/* Seleccionar Financiamientos */}
        <View style={styles.seccionIdiomas}>
          <TouchableOpacity
            style={styles.addLanguage}
            onPress={agregarNuevoFinanciamiento}
          >
            <Text style={styles.labelAgregar}> + Agregar Financiamiento</Text>
          </TouchableOpacity>
        </View>
        {/* Espacio para los Financiamientos */}
        {productoDetalle.financing.map((sede, key) => {
          return (
            <View style={styles.espacioIdioma} key={key}>
              <Ionic
                size={25}
                name="close"
                style={styles.Icon}
                onPress={() => eliminarFinanciamientoProducto(sede)}
              />
              <View>
                <Text style={styles.label}> Financiamiento</Text>
                <TextInputIcon
                  placeholder="Porcentaje"
                  icon="cash-outline"
                  value={sede.percentage}
                  setValue={val =>
                    actualizarPorcentajeFinanciamiento(sede, val)
                  }
                />
                <TextInputIcon
                  placeholder="Cuotas"
                  icon="cash-outline"
                  value={sede.number_of_installments}
                  setValue={val => actualizarCuotasFinanciamiento(sede, val)}
                />
              </View>
            </View>
          );
        })}

        {/* Botones */}
        {nuevo ? (
          <View>
            <TouchableOpacity style={styles.loginBoton} onPress={crearProducto}>
              <Text style={styles.loginText}> Guardar </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.modificarBoton}
              onPress={modificarProducto}
            >
              <Text style={styles.loginText}> Modificar </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.eliminarBoton}
              onPress={eliminarProducto}
            >
              <Text style={styles.loginText}> Eliminar </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    padding: 15,
    backgroundColor: 'white',
  },
  addLanguage: {
    marginBottom: 20,
  },
  espacioIdioma: {
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    borderColor: 'grey',
  },
  labelAgregar: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  labelAgregarCat: {
    alignSelf: 'flex-end',
    fontWeight: '600',
    marginRight: 25,
    marginTop: 10,
    fontSize: 20,
  },
  seccionIdiomas: {
    marginTop: 30,
  },
  imPrincipal: {
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  imgPromocion: {
    borderRadius: 15,
    height: 120,
    width: 120,
  },
  Icon: {
    color: 'red',
  },
  Multimedia: {
    marginTop: 15,
  },
  espacioProducto: {
    marginTop: 20,
  },
  sedes: {
    marginTop: 20,
  },
  tituloIdioma: {
    // color: "#F0D19A",
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '200',
    fontSize: 14,
    marginRight: 20,
  },
  label: {
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: '200',
    fontSize: 14,
  },
  idioma: {
    marginLeft: 20,
    textAlign: 'left',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 15,
  },
  loginBoton: {
    backgroundColor: '#F0D19A',
    width: '70%',
    marginLeft: '15%',
    marginTop: 20,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  eliminarBoton: {
    backgroundColor: '#ff545a',
    width: '70%',
    marginLeft: '15%',
    marginTop: 20,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  modificarBoton: {
    backgroundColor: '#8cfa9b',
    width: '70%',
    marginLeft: '15%',
    marginTop: 20,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Detalle;
