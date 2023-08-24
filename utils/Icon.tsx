
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faEnvelope,
	faGlobe,
	faLocationDot,
}
from '@fortawesome/free-solid-svg-icons';

import {
	faLinkedin,
	faGithub,
	faWhatsapp,
	faSkype,
	faTelegram,
	faTwitter,
}
from '@fortawesome/free-brands-svg-icons';

enum Socials {
	LinkedIn = 'LinkedIn',
	Github = 'Github',
	Email = 'Email',
	Phone = 'Phone',
	Twitter = 'Twitter',
}

enum InstantMessanging {
	Telegram = 'Telegram',
	Skype = 'Skype',
	Whatsup = 'Whatsapp',
}

const iconMap = {
	[Socials.LinkedIn]: faLinkedin,
	[Socials.Github]: faGithub,
	[Socials.Email]: faEnvelope,
	[Socials.Phone]: faPhone,
	[Socials.Twitter]: faTwitter,
	[InstantMessanging.Telegram]: faTelegram,
	[InstantMessanging.Skype]: faSkype,
	[InstantMessanging.Whatsup]: faWhatsapp,
	"phone": faPhone,
	"email": faEnvelope,
	"website": faGlobe,
	"address": faLocationDot,
};

export const getFontAwesomeIcon = (social: string) => {

	const icon = iconMap[social as keyof typeof iconMap];

	if (!icon) {
		return null;
	}

	return (
		<>
			<FontAwesomeIcon
				icon={icon}
				style={{

				}}
			/>
		</>
	);
};