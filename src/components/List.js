import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout } from 'styled-system';
import propTypes from '@styled-system/prop-types';

export const ListItem = styled.li`
padding-bottom: 8px;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
display: flex;
justify-content: space-between;`;


export const TotalPrice = styled.span`
font-weight: 600;
border-top-width: 1px;
border-top-color: #e4e4e4;
border-top-style: solid;
width: 100%;
display: flex;
justify-content: space-between;
`

ListItem.displayName = 'ListItem';

const List = styled.ul`
  list-style-type: ${(props) => props.listStyleType};
  ${space}
  ${layout}
`;

List.propTypes = {
  ...propTypes.layout,
  ...propTypes.space,
  listStyleType: PropTypes.string,
};

List.defaultProps = {
  listStyleType: 'none',
  margin: 0,
  padding: 0,
  width: '100%',
};

List.displayName = 'List';

export default List;
