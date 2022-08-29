import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomCard from "../shared/components/CustomCard";
import { fontSizeGlobal, marginVertical_S } from "../shared/utils/constValues";

const RestaurantCard = ({ restaurant, navigation }) => {
	const { name, restaurant_id } = restaurant;

	const handlePress = () => {
		navigation.navigate("restaurant", { restaurant_id });
	};

	return (
		<View style={styles.container}>
			<CustomCard onPress={handlePress} width="100%">
				<View style={{ flexDirection: "row" }}>
					<Text style={{ fontSize: 30, marginRight: 5 }}>🍽️</Text>
					<View>
						<Text style={{ ...styles.text, fontWeight: "bold" }}>
							{restaurant_id}
						</Text>
						<Text style={styles.text}>{name}</Text>
					</View>
				</View>
			</CustomCard>
		</View>
	);
};

export default RestaurantCard;

const styles = StyleSheet.create({
	container: {
		marginVertical: marginVertical_S,
	},
	text: {
		fontSize: fontSizeGlobal,
	},
});
