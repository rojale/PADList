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
					: parseInt(monster.skill_cd),
				elements: monster.elements.map(element => {
					let newElement = element.replace("/", "");
					return newElement.replace(" ", "");
				}),
				types: monster.types.map(type => {
					let newTypes = type.replace("/", "");
					return newTypes.replace(" ", "");
				}),
				atk: parseInt(monster.atk),
				hp: parseInt(monster.hp),
				rcv: parseInt(monster.rcv)
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
				accessor: "hp",
				width: 100
			},
			{
				Header: "Attack",
				accessor: "atk",
				width: 100
			},
			{
				Header: "Recovery",
				accessor: "rcv",
				width: 100
			},
			{
				Header: "Types",
				accessor: "types",
				Cell: row => <p>{row.original.types.map(type => type + " ")}</p>
			},
			{
				Header: 'Awoken Skills',
				accessor: 'awoken_skills',
				Cell: row => <div className="awokenSkills">{row.original.awoken_skills.map((skill)=><p>{skill}</p>)}</div>
			}
		];

		return (
			<div>
				<ReactTable
				data={monsterData}
				columns={columns}
				filterable
				 />
			</div>
		);
	}
}
