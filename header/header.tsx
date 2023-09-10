import { getFontAwesomeIcon } from "../utils/Icon";

type ContactsType = {
	phone: string;
	email: string;
	website: string;
	address: Address;
	socials: Social[];
	instantMessanging: InstantMessanging[];
}

type InstantMessanging = {
	name: string;
	value: string;
	icon: string;
}

type Address = {
	country: string;
	city: string;
	postcode: string;
	street: string;
	house: Number;
	flat: Number;
	room: Number;
}

type Social = {
	name: string;
	value: string;
	link: string;
	// icon: string;
}

type ProfileType = {
	firstName: string;
	lastName: string;
	image: string | {backgroundImage: string, frontImage: string};
	title: string;
}

interface CVHeaderProps {
	profile: ProfileType;
	contacts: ContactsType;
	childern?: React.ReactNode;
	dictionary?: any;
}

interface CVProps {
	header: CVHeaderProps;
}

import React from 'react';

const InstantMessanging: React.FC<InstantMessanging> = (props: InstantMessanging) => {
	const {
		name,
		value,
		icon,
	} = props;

	const iconHTML = getFontAwesomeIcon(name);
	return (
		<dd className="instant-messanging infoLine">
			{iconHTML}
			<p>{value}</p>
		</dd>
	);
}

const Social = (props: Social) => {
	const {
		name,
		value,
		link,
	} = props;

	const iconHTML = getFontAwesomeIcon(name);
	return (
		<dd className="social infoLine">
			{iconHTML}
			<a href={link}>{value}</a>
		</dd>
	);
}

import TintImage from "../content/TintImage";

const Profile = ({
	profile,
}: {
	profile: ProfileType,
}) => {
	const {
		firstName,
		lastName,
		image,
		title,
	} = profile;

	if (image?.backgroundImage && image?.frontImage) {

	}
	return (
		<header className="profile">
				<div className={"image-container"}>
				{
					image?.backgroundImage && image?.frontImage ? (
						<>
							<img src={image.frontImage} alt="profile image" className={"image front"}/>
							<img src={image.backgroundImage} alt="profile image" className={"image back"}/>
						</>
					) : (<img src={image} alt="profile image" className={"image"}/>)
				}
				</div>
				<hgroup className={
					"name-title"
				}>
					<h1>{firstName} {lastName}</h1>
					<p>{title}</p>
				</hgroup>
		</header>
	);
}

const Address = ({address}: {address: Address}) => {
	const {
		country,
		city,
		postcode,
		street,
		house,
		flat,
		room,
	} = address;

	const iconHTML = getFontAwesomeIcon("address");
	const href = `https://www.google.com/maps/place/${country}+${city}+${postcode}+${street}+${house}+${flat}`;
	const lastPiece = room ? `, ${flat}-${room}` : `, ${flat}`;

	return (
		<dd className="address infoLine">
			{iconHTML}
			<a href={href}>{country}, {city}, {postcode}, {street}, {house}, {lastPiece}</a>
		</dd>
	);
}

const BasicContacts = ({
	phone,
	email,
	website,
	address,
}: {
	phone: string;
	email: string;
	website: string;
	address: Address;
}) => {

	const phoneHTML = getFontAwesomeIcon("phone");
	const emailHTML = getFontAwesomeIcon("email");
	const websiteHTML = getFontAwesomeIcon("website");

	return (
		<address className="basic-contacts">
			<dd className="phone infoLine">
				{phoneHTML}
				<p>{phone}</p>
			</dd>
			<dd className="email infoLine">
				{emailHTML}
				<p>{email}</p>
			</dd>
			<Address
				address={address}
			/>
			{/* <dd className="website infoLine">
				{websiteHTML}
				<a href={website}>{website}</a>
			</dd> */}
		</address>
	);
}

const Contacts = ({
	contacts,
	dictionary,
}: {
	contacts: ContactsType,
	dictionary?: any,
}) => {
	const {
		phone,
		email,
		website,
		address,
		socials,
		instantMessanging,
	} = contacts;

	return (
		<footer className="contacts description-block">
			<h2>{dictionary?.contacts ? dictionary.contacts : "Contacts"}</h2>
			<dl>
			{ dictionary?.basic ? (<dt>{dictionary.basic}</dt>): null}
			<BasicContacts
				phone={phone}
				email={email}
				website={website}
				address={address}
			/>
			{/* <dt>{dictionary?.socials ? dictionary.socials : "Socials"}</dt>
			<address className="socials">
				{socials.map((social, index) => (
					<Social
						key={index}
						name={social.name}
						value={social.value}
						link={social.link}
					/>
				))}
			</address>
			<dt>{dictionary?.instantMessanging ? dictionary.instantMessanging : "Instant Messanging"}</dt>
			<address className="instant-messanging">
				{instantMessanging.map((instantMessanging, index) => (
					<InstantMessanging
						key={index}
						name={instantMessanging.name}
						value={instantMessanging.value}
						icon={instantMessanging.icon}
					/>
				))}
			</address> */}
			</dl>
		</footer>
	);
}

const CVSideBar = ({
	children
}: {
	children: React.ReactNode;
}) => {
  return (
    <aside className={"cv_header"}>
      {children}
    </aside>
  );
}


export default CVSideBar;
export { Profile, Contacts };
export type { CVProps, CVHeaderProps, ProfileType, ContactsType, Address, Social, InstantMessanging };