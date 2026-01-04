export type TTrain = {
	id: number;
	name: string;
	city: string;
	lat: number;
	lng: number;
};

export interface TTrainListProps {
	handleListItemClick: (vehicle: Vehicle) => void;
	selectedTrain: Vehicle | null;
	trains: TTrain[];
	itemRef: any;
}

export interface TTrainItemProps {
	onClick: () => void;
	isActive: boolean;
	train: TTrain;
	ref: any;
}
