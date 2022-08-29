import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import {
	HomeScreen,
	LoginScreen,
	RegisterScreen,
	ConsultScreen
} from "./app/screens";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login">
				<Stack.Screen
					name="login"
					component={LoginScreen}
					options={{ title: "Iniciar Sesión", headerTitleAlign: "center" }}
				/>
				<Stack.Screen
					name="register"
					component={RegisterScreen}
					options={{ title: "Crear Cuenta", headerTitleAlign: "center" }}
				/>
				<Stack.Screen
					name="search"
					component={HomeScreen}
					options={{ title: "Búsqueda", headerTitleAlign: "center" }}
				/>
				<Stack.Screen
					name="restaurant"
					component={ConsultScreen}
					options={{ title: "Consulta", headerTitleAlign: "center" }}
				/>
			</Stack.Navigator>
			<FlashMessage position="center" statusBarHeight={55} />
		</NavigationContainer>
	);
}
