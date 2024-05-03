import React from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Directorio from "./Directorio";
import Perfil from './Perfil';
import EditarDatos from "./EditarDatos";
import Ayuda from "./Ayuda"


const LoginStack = () => {
	const Stack = createStackNavigator();
	
	return (
		<View style={styles.navigation}>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Perfil" 
						component={Perfil} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Directorio" 
						component={Directorio} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Editar Datos" 
						component={EditarDatos} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Ayuda" 
						component={Ayuda} 
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
