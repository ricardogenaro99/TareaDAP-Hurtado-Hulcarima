import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { borderRadiusGlobal, colorWhite } from "../utils/constValues";
export default function CustomCard({
	children,
	onPress,
	width = "90%",
	backgroundColor = colorWhite,
}) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={{ ...styles.cardContainer, width, backgroundColor }}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		borderRadius: borderRadiusGlobal,
		paddingVertical: 30,
		paddingHorizontal: 25,
	},
});
