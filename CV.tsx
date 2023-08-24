import CVSideBar, {CVHeaderProps} from './header/header';
import CVContent, {CVContentProps} from './content/CVContent';
import Skills from './content/skills';
import "./CV.css";

interface CVProps {
	header: CVHeaderProps;
	content: CVContentProps;
}

import { Open_Sans } from 'next/font/google'

const sans = Open_Sans({ subsets: ['latin'] });



export default function CV({
	data
}: {
	data: CVProps
}) {

	return (
		<section className={"cv_page "
			+ sans.className
		}>
			<CVSideBar
				profile={data.header.profile}
				contacts={data.header.contacts}
				childern={
					<Skills
						languages={data.skills.languages}
						technologies={data.skills.technologies}
						tools={data.skills.tools}
					/>
				}
			/>
			<CVContent
				content={data.content}
			/>
		</section>
	);
}