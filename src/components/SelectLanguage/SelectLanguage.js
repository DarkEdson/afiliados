
import React, { useState, useEffect }  from 'react';
import TextInputIcon from "../DataInputs/TextInputIcon"
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

export default function SelectLanguage(props) {

  useEffect(() => {
    console.log('en useeffect select',props.idiomas)
  }, [])
  // Variables
  const [search, setsearch] = useState("")
  const [idiomas, setidiomas] = useState(props.idiomas)
  const [expand, setexpand] = useState(false)
  

  // Funciones 
  const itemSeleccionado = (item) => { 
    console.log('item a enviar al otro nivel', item)
    setexpand(false)
    setsearch(item.name)
    props.setValue(item)
  }


  // Contenido
  return (
    <View style={expand ? styles.filterSearchExpand : styles.filterSearch}>
      <TouchableOpacity onPress={() => setexpand(!expand)}>
        <TextInputIcon 
          placeholder={props.placeholder} 
          icon={props.icon} 
          setValue={setsearch}
          value={search}
        />
      </TouchableOpacity>
      {
        expand ? 
          <View>
            <ScrollView style={styles.scroll}>
              {console.log(idiomas)}
              {
                idiomas.filter(i => ((i.name.toUpperCase().includes(search.toUpperCase()))) ).map( (item, key) => { 
                  return (
                    <TouchableOpacity key={key} style={styles.item} onPress={() => itemSeleccionado(item)}>
                      <Text style={styles.textItem}> {item.name} </Text>  
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
