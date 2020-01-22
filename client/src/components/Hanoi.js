import React, { Component } from "react";
import { Tour } from "./Tour.js";
import { ParamForm } from "./ParamForm.js";

export class Hanoi extends Component {
	constructor(props) {
		super(props);
		this.state = {disques: [
									[], //Disques de la tour de départ
									[], //Disques de la tour intermédiaire
									[]  //Disques de la tour d'arrivée
								]
					};
	}
	startGame = async (nb_disks) => {
		//Initialize the disks
		console.log("Let's start the game with " + nb_disks + " disks !");
		var disques_ini = [
			[...Array(parseInt(nb_disks, 10)).keys()].reverse(),
			[],
			[]
		];
		this.setState((state, props) => ({disques: disques_ini}));
		await this.timeout(50);
		//Instanciate an array who will store the moves
		this.moves = [];
		//Fill the moves
		this.hanoi_recursif(this.state.disques[0].length, 0, 2, 1);
		console.log(this.moves.length);
		//Play the moves computed, slowly
		for(var i=0; i<this.moves.length; i++) {
			this.move_disk(this.moves[i][0], this.moves[i][1]);
			await this.timeout(1000);
		}
	}
	hanoi_recursif(n, D, A, I) {
		if(n !== 0) {
			this.hanoi_recursif(n-1, D, I, A);
			this.moves.push([D, A]);
			this.hanoi_recursif(n-1, I, A, D);
		}
	}
	move_disk = (D, A) => {
		var new_disques = this.state.disques.slice();
		var disk_to_move = new_disques[D].pop();
		new_disques[A].push(disk_to_move);
		this.setState((state, props) => ({disques: new_disques}));
	}
	timeout(ms) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}
	render() {
		return (
			<div>
				<ParamForm start={this.startGame}/>
				<Tour index="0" disques={this.state.disques[0]}/>
				<Tour index="1" disques={this.state.disques[1]}/>
				<Tour index="2" disques={this.state.disques[2]}/>
			</div>
		);
	}
}