import React from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from "./Login"
import CrearCuenta from "./CrearCuenta"


const LoginStack = () => {
	const Stack = createStackNavigator();
	
	return (
		<View style={styles.navigation}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen 
						name="Login" 
						component={Login} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Crear Cuenta" 
						component={CrearCuenta} 
						options={styles.StackScreens}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	)
}

const styles = StyleSheet.create({
  StackScreens: {
		title: '',
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
