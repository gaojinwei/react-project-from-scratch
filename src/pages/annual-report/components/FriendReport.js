import React from 'react';
import styled from 'styled-components';

function FriendReport(props) {
  const { friend_count, firstFriendTime, friendName } = props;
  return (
    <React.Fragment>
      {friend_count != 0 && (
        <Wrapper>
          <span>你在同桌游戏</span>
          <span>
            一共结识了
            <RedSpan>{friend_count}</RedSpan>
            个小伙伴
          </span>
          {friend_count != 0 && <span>{firstFriendTime}</span>}
          {friend_count != 0 && (
            <span>
              <YellowSpan>{friendName}</YellowSpan>
              是你在同桌
            </span>
          )}
          {friend_count != 0 && <span>添加的第1个好友</span>}
        </Wrapper>
      )}
      {friend_count == 0 && (
        <Wrapper>
          <span>你还没有结识好友，</span>
          <span>在同桌游戏</span>
          <span> 每分钟有100个小伙伴结识了新朋友，</span>
          <span>快去寻找志同道合的桌友一起玩耍吧！</span>
        </Wrapper>
      )}
    </React.Fragment>
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
