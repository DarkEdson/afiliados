import React from 'react'
import { StyleSheet, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionic from 'react-native-vector-icons/Ionicons'

// Tas
import Inicio from "./Inicio/Inicio"
import Promociones from "./Promociones/Index"
import Productos from "./Productos/Index"
import Ubicaciones from "./Ubicaciones/Index"
import Ventas from "./Ventas/Ventas"
import Perfil from "./Perfil/Index"

const Home = () => {
	const Tab = createMaterialBottomTabNavigator();

	return (
		<View style={styles.navigation}>
			<NavigationContainer>
				<Tab.Navigator
					initialRouteName="Inicio"
					activeColor="black"
					inactiveColor='#8c8c8c'
					barStyle={{
						alignSelf: 'stretch',
						height: 55,
						backgroundColor: '#fff',
						alignItems: 'center',
						borderRadius: 0,
						elevation: 7,
						shadowOffset: {width: 1, height: 1},
						shadowColor: '#333',
						shadowOpacity: 0.6,
						shadowRadius: 2,
					}}
				>
					<Tab.Screen
						name="Inicio"
						component={Inicio}
						options={{
							tabBarLabel: 'Inicio',
							tabBarIcon: () => (
								<Ionic size={18} name="home" />
							),
						}}
					/>
					<Tab.Screen
						name="Promociones"
						component={Promociones}
						options={{
							tabBarLabel: 'Promos',
							tabBarIcon: () => (
								<Ionic size={18} name="scan-circle" />
							),
						}}
					/>
					<Tab.Screen
						name="Productos"
						component={Productos}
						options={{
							tabBarLabel: 'Productos',
							tabBarIcon: () => (
								<Ionic size={18} name="md-receipt-outline" />
							),
						}}
					/>
					<Tab.Screen
						name="Ubicaciones"
						component={Ubicaciones}
						options={{
							tabBarLabel: 'Ubicacion',
							tabBarIcon: () => (
								<Ionic size={18} name="location-sharp" />
							),
						}}
					/>
					<Tab.Screen
						name="Ventas"
						component={Ventas}
						options={{
							tabBarLabel: 'Ventas',
							tabBarIcon: () => (
								<Ionic size={18} name="cash-sharp" />
							),
						}}
					/>
					<Tab.Screen
						name="Perfil"
						component={Perfil}
						options={{
							tabBarLabel: 'Perfil',
							tabBarIcon: () => (
								<Ionic size={18} name="md-person" />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</View>
	)
}

const styles = StyleSheet.create({
  navigation: {
		width: '100%',
		height: '100%',
		backgroundColor: "white"
  },
});


export default Home
