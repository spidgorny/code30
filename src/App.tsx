import React from 'react';
import './App.css';
import {RuleLine} from "./RuleLine";

interface AppState {
	lines: boolean[][];
}

class App extends React.Component {

	readonly size = 4;

	readonly rules = {
		'111': false,
		'110': false,
		'101': false,
		'100': true,
		'011': true,
		'010': true,
		'001': true,
		'000': false,
	}

	state: AppState = {
		lines: [
			[true]
		],
	}

	componentDidMount() {
		this.addTwoLines();
	}

	async addTwoLines() {
		let maxLines = document.body.clientWidth / this.size / 2;
		console.log('maxLines', maxLines);
		for (let i = 0; i < maxLines; i++) {
			await this.slow();
		}
	}

	async slow() {
		return new Promise((resolve, reject) => {
			setTimeout(async () => {
				await this.addLine();
				resolve();
				window.scrollTo(0, this.size * this.state.lines.length);
			}, 1);
		});
	}

	async addLine() {
		return new Promise((resolve, reject) => {
			const lastLine = [false].concat(this.state.lines[this.state.lines.length - 1]).concat([false]);
			const linePlus: boolean[] = [];
			for (let i = 0; i < lastLine.length; i++) {
				const set1 = lastLine[i - 1] ? 1 : 0;
				const set2 = lastLine[i + 0] ? 1 : 0;
				const set3 = lastLine[i + 1] ? 1 : 0;
				const set = set1 + '' + set2 + '' + set3;
				// @ts-ignore
				const value = this.rules[set];
				linePlus.push(value);
				// console.log(set);
			}
			// console.log(linePlus.join(','));
			this.setState((state: AppState) => ({
				lines: state.lines.concat([linePlus]),
			}), resolve);
		});
	}

	render() {
		// console.log('lines', this.state.lines.length);
		return (
			<div className="App">
				{this.state.lines.map((line, index) =>
					<RuleLine bits={line} key={'row' + index} size={this.size}/>
				)}
			</div>
		);
	}

}

export default App;
