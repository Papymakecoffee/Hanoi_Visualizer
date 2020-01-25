import React, { Component } from "react";
import { Tour } from "./Tour.js";
import { Header } from "./Header.js";
import { Disque } from "./Disque.js";
import { EndMessage } from "./EndMessage.js";

export class Hanoi extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disques: [
				[...Array(5).keys()].reverse(), //Disques de la tour de départ
				[], //Disques de la tour intermédiaire
				[]  //Disques de la tour d'arrivée
			],
			disqueMoving: {
				id: -1,
				ancienneTour: -1,
				anciennePlace: -1
			},
			playing: false,
			end: false,
			nbMoves: 0
			};
		this.svgRef = React.createRef();
		this.moveDuration = 3000;
		this.animationLoop = null;
		this.endTimeout = null;
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
				disqueMoving: {
					id: -1,
					ancienneTour: -1,
					anciennePlace: -1
				},
				end: false
			});
		}
	}
	startGame = (nb_disks) => {
		if(!this.state.playing) {
			this.setState({
				playing: true,
				end: false
			});
			//Initialize the disks
			console.log("Let's start the game with " + nb_disks + " disks !");
			//Instanciate an array who will store the moves
			var moves = [];
			//Fill the moves
			this.hanoi_recursif(this.state.disques[0].length, 0, 2, 1, moves);
			var nbMoves = moves.length;
			//Play the moves computed, slowly
			if(nbMoves > 0) {
				this.move_disk(moves[0][0], moves[0][1]);
				var i=1;
				if(nbMoves > 1) {
					var animationLoop = setInterval(function(move_disk) {
						move_disk(moves[i][0], moves[i][1]);
						i+=1;
						if(i === nbMoves) clearInterval(animationLoop);
					}, this.moveDuration, this.move_disk);
					this.animationLoop = animationLoop;
				}
			}

			this.endTimeout = setTimeout(function(thisRef) {
				thisRef.setState({
					disqueMoving: {
						id: -1,
						ancienneTour: -1,
						anciennePlace: -1
					},
					playing: false,
					end: true,
					nbMoves: nbMoves
				});
			}, this.moveDuration * nbMoves, this);
		}
	}
	cancelGame = (nb_disks) => {
		console.log("Wesh : " + nb_disks);
		if(this.state.playing || this.state.end) {
			var disques_ini = [
				[...Array(parseInt(nb_disks, 10)).keys()].reverse(),
				[],
				[]
			];
			clearInterval(this.animationLoop);
			clearTimeout(this.endTimeout);
			this.setState({
				disques: disques_ini,
				disqueMoving: {
					id: -1,
					ancienneTour: -1,
					anciennePlace: -1
				},
				playing: false,
				end: false
			});
		}
	}
	hanoi_recursif(n, D, A, I, moves) {
		if(n !== 0) {
			this.hanoi_recursif(n-1, D, I, A, moves);
			moves.push([D, A]);
			this.hanoi_recursif(n-1, I, A, D, moves);
		}
	}
	move_disk = (D, A) => {
		var new_disques = this.state.disques.slice();
		var anciennePlace = new_disques[D].length - 1;
		var disk_to_move = new_disques[D].pop();
		new_disques[A].push(disk_to_move);
		this.setState(
		{
			disques: new_disques,
			disqueMoving: {
				id:disk_to_move,
				ancienneTour:D,
				anciennePlace:anciennePlace
			}
		});
	}
	timeout(ms) {
	    return new Promise(resolve => setTimeout(resolve, ms));
	}
	render() {
		return (
			<div>
				<Header change={this.changeInitialDisks} start={this.startGame} cancel={this.cancelGame}/>
				<svg width="1200px" height="800px" ref={this.svgRef}version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
				<Tour index={0}/>
				<Tour index={1}/>
				<Tour index={2}/>
				<g>
					{this.state.disques.map(
						(disquesTour, idTour) =>
							disquesTour.map(
								(idDisque, place) => {
									if(idDisque === this.state.disqueMoving.id) {
										return(<Disque key={idDisque.toString()} tourParent={idTour} place={place} index={idDisque} moving={true} ancienneTour={this.state.disqueMoving.ancienneTour} anciennePlace={this.state.disqueMoving.anciennePlace} animationTime={this.moveDuration / 1000}/>);
									} else {
										return(<Disque key={idDisque.toString()} tourParent={idTour} place={place} index={idDisque} moving={false}/>);
									}
								}
							)
					)}
				</g>
				<EndMessage nbMoves={this.state.nbMoves} end={this.state.end}/>
				</svg><br/>
			</div>
		);
	}
}