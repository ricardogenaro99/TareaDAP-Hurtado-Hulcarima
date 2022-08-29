import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import SelectDropdown from "react-native-select-dropdown";
import CuisinesList from "../components/CuisinesList";
import RestaurantsList from "../components/RestaurantsList";
import RESTAURANTS from "../data/restaurants.json";
import CustomButton from "../shared/components/CustomButton";
import CustomInputSearch from "../shared/components/CustomInputSearch";
import {
	borderRadiusGlobal,
	colorPrimary,
	colorWhite,
	fontSizeGlobal,
	marginVertical_M,
	marginVertical_S,
	minHeigthGlobal
} from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialSelect = {
	borough: "",
	cuisine: "",
};
const HomeScreen = ({ navigation }) => {
	const [boroughs, setBoroughs] = useState([]);
	const [cuisines, setCuisines] = useState([]);
	const [select, setSelect] = useState(initialSelect);
	const [searchId, setSearchId] = useState("");

	const [count, setCount] = useState(0);

	const cuisinesDropdownRef = useRef();

	useEffect(() => {
		const allBoroughs = RESTAURANTS.map((e) => e.borough);
		const depuratedBoroughs = allBoroughs.filter((item, index) => {
			return allBoroughs.indexOf(item) === index;
		});
		setBoroughs(depuratedBoroughs);
	}, []);

	useEffect(() => {
		if (select.borough) {
			const resBoroughFilter = RESTAURANTS.filter((e) => e.borough === select.borough);
			const cuisinesDrop = new Set(resBoroughFilter.map((e) => e.cuisine));

			if (select.cuisine) {
				const resCuisineFilter = resBoroughFilter.filter(
					(e) => e.cuisine === select.cuisine,
				);
				setCount(resCuisineFilter.length);
				return;
			}

			cuisinesDropdownRef.current.reset();
			setCuisines([...cuisinesDrop]);
			setCount(resBoroughFilter.length);
		}
	}, [select]);

	const handleSearch = () => {
		if (searchId.trim().length !== 0) {
			const pos = RESTAURANTS.findIndex((e) => e.restaurant_id === searchId);

			if (pos === -1) {
				showMessage({
					message: "No se encontro un restaurante con este Id",
					type: "danger",
				});
				return;
			}
			navigation.navigate("restaurant", { restaurant_id: searchId });
			setSearchId("");
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerSearch}>
				<CustomInputSearch
					value={searchId}
					handleChange={setSearchId}
					width="74%"
					placeholder="Buscar por Id"
				/>
				<CustomButton text="Buscar" width="22%" handlePress={handleSearch} />
			</View>
			<SelectDropdown
				buttonStyle={styles.button}
				defaultButtonText="Selecciona un Barrio"
				data={boroughs}
				onSelect={(value) => {
					setSelect({ ...initialSelect, borough: value });
				}}
			/>
			<SelectDropdown
				ref={cuisinesDropdownRef}
				buttonStyle={styles.button}
				defaultButtonText="Selecciona un tipo de Cocina"
				data={cuisines}
				onSelect={(value) => {
					setSelect({ ...select, cuisine: value });
				}}
			/>
			<Text style={styles.text}>{count} resultados</Text>
			{!select.cuisine ? (
				<CuisinesList filters={select} navigation={navigation} />
			) : (
				<RestaurantsList filters={select} navigation={navigation} />
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		...screenSheet,
	},
	containerSearch: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	button: {
		height: minHeigthGlobal,
		borderRadius: borderRadiusGlobal,
		alignItems: "center",
		justifyContent: "center",
		borderColor: colorPrimary,
		borderWidth: 1,
		padding: 8,
		marginVertical: marginVertical_S,
		width: "100%",
		backgroundColor: colorWhite,
	},
	text: {
		fontSize: fontSizeGlobal,
		textAlign: "center",
		margin: "auto",
		marginVertical: marginVertical_M,
		color: colorPrimary,
	},
});
