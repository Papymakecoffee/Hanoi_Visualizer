import React, { Component } from "react";

export class Tour extends Component {
	render() {
		return (
			<g>
				<path d={`M ${this.props.index * 400 + 50} 500 h300 q20 0 20 -20 q0 -20 -20 -20 h-300 q-20 0 -20 20 q0 20 20 20`} fill="transparent" stroke="red"/>
				<path d={`M ${this.props.index * 400 + 190} 460 v-400 q0 -10 10 -10 q 10 0 10 10 v400`} fill="transparent" stroke="red"/>
			</g>
		);
	}
}