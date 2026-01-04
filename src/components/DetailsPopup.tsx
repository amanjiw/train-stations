import { Popup } from "react-leaflet";

import type { TTrain } from "../types/Trains";

const DetailsPopup = ({ name, city }: Partial<TTrain>) => {
	return (
		<Popup>
			<strong>{name}</strong>
			<br />
			{city}
		</Popup>
	);
};

export default DetailsPopup;
