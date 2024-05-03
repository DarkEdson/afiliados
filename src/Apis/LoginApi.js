//import liraries
import React from 'react';
import {APIURL} from '../../utils/config';

// create a component
const LoginApi = async (username, password) => {
  let url = `${APIURL}/auth/signin`;
  let resp = null;
  try {
    let data = {
      email: username,
      password: password,
    };
    console.log(data);
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
      .then(res => res.json())
      .catch(error => console.error('Error en RESPUESTA API LOGIN', error))
      .then(response => {
        console.log('dentro del API LOGIN');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API LOGIN', error);
    return (response = null);
  }
};

//make this component available to the app
export default LoginApi;
