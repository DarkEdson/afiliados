import React from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Ubicaciones from "./Ubicaciones"
import Detalle from "./Detalle"


const LoginStack = (props) => {
	const Stack = createStackNavigator();

	// console.log(props.route.params.sede)
	
	return (
		<View style={styles.navigation}>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Ubicaciones" 
						component={Ubicaciones} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Detalle Ubicación" 
						component={Detalle} 
						options={styles.StackScreens}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}

const styles = StyleSheet.create({
  StackScreens: {
		backgroundColor: 'red',
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  },
	navigation: {
		width: '100%',
		height: '100%'
  },
});

export default LoginStack;
