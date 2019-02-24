import React from 'react';
import styled from 'styled-components';

import gameMap from '../../../../static/annual-report/game.json';

function PlayReport(props) {
  const playReportArr = props.playReportArr;
  const renderedReportArr =
    playReportArr &&
    playReportArr.slice(0, 6).map((item) => {
      const { game_id, total_count, count } = item;
      return (
        <Span key={game_id}>
          <GameImg src={`https://game-static.new.tongzhuogame.com/icons_2.0/${game_id}.png`} />
          <GameSpan>{gameMap[game_id]}</GameSpan> <TextSpan>{total_count}次</TextSpan>{' '}
          <TextSpan>{count}胜</TextSpan>
        </Span>
      );
    });
  return (
    <Wrapper>
      <span style={{ fontSize: '32px' }}>这一年的战绩：</span>
      {renderedReportArr}
      {/* <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span>
      <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span>
      <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span>
      <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span>
      <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span>
      <Span>
        <GameImg src={user} />
        暴走消砖块 23131次 5131胜
      </Span> */}
    </Wrapper>
  );
}

export default PlayReport;

const Wrapper = styled.div`
  font-size: 2.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  line-height: 55px;
  position: relative;
  top: -40px;
  width: 100%;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  margin-top: 25px;
  //justify-content: space-between;
  width: 100%;
  * {
    margin-left: 20px;
  }
`;

const GameImg = styled.img`
  border-radius: 100%;
  border: 2px solid #ff69ef;
  width: 60px;
  //margin-right: 16px;
  && {
    margin-left: 15px;
  }
`;

const TextSpan = styled.span`
  width: 115px;
  text-align: right;
`;

const GameSpan = styled.span`
  width: 155px;
`;
