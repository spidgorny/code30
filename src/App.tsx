import React from 'react';
import './App.css';

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
			}, 10);
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
					<div key={'row' + index} style={{
						height: this.size + 'px',
						whiteSpace: 'pre',
					}}
					>{this.renderLine(index, line)}</div>
				)}
			</div>
		);
	}

	renderLine(row: number, line: boolean[]) {
		return line.map((el, index) => {
			return <div
				key={'cell' + row + '.' + index}
				style={{
					width: this.size + 'px',
					height: this.size + 'px',
					display: 'inline-block',
					backgroundColor: el ? 'black' : 'white !important',
				}}/>;
		});
	}

}

export default App;
