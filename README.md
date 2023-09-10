# CV nextjs
## Example

![https://raw.githubusercontent.com/Edvinas1122/CV-template/master/example/cv-preview-example.png](https://raw.githubusercontent.com/Edvinas1122/CV-template/master/example/cv-preview-example.png)

## How to use

You can run in NextJS or React environment

### Dependencies

- ReactPDF print (for saving your html as PDF)
- TS runtime

### Configuration

See example file to edit texts, icons, hyperlinks.

```tsx
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
```

Also project uses nested dictionary for easy translations or on demand adjustments

```tsx
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
```

Pass adjusted configuration into a CV component

```tsx
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
```

### More configurations

You can adjust the CV.css file for styling adjustments

but also if needed you can request me for edits, fixes.
