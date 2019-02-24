import React from 'react';
import styled from 'styled-components';

import WeekStarAvatar from './WeekStarAvatar';
import purpleBack from '../../../../static/week-list/purpelStar.png';
import orangeBack from '../../../../static/week-list/orangeStar.png';

class LastWeekStarWrapper extends React.Component {
  /* shouldComponentUpdate(nextProps, nextState) {
    if (JSON.stringify(this.props.list) === JSON.stringify(nextProps.list)) {
      return false;
    } else {
      return true;
    }
  } */
  render() {
    const rankUsers = this.props.rankUsers || [];
    let champion = {};
    let second = {};
    let third = {};
    if (rankUsers.length > 0) {
      champion = rankUsers[0];
      second = rankUsers[1];
      third = rankUsers[2];
    }
    return (
      <StarWrapper>
        <TitleWrapper money={this.props.money} />
        <AvatarsArea>
          <WeekStarAvatar money={this.props.money} rank={2} {...second} />
          <WeekStarAvatar money={this.props.money} rank={1} {...champion} />
          <WeekStarAvatar money={this.props.money} rank={3} {...third} />
        </AvatarsArea>
      </StarWrapper>
    );
  }
}

export default LastWeekStarWrapper;

const StarWrapper = styled.div`
  background-color: #ffffff;
  margin-top: 90px;
  border-radius: 16px;
  position: relative;
  height: calc((100vh - 570px) / 2);
  -webkit-overflow-scrolling: touch;
`;

const TitleWrapper = styled.div`
  background: url(${(props) => {
    return props.money ? orangeBack : purpleBack;
  }});
  width: 350px;
  height: 96px;
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  bottom: 48px;
  margin: 0 auto;
`;

const AvatarsArea = styled.div`
  height: calc(100% - 50px);
  margin-top: -46px;
  display: flex;
`;
