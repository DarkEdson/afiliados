import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons'

const TextAreaInputIcon = (props) => {
	return (
		<View style={styles.textInputIcon}>
			<Ionic size={18} name={props.icon} style={styles.Icon}/>
			<TextInput
				placeholderTextColor={'#4a4646'}
				style={styles.input}
				multiline={true}
				numberOfLines={10}
				placeholder={props.placeholder}
				onChangeText={val => props.setValue(val)}
				value={props.value}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
  textInputIcon: {
		width: '90%',
		marginLeft: '5%',
		height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
		borderRadius: 16,
    backgroundColor: '#17101219',
		borderBottomWidth: 0.2,
		borderColor: 'grey',
		marginTop: 10,
		marginBottom: 10
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

export default TextAreaInputIcon
