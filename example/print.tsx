import React from 'react';
import ReactToPrint, {PrintContextConsumer} from 'react-to-print';

/*
	requires react-to-print to be installed
	npm i react-to-print
	https://www.npmjs.com/package/react-to-print

	also outcoment any global styles to prevent them from affecting the print
*/ 

export const ComponentToPrint = React.forwardRef((props, ref) => {
	return (
		<section ref={ref} style={{
				width: "210mm",
				height: "297mm",
    			// padding: "0",
				// margin: "0",
			}} className={"print-container"}>
			{props.children}
		</section>
	);
});

export default class PrintPDFFeature extends React.PureComponent {
	render() {
		return (
			<>
				<ReactToPrint
					trigger={() => {
						return <a href="#">Print this out!</a>;
					}}
					content={() => this.componentRef}
				/>
				<ComponentToPrint ref={el => (this.componentRef = el)}>{this.props.children}</ComponentToPrint>
			</>
		);
	}
}