import React from 'react'
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Promociones from "./Promociones"
import Detalle from "./Detalle"


const LoginStack = () => {
	const Stack = createStackNavigator();
	
	return (
		<View style={styles.navigation}>
			<NavigationContainer independent={true}>
				<Stack.Navigator>
					<Stack.Screen 
						name="Promociones" 
						component={Promociones} 
						options={styles.StackScreens}
					/>
					<Stack.Screen 
						name="Detalle Promoción" 
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
