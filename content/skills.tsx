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

const Skill = (props: Skill) => {
	const {
		name,
		icon,
		level,
	} = props;

	return (
		<div className="skill infoLine">
			<div className="skill-icon">
				<img src={icon} alt={"skill-icon-" + name} />
			</div>
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

function printLevel(skills: Skill[], level: SkillLevel) {
	return (
		<div className={"level level-" + level}>
			<span className={"experience"}>{levelName(level) + ":" }</span>
			<div className="skills-list">
			{skills.map((skill, index) => (
				<Skill {...skill} key={index} />
			))}
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
  
	return (
		<div className={group}>
			<h3>{group}</h3>
			{levels.map(level => {
			const skillsAtLevel = skills.filter(skill => skill.level === level);
			return printLevel(skillsAtLevel, level as SkillLevel);
			})}
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
		<div className="skills">
			<h2>Skills</h2>
			{printSkills(languages, "Languages")}
			{printSkills(technologies, "Technologies")}
			{printSkills(tools, "Tools")}
		</div>
	);
}

export default Skills;