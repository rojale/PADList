import React, { Component } from "react";
import ReactTable from "react-table";

import "react-table/react-table.css";
import data from "./monster_data";

const arrayIncludes = (inner, outer) => {
	let includes = true;
	inner.forEach(innerItem => {
		if (!outer.includes(innerItem)) {
			includes = false;
		}
	});
	return includes;
};

export default class Table extends Component {
	constructor() {
		super();
	}

	render() {
		const { asFilter, typeFilter, elementFilter } = this.props;
		let monsterData = data;

		if (asFilter && asFilter.length > 0) {
			monsterData = monsterData.filter(monster => {
				return arrayIncludes(asFilter, monster.awoken_skills);
			});
		}

		monsterData = monsterData.map(monster => {
			return {
				...monster,
				skill_cd: isNaN(monster.skill_cd)
					? "No Skill"
					: monster.skill_cd,
				elements: monster.elements.map(element => {
					let newElement = element.replace("/", "");
					return newElement.replace(" ", "");
				}),
				types: monster.types.map(type => {
					let newTypes = type.replace("/", "");
					return newTypes.replace(" ", "");
				})
			};
		});

		if (elementFilter && elementFilter.length > 0) {
			monsterData = monsterData.filter(monster => {
				return arrayIncludes(elementFilter, monster.elements);
			});
		}

		if (typeFilter && typeFilter.length > 0) {
			monsterData = monsterData.filter(monster => {
				return arrayIncludes(typeFilter, monster.types);
			})
		}


		const columns = [
			{
				Header: "Name",
				accessor: "name",
				Cell: row => (
					<a href={row.original.link} target="_blank">
						{row.original.name}
					</a>
				)
			},
			{
				Header: "Elements",
				accessor: "elements",
				Cell: row => (
					<p>{row.original.elements.map(element => element + " ")}</p>
				)
			},
			{
				Header: "Skill Cooldown",
				accessor: "skill_cd"
			},
			{
				Header: "HP",
				accessor: "hp"
			},
			{
				Header: "Attack",
				accessor: "atk"
			},
			{
				Header: "Recovery",
				accessor: "rcv"
			},
			{
				Header: "Types",
				accessor: "types",
				Cell: row => <p>{row.original.types.map(type => type + " ")}</p>
			}
		];

		return (
			<div>
				<ReactTable data={monsterData} columns={columns} />
			</div>
		);
	}
}
