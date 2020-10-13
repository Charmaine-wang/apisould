import styled from 'styled-components';

export const TableWrapper = styled.div`
	display: grid;
	grid-template-columns: ${(props) => `repeat(${props.numberOfColumns}, 1fr)`};
	background-color: #171c21;
	color: #c1c7cd;

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid #c1c7cd;
		text-align: center;
		height: 40px;

		> .fa-check {
			color: green;
			width: 20px;
		}
	}
`;

export const Column = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 40px;
	background-color: #1b2733;
	text-transform: capitalize;
	cursor: ${(props) => (props.isSortable ? 'pointer' : 'default')};

	> svg {
		opacity: ${(props) => (props.active ? '1' : '0.3')};
		padding: 0 2px;
		transition: 0.075s;
		width: 20px;
		transform: ${(props) =>
			props.isAscending ? 'rotate(0)' : 'rotate(180deg)'};
	}
`;
