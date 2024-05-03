
import React, { useState }  from 'react';
import TextInputIcon from "../DataInputs/TextInputIcon"
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

export default function SelectLanguage(props) {

  // Variables
  const [search, setsearch] = useState(props.valor)
  const [expand, setexpand] = useState(false)
  const [seleccion, setseleccion] = useState(props.seleccionado)
  const [idiomas, setidiomas] = useState([
    {
      text: "Campeche",
      id: "Asdf34fsadf"
    },
    {
      text: "Morales",
      id: "123jh41j23h"
    },
    {
      text: "Morelia",
      id: "242jl234kj"
    },
    {
      text: "Mexico",
      id: "242jfas4kj"
    }
  ])
  

  // Funciones 
  const itemSeleccionado = (item) => { 
    setexpand(false)
    setseleccion(true)
    setsearch(item.text)
    props.setValue(item)
  }


  // Contenido
  return (
    <View style={(expand || (!seleccion && search != "")) ? styles.filterSearchExpand : styles.filterSearch}>
      <TouchableOpacity onPress={() => setexpand(!expand)}>
        <TextInputIcon 
          placeholder={props.placeholder} 
          icon={props.icon} 
          setValue={setsearch}
          value={search}
        />
      </TouchableOpacity>
      {
        (expand || (!seleccion && search != "")) ? 
          <View>
            <ScrollView style={styles.scroll}>
              {
                idiomas.filter(i => ((i.text.toUpperCase().includes(search.toUpperCase()))) ).map( (item, key) => { 
                  return (
                    <TouchableOpacity key={key} style={styles.item} onPress={() => itemSeleccionado(item)}>
                      <Text style={styles.textItem}> {item.text} </Text>  
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        : 
        null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: 155,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "black"
  },
  filterSearchExpand: {
    height: 230,
    width: "50%",
    alignSelf: "flex-end" ,
  },
  filterSearch: {
    alignSelf: "flex-end" ,
    width: "50%",
    height: 70,
  },
  item: { 
    width: "100%",
    height: 50,
    justifyContent: "center"
  },
  textItem: { 
    fontWeight: "300",
    textAlign: "left",
    marginLeft: 25,
  }
});
