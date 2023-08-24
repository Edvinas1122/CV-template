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
		<div className="instant-messanging infoLine">
			{iconHTML}
			<p>{value}</p>
		</div>
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
		<div className="social infoLine">
			{iconHTML}
			<a href={link}>{value}</a>
		</div>
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
	} = address;

	const iconHTML = getFontAwesomeIcon("address");

	return (
		<div className="address infoLine">
			{iconHTML}
			<p>{country}, {city}, {postcode}, {street}, {house}, {flat}</p>
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
			<div className="phone infoLine">
				{phoneHTML}
				<p>{phone}</p>
			</div>
			<Address
				address={address}
			/>
			<div className="email infoLine">
				{emailHTML}
				<p>{email}</p>
			</div>
			<div className="website infoLine">
				{websiteHTML}
				<p>{website}</p>
			</div>
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
		<div className="contacts group">
			<h2>Contacts</h2>
			<h3>Basic</h3>
			<BasicContacts
				phone={phone}
				email={email}
				website={website}
				address={address}
			/>
			<div className="socials">
				<h3>Socials</h3>
				{socials.map((social, index) => (
					<Social
						key={index}
						name={social.name}
						value={social.value}
						link={social.link}
					/>
				))}
			</div>
			<div className="instant-messanging">
				<h3>Instant Messaging</h3>
				{instantMessanging.map((instantMessanging, index) => (
					<InstantMessanging
						key={index}
						name={instantMessanging.name}
						value={instantMessanging.value}
						icon={instantMessanging.icon}
					/>
				))}
			</div>
		</div>
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