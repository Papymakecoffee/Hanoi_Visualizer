import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const defilement = keyframes`
	from { transform: translateX(-600px); }
	to { transform: translateX(0px); }
`;

const TextDefilant = styled.g`
	animation: ${defilement} 3s; 
`;

export class EndMessage extends Component {
	render() {
		if(this.props.end) {
			console.log("Wesh");
			return (
				<TextDefilant>
					<path d="M300 580 h 550 q40 0 40 40 q0 40 -40 40 h -550 q-40 0 -40 -40 q0 -40 40 -40" fill="green"/>
					<text x="300" y="640" fontSize="60" fill="white">
						Finished in {this.props.nbMoves} move{this.props.nbMoves > 1 ? "s" : ""} !
					</text>
				</TextDefilant>
			);
		} else {
			return null;
		}
	}
}