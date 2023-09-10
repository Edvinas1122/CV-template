"use client";

const templatedData = {
	header: {
		profile: {
			firstName: "Edvinas",
			lastName: "Momkus",
			image: "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F5f29da70-9f6a-4980-bf67-f9c0c54704db%252Fprofile.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75",
			title: "Full Stack Developer",
		},
		reside: {
			nationality: {title: "Lithuanian, EU", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg"},
			residence: {title: "Germany, Wolfsburg"},
			birthDate: {title: "1995-04-30"},
			humanLanguages: {type: "list", items: [
				{title: "English", level: "fluent"},
				{title: "Lithuanian", level: "native"},
				{title: "Russian", level: "fluent"},
			]},
		},
		contacts: {
			phone: "+49 (phone number)",
			email: "(your email)",
			website: "https://edvinasmomkus.com",
			address: {
				country: "Germany",
				city: "Wolfsburg",
				postcode: "post code",
				street: "your Str.",
				// house: 0, // house number
				// flat: 0, // flat number
				// room: 0, // room number (optional)
			},
		}
	},
	skills: {
		languages: [
			{
				name: "C++",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/cplusplus/cplusplus-plain.svg",
				level: 2,
			},
			{
				name: "C",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/c/c-plain.svg",
				level: 2,
			},
			{
				name: "PHP",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
				level: 2,
			},
			{
				name: "SQL",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg",
				level: 1,
			},
			{
				name: "Python",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/python/python-plain.svg",
				level: 0,
			},
			{
				name: "TypeScript",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/typescript/typescript-plain.svg",
				level: 1,
			},
			{
				name: "JSON",
				icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/JSON_vector_logo.svg/2560px-JSON_vector_logo.svg.png",
				level: 1,
			},
			{
				name: "Bash",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/bash/bash-original.svg",
				level: 1,
			},
			// {
			// 	name: "HTML",
			// 	icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/html5/html5-plain.svg",
			// 	level: 1,
			// },
			// {
			// 	name: "CSS",
			// 	icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/css3/css3-plain.svg",
			// 	level: 1,
			// },
		],
		technologies: [
			{
				name: "Node.js",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
				level: 0,
			},
			{
				name: "React",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original.svg",
				level: 0,
			},
			{
				name: "Next.js",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nextjs/nextjs-original.svg",
				level: 0,
			},
			{
				name: "NestJS",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg",
				level: 1,
			},
		],
		tools: [
			{
				name: "Git",
				icon: "https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/git/git-original.svg",
				level: 1,
			},
			{
				name: "Docker",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg",
				level: 1,
			},
			{
				name: "Linux",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg",
				level: 2,
			},
			{
				name: "VS Code",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
				level: 1,
			},
			// {
			// 	name: "NPM",
			// 	icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/npm/npm-original-wordmark.svg",
			// 	level: 0,
			// }
		],
		hardware: [			
			{
				name: "Arduino",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg",
				level: 2,
			},
			{
				name: "ESP32",
				icon: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Espressif_Logo.svg",
				level: 1,
			},
			{
				name: "Raspberry Pi",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/raspberrypi/raspberrypi-original.svg",
				level: 0,
			},
			{
				name: "3D Printing",
				icon: "https://cdn-icons-png.flaticon.com/512/3112/3112504.png",
				level: 0,
			}
		],
		cloud: [
			{
				name: "Firebase",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain.svg",
				level: 0,
			},
			{
				name: "Vercel",
				icon: "https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg",
				level: 0,
			},
		]
	},
	content: {
		about: {
			displayParagraphTags: false,
			defaultIndentation: true,
			paragraphIndentation: true,
			who: [
				`write about yourself here, define where you come from, not a country, and what you are doing now, what you are looking for, what you are interested in, what you are passionate about, what you are good at, what you are proud of, what you are working on, what you are learning, what you are looking for, what you are interested in, what you are passionate about, what you are good at, what you are proud of, what you are working on, what you are learning, what you are looking for, what you are interested in, what you are passionate about, what you are good at, what you are proud of, what you are working on, what you are learning, what you are looking for, what you are interested in, what you are passionate about, what you are good at, what you are proud of, what you are working on, what you are learning, what you are looking for, what you are interested in, what you are passionate about, what you are good at, what you are proud of, what you are working on, what you are learning`,
			],
			aspirations: [
				`here you write what you want to achieve and why you think you are a good candidate for an internship, what you can offer, what you can do,`,
			],
			background: [
				`here you write about your background, what you have done, what you have achiev and why you think you are a good candidate for an internship, what you can offer, what you can do,`,
			],
		},
		occupation: [
			{
				title: "Electrical Engineering",
				occupationType: "education",
				organization: {
					name: "Klaipėda University",
					logo: "https://www.ku.lt/assets/images/img-logo.svg",
					website: "https://www.ku.lt/en/",
				},
				fromDate: "Sep, date",
				toDate: "Jun, 2015",
				description: "Three years of studies in Electrical Engineering",
			},
			{
				title: "Entertainment & Creative Industries",
				occupationType: "education",
				organization: {
					name: "SMK University of Applied Social Sciences",
					logo: "https://www.smk.lt/Theme/cpartner/assets/img/logo.png",
					website: "https://www.smk.lt/en/",
				},
				fromDate: "Sep, date",
				toDate: "Jun, 2018",
				description: "Two years of studies in Entertainment & Creative Industries",
			},
			{
				title: "Software Development",
				occupationType: "education",
				organization: {
					name: "42 Wolfsburg",
					logo: "https://wolfsburgplus.de/wp-content/uploads/2022/01/42wolfsburg_rectangle_black_transparantbg-1024x339.png",
					website: "https://www.42wolfsburg.de/",
				},
				fromDate: "Mar, date",
				toDate: "Member",
				description: `Within my time at "42 Wolfsburg", I reached an intermediate to advanced level in C/C++, PHP, Python, and JavaScript/TypeScript. I have hands-on experience with real-time operating systems and Unix/Linux programming, and I've become familiar with Full-Stack Web Development, including experience with Relational Databases, SQL, and various Back-end and Front-end Frameworks.`,
			},
		],
		portfolioLinks: [
			{
				name: "Github",
				link: "https://github.com/edvinas1122",
				icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
			},
			{
				name: "Website",
				link: "https://edvinasmomkus.com",
				icon: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Globe_icon.svg",
			},
		],
		portfolio: [
			{
				title: "Bicycle Share",
				spec: {
					type: "Hackathon",
					organization: "42 Wolfsburg",
					date: "May, 2022",
				},
				description: "In this hackathon, we were competing for a bicycle share journaling solution. Currently it is used daily by the school's community. It is a full-stack web application, that offers lending interface. It allows to retrieve a bicycle key from a micro-controller operated lockerbox.",
				learned: [
					"Full-Stack Web Development",
					"Microcontroller Programming",
					"Parallel Programming",
					"3D Modelling",
				],
				tags: {
					website: true,
					github: true,
				}
			},
			{
				title: "Transcendence",
				spec: {
					type: "42 Curriculum Project",
					// organization: "42 Wolfsburg",
				},
				description: "A final 42 Core project, evaluated by a staff memeber. Full-Stack Web Application, with a social network features, where users can compete in a game of ping-pong. Project challanges to implement a real-time competetive play instances, game ques, also handling chat types policies.",
				learned: [
					"Node frameworks",
					"ORM",
					"REST API",
					"Websockets",
					"Microservice Architecture",
					"OAuth2",
					"Event-Driven Programming",
				],
				tags: {
					github: true,
				}
			},
			{
				title: "WebServer",
				spec: {
					type: "42 Curriculum Project",
					// organization: "42 Wolfsburg",
				},
				description: "A non-blocking Web Server in C++ using Unix sockets, and event watchers like poll. Works in HTTP/1.1, protocol, can execute CGI scripts, serve static files. Project challanges to support concurent connections, within a single thread programming, and to implament a highly dynamic configuration file parser.",
				learned: [
					"Unix API",
					"Design Patterns",
					"Object-Oriented Programming",
					"TCP/IP",
				],
				tags: {
					github: true,
				}
			},
		],
		list: [
			
		],
	}
}

const dictionary = {
	technologies: "Web Frameworks",
	tools: "Tools",
	languages: "Programming Languages",
	occupation: "Career",
	education: "Education",
	experience: "Professional Experience",
	about: "Overview",
	who: "About Me",
	aspirations: "Goals",
	background: "Professional History",
	skills: "Competencies",
	beginner: "Foundational",
	expert: "Specialist",
	advanced: "Proficient",
	intermediate: "Competent",
	contacts: "Contact Information",
	// basic: "Fundamental",
	socials: "Social Media",
	instantMessanging: "Messaging Platforms",
	visa: "Visa Status",
	residence: "Residence",
	nationality: "Citizenship",
	birthDate: "Date of Birth",
	humanLanguages: "Languages",
	driverLicense: "Driver's License",
	portfolio: "Notable Projects & Hackathons",
	availbilility: "Available on",
}

import PrintPDFFeature from './print';

export default function Page() {

	return (
		<>
			<PrintPDFFeature>
				<CV
					data={templatedData}
					dictionary={dictionary}
				/>
				<div className="page-break" />
			</PrintPDFFeature>
		</>
	)
}