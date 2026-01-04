import { useEffect, useRef, useState } from "react";

// TYPES
import type { TTrain } from "../types/Trains";

const useMapView = () => {
	const [mapCenter, setMapCenter] = useState<[number, number]>([53.55, 10.0]);
	const [mapZoom, setMapZoom] = useState(12);
	const [selectedTrain, setSelectedTrain] = useState<TTrain | null>(null);

	const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

	useEffect(() => {
		if (selectedTrain) {
			const ref = itemRefs.current[selectedTrain.id];
			if (ref) {
				ref.scrollIntoView({ behavior: "smooth", block: "center" });
			}
		}
	}, [selectedTrain]);

	const handleListItemClick = (vehicle: TTrain) => {
		setSelectedTrain(vehicle);
		setMapCenter([vehicle.lat, vehicle.lng]);
		setMapZoom(18);
	};

	return {
		open,
		mapZoom,
		itemRefs,
		mapCenter,
		selectedTrain,
		setSelectedTrain,
		handleListItemClick,
	};
};

export default useMapView;
