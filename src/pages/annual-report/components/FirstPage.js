import React from 'react';
import styled, { keyframes } from 'styled-components';

import annualReport from '../../../../static/annual-report/annualReport.png';
import vip from '../../../../static/annual-report/vip.png';

class FirstPage extends React.Component {
  render() {
    let { avatar_url, username, is_vip } = this.props;
    username && (username.length > 6 && (username = username.substr(0, 6) + '...'));
    return (
      <ContentWrapper>
        <CircleWrapper>
          <FirstCircle />
          <SecondCircle />
          <ThirdCircle />
          <AvatarDiv avatar_url={avatar_url} />
          <Name>
            <span style={{ marginRight: '12px' }}>{username}</span>
            {is_vip && <img src={vip} />}
          </Name>
        </CircleWrapper>
        <AnnualReportImg src={annualReport} />
        <StartButton onClick={() => this.props.handleChangeIndex(1)}>开始>></StartButton>
      </ContentWrapper>
    );
  }
}

export default FirstPage;

const ContentWrapper = styled.div`
  height: 67.7em;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const CircleWrapper = styled.div`
  position: relative;
  width: 30.4em;
  height: 30.4em;
`;

const FirstCircle = styled.div`
  position: absolute;
  opacity: 0.05;
  background: #ffffff;
  width: 30.4em;
  height: 30.4em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
`;

const SecondCircle = styled(FirstCircle)`
  width: 26em;
  height: 26em;
`;

const ThirdCircle = styled(FirstCircle)`
  width: 20.8em;
  height: 20.8em;
`;

const AvatarDiv = styled.div`
    background: url("${(props) => props.avatar_url}");
    background-size: 100%;
    border-radius: 100%;
    border: 4px solid #FFFFFF;
    width: 17em;
    height: 17em;
    top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
`;

const AnnualReportImg = styled.img``;

const OpacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const StartButton = styled.button`
  animation: 1s ${OpacityAnimation} infinite;
  font-size: 3.2em;
  color: #ffffff;
  :focus: {
    outline: none;
  }
  border: none;
  background: transparent;
`;

const Name = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  font-size: 2.8em;
  align-items: center;
  width: 100%;
  justify-content: center;
`;
