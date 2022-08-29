import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Loader from "react-native-modal-loader";
import CustomButton from "../shared/components/CustomButton";
import CustomCard from "../shared/components/CustomCard";
import CustomInput from "../shared/components/CustomInput";
import { colorPrimary } from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialForm = {
	email: "",
	password: "",
};
const AuthDefScreen = ({
	navigateScreen,
	textButton,
	textNavigate,
	action,
	isLoading = false,
}) => {
	const [form, setForm] = useState(initialForm);

	const handlePress = async () => {
		if (isValid()) {
			console.log(form);
			await action(form);
			setForm(initialForm);
		}
	};

	const isValid = () => {
		return !(
			form.email.trim().length === 0 || form.password.trim().length === 0
		);
	};

	return (
		<View style={styles.container}>
			<Loader loading={isLoading} color={colorPrimary} />
			<CustomCard>
				<CustomInput
					value={form.email}
					handleChange={(value) => setForm({ ...form, email: value })}
					placeholder="ejemplo@correo.xyz"
				/>
				<CustomInput
					value={form.password}
					handleChange={(value) => setForm({ ...form, password: value })}
					secureTextEntry={true}
					placeholder="*****************"
				/>
				<CustomButton text={textButton} handlePress={handlePress} />
				<Text style={styles.text} onPress={navigateScreen}>
					{textNavigate}
				</Text>
			</CustomCard>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...screenSheet,
		justifyContent: "center",
	},
	text: {
		color: colorPrimary,
		textAlign: "center",
		fontWeight: "bold",
		margin: 3,
	},
});

export default AuthDefScreen;
