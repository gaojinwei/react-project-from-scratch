import React from 'react';
import styled from 'styled-components';

function FriendReport() {
  return (
    <Wrapper>
      <span>
        你和
        <YellowSpan>同桌官方小助手</YellowSpan>
        志趣相投
      </span>
      <span>
        你们彼此
        <RedSpan>88888</RedSpan>
        条消息
      </span>
      <span>
        你最欣赏
        <YellowSpan>丸子家族丸子</YellowSpan>
      </span>
      <span>
        累计给他送出
        <RedSpan>34554</RedSpan>
        个礼物
      </span>
    </Wrapper>
  );
}

export default FriendReport;

const Wrapper = styled.div`
  font-size: 2.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  line-height: 55px;
`;

const RedSpan = styled.span`
  && {
    font-size: 32px;
    color: rgb(220, 28, 28);
  }
`;

const BlueSpan = styled.span`
  && {
    font-size: 32px;
    color: rgba(59, 255, 206, 0.76);
  }
`;

const YellowSpan = styled.span`
  && {
    font-size: 32px;
    color: rgba(255, 227, 59, 0.89);
  }
`;
