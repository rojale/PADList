import React, { Component } from 'react';
import ReactTable from 'react-table';


import 'react-table/react-table.css';
import data from './monsterInfo';

export default class Table extends Component {


	render() {
		console.log(data)

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
		}]

		return (
			<div>
				<ReactTable
					data={data}
					columns={columns}
				/>
			</div>
			)
	}
}