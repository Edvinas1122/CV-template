enum SkillLevel {
	Begginer,
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

function levelName(level: SkillLevel) {
	switch (level) {
		case SkillLevel.Begginer:
			return "Begginer";
		case SkillLevel.Intermediate:
			return "Intermediate";
		case SkillLevel.Advanced:
			return "Advanced";
		case SkillLevel.Expert:
			return "Expert";
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
		<div className={"skill-tag " + "level-" + level}>
            <div className={skillPropStyle}>
                {isFirst && levelName(level)}
            </div>
		<div className={"skill infoLine "}>
			<div className="skill-icon">
				<img src={icon} alt={"skill-icon-" + name} />
			</div>
			<div className={"skill-name-box"}>
				<p className="skill-name">{name}</p>
			</div>
		</div>
		</div>
	);
}

function printSkills(skills: Skill[], group: string) {
	const levels = Object.values(
		skills.reduce((acc, skill) => {
			acc[skill.level] = skill.level;
			return acc;
		}, {} as {[key: string]: SkillLevel})
	)
	.sort((a, b) => b - a);

	// Create metadata for each skill
	const skillMetadata = skills.map((skill, index) => {
		const isLast = index === skills.length - 1 || skills[index + 1].level !== skill.level;
		const isFirst = index === 0 || skills[index - 1].level !== skill.level;
		return {
			...skill,
			isFirst,
			isLast
		};
	});
	return (
		<div className={group}>
			<h3>{group}</h3>
			<div className="skills-list">
				{skillMetadata.map((skill, index) => (
					<Skill 
						{...skill} 
						key={index}
					/>
				))}
			</div>
		</div>
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
		</div>
	);
}

export default Skills;