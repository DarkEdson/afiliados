import React, {useState} from 'react';
import TextInputIcon from '../../components/DataInputs/TextInputIcon';
import PasswordInputIcon from '../../components/DataInputs/PasswordInputIcon';
import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Text,
  Platform,
} from 'react-native';
import {AuthContext} from '../../components/context';

const Login = ({navigation}) => {
  // Variables
  const {signIn} = React.useContext(AuthContext);
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  // Funciones
  const login = () => {
    if (username == '' || password == '') {
      Alert.alert('Alerta', 'Ingrese  su usuario y contraseña', [{text: 'OK'}]);
      return;
    }
    // Validacion temporal
    signIn(username, password);
  };

  const crearCuenta = () => {
    navigation.navigate('Crear Cuenta');
  };

  // Contenido
  return (
    <View style={styles.login}>
      <View style={styles.imagen}>
        <ImageBackground
          style={styles.imgTop}
          resizeMode="stretch"
          source={require('../../images/background.png')}
        >
          <Image
            style={styles.imgLogo}
            source={require('../../images/logo.png')}
          ></Image>
        </ImageBackground>
      </View>

      <View style={styles.textInput}>
        <TextInputIcon
          autoCapitalize='none'
          placeholder="Usuario"
          icon="person"
          setValue={setusername}
          value={username}
        />
        <PasswordInputIcon
          placeholder="Password"
          icon="md-lock-closed"
          setValue={setpassword}
          value={password}
        />
        <TouchableOpacity onPress={crearCuenta}>
          <Text style={styles.label}> Si no tienes cuenta, suscríbete.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.boton}>
        <TouchableOpacity style={styles.loginBoton} onPress={login}>
          <Text style={styles.loginText}> LOGIN </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  imagen: {
    height: '40%',
    width: '100%',
    float: 'left',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
    height: '35%',
    float: 'left',
  },
  boton: {
    width: '100%',
    height: '25%',
    float: 'left',
  },
  imgTop: {
    width: Dimensions.get('screen').width * 0.8,
    height: Dimensions.get('screen').height * 0.2,
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
    alignSelf: 'center',
  },
  label: {
    color: '#F0D19A',
    alignSelf: 'center',
    fontWeight: '600',
    marginTop: 20,
    fontSize: 15,
  },
  loginBoton: {
    backgroundColor: '#F0D19A',
    width: '90%',
    marginLeft: '5%',
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

export default Login;
