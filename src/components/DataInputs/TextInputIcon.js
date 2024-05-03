import React from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import {Icon} from '@rneui/themed';

const TextInputIcon = props => {
  return (
    <View style={styles.textInputIcon}>
      <Ionic size={18} name={props.icon} style={styles.Icon} />

      <TextInput
        autoCapitalize={props.autoCapitalize}
        placeholderTextColor={'#4a4646'}
        style={styles.input}
        editable={props.editable}
        placeholder={props.placeholder}
        onChangeText={val => props.setValue(val)}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInputIcon: {
    width: '90%',
    marginLeft: '5%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#17101219',
    borderBottomWidth: 0.2,
    borderColor: 'grey',
    marginTop: 10,
    marginBottom: 10,
  },
  Icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: '#17101200',
    color: '#424242',
  },
});

export default TextInputIcon;
