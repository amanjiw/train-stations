import { useEffect } from "react";
import { useMap } from "react-leaflet";

//TYPES
import type { TTrain } from "../types/Trains";

// ## =>

function MapFocus({ selectedTrain }: { selectedTrain: TTrain | null }) {
	const map = useMap();

	useEffect(() => {
		if (selectedTrain) {
			map.setView(
				[selectedTrain.lat, selectedTrain.lng],
				18, // zoom
				{ animate: true }
			);
		}
	}, [selectedTrain, map]);

	return null;
}

export default MapFocus;
