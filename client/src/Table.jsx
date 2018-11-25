import React, { Component } from 'react';
import ReactTable from 'react-table';


import 'react-table/react-table.css';
import data from './monster_data';

const arrayIncludes = (inner, outer) => {
	let includes = true
	inner.forEach((innerItem) => {
		if (!outer.includes(innerItem)) {
			console.log("should filter");
			includes = false;
		}
	})
	return includes
}

export default class Table extends Component {
	constructor(){
		super()

	}


	render() {
		const { asFilter, typeFilter } = this.props;
		console.log("asFilter", asFilter);
		let monsterData = data;

		if (asFilter && asFilter.length>0) {
			console.log('filtering');
			console.log("in filtering asFilter", asFilter)
			monsterData = monsterData.filter((monster) => {return arrayIncludes(asFilter, monster.awoken_skills)} )
			console.log("after filtering", monsterData)
		}



		const columns = [
		{
			Header: 'Name',
			accessor: 'name',
			Cell: row => <a href={row.original.link} target="_blank">{row.original.name}</a>

		},
		{
			Header: 'Skill Cooldown',
			accessor: 'skill_cd'
		},
		{
			Header: 'HP',
			accessor: 'hp'
		},
		{
			Header: 'Attack',
			accessor: 'atk'
		},
		{
			Header: 'Recovery',
			accessor: 'rcv'
		},
		{
			Header: 'Types',
			accessor: 'types',
			Cell: row => <p>{row.original.types.map((type)=>type+ " ")}</p>
		},
		{
			Header: 'Elements',
			accessor: 'elements',
			Cell: row => <p>{row.original.elements.map((element)=>element + " ")}</p>
		}]

		return (
			<div>
				<ReactTable
					data={monsterData}
					columns={columns}
				/>
			</div>
			)
	}
}