import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { firebaseAuth } from "../../config/firebase";
import AuthDefScreen from "../components/AuthDefScreen";

const LoginScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);

	const navigateScreen = () => {
		navigation.navigate("register");
	};

	const action = async ({ email, password }) => {
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(firebaseAuth, email, password);
			showMessage({
				message: "Usuario autenticado",
				type: "success",
			});
			navigation.navigate("search");
		} catch (e) {
			showMessage({
				message: e.message,
				type: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthDefScreen
			navigateScreen={navigateScreen}
			textButton="Iniciar sesión"
			textNavigate="Quiero registrarme"
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
