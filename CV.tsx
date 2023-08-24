import CVHeader, {CVHeaderProps} from './header/header';
import CVContent, {CVContentProps} from './content/CVContent';
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
			<CVHeader
				profile={data.header.profile}
				contacts={data.header.contacts}
			/>
			<CVContent
				content={data.content}
			/>
		</section>
	);
}