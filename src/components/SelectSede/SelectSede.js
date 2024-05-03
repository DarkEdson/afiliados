
import React, { useState , useEffect}  from 'react';
import TextInputIcon from "../DataInputs/TextInputIcon"
import {Text, View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

export default function SelectSede(props) {

  useEffect(() => {
    console.log('PROPS', props.sedes[0].labels)
  }, [])

  // Variables
  const [search, setsearch] = useState("")
  const [idiomas, setidiomas] = useState(props.sedes)
  const [expand, setexpand] = useState(false)
  

  // Funciones 
  const itemSeleccionado = (item) => { 
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
              {
                idiomas.filter(i => ((i.labels[0].name.toUpperCase().includes(search.toUpperCase()))) ).map( (item, key) => { 
                  return (
                    <TouchableOpacity key={key} style={styles.item} onPress={() => itemSeleccionado(item)}>
                      <Text style={styles.textItem}> {item.labels[0].name} </Text>  
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
