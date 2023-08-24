import "../timeline.css";

interface BranchProps {
	label: string,
	start_time: string,
	end_time: string,
	start: Number,
	width: Number,
}


const EventBranch = ({
	event,
	color,
	under,
} : {
	event : BranchProps,
	color : string,
	under? : boolean,
}) => {

	const className = under ? "under" : "over";

	return (
		<div className={"event " + event.label} style={{
				left: event.start + "%",
				width: event.width + "%",
		}}>
			<div className={"box " + className} style={{
				borderColor: color,
			}}>
				<span className="label">{event.start_time}</span>
				<span className="label">{event.label}</span>
				<span className="label">{event.end_time}</span>
			</div>
		</div>
	);
}

import { OccupationContent } from "./CVContent";

const calculateWidth = (startDate: string, endDate: string, minDate: string, maxDate: string) => {
	const start = new Date(startDate).getTime();
	const end = new Date(endDate).getTime();
	const min = new Date(minDate).getTime();
	const max = new Date(maxDate).getTime();
  
	const totalRange = max - min;
	const occupiedRange = end - start;
  
	return (occupiedRange / totalRange) * 100;
};

const calculateStart = (startDate: string, minDate: string, maxDate: string) => {
	const start = new Date(startDate).getTime();
	const min = new Date(minDate).getTime();
	const max = new Date(maxDate).getTime();
  
	const totalRange = max - min;
	const occupiedRange = start - min;

	return (occupiedRange / totalRange) * 100;
}

const findBeginDate = (occupations: OccupationContent[]) => {
	let beginDate = "9999-99-99";
	occupations.forEach((occupation) => {
		if (occupation.fromDate < beginDate) {
			beginDate = occupation.fromDate;
		}
	});
	return beginDate;
}

const findEndDate = (occupations: OccupationContent[]) => {
	let endDate = "0000-00-00";
	occupations.forEach((occupation) => {
		if (occupation.toDate > endDate) {
			endDate = occupation.toDate;
		}
	});
	return endDate;
}

const Timeline = ({
	occupations,
}: {
	occupations: OccupationContent[],
}) => {

	const beginDate = findBeginDate(occupations);
	const endDate = findEndDate(occupations);

	return (
		<div className="timeline_display">
			<div className="timeline">
				{occupations.map((occupation) => {
					const width = calculateWidth(occupation.fromDate, occupation.toDate, beginDate, endDate);
					const start = calculateStart(occupation.fromDate, beginDate, endDate);
					const color = occupation.occupationType === 'education' ? 'red' : 'blue';
					const under = occupation.occupationType === 'education';
					return (
						<EventBranch
							event={{
								label: occupation.title,
								start_time: occupation.fromDate,
								end_time: occupation.toDate,
								start: start,
								width: width,
							}}
							color={color}
							under={under}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default Timeline;