import React from "react";

interface IRuleLineProps {
	size: number;
	bits: boolean[];
}

interface IRuleLineState {
}

export class RuleLine extends React.Component<IRuleLineProps, IRuleLineState> {

	state: IRuleLineState = {};

	render() {
		return (
			<div style={{
				height: this.props.size + 'px',
				whiteSpace: 'pre',
			}}
			>{this.renderLine(this.props.bits)}</div>
		);
	}

	renderLine(line: boolean[]) {
		return line.map((el, index) => {
			return <div
				key={'cell' + index}
				style={{
					width: this.props.size + 'px',
					height: this.props.size + 'px',
					display: 'inline-block',
					backgroundColor: el ? 'black' : 'white !important',
				}}/>;
		});
	}

}
