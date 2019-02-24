import React from 'react';
import styled from 'styled-components';

function ComeDay(props) {
  let {
    favorite_fight_game,
    fight_count,
    fight_win_count,
    opponentName,
    opponentNum,
    favorite_single_game,
    single_count,
    single_win_count
  } = props;
  return (
    <Wrapper>
      {favorite_fight_game && [
        <span>你最喜欢的对战游戏是</span>,
        <span>
          <span style={{ fontSize: '32px', color: 'rgba(59, 255, 206, 0.76)' }}>
            {favorite_fight_game}
          </span>
        </span>,
        <span>
          一共玩了
          <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{fight_count}</span>
          局，战胜了
          <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{fight_win_count}</span>
          人，
        </span>,
        <span style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '32px', color: 'rgba(255, 227, 59, 0.89)' }}>
            {opponentName}
          </span>
          与你棋逢对手，
        </span>,
        <span>
          你们共对战了
          <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{opponentNum}</span>次
        </span>
      ]}
      {favorite_single_game && (
        <span>
          你最喜欢的单机游戏是
          <span style={{ fontSize: '32px', color: 'rgba(59, 255, 206, 0.76)' }}>
            {favorite_single_game}
          </span>
          ，
        </span>
      )}
      {favorite_single_game && (
        <span>
          一共玩了
          <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{single_count}</span>局
        </span>
      )}
      {/* {favorite_single_game && (
        <span>
          最好记录是
          <span style={{ fontSize: '32px', color: 'rgb(220, 28, 28)' }}>{single_win_count}</span>
        </span>
      )} */}
      {!favorite_fight_game &&
        !favorite_single_game && [
          <span>你还没有玩过游戏，</span>,
          <span> 这里有数百款好玩的小游戏，</span>,
          <span>推荐你同桌桌球、同桌五子棋、</span>,
          <span>斗兽棋争霸、俄罗斯方块、暴走消砖块，</span>,
          <span>超多小伙伴在这里酣战到天亮，</span>,
          <span>一争高下！</span>
        ]}
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
