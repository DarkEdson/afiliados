import React, {useState, useEffect} from 'react';
import CardProducto from '../../components/CardProducto/index';
import TextInputIcon from '../../components/DataInputs/TextInputIcon';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useIsFocused, useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APIURL} from '../../../utils/config';

const Promociones = props => {
  const {navigation} = props;
  // Carga inicial de sedes y productos
  useEffect(() => {
    (async () => {
      var id = await AsyncStorage.getItem('userId');
      setidAfiliado(id);
    })();
    loadData();
    setRefreshing(false);
    if (isFocused) {
      loadData();
      console.log('isFocused PRODUCT');
    }
  }, [props, isFocused]);

  // Variables
  const [search, setsearch] = useState('');
  const [listadoProductos, setlistadoProductos] = useState([]);
  const [idAfiliado, setidAfiliado] = useState(null);
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  // ========================= Funciones ============================
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    console.log(props);
  }, []);

  const loadData = async () => {
    const productos = await cargarProductosPadre();
    setlistadoProductos(productos);
    setRefreshing(false);
  };

  // Cargar los productos padre del cliente
  const cargarProductosPadre = async () => {
    var id = await AsyncStorage.getItem('userId');
    var token = await AsyncStorage.getItem('userToken');
    let url = `${APIURL}/product.getprodsbyaff/${id}`;
    var productos = [];
    try {
      await fetch(url, {
        method: 'GET',
        redirect: 'follow',
      })
        .then(res => res.json())
        .catch(error => console.error('Error', error))
        .then(response => {
          productos = response;
        });
      return productos;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const agregarNuevaPromocion = () => {
    var hoy = new Date();
    console.log(`${hoy.getFullYear()}-${hoy.getMonth()}`);
    const data = {
      _id: '',
      createdAt: `${hoy.getFullYear()}-${hoy.getMonth()}-${hoy.getDay()}T${hoy.getHours()}`,
      financing: [],
      idAffiliate: idAfiliado,
      code: '',
      image: 'NINGUNA',
      labels: [],
      headquarters: [],
      multimedia: [],
      promotions: [],
      type: '1',
      nuevo: true,
    };
    navigation.navigate('Detalle Producto', {data});
  };

  const verDetalleProducto = producto => {
    const data = {
      ...producto,
      nuevo: false,
    };
    navigation.navigate('Detalle Producto', {data});
  };

  // Contenido
  return (
    <View style={styles.root}>
      <View>
        <TextInputIcon
          placeholder="Productos"
          icon="md-search-outline"
          setValue={setsearch}
          value={search}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBoton}
        onPress={agregarNuevaPromocion}
      >
        <Text style={styles.loginText}> AGREGAR </Text>
      </TouchableOpacity>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {listadoProductos
          .filter(
            producto =>
              search == '' ||
              producto.labels[0].name.toUpperCase().includes(search.toUpperCase()),
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  loginBoton: {
    backgroundColor: '#F0D19A',
    width: '90%',
    marginLeft: '5%',
    marginTop: 20,
    marginBottom: 50,
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

export default Promociones;
