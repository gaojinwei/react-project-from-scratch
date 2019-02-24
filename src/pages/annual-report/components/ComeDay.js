import React from 'react';
import styled from 'styled-components';

function ComeDay(props) {
  const { registerTime, register_rank, dayCount, play_count } = props;
  return (
    <Wrapper>
      <span>{registerTime}，</span>
      <span>
        你是
        <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{register_rank}</span>
        个来到同桌游戏的小伙伴
      </span>
      <span>在同桌游戏</span>
      <span>
        你一共度过了
        <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{dayCount}</span>
        天欢乐时光
      </span>
      <span>
        累计玩了
        <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{play_count}</span>
        次游戏
      </span>
    </Wrapper>
  );
}

export default ComeDay;

const Wrapper = styled.div`
  font-size: 2.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  line-height: 55px;
`;
