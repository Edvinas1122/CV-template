enum SkillLevel {
	Beginner,
	Intermediate,
	Advanced,
	Expert,
}

type Skill = {
	name: string;
	icon: string;
	level: SkillLevel;
}

const SkillLevelDisplay = ({
	level,
}: {
	level: SkillLevel;
}) => {

	// const levelNum = SkillLevel[level];

	return (
		<div className="skill-level">
			<p>
				{level}
			</p>
		</div>
	);
}


function levelDisplay(level: SkillLevel) {
	let count;
	switch (level) {
		case SkillLevel.Beginner:
		count = 1;
		break;
		case SkillLevel.Intermediate:
		count = 2;
		break;
		case SkillLevel.Advanced:
		count = 3;
		break;
		case SkillLevel.Expert:
		count = 4;
		break;
		default:
		count = 0;
	}
	const symbols = Array.from({ length: count }, (_, i) => (
		<span key={i} className={`color-${i + 1}`}>
			●
		</span>
	));
	
	return <>{symbols}</>;
}

function levelName(level: SkillLevel, dictionary?: any) {
	switch (level) {
		case SkillLevel.Beginner:
			return dictionary?.beginner ? dictionary.beginner : "Beginner";
		case SkillLevel.Intermediate:
			return dictionary?.intermediate ? dictionary.intermediate : "Intermediate";
		case SkillLevel.Advanced:
			return dictionary?.advanced ? dictionary.advanced : "Advanced";
		case SkillLevel.Expert:
			return dictionary?.expert ? dictionary.expert : "Expert";
		default:
			return "";
	}
}

const Skill = (props: Skill & {children: React.ReactNode, displayIcon?: boolean}) => {
	const {
		name,
		icon,
		level,
		children,
		displayIcon,
	} = props;

	const displayIconDefault = displayIcon ?? true;

	return (
		<dd className={"skill-tag " + "level-" + level}>
			{children}
			<div className={"skill"}>
				{displayIconDefault && (<div className="skill-icon">
					<div className="blend-layer"/>
					<img src={icon} alt={"skill-icon-" + name} />
				</div>)}
				<div className={"skill-name-box"}>
					<p className="skill-name">{name}</p>
				</div>
			</div>
		</dd>
	);
}

function groupByLevel(skills: Skill[]): {[level: string]: Skill[]} {
	return skills.reduce((acc, skill) => {
		if (!acc[skill.level]) {
			acc[skill.level] = [];
		}
		acc[skill.level].push(skill);
		return acc;
	}, {} as {[level: string]: Skill[]});
}

function printSkills(skills: Skill[], group: string, key?: string) {
	const groupedSkills = groupByLevel(skills);
	const levels = Object.values(
		skills.reduce((acc, skill) => {
			acc[skill.level] = skill.level;
			return acc;
		}, {} as {[key: string]: SkillLevel})
	)
	.sort((a, b) => b - a);

	return (

			<dl className={group} key={key}>
				<dt>{group}</dt>
				<div className="skills-list">
				{levels.map(level => (
					<div className={"level-group level-group-" + level} key={"level-"+level}>
						{groupedSkills[level].map((skill, index) => (
							<Skill {...skill} key={"skill-"+index+level}>
								{index === 0 && (
									<div className="group-tag" key={"group-tag-"+level+index}>
										<p className={"experience"}>{levelDisplay(level)}</p>
										<div className="group-marker-begin"></div>
									</div>
								)}
								{index === groupedSkills[level].length - 1 && (
									<div className="group-marker" key={"group-marker-"+level+index}>
										<div className="group-marker-vis"></div>
									</div>
								)}
							</Skill>
						))}
					</div>
				))}
				</div>
			</dl>
	);
}

const Legend = ({
	dictionary,
	maxItems,
}: {
	dictionary?: any,
	maxItems?: number,
}) => {
	return (
		<ol className="legend">
			{Object.values(SkillLevel)
			.slice(0, maxItems).sort((a, b) => b - a)
			.map((level) => {
				if (levelName(level) === "") {
					return null;
				}
				return (
					<li className={"legend-item-"+level} key={level}>
						<p className="experience-name">{levelName(level, dictionary)}</p>
						<p className="experience-display">{levelDisplay(level)}</p>
					</li>
				);
			})}
		</ol>
	);
};

interface Skills {
	[key: string]: Skill[];
}

import { capitalizeFirstLetter } from "../utils/stringFunctions";

const Skills = ({
	categories,
	dictionary,
} : {
	categories: Skills;
	dictionary?: any;
}) => {

	return (
	  <section className="skills description-block">
		<h2>{dictionary?.skills ?? "Skills"}</h2>
		<figure>
		  {Object.keys(categories).map((categoryKey, index) => (
			printSkills(categories[categoryKey], dictionary[categoryKey] ?? capitalizeFirstLetter(categoryKey), "category-"+index)
		  ))}
		  <figcaption>
			<Legend dictionary={dictionary} maxItems={7} />
		  </figcaption>
		</figure>
	  </section>
	);
  };

export default Skills;