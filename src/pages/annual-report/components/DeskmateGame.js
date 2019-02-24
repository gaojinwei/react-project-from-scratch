import React from 'react';
import styled from 'styled-components';

import brand from '../../../../static/annual-report/brand.png';

function DeskmateGame(props) {
  const { isSharePage } = props;
  return (
    <Wrapper>
      <span>你所不知道的同桌游戏</span>
      <BlueSpan>[消砖块]</BlueSpan>
      <span>
        累计消除
        <RedSpan>30亿</RedSpan>
        行，
      </span>
      <span>每行一厘米，北京和广州打个来回</span>
      <BlueSpan>[坦克大战]</BlueSpan>
      <span>
        消灭了
        <RedSpan>1.5亿</RedSpan>
        辆坦克，
      </span>
      <span>是全球汽车总产量110倍</span>
      <BlueSpan>[桌球]</BlueSpan>
      <span>
        累计出杆
        <RedSpan>110万</RedSpan>
        次，
      </span>
      <span>假设一次出杆做功5焦耳，</span>
      <span>可以让一个灯泡亮1年</span>
      {isSharePage && <img style={{ marginTop: '15px' }} src={brand} />}
    </Wrapper>
  );
}

export default DeskmateGame;

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
    color: rgba(59, 255, 206, 0.76);
  }
`;
