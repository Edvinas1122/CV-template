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
	about: AboutProps,
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

interface OrganizationProps {
	name: string;
	logo?: string;
	website?: string;
}

const Organization = ({
	organization,
}:{
	organization: OrganizationProps,
}) => {
	return (
		<dd className={"organization"}>
			<div className={"organization_header"}>
				<span className={"name"}>{organization.name}</span>
			</div>
			{organization.website && organization.logo && (
				<div className={"organization_body"}>
					<a href={organization.website}>
						<img src={organization.logo} alt={"logo-" + organization.name} />
					</a>
				</div>
			)}
		</dd>
	);
}

const OccupationActivitiy = ({
	activity,
}:{
	activity: OccupationContent,
}) => {
	return (
		<div className={"occupation_activity"}>
		  <div className={"occupation_activity_header_box"}>
			<div className={"occupation_activity_header"}>
				<dt className={"title"}>{activity.title}</dt>
					<dd className={"date"}>
						<time>
							{activity.fromDate} - {activity.toDate}
						</time>
					</dd>
				</div>
				<div>
					{activity.organization?.name ? (
					<Organization
						organization={activity.organization}
					/>
					) : (<span>{activity.organization}</span>)}
				</div>
			</div>
		  <div className={"occupation_activity_body"}>
			<dd>
				<p>
					{activity.description}
				</p>
			</dd>
		  </div>
		</div>
	  );
}

function getGrouptTitle(group: OccupationType, dictionary?: any): string {
	switch (group) {
		case OccupationType.education:
			return dictionary?.education ? dictionary.education : "Education";
		case OccupationType.experience:
			return dictionary?.experience ? dictionary.experience : "Experience";
		case OccupationType.other:
			return dictionary?.other ? dictionary.other : "Other";
		default:
			return "";
	}
}

const GetOccupationContentGroup = ({
	group,
	content,
	dictionary,
}: {
	group: OccupationType;
	content: OccupationContent[];
	dictionary?: any;
}) => {

	const groupTitle: string = getGrouptTitle(group, dictionary);
	const contentGroup: OccupationContent[] = content.filter((item) => item.occupationType === group);

	if (contentGroup.length === 0) {
		return null;
	}
	return (
		<>
		<h2>{groupTitle}</h2>
		<dl>
			{contentGroup.map((item, index) => (
					<OccupationActivitiy
						activity={item}
						key={index}
					/>)
			)}
		</dl>
		</>
	);
};


export interface CVContentProps {
	occupation: OccupationContent[];
	list: ListContent[];
}

interface AboutProps {
    who: string;
    aspirations: string;
    background: string;
}

const About = ({
	about,
	dictionary,
}:{
	about: AboutProps,
	dictionary?: any,
}) => {

	return (
		<section className={"about"}>
			<h2>{dictionary?.about ? dictionary.about : "About"}</h2>
			<div className={"about_info"}>
				<div className={"about_info_who"}>
				<h3>
					{dictionary?.who ? dictionary.who : "Who am I?"}
				</h3>
				<p>{about.who}</p>
				</div>
				<div className={"about_info_aspirations"}>

				<h3>
					{dictionary?.aspirations ? dictionary.aspirations : "Aspirations"}
				</h3>
				<p>{about.aspirations}</p>
				</div>
				<div className={"about_info_background"}>
				<h3>
					{dictionary?.background ? dictionary.background : "Background"}
				</h3>
				<p>{about.background}</p>
				</div>
			</div>
		</section>
	);
}


const OccupationDisplay = ({
	occupation,
	dictionary,
}: {
	occupation: OccupationContent[];
	dictionary?: any;
}) => {
	const occupationTypesArray = Object.values(OccupationType);
  
	return (
		<section className={"occupation"}>
			{occupationTypesArray.map((item, index) => (
				<GetOccupationContentGroup
					key={index}
					group={item}
					content={occupation}
					dictionary={dictionary}
				/>
			))}
		</section>
	);
};


import Timeline from './timeline';

const CVContent = ({
	children,
	aside,
}: {
	children: React.ReactNode;
	aside?: React.ReactNode;
}) => {
	return (
		<main>
			{aside}
			<article className={"cv_content"}>
				{children}
			</article>
		</main>
	);
}

export default CVContent;
export { About, OccupationDisplay };