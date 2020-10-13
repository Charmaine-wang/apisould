import React, { useState, useEffect } from 'react';
import { StyledApp } from './styledApp';
import Tables from './components/Table';
import Checkbox from './components/Checkbox';

function App() {
	const [fetchApi, setFetchApi] = useState({});
	const [sortKey, setSortKey] = useState('');
	const [isAscending, setAscending] = useState(true);
	const [checkedItems, setCheckedItems] = useState([]);
	const [isFiltered, setIsFiltered] = useState(false);
	const handleFetch = (orderBy) => {
		const orderDirection = isAscending ? 'asc' : 'desc';
		fetch(
			`https://api.dev.sould.se/?order_by=${orderBy}&order=${orderDirection}`
		)
			.then((response) => response.json())
			.then((data) => setFetchApi({ data }));
	};

	const handleSort = (key) => {
		setSortKey(key);
		setAscending(!isAscending);
	};

	const getPostCode = (str) => {
		const splitString = str.split(',');
		const postCode = parseInt(splitString[splitString.length - 1]);
		return postCode;
	};
	// const getAddress = (str) => {
	// 	const splitString = str.split(',');
	// 	return splitString.slice(0, [splitString.length - 1].join(','));
	// };

	const columns = [
		{ name: 'firstname', sortable: true },
		{ name: 'surname', sortable: true },
		{ name: 'age', sortable: true },
		{ name: 'company' },
		{ name: 'email' },
		{ name: 'postcode', sortable: true },
		{ name: 'active' },
	];

	const formatData = () =>
		fetchApi.data?.map((row) => ({
			firstname: row.firstname,
			surname: row.surname,
			age: row.age,
			company: row.company,
			email: row.email,
			postcode: getPostCode(row.address),
			isActive: row.isActive,
			tags: row.tags,
		}));

	const tags = [
		{
			name: 'tempor',
		},
		{
			name: 'consequat',
		},
		{
			name: 'adipisicing',
		},
	];

	const compare = (a, b) => {
		if (a.postcode < b.postcode) {
			return -1;
		}
		if (a.postcode > b.postcode) {
			return 1;
		}
		return 0;
	};

	const sortPostCode = (row) => {
		const sorted = row?.sort(compare);
		if (!isAscending) {
			return sorted.reverse();
		}
		return sorted;
	};

	const filterByTags = (data, tags) => {
		const selectedTags = Object.keys(checkedItems).filter(
			(tag) => checkedItems[tag] === true
		);
		if (checkedItems.active && data) {
			data = Object.values(data).filter(({ tags, isActive }) => {
				return isActive;
			});
		}
		if (
			(checkedItems.adipisicing ||
				checkedItems.tempor ||
				checkedItems.consequat) &&
			data
		) {
			data = Object.values(data).filter(({ tags, isActive }) => {
				console.log(isActive);
				return tags.some((r) => selectedTags.indexOf(r) >= 0);
			});
		}
		return data;
	};

	const handleChange = (event) => {
		setCheckedItems({
			...checkedItems,
			[event.target.name]: event.target.checked,
		});
	};

	useEffect(() => {
		handleFetch(sortKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortKey, isAscending]);

	const data =
		sortKey === 'postcode' ? sortPostCode(formatData()) : formatData();

	useEffect(() => {
		setIsFiltered(
			!!Object.keys(checkedItems).filter((tag) => checkedItems[tag] === true)
				.length
		);
	}, [checkedItems]);

	const filteredData = filterByTags(data, checkedItems);

	return (
		<StyledApp className="App">
			<div>
				{tags.map((item) => (
					<label key={item.name}>
						{item.name}
						<Checkbox
							name={item.name}
							checked={checkedItems[item.name]}
							onChange={handleChange}
						/>
					</label>
				))}
				<label key={'active'}>
					active
					<Checkbox
						name={'active'}
						checked={checkedItems['active']}
						onChange={handleChange}
					/>
				</label>
			</div>

			<Tables
				columns={columns}
				data={isFiltered ? filteredData : data}
				handleClick={handleSort}
				isAscending={isAscending}
				sortKey={sortKey}
			/>
		</StyledApp>
	);
}

export default App;
