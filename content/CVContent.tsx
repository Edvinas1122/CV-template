type Education = {
	name: string;
	degree: string;
	startDate: string;
	endDate: string;
}

type Experience = {
	name: string;
	role: string;
	startDate: string;
	endDate: string;
}

interface CVContentProps {
	education: Education[],
	experience: Experience[],
}

enum PresentableSectionType {
	occupation = "occupation",
	list = "list",
}

enum OccupationType {
	education = "education",
	experience = "experience",
	other = "other",
}

export interface OccupationContent {
	title: string;
	occupationType: OccupationType;
	organization?: string;
	fromDate: string;
	toDate: string;
	description: string;
}

interface ListContent {
	items: string[];
}

type PresentableContentProps = {
	occupation: OccupationContent[];
}

const OccupationActivitiy = ({
	activity,
}:{
	activity: OccupationContent,
}) => {
	return (
		<div className={"occupation_activity"}>
			<div className={"occupation_activity_header infoLine"}>
				<h3>{activity.title}</h3>
				<p>{activity.fromDate} - {activity.toDate}</p>
			</div>
			<div className={"occupation_activity_body"}>
				<p>{activity.description}</p>
			</div>
		</div>
	);
}

const GetOccupationContentGroup = ({
	group,
	content,
  }: {
	group: OccupationType;
	content: OccupationContent[];
  }) => {
	return (
	  <div>
		{content
			.filter((item) => item.occupationType === group)
			.map((item, index) => (
				<OccupationActivitiy
				activity={item}
				key={index}
				/>
			))
		}
	  </div>
	);
};


export interface CVContentProps {
	occupation: OccupationContent[];
	list: ListContent[];
}

import Timeline from './timeline';

const CVContent = ({
	content
}:{
	content: CVContentProps,
}) => {

	return (
		<div className={"cv_content"}>
			<Timeline
				occupations={content.occupation}
			/>
			<div className={"occupation"}>
				<h2>Education</h2>
				<GetOccupationContentGroup
					group={OccupationType.education}
					content={content.occupation}
				/>
				<h2>Experience</h2>
				<GetOccupationContentGroup
					group={OccupationType.experience}
					content={content.occupation}
				/>
			</div>
		</div>
	);
};

export default CVContent;