
type Tags = {
	github?: boolean;
	website?: boolean;
}

interface PortfolioItemProps {
	title: string;
	description: string;
	learned: string[];
	// technologies: string[];
	tags?: Tags;
}

interface PortfolioProps {
	portfolio: PortfolioItemProps[];
}

function PortfolioItem({
	item,
	legend,
	dictionary,
}: {
	item: PortfolioItemProps;
	legend?: LegendItem[];
	dictionary?: any;
}) {

	const findLegendItem = (tag: string): LegendItem => {
		const keys = legend?.map(name => name.name.toLowerCase());
		const index = keys?.indexOf(tag.toLowerCase());
		return legend ? legend[index] : null;
	}

	const type = item.spec ? item.spec.type : null;
	const organisationLine = item.spec.organization ? ("by " + item.spec.organization) : "";
	const dateLine = item.spec.date ? ("on " + item.spec.date) : "";

	return (
		<li className={"portfolio-item"}>
			<header>
				<hgroup>
					<h3>{item.title}</h3>
					{item?.spec && (
						<p>
							{type} {organisationLine} {dateLine}
						</p>
					)}
				</hgroup>
				<div>
				{item.tags && (
					<ul className={"tag-list"}>
						{Object.keys(item.tags).map((tag, index) => (

							<LegendItem
								item={findLegendItem(tag)}
								dictionary={dictionary}
								key={index}
							/>
						))}
					</ul>
				)}
				</div>
			</header>
			<main>
				<p>{item.description}</p>
				<ul>
					{item.learned.map((item, index) => (
						<li key={index}>{item}</li>
					))}
				</ul>
			</main>
		</li>
	);
}

interface LegendItem {
	name: string;
	icon: string;
	explanation: string;
	link: string;
}

function LegendItem({
	item,
	dictionary,
}: {
	item: LegendItem;
	dictionary?: any;
}) {
	return (
		<li className={"link-tag"}>
			<a href={item.link}>
				<img src={item.icon} alt={item.explanation} />
				<div>
					<p>{dictionary.availbilility + " " + item.name}</p>
					<address>{item.link}</address>

				</div>
			</a>
		</li>
	);
}

function Legend({
	items,
	dictionary,
}: {
	items: LegendItem[];
	dictionary?: any;
}) {
	return (
		<figcaption>
			<ul>
				{items.map((item, index) => (
					<LegendItem
						item={item}
						key={index}
						dictionary={dictionary}
					/>
				))}
			</ul>
		</figcaption>
	);
}

export default function Portfolio({
	portfolio,
	portfolioLinks,
	dictionary,
}: {
	portfolio: PortfolioProps;
	portfolioLinks: LegendItem[];
	dictionary: any;
}) {
	return (
		<section className={"portfolio"}>
			<h2>{dictionary.portfolio}</h2>
			<figure>
			<ul>
				{portfolio.map((item, index) => (
					<PortfolioItem 
						key={index}
						item={item}
						legend={portfolioLinks}
						dictionary={dictionary}
					/>
					))}
			</ul>
			<Legend
				items={portfolioLinks}
				dictionary={dictionary}
			/>
			</figure>
		</section>
	);
}