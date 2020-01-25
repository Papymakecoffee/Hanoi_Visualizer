import React from "react";
import styled, { keyframes } from "styled-components";

export function Disque(props) {
	const rayon = (props.index + 1) * 14;
	if(props.moving) {
		const dxAnciennePlace = (props.ancienneTour - props.tourParent) * 400
		const dyAnciennePlace = 40 * (props.place - props.anciennePlace);
		const dyPlafond = (props.place - 10) * 40 - 5;
		const move = keyframes`
			0% { transform: translate(${dxAnciennePlace}px, ${dyAnciennePlace}px); }
			30% { transform: translate(${dxAnciennePlace}px, ${dyPlafond}px); }
			70% { transform: translate(0px, ${dyPlafond}px); }
			100% { transform: translate(0px, 0px); }
		`;
		const MovingDisk = styled.path.attrs(propsMoving => ({
			d:`M ${props.tourParent * 400 + 200} ${450 - props.place * 40} h ${(props.index + 1) * 14} q10 0 10 -10 q0 -10 -10 -10 h ${-(props.index + 1) * 28} q-10 0 -10 10 q0 10 10 10 h ${(props.index + 1) * 14}`,
			stroke: "blue",
			fill: "#004C97"
		}))
		`
			animation: ${move} ${props.animationTime}s;
		`;
		return(
			<MovingDisk/>
		);
	}
	return (
		<path d={`M ${props.tourParent * 400 + 200} ${450 - props.place * 40} h ${rayon} q10 0 10 -10 q0 -10 -10 -10 h ${-rayon * 2} q-10 0 -10 10 q0 10 10 10 h ${rayon}`} stroke="blue" fill="#004C97"/>
	);
}