import React, { Component } from "react";

export class Disque extends Component {
	constructor(props) {
		super(props);
		this.rayon = (this.props.index + 1) * 14; 
	}
	render() {
		return (
			<path d={`M ${this.props.tourParent * 400 + 200} ${450 - this.props.place * 40} h ${this.rayon} q10 0 10 -10 q0 -10 -10 -10 h ${-this.rayon * 2} q-10 0 -10 10 q0 10 10 10 h ${this.rayon}`} stroke="blue"/>
		);
	}
}