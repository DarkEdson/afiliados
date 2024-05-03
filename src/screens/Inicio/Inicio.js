import React, {useState, useEffect} from 'react';
import CardProducto from '../../components/CardProducto/index';
import CardSede from '../../components/CardSede/index';
import TextInputIcon from '../../components/DataInputs/TextInputIcon';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIURL,BASE_URL_IMG, COMPANIES_URL} from '../../../utils/config';

const Inicio = ({navigation}) => {
  // Carga inicial de sedes y productos
  useEffect(() => {
    loadData();
    console.log('PRUEBAS DE ENTRAR A INICIO');
    setRefreshing(false);
  }, []);

  // ========================= Variables =========================
  const [search, setsearch] = useState('');
  const [listadoProductos, setlistadoProductos] = useState([]);
  const [listadoSedes, setlistadoSedes] = useState([]);
  const [affiliateImage, setaffiliateImage] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  // ========================= Funciones ============================
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
  }, []);

  const loadData = async () => {
    const productos = await cargarProductosPadre();
    const sedes = await cargarSedes();
    setlistadoProductos(productos);
    setlistadoSedes(sedes);
    setRefreshing(false);
    console.log('SEDES?', sedes);
  };

  // Cargar los productos padre del cliente
  const cargarProductosPadre = async () => {
    var id = await AsyncStorage.getItem('userId');
    let avatar =  await AsyncStorage.getItem('Avatar')
    setaffiliateImage(avatar)
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/product.getprodsbyaff/${id}`;
    console.log('URL API PRODS AFF', url)
    var productos = [];
    if (id != 'null') {
      try {
        await fetch(url, {
          method: 'GET',
          redirect: 'follow',
        })
          .then(res => res.json())
          .catch(error => {console.error('Error en carga de productos', error)
        productos = []})
          .then(response => {
            console.log('PRODUCTOS GET API', response);
            productos = response;
          });
        return productos;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      return productos;
    }
  };

  // Cargar las sedes del cliente
  const cargarSedes = async () => {
    var id = await AsyncStorage.getItem('userId');
    let languageID = '633225cf5531aa122f71a7e4';
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/affiliate.headquarters.getheadquartersbyid/${id}/${languageID}`;
    console.log('URL SEDES',url)
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

          sedes = response;
        });
      return sedes;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const verDetalleProducto = producto => {
    navigation.navigate('Productos', {producto});
  };

  const verDetalleSede = sede => {
    navigation.navigate('Ubicaciones', {sede});
  };

  // ========================= Contenido =========================
  return (
    <View style={styles.root}>
      <View style={styles.avatar}>
        <Image
          style={styles.logoAvatar}
          source={{
            uri:
            `${BASE_URL_IMG}${COMPANIES_URL}${affiliateImage}`,
          }}
        />
      </View>
      <View style={styles.buscador}>
        <TextInputIcon
          placeholder="Productos, Ubicaciones"
          icon="md-search-outline"
          setValue={setsearch}
          value={search}
        />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.listadoProductos}>
          <Text style={styles.titulo}> Productos </Text>
          <View style={styles.seccionProductos}>
            {listadoProductos.length <= 0
              ? null
              : listadoProductos
                  .filter(
                    producto =>
                      search == '' ||
                      producto.labels[0].name
                        .toUpperCase()
                        .includes(search.toUpperCase()),
                  )
                  .map((producto, index) => {
                    return (
                      <CardProducto
                        key={index}
                        funcion={() => verDetalleProducto(producto)}
                        urlImagen={`${producto._id}/${producto.image}`}
                        titulo={producto.labels[0].name}
                        creado={producto.createdAt}
                      />
                    );
                  })}
          </View>
        </View>
        <View style={styles.listadoSedes}>
          <Text style={styles.titulo}> Sedes </Text>
          <View style={styles.seccionProductos}>
            {listadoSedes.length == 0
              ? null
              : listadoSedes
                  .filter(
                    producto =>
                      search == '' ||
                      producto.labels[0].name
                        .toUpperCase()
                        .includes(search.toUpperCase()),
                  )
                  .map((producto, index) => {
                    return (
                      <CardSede
                        key={index}
                        funcion={() => verDetalleSede(producto)}
                        urlImagen={producto.image}
                        titulo={producto.labels[0].name}
                        descripcion={producto.labels[0].description}
                      />
                    );
                  })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listadoSedes: {
    width: '100%',
    marginTop: 20,
  },
  seccionProductos: {
    borderRadius: 10,
    paddingBottom: 30,
  },
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 15,
  },
  btn: {
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
  },
  avatar: {
    width: '100%',
    height: '12%',
    justifyContent: 'flex-end',
  },
  logoAvatar: {
    width: 55,
    height: 55,
    borderWidth: 0.3,
    borderRadius: 55,
    alignSelf: 'flex-end',
    borderColor: 'grey',
    marginBottom: 10,
    marginRight: 15,
  },
  buscador: {
    width: '100%',
    height: '15%',
  },
  listadoProductos: {
    width: '100%',
  },
  titulo: {
    fontWeight: '500',
    fontSize: 20,
    marginBottom: 5,
  },
});

export default Inicio;
