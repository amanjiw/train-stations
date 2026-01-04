import { useDeferredValue, useEffect, useMemo, useState, type FC } from "react";

// COMPONENTS
import TrainItem from "./TrainItem";
import { CircleX } from "lucide-react";

// TYPES
import type { TTrainListProps } from "@/types/Trains";
import { useFilter } from "@/store/useFilter";

// ## =>

const VehicleList: FC<TTrainListProps> = ({
	handleListItemClick,
	selectedTrain,
	trains,
	itemRef,
}) => {
	const [query, setQuery] = useState("");
	const deferredQuery = useDeferredValue(query);
	const filter = useFilter((state) => state);

	const filteredItems = useMemo(() => {
		return trains.filter((item) =>
			item.city.toLowerCase().includes(deferredQuery.toLowerCase())
		);
	}, [trains, deferredQuery]);

	useEffect(() => {
		filter?.handleFilterTrains(filteredItems);
	}, [filteredItems]);

	const removeFilter = () => {
		setQuery("");
	};

	return (
		<div className="w-1/4 shadow-lg border-3 border-t-0 border-b-0 border-blue-300 flex flex-col items-center">
			<div className="px-4 py-5 shadow-lg bg-blue-300 text-gray-800 w-full text-center">
				<h2 className="text-xl font-boldx ">Vehicle list</h2>

				<div className="flex items-center mt-5 gap-3">
					<input
						className="w-full border h-12 rounded-md bg-gray-50 px-3 pb-1 outline-0"
						placeholder="search for train"
						onChange={(e) => setQuery(e.target.value)}
						value={query}
					/>
					<CircleX
						className="text-gray-600 hover:scale-110 transition-all "
						size={40}
						onClick={removeFilter}
					/>
				</div>
			</div>

			<div className="overflow-y-auto w-full p-4 no-scrollbar">
				{filter.filteredTrains.map((train) => (
					<TrainItem
						key={train.id}
						ref={(el: any) => {
							itemRef.current[train.id] = el;
						}}
						isActive={selectedTrain?.id === train.id}
						onClick={() => handleListItemClick(train)}
						train={train}
					/>
				))}
			</div>
		</div>
	);
};

export default VehicleList;
