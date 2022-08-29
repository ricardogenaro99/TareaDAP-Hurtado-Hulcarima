import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import {
	borderRadiusGlobal,
	colorPrimary,
	colorWhite,
	fontSizeGlobal,
	marginVertical_S,
	minHeigthGlobal
} from "../utils/constValues";

export default function CustomInputSearch({
	value,
	handleChange,
	placeholder,
	autoCapitalize = "none",
	width = "100%",
}) {
	return (
		<View style={{ ...styles.container, width }}>
			<View style={styles.inputContainer}>
				<Ionicons name="search" size={24} color={colorPrimary} />
				<TextInput
					placeholder={placeholder}
					style={styles.textInput}
					value={value}
					onChangeText={handleChange}
					autoCapitalize={autoCapitalize}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colorWhite,
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		borderRadius: borderRadiusGlobal,
		marginVertical: marginVertical_S,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: colorPrimary,
		borderRadius: borderRadiusGlobal,
	},
	textInput: {
		paddingLeft: 10,
		flex: 1,
		height: minHeigthGlobal,
		fontSize: fontSizeGlobal,
	},
});
