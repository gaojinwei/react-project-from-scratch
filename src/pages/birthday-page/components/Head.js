import React from 'react';
import styled from 'styled-components';

import back from '../../../../static/birthday-page/back.png';
import share from '../../../../static/birthday-page/share.png';

import bridge from '../../../plugins/bridge';

class Head extends React.Component {
  render() {
    const shareLink = this.props.shareLink;
    const isSharePage = this.props.isSharePage;
    return (
      <Header>
        {!isSharePage && (
          <img
            src={back}
            onClick={() => {
              bridge.openAppToBackPage();
            }}
          />
        )}
        {!isSharePage && (
          <img
            src={share}
            onClick={() => {
              bridge.openAppShareToSNS({
                title: '2019，祝我生日快乐',
                url: shareLink,
                summary: '祝你生日快乐',
                thumb:
                  'https://static.app.new.tongzhuogame.com/promotions/8a7c632a-d177-42f2-b252-c21731c9eed1.png'
              });
            }}
          />
        )}
      </Header>
    );
  }
}

export default Head;

const Header = styled.header`
  height: 120px;
  width: 100%;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;
