import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import RESTAURANTS from "../data/restaurants.json";
import CustomCard from "../shared/components/CustomCard";
import { fontSizeGlobal } from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const DetailItem = ({ label, value }) => {
	return (
		<View style={styles.viewRow}>
			<Text style={[styles.text, styles.textBold]}>{label}</Text>
			<Text style={styles.text}>{value}</Text>
		</View>
	);
};

const ConsultScreen = ({ route }) => {
	const [restaurant, setRestaurant] = useState();

	useEffect(() => {
		const restaurant_id = route.params?.restaurant_id;
		if (restaurant_id) {
			const res = RESTAURANTS.find((e) => e.restaurant_id === restaurant_id);
			setRestaurant(res);
		}
	}, []);

	return restaurant ? (
		<View style={styles.container}>
			<CustomCard backgroundColor="transparent">
				<DetailItem label="Id:" value={restaurant?.restaurant_id} />
				<DetailItem label="Nombre:" value={restaurant.name} />
				<DetailItem label="Calle:" value={restaurant?.address?.street} />
				<DetailItem label="Edificio:" value={restaurant?.address?.building} />
				<DetailItem
					label="Código Postal:"
					value={restaurant?.address?.zipcode}
				/>
				<DetailItem label="Barrio:" value={restaurant?.borough} />
				<DetailItem label="Cocina:" value={restaurant?.cuisine} />

				<View style={{ ...styles.viewRow, flexDirection: "column" }}>
					<Text style={[styles.text, styles.textBold]}>
						Grados: (Grado - Puntaje - Fecha )
					</Text>
					{restaurant.grades.map((e, i) => (
						<View key={i} style={{ marginBottom: 10, paddingLeft: 2 }}>
							<Text style={styles.text}>
								🗓️ {new Date(e?.date?.$date).toLocaleDateString("en-US")}
							</Text>
							<Text style={{ ...styles.text, paddingLeft: 15 }}>
								{`Grade: ${e?.grade}  -  Score: ${e?.score}`}
							</Text>
						</View>
					))}
				</View>
			</CustomCard>
		</View>
	) : (
		<Text style={styles.text}>Ocurrio un error</Text>
	);
};

export default ConsultScreen;

const styles = StyleSheet.create({
	container: {
		...screenSheet,
		justifyContent: "center",
	},
	text: {
		margin: 1,
		fontSize: fontSizeGlobal,
	},
	textBold: {
		fontWeight: "bold",
	},
	viewRow: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginVertical: 5,
	},
});
