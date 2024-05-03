/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Snackbar from 'react-native-snackbar';
import {AuthContext} from './src/components/context';

import LoginStack from './src/screens/LoginStack/LoginStack';
import Home from './src/screens/Home';
import LoginApi from './src/Apis/LoginApi';
import AfiliadoApi from './src/Apis/AfiliadoApi';


const App: () => Node = () => {
  const [userToken, setuserToken] = useState(null);
  useEffect(() => {
    (async () => {
      let tokenU = await AsyncStorage.getItem('userToken');
      console.log('useEffect APP.js',tokenU);
      if (tokenU == 'null'){
        setuserToken(null)
      }
      else{
        setuserToken(tokenU);
      }
      
    })();
    return () => {};
  }, []);
  const authContext = React.useMemo(() => ({
    signIn: async (username, password) => {
      console.log(username, password);
      let response = await LoginApi(username, password);
      console.log('RESPONSE de loginapi afuera', response);
      if (response == 'Invalid password!') {
        Snackbar.show({
          text: response,
          duration: Snackbar.LENGTH_LONG,
        });
      } else if (response == 'Email or Password is wrong!') {
        Snackbar.show({
          text: response,
          duration: Snackbar.LENGTH_LONG,
        });
      }
      // Validacion temporal
      // if(username == "Cementerio" && password == "Cementerio"){
      else {
        let afiliadoData = await AfiliadoApi(response.idAffiliate._id);
        try {
          console.log(response)
          console.log(afiliadoData.image)
          await AsyncStorage.setItem('Avatar', afiliadoData.image);
          await AsyncStorage.setItem('userName', response.username);
          await AsyncStorage.setItem('idUser', response._id);
          await AsyncStorage.setItem('userToken', response._id);
          await AsyncStorage.setItem('userId', response.idAffiliate._id);
          setuserToken(response._id);

        } catch (e) {
          setuserToken(null);
        }
      }
      // } else {
      //   Alert.alert( "Alerta", "Usuario y contraseña incorrectos", [ { text: "OK" } ]);
      // }
    },

    signOut: async () => {
      try {
        await AsyncStorage.setItem('Avatar', 'null');
        await AsyncStorage.setItem('idUser', 'null');
        await AsyncStorage.setItem('userName', 'null');
        await AsyncStorage.setItem('userToken', 'null');
        await AsyncStorage.setItem('userId', 'null');
      } catch (e) {
        setuserToken(null);
      }
      setuserToken(null);
    },
  }));

  // contenido
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaView>
        {userToken == null ? <LoginStack /> : <Home />}
      </SafeAreaView>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
