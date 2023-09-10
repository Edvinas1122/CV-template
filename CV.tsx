import CVSideBar, {CVHeaderProps, Profile, Contacts} from './header/header';
import CVContent, {CVContentProps, About, OccupationDisplay} from './content/CVContent';
import Skills from './content/skills';
import Portfolio from './content/portfolio';
import "./CV.css";

interface CVProps {
	header: CVHeaderProps;
	content: CVContentProps;
}

import { Open_Sans } from 'next/font/google'

const sans = Open_Sans({ subsets: ['latin'] });

const LanguageItem = ({ title, level }) => {
	// You can add additional conditions or logic here
	return (
	  <li>
		<strong>{title}</strong>: {level}
	  </li>
	);
  };

const LanguagesList = ({ languages }) => {
	if (!languages || !languages.items || languages.items.length === 0) {
	  return null;
	}
  
	return (
		<ul style={{
			listStyle: "circle",
			marginLeft: "1rem",
		}}>
		  {languages.items.map((language, index) => (
			<LanguageItem key={index} title={language.title} level={language.level} />
		  ))}
		</ul>
	);
  };

const ResideDetail = ({ item }: {item :any}) => {
	const icon = item.icon ? item.icon : null;
	const value = item.value ? item.value : null;
	const title = item.title ? item.title : null;

	if (!title) {
		if (item.type === "list") {
			return <LanguagesList languages={item} />;
		}
		return null;
	}
	return (
		<>
			{title}
			{value} 
			{icon ? <img src={icon} alt={title} className={
				"inline-block h-4 ml-1"
			} /> : null}
		</>
	);
}

const ResideDetails = ({
	resideInfo,
	dictionary,
}: {
	resideInfo: any,
	dictionary?: any,
}) => {
	if (!resideInfo) {
		return null;
	}

	return (
		<section className="reside-details">
			<ul className={"flex flex-col text-xs"}>
			{Object.entries(resideInfo).map(([key, value]) => (
				<li key={key}>
					<strong>{dictionary[key] ? dictionary[key] : key}:</strong> <ResideDetail item={value} />
				</li>
			))}
			</ul>
		</section>
	);
}

export default function CV({
	data,
	dictionary,
}: {
	data: CVProps,
	dictionary: any,
}) {

	return (
		<article className={"cv_page "
			+ sans.className
		}>
			<Profile profile={data.header.profile} />
			<CVContent
				aside={
					<CVSideBar>
						<ResideDetails
							resideInfo={data.header.reside}
							dictionary={dictionary}
						/>
						<Skills
							categories={data.skills}
							dictionary={dictionary}
						/>
						<Contacts
							contacts={data.header.contacts}
							dictionary={dictionary}
						/>
					</CVSideBar>
				}
			>
				<About
					about={data.content.about}
					dictionary={dictionary}
				/>
				<OccupationDisplay
					occupation={data.content.occupation}
					dictionary={dictionary}
				/>
				<Portfolio
					portfolio={data.content.portfolio}
					portfolioLinks={data.content.portfolioLinks}
					dictionary={dictionary}

				/>
			</CVContent>
		</article>
	);
}