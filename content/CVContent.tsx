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

import { getFontAwesomeIcon } from "../utils/Icon";

const Organization = ({
	organization,
}:{
	organization: OrganizationProps,
}) => {
	return (
		<div className={"organization"}>
			<dd className={"organization_header"}>
				<span className={"name"}>{organization.name}</span>
			</dd>
			{organization.website && organization.logo && (
			<dd className={"organization_body"}>
				<a href={organization.website}>
					{getFontAwesomeIcon("link")}
				</a>
			</dd>
			)}
		</div>
	);
}

const OccupationActivitiy = ({
	activity,
}:{
	activity: OccupationContent,
}) => {
	return (
		<li className={"occupation_activity"}>
			<div className={"occupation_activity_body"}>
				<header className={"occupation_activity_header_box"}>
					<div className={"occupation_activity_header"}>
						<dt className={"title"}>
							<h3>
								{activity.title}
							</h3>
						</dt>
					</div>
				</header>
				<div>
					{activity.organization?.name ? (
					<Organization
						organization={activity.organization}
					/>
					) : (<span>{activity.organization}</span>)}
				</div>
			</div>
			<dd className={"date"}>
				<time>
					{activity.fromDate}
				</time>
				{/* <p>-</p> */}
				<time>
					{activity.toDate}
				</time>
			</dd>
		</li>
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
			<header>
				<h2>{groupTitle}</h2>
			</header>
		<dl>
			<ol>
			{contentGroup.map((item, index) => (
				<OccupationActivitiy
				activity={item}
				key={index}
				/>)
				)}
			</ol>
		</dl>
		</>
	);
};


export interface CVContentProps {
	occupation: OccupationContent[];
	list: ListContent[];
}

type InlineTextProps = {
	paragraphs: string[];
}

interface AboutProps {
	displayParagraphTags?: boolean;
    who: InlineTextProps;
    aspirations: InlineTextProps;
    background: InlineTextProps;
}

const ParagraphInterpretation = ({ paragraph }: { paragraph: string }) => {
	const strongPieces = paragraph.split('**');
	return (
		<p>
			{strongPieces.map((strongPiece, strongIndex) => {
				if (strongIndex % 2 !== 0) return <strong key={strongIndex}>{strongPiece}</strong>;
	
				const emPieces = strongPiece.split('*');
					return emPieces.map((emPiece, emIndex) => (
						emIndex % 2 === 0 ? emPiece : <em key={emIndex}>{emPiece}</em>
				));
			})}
		</p>
	);
}


const InlineText = ({
	paragraphs,
}:{
	paragraphs: string[],
}) => {
	return (
		<section className={"inline-block"}>
			{paragraphs.map((paragraph, index) => (
				<ParagraphInterpretation
					paragraph={paragraph}
					key={index}
				/>
			))}
		</section>
	);
}

const About = ({
	about,
	dictionary = {},
  }: {
	about: AboutProps;
	dictionary?: any;
  }) => {
	const displayParagraphTags = about.displayParagraphTags ?? true;
	const indentSecondParagraph = !about.defaultIndentation ?? true;
	const indentedText = about.paragraphIndentation ?? true;

	const points = [
	  { key: "who", defaultTitle: "Who am I?" },
	  { key: "aspirations", defaultTitle: "Aspirations" },
	  { key: "background", defaultTitle: "Background" },
	];

	let explanations = [];

	function matchExplanation(paragraph: string): string {
		function cleanExplanation(explanation: string) {
			return explanation.replace(/^\*\(|\)\*$/g, '');
		}
		
		function removeExplanation(input: string): string {
			return input.replace(/\(([^)]+?)\)\*\(([^)]+?)\)\*/g, '$1');
		}
	
		const regex = /\(([^)]+?)\)\*\(([^)]+?)\)\*/g;
		let matches;
		while ((matches = regex.exec(paragraph)) !== null) {
			explanations.push({
				term: cleanExplanation(matches[1]),
				explanation: cleanExplanation(matches[2]),
			});
			console.log(matches);
		}
		return removeExplanation(paragraph);
	}


	return (
		<section className={`about ${indentedText ? "indeted_text" : ""}`}>
		<h2>{dictionary?.about ?? "About"}</h2>
		<div className={"about_info"}>
		  {points.map(({ key, defaultTitle }, index) => (
			about[key] && (
			  <div className={`about_info_${key} ${index % 2 === 1 && indentSecondParagraph ? 'indent' : ''}`} key={key}>
				{displayParagraphTags && (<h3>{dictionary[key] ?? defaultTitle}</h3>)}
				<InlineText paragraphs={about[key].map(matchExplanation)} />
			  </div>
			)
		  ))}

		  {explanations.length > 0 && (
			<div className={"about_info_explanations"}>
			  <dl>
				{explanations.map((explanation, index) => (
				  <div key={index}>
					<dt>{explanation.term}</dt>
					<dd>{explanation.explanation}</dd>
				  </div>
				))}
			</dl>
			</div>
		  )}	
		</div>
	  </section>
	);
};


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