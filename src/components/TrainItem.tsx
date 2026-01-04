import type { FC } from "react";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

// TYPES
import type { TTrainItemProps } from "@/types/Trains";
import { Building2, TrainFrontTunnel } from "lucide-react";

const TrainItem: FC<TTrainItemProps> = ({ ref, onClick, isActive, train }) => {
	return (
		<>
			{!isActive && (
				<div
					className="hover:scale-105 hover:shadow-lg transition-transform flex flex-col gap-3 text-gray-600 cursor-pointer w-full p-2 mb-2 border border-gray-200 rounded-lg shadow "
					ref={ref}
					onClick={onClick}
				>
					<div className="flex gap-2">
						<TrainFrontTunnel color="#006a97" />
						<strong>Station: {train?.name}</strong>
					</div>
					<div className="flex gap-2">
						<Building2 color="#006a97" />
						<p className="font-bold">City: {train?.city}</p>
					</div>
				</div>
			)}

			{isActive && (
				<div
					className="flex flex-col gap-3 cursor-pointer w-full p-2 mb-2 border-2 border-blue-200 rounded-lg  shadow"
					ref={ref}
					onClick={onClick}
				>
					<div className="flex gap-2">
						<TrainFrontTunnel color="#006a97" />
						<strong>Station: {train?.name}</strong>
					</div>
					<div className="flex gap-2">
						<Building2 color="#006a97" />
						<p className="font-bold">City: {train?.city}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default TrainItem;
