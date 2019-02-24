import React from 'react';
import styled from 'styled-components';

import HeadTitle from './HeadTitle';
import RuleTitle from './RuleTitle';
import HeaderButton from './HeadButton';
import bridge from '../../../plugins/bridge';

const StyledHead = styled.header`
  font-size: 2em;
  text-align: center;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
`;

class Head extends React.PureComponent {
  render() {
    return (
      <StyledHead>
        <HeadTitle />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: '35px',
            width: '100%'
          }}>
          <HeaderButton
            onClick={() => {
              bridge.openAppToBackPage();
            }}
          />
          <RuleTitle onClick={this.props.onClick} />
        </div>
      </StyledHead>
    );
  }
}

export default Head;
