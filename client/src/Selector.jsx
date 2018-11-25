import React from 'react';

import Select from 'react-select';

const Selector = ({items, onChange}) => {

	const options = items.map((item)=> {return {label: item.name, value: item.key}})

	return <Select
	isMulti
	isSearchable
	options={options}
	onChange={onChange}
	/>
}

export default Selector