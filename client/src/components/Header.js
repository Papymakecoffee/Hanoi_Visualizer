import React, { Component } from "react";
import styled from "styled-components";

const SubmitButton = styled.button`
	display: inline-block;
	width: 100px;
	background: #317fcc;
	color: white;
	border-radius:10px;
	padding: 0.25em 1em;
	margin-left: 1em;
	font-size: 1em;
	border: 0;
	&:hover {
		background: #5a9cdd;
	}
	&:focus {
		outline:0;
	}
`;

const CancelButton = styled(SubmitButton)`
	background: #ba4141;
	&:hover {
		background: #A90B0B;
	}
`
const RangeInput = styled.input`
	margin-top:20px;
	-webkit-appearance: none;
	width: 100%; /* Specific width is required for Firefox. */
	background: transparent; /* Otherwise white in Chrome */

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 1px solid #785b00;
		height: 20px;
		width: 20px;
		border-radius: 10px;
		background: #9a7500;
		cursor: pointer;
		margin-top: -7px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
		box-shadow: 1px 1px 1px #785b00, 0px 0px 1px #0d0d0d;
	}
	&::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		background: #dba500;
		border-radius: 2px;
		border: 0.2px solid #010101;
	}
	&:focus {
		outline:0;
	}
	&::-ms-track {
		width: 100%;
		cursor: pointer;

		/* Hides the slider so custom styles can be added */
		background: transparent; 
		border-color: transparent;
		color: transparent;
	}
`;

const Title = styled.h1`
	display: inline-block;
	margin-right:3em;
`;

const Banniere = styled.div`
	width: 100%; height: 8em;
	background-color: #ffc615; 
`;

export class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {value: 5};
	}

	handleChange = (event) => {
		this.setState({value: event.target.value});
		this.props.change(event.target.value || 0);
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.start(this.state.value || 0);
	}

	handleCancel = (event) => {
		event.preventDefault();
		this.props.cancel(this.state.value || 0);	
	}
	render() {
		return (
			<Banniere className="header">
				<Title>Tower of Hanoi Visualizer</Title>
				<label>
					Number of disks : &nbsp;
					<RangeInput type="range" value={this.state.value} onChange={this.handleChange} min="0" max="10"/>
				</label>
				<SubmitButton onClick={this.handleSubmit}>Visualize !</SubmitButton>
				<CancelButton onClick={this.handleCancel}>Reset</CancelButton>
			</Banniere>
		);
	}
}