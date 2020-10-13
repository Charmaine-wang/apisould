import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Chevron } from '../../assets/chevron.svg';
import { ReactComponent as Check } from '../../assets/check.svg';

const StyledTable = styled.div`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.numberOfColumns}, 1fr)`};
	margin: 80px 160px;

	& > div {
		border: 1px solid black;
		text-align: center;

		> .fa-check {
			color: green;
			width: 20px;
		}
	}
`;
const StyledColumn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;

	> svg {
		opacity: ${(props) => (props.active ? '1' : '0.3')};
		padding: 0 2px;
		transition: 0.075s;
		width: 20px;
		transform: ${(props) =>
			props.isAscending ? 'rotate(0)' : 'rotate(180deg)'};
	}
`;

const Table = ({ columns, data, handleClick, isAscending, sortKey }) => {
	return (
		<StyledTable numberOfColumns={columns?.length}>
			{columns?.map((column) => (
				<StyledColumn
					active={sortKey === column.name}
					isAscending={isAscending && sortKey === column.name}
					onClick={column.sortable ? () => handleClick(column.name) : null}
				>
					{column.name}
					{column.sortable && <Chevron />}
				</StyledColumn>
			))}
			{/* {data?.map((row) =>
				Object.values(row).map((cell) => {
					return <div>{cell}</div>;
				})
			)} */}
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
		</StyledTable>
	);
};

export default Table;
