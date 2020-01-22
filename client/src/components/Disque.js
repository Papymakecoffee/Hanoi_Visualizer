import React, { Component } from "react";

export class Disque extends Component {
	componentDidMount() {
		//console.log(`indiceDisque : ${this.props.index} / place : ${this.props.place}`);
		//this.draw()
	}
	draw() {
		const canvas = this.props.canvasParent.current;
		console.log(`indiceDisque : ${this.props.index} / place : ${this.props.place} / ${canvas.getAttribute('id')}`);
		var ctx = canvas.getContext("2d");
		this.drawDisk(ctx, this.props.index + 1, this.props.place)
	}
	drawDisk(ctx, indexDisk, place) {
		ctx.beginPath();
		ctx.moveTo(150-indexDisk * 20, 300-place*10);
		ctx.lineTo(150+indexDisk * 20, 300-place*10);
		ctx.stroke();
	}
	render() {
		return (
			<div>
				<h4>Je suis le disque n°{this.props.index}</h4>
			</div>
		);
	}
}