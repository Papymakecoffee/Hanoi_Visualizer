import React, { Component } from "react";
import { Tour } from "./Tour.js";
import { ParamForm } from "./ParamForm.js";
import { Disque } from "./Disque.js";
import { EndMessage } from "./EndMessage.js";

export class Hanoi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disques: [
				[], //Disques de la tour de départ
				[], //Disques de la tour intermédiaire
				[]  //Disques de la tour d'arrivée
			],
			playing: false,
			end: false,
			nbMoves: 0
			};
		this.svgRef = React.createRef();
	}
	changeInitialDisks = (nb_disks) => {
		if(!this.state.playing) {
			var disques_ini = [
				[...Array(parseInt(nb_disks, 10)).keys()].reverse(),
				[],
				[]
			];
			this.setState({
				disques: disques_ini,
				end: false
			});
		}
	}
	startGame = async (nb_disks) => {
		if(!this.state.playing) {
			this.setState({
				playing: true,
				end: false
			});
			//Initialize the disks
			console.log("Let's start the game with " + nb_disks + " disks !");
			//Instanciate an array who will store the moves
			this.moves = [];
			//Fill the moves
			this.hanoi_recursif(this.state.disques[0].length, 0, 2, 1);
			var nbMoves = this.moves.length;
			//Play the moves computed, slowly
			for(var i=0; i<nbMoves; i++) {
				this.move_disk(this.moves[i][0], this.moves[i][1]);
				await this.timeout(10);
			}
			this.setState({
				playing: false,
				end: true,
				nbMoves: nbMoves
			});
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
				<ParamForm change={this.changeInitialDisks} start={this.startGame}/>
				<svg width="1200px" height="800px" ref={this.svgRef}version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
				<Tour index={0} disques={this.state.disques[0]} svgRef={this.svgRef}/>
				<Tour index={1} disques={this.state.disques[1]} svgRef={this.svgRef}/>
				<Tour index={2} disques={this.state.disques[2]} svgRef={this.svgRef}/>
				<g>
					{this.state.disques.map(
						(disquesTour, idTour) =>
							disquesTour.map(
								(idDisque, place) => <Disque key={idDisque.toString()} tourParent={idTour} place={place} index={idDisque}/>
							)
					)}
				</g>
				<EndMessage nbMoves={this.state.nbMoves} end={this.state.end}/>
				</svg><br/>
			</div>
		);
	}
}