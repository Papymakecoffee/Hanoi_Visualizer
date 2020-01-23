import React, { Component } from "react";

export class EndMessage extends Component {
	render() {
		if(this.props.end) {
			console.log("Wesh");
			return (
				<text x="0" transform="translate(600)" y="700" className="endMessage" fontSize="60" fill="black">
					Fini en {this.props.nbMoves} coups !
				</text>
			);
		} else {
			return null;
		}
	}
}