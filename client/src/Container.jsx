import React, { Component } from "react";

import Selector from './Selector';

import Table from './Table';

import as_data from './as_data';
import types_data from './types_data';

export default class Container extends Component {
	constructor(props){
		super(props);
		let as_filter = [];
		Object.keys(as_data).forEach((key)=> {
			as_filter.push({name: as_data[key], filter: false, key: key})
		})
		const elements = ['Fire', 'Water', "Wood", "Light", "Dark"];
		const element_filter = elements.map((element, i)=>{return {name: element, filter: false, key: i}});

		const type_filter = types_data.map((type, i)=>{let typeString = type.replace("/", ""); return {name: typeString.replace(" ", ""), filter: false, key: i}})

		this.state = {
			element_filter: element_filter,
			as_filter: as_filter,
			type_filter: type_filter
		};
		this.changeASFilter = this.changeASFilter.bind(this);
		this.changeElementFilter = this.changeElementFilter.bind(this);
		this.changeTypeFilter = this.changeTypeFilter.bind(this);
	}


	changeElementFilter(filterList){
		const activeFilters = filterList.map((element)=>{return element.value});

		const newElementFilter = this.state.element_filter.map((filter)=> {
			if (activeFilters.includes(filter.key)) {
				return {...filter, filter: true}
			} else {
				return {...filter, filter: false}
			}
		})


		this.setState({ element_filter: newElementFilter})
	}
	changeASFilter(filterList){
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

	changeTypeFilter(filterList){
		const activeFilters = filterList.map((type)=>{return type.value});

		const newTypeFilter = this.state.type_filter.map((filter)=>{
			if (activeFilters.includes(filter.key)) {
				return {...filter, filter: true}
			} else {
				return {...filter, filter: false}
			}
		});

		this.setState({ type_filter: newTypeFilter})
	}

	render() {
		const asFilter = this.state.as_filter.filter((filter)=>{return filter.filter}).map((filter)=>{return filter.name});
		const elementFilter = this.state.element_filter.filter((filter)=>{return filter.filter}).map((filter)=>{return filter.name});
		const typeFilter = this.state.type_filter.filter((filter)=>{return filter.filter}).map((filter)=> {return filter.name});

		return (
			<div>
			<div style={{display: 'flex', width: '50%', flexDirection: 'column'}}>
				<Selector items={this.state.element_filter} onChange={this.changeElementFilter} placeholder="Element"/>
				<Selector items={this.state.as_filter} onChange={this.changeASFilter} placeholder="Awoken Skills"/>
				<Selector items={this.state.type_filter} onChange={this.changeTypeFilter} placeholder="Monster Type"/>
			</div>

				<Table asFilter={asFilter} elementFilter={elementFilter} typeFilter={typeFilter}/>
			</div>
		);
	}
}
