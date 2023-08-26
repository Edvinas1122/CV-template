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

interface SkillsProps {
	languages: Skill[];
	technologies: Skill[];
	tools: Skill[];
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
	switch (level) {
		case SkillLevel.Beginner:
		  return "●";
		case SkillLevel.Intermediate:
		  return "●●";
		case SkillLevel.Advanced:
		  return "●●●";
		case SkillLevel.Expert:
		  return "●●●●";
		default:
		  return "";
	}
}

function levelName(level: SkillLevel) {
	switch (level) {
		case SkillLevel.Beginner:
			return "Beginner";
		case SkillLevel.Intermediate:
			return "Intermediate";
		case SkillLevel.Advanced:
			return "Advanced";
		case SkillLevel.Expert:
			return "Expert";
		default:
			return "";
	}
}

const Skill = (props: Skill & { isFirst: boolean, isLast: boolean }) => {
	const {
		name,
		icon,
		level,
		isFirst,
		isLast,
	} = props;

	const skillPropStyle = "experience " + (isLast ? "last" : ""); 

	return (
		<dd className={"skill-tag " + "level-" + level}>
            {/* <div className={skillPropStyle}>
                {isFirst && levelDisplay(level)}
            </div> */}
		<div className={"skill"}>
			<div className="skill-icon">
				<img src={icon} alt={"skill-icon-" + name} />
			</div>
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

function printSkills(skills: Skill[], group: string) {
	// // Create metadata for each skill
	// const skillMetadata = skills.map((skill, index) => {
	// 	const isLast = index === skills.length - 1 || skills[index + 1].level !== skill.level;
	// 	const isFirst = index === 0 || skills[index - 1].level !== skill.level;
	// 	return {
	// 		...skill,
	// 		isFirst,
	// 		isLast
	// 	};
	// });
	const groupedSkills = groupByLevel(skills);
	const levels = Object.values(
		skills.reduce((acc, skill) => {
			acc[skill.level] = skill.level;
			return acc;
		}, {} as {[key: string]: SkillLevel})
	)
	.sort((a, b) => b - a);

	return (

			<dl className={group}>
				<dt>{group}</dt>
				<div className="skills-list">
					{/* {skillMetadata.map((skill, index) => (
						<Skill 
						{...skill} 
						key={index}
						/>
						))} */}
				{levels.map(level => (
					<div className={"level-group level-group-" + level} key={level}>
						<div className="group-tag">
							<p className={"experience"}>{levelDisplay(level)}</p>
							<div className="group-marker-begin"></div>
						</div>
						{groupedSkills[level].map((skill, index) => (
							<Skill {...skill} key={index} />
							))}
						<div className="group-marker">
							{/* <p className={"experience"}>{levelName(level)}</p> */}
							<div className="group-marker-vis"></div>
						</div>
					</div>
				))}
				</div>
			</dl>

	);
}

const Legend = () => {
	return (
		<ol className="legend">
			{Object.values(SkillLevel).map((level) => {
				return (
					<li className="legend-item infoLine" key={level}>
						<p className="experience-display">{levelDisplay(level)}</p>
						<p className="experience-name">{levelName(level)}</p>
					</li>
				);
			})}
		</ol>
	);
}

const Skills = (props: SkillsProps) => {
	const {
		languages,
		technologies,
		tools,
	} = props;

	return (
		<div className="skills group">
			<h2>Skills</h2>

			{printSkills(languages, "Languages")}
			{printSkills(technologies, "Technologies")}
			{printSkills(tools, "Tools")}
			<Legend />
		</div>
	);
}

export default Skills;