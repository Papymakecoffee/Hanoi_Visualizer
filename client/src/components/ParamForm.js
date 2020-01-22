import React, { Component } from "react";

export class ParamForm extends Component {
	constructor(props) {
		super(props);
		this.state = {value: 0};
	}

	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.start(this.state.value || 0);
	}
	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Nomber of disks : 
					<input type="number" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Visualize !" />
			</form>
		);
	}
}