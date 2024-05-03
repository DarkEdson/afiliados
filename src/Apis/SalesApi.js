//import liraries
import React from 'react';
import {APIURL} from '../../utils/config';

// create a component
const SalesApi = async (dateInicio, dateFin, idAfiliado) => {
  let url = `${APIURL}/affiliate.getaffiliatesales/${dateInicio}/${dateFin}/${idAfiliado}`;
  console.log('URL DENTRO DE API SALES',url)
  let resp = [];
  try {
    await fetch(url, {
      method: 'GET',
      redirect: 'follow',
    })
      .then(res => res.json())
      .catch(error => console.error('Error en RESPUESTA API LOGIN', error))
      .then(response => {
        console.log('dentro del API GET SALES');
        console.log(response);
        resp = response;
      });
    return resp;
  } catch (error) {
    console.error('ERROR EN API GET SALES', error);
    return (response = []);
  }
};

//make this component available to the app
export default SalesApi;
