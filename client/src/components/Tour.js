import React, { Component } from "react";
import { Disque } from "./Disque.js";

export class Tour extends Component {
	constructor(props) {
		super(props);
		this.canvasRef = React.createRef();
	}
	componentDidMount() {
		//this.draw();
	}
	draw() {
		const canvas = this.canvasRef.current;
		console.log(canvas.getAttribute("id"));
		var ctx = canvas.getContext("2d");
		this.draw_cylinder(ctx, 140, 40, 20, 300);
	}
	draw_cylinder(ctx, x, y, w, h) {
		var i, xPos, yPos, pi = Math.PI, twoPi = 2 * pi;
		ctx.beginPath();
		for (i = pi; i < twoPi; i += 0.001) {
			xPos = (x + w / 2) - (w / 2 * Math.cos(i));
			yPos = (y + h / 8) + (h / 8 * Math.sin(i));
			if (i === 0) {
			    ctx.moveTo(xPos, yPos);
			} else {
			    ctx.lineTo(xPos, yPos);
			}
		}
		ctx.moveTo(x, y + h / 8);
		ctx.lineTo(x, y + h - h / 8);

		ctx.moveTo(x + w, y + h / 8);
		ctx.lineTo(x + w, y + h - h / 8);
		ctx.lineTo(x, y + h - h / 8);

		ctx.stroke();
	}
	render() {
		return (
			<div className="tour" id={this.props.index}>
				<h2>Tour {this.props.index === "0" ? "D" : (this.props.index === "1" ? "I" : "A")}</h2>
				<canvas ref={this.canvasRef} width="300" height="600" id={"canvas" + this.props.index}></canvas>
				<div>
					{this.props.disques.map((idDisque, placeTour) => <Disque key={idDisque.toString()} canvasParent={this.canvasRef} place={placeTour} index={idDisque}/>)}
				</div>
			</div>
		);
	}
}