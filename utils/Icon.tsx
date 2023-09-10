
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPhone,
	faEnvelope,
	faGlobe,
	faLocationDot,
	faExternalLinkAlt
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
	"link": faExternalLinkAlt,
};

export const getFontAwesomeIcon = (social: string) => {
    // Convert the input to lowercase
    const lowerCaseSocial = social.toLowerCase();

    // Find the correct key in the iconMap (case-insensitive)
    const matchedKey = Object.keys(iconMap).find(
        key => key.toLowerCase() === lowerCaseSocial
    );

    const icon = matchedKey ? iconMap[matchedKey as keyof typeof iconMap] : null;

    if (!icon) {
        return null;
    }

    return (
        <>
            <FontAwesomeIcon
                icon={icon}
                style={{}}
            />
        </>
    );
};