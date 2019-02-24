import React from 'react';
import styled, { keyframes } from 'styled-components';

class Dialog extends React.Component {
  render() {
    return (
      <WhiteDiv openApp={this.props.openApp}>
        <BigFontSpan>链接打不开？</BigFontSpan>
        <SmallFontSpan>请点击右上角...</SmallFontSpan>
        <SmallFontSpan>选择在浏览器中打开</SmallFontSpan>
      </WhiteDiv>
    );
  }
}

export default Dialog;

const WhiteDiv = styled.div`
  width: 95%;
  position: fixed;
  top: -10px;
  height: 180px;
  background: #ffffff;
  transition: opacity 0.5s linear;
  opacity: ${(props) => (props.openApp ? 1 : 0)};
  left: 50%;
  transform: translate(-50%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const BigFontSpan = styled.span`
  font-size: 36px;
`;

const SmallFontSpan = styled.span`
  font-size: 28px;
`;
