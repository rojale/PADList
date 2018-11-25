import React, { Component } from "react";

import Selector from './Selector';

import Table from './Table';

import as_data from './as_data';

export default class Container extends Component {
	constructor(props){
		super(props);
		let as_filter = [];
		Object.keys(as_data).forEach((key)=> {
			as_filter.push({name: as_data[key], filter: false, key: key})
		})

		this.state = {
			as_filter: as_filter
		};
		this.changeASFilter = this.changeASFilter.bind(this)
	}

	changeASFilter(filterList){
		console.log("changing filter");
		const activeFilters = filterList.map((as)=>{return as.value});

		const newASFilter = this.state.as_filter.map((filter)=>{
			if (activeFilters.includes(filter.key)) {
				return {...filter, filter: true}
			} else {
				return {...filter, filter: false}
			}
		});

		this.setState({ as_filter: newASFilter})

	}

	render() {

		const asFilter = this.state.as_filter.filter((filter)=>{return filter.filter}).map((filter)=>{return filter.name});
		console.log("render asFilter", asFilter)

		return (
			<div>
			<Selector items={this.state.as_filter} onChange={this.changeASFilter}/>

				<Table asFilter={asFilter} />
			</div>
		);
	}
}
