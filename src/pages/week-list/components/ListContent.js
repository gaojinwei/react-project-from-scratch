import React from 'react';
import styled from 'styled-components';

import RankBasis from './RankBasis';
import UserList from './UserList';

const StyledListContent = styled.main`
  margin: 0 10px;
  position: fixed;
  top: 280px;
  width: calc(100% - 20px);
  height: calc(100% - 280px);
`;

class ListContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { themeIndex } = this.props;
    return (
      <StyledListContent>
        <RankBasis listType={themeIndex} />
        <UserList onThemeChange={this.props.onThemeChange} listType={themeIndex} />
      </StyledListContent>
    );
  }
}

export default ListContent;
