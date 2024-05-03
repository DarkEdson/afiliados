import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Text } from 'react-native'
import Ionic from 'react-native-vector-icons/Ionicons'
import ColorPicker from 'react-native-wheel-color-picker'

const ColorPickerRead = (props) => {
	// Variables
	const [expand, setexpand] = useState(false)

	// Contenido
	return (
		<View style={expand ?  styles.textInputIconExpand : styles.textInputIcon}>
			<Ionic size={18} name={props.icon} style={styles.Icon} onPress={() => setexpand(!expand)}/>
			{ 
				expand ? 
					<View style={styles.seccionColor}> 
						<View style={styles.colorPicker}>
							<ColorPicker
								color={props.value}
								onColorChange={(val) => props.setValue(val)}
							/>
						</View>
					</View>
				: 
					<TextInput
						placeholderTextColor={'#4a4646'}
						style={styles.input}
						editable = {false}
						placeholder={props.placeholder}
						value={props.value}
					/>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	seccionColor: { 
		height: 500,
		width: "90%",
		alignSelf: "center",
	},
  colorPicker: {
    width: "90%",
    height: 400,
    alignSelf: "center",
  },
	btn: { 
		backgroundColor: '#F0D19A',
		width: '70%',
		marginLeft: '15%',
		marginTop: 50,
		height: 50,
		borderRadius: 15,
		justifyContent: 'center'
	},
	loginText: {
		color: 'white',
		alignSelf: 'center',
		fontWeight: "bold",
		fontSize: 18
	},
	textInputIconExpand: {
		width: '90%',
		marginLeft: '5%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
		borderBottomWidth: 0.2,
		borderColor: 'grey',
		marginTop: 10,
		marginBottom: 10,
  },


  textInputIcon: {
		width: '90%',
		marginLeft: '5%',
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

export default ColorPickerRead
