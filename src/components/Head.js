import React from 'react';
import styled from 'styled-components';

import bridge from '../plugins/bridge';

class Head extends React.Component {
  render() {
    return (
      <Header>
        <HeaderButton
          //imgUrl={this.props.imgUrl}
          onClick={() => {
            bridge.openAppToBackPage();
          }}>
          <img style={{ width: '1.3em', height: '2.6em' }} src={this.props.imgUrl} />
        </HeaderButton>
        <HeaderTitle color={this.props.color}>{this.props.title}</HeaderTitle>
        <HiddenButton />
      </Header>
    );
  }
}

export default Head;

const Header = styled.header`
  font-size: 10px;
  width: 100%;
  height: 8vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;

  @supports (padding-top: env(safe-area-inset-top)) {
    padding-top: env(safe-area-inset-top);
  }
`;

const HeaderTitle = styled.h1`
  font-size: 3.2em;
  font-weight: 400;
  color: ${(props) => props.color};
  font-family: PingFangSC-Semibold;
`;

const HeaderButton = styled.button`
  :focus: {
    outline: none;
  }
  border: none;
  width: 5em;
  height: 5em;
  font-size: 1em;
  background: transparent;
  //background: url('${(props) => props.imgUrl}');
  //background-repeat: no-repeat;
  //background-size: contain;
  padding: 0
`;

const HiddenButton = styled(HeaderButton)`
  visibility: hidden;
`;
