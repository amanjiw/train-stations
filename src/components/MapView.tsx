"use client";

/////////////////////////////////////////////////////////////////

import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

// HOOKS
import useMapView from "../hooks/useMapiew";

// COMPONENTS
import MapFocus from "./MapFocus";
import VehicleList from "./TrainList";

// DATA
import trains from "../data/trains.json";

// STYLES
import "leaflet/dist/leaflet.css";
import { useFilter } from "@/store/useFilter";

// Default SVG marker
const defaultMarkerIcon = new L.Icon({
	iconUrl:
		"data:image/svg+xml;base64," +
		btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="skyblue" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
    `),
	iconSize: [22, 22], // Size of the icon
	iconAnchor: [16, 32], // Anchor point of the icon
	popupAnchor: [0, -22], // Anchor point for the popup
});

// fill="skyblue" stroke="darkblue"

// Selected SVG marker (red color)
const selectedMarkerIcon = new L.Icon({
	iconUrl:
		"data:image/svg+xml;base64," +
		btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="skyblue" stroke="darkblue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-check-inside-icon lucide-map-pin-check-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><path d="m9 10 2 2 4-4"/></svg>
    `),
	iconSize: [32, 32], // Size of the icon
	iconAnchor: [16, 32], // Anchor point of the icon
	popupAnchor: [0, -32], // Anchor point for the popup
});

// ## =>

export default function MapView() {
	const {
		mapZoom,
		itemRefs,
		mapCenter,
		selectedTrain,
		setSelectedTrain,
		handleListItemClick,
	} = useMapView();

	const filteredTrains = useFilter((state) => state.filteredTrains);

	return (
		<div className="flex h-screen">
			<VehicleList
				trains={trains}
				handleListItemClick={handleListItemClick}
				itemRef={itemRefs}
				selectedTrain={selectedTrain}
			/>

			<div className="w-3/4">
				<MapContainer
					center={mapCenter}
					zoom={mapZoom}
					style={{ height: "100%", width: "100%" }}
					scrollWheelZoom={true}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution="&copy; OpenStreetMap contributors"
					/>
					<MapFocus selectedTrain={selectedTrain} />
					{filteredTrains.map((vehicle) => (
						<Marker
							key={vehicle.id}
							position={[vehicle.lat, vehicle.lng]}
							icon={
								selectedTrain?.id === vehicle.id
									? selectedMarkerIcon // Red icon for selected marker
									: defaultMarkerIcon // Default icon for others
							}
							eventHandlers={{
								click: () => setSelectedTrain(vehicle),
							}}
						></Marker>
					))}
				</MapContainer>
			</div>
		</div>
	);
}
