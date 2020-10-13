import React from 'react';
// import styled from 'styled-components';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import { ReactComponent as Check } from '../../assets/check.svg';
import { TableWrapper, Column } from './styledTable';

const Table = ({
	columns,
	data,
	handleClick,
	isAscending,
	sortKey,
	isSortable,
}) => {
	return (
		<TableWrapper numberOfColumns={columns?.length}>
			{columns?.map((column) => (
				<Column
					active={sortKey === column.name}
					isAscending={isAscending && sortKey === column.name}
					onClick={column.sortable ? () => handleClick(column.name) : null}
					isSortable={column.sortable}
				>
					{column.name}
					{column.sortable && <Chevron />}
				</Column>
			))}

			{data?.map((row) => {
				return (
					<>
						<div>{row.firstname}</div>
						<div>{row.surname}</div>
						<div>{row.age}</div>
						<div>{row.company}</div>
						<div>{row.email}</div>
						<div>{row.postcode}</div>
						<div>{row.isActive ? <Check /> : ''}</div>
					</>
				);
			})}
		</TableWrapper>
	);
};

export default Table;
