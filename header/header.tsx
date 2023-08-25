import { getFontAwesomeIcon } from "../utils/Icon";

type Contacts = {
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

type Profile = {
	firstName: string;
	lastName: string;
	image: string;
	title: string;
}

interface CVHeaderProps {
	profile: Profile;
	contacts: Contacts;
	childern?: React.ReactNode;
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
		<li className="social infoLine">
			{iconHTML}
			<a href={link}>{value}</a>
		</li>
	);
}

const Profile = ({profile}: {profile: Profile}) => {
	const {
		firstName,
		lastName,
		image,
		title,
	} = profile;
	return (
		<div className="profile">
			<div style={{
				marginBottom: '40px'
			}}>
				<div className={"image-container"}>
				<img src={image} alt="profile image"/>
				</div>
				<div className={
					"name-title"
				}>
					<h1>{firstName} {lastName}</h1>
					<p>{title}</p>
				</div>
			</div>
		</div>
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
		<div className="address infoLine">
			{iconHTML}
			<a href={href}>{country}, {city}, {postcode}, {street}, {house}, {lastPiece}</a>
		</div>
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
		<div className="basic-contacts">
			<dd className="phone infoLine">
				{phoneHTML}
				<p>{phone}</p>
			</dd>
			<Address
				address={address}
			/>
			<dd className="email infoLine">
				{emailHTML}
				<p>{email}</p>
			</dd>
			<dd className="website infoLine">
				{websiteHTML}
				<a href={website}>{website}</a>
			</dd>
		</div>
	);
}

const Contacts = ({contacts}: {contacts: Contacts}) => {
	const {
		phone,
		email,
		website,
		address,
		socials,
		instantMessanging,
	} = contacts;

	return (
		<section className="contacts group">
			<h2>Contacts</h2>
			<dl>
			<dt>Basic</dt>
			<BasicContacts
				phone={phone}
				email={email}
				website={website}
				address={address}
			/>
				<dt>Socials</dt>
			<div className="socials">
				{socials.map((social, index) => (
					<Social
						key={index}
						name={social.name}
						value={social.value}
						link={social.link}
					/>
				))}
			</div>
			<dt>Instant Messaging</dt>
			<div className="instant-messanging">
				{instantMessanging.map((instantMessanging, index) => (
					<InstantMessanging
						key={index}
						name={instantMessanging.name}
						value={instantMessanging.value}
						icon={instantMessanging.icon}
					/>
				))}
			</div>
			</dl>
		</section>
	);
}

const CVSideBar = ({
	profile,
	contacts,
	childern,
}: CVHeaderProps
) => {
	return (
		<div className={"cv_header"}>
			<Profile
				profile={profile}
				/>
			{childern}
			<Contacts
				contacts={contacts}
				/>
		</div>
	);
}

export default CVSideBar;
export type { CVProps, CVHeaderProps, Profile, Contacts, Address, Social, InstantMessanging };