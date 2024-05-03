//import liraries
import React from 'react';
import {APIURL} from '../../utils/config';

// create a component
const AfiliadoApi = async (idAfiliado) => {
  let url = `${APIURL}/affiliate.show/${idAfiliado}`;
  let resp = null;
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error en RESPUESTA API Afiliado', error))
      .then(response => {
        console.log('dentro del API Afiliado');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API Afiliado', error);
    return (response = null);
  }
};

//make this component available to the app
export default AfiliadoApi;
