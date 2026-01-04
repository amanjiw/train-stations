import { create } from "zustand";

// DATA
import trains from "../data/trains.json";
import type { TTrain } from "@/types/Trains";

export const useFilter = create(
	(
		set
	): {
		filteredTrains: TTrain[];
		handleFilterTrains: (data: TTrain[]) => void;
	} => ({
		filteredTrains: trains,
		handleFilterTrains: (data: TTrain[]) => set({ filteredTrains: data }),
	})
);
