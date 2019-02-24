import React from 'react';
import styled from 'styled-components';

import bridge from '../../../plugins/bridge';

class WeekStarAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAvatar = this.handleClickAvatar.bind(this);
  }

  render() {
    let { is_vip, username, rank, avatar_url, pendant_decoration_url } = this.props;

    //处理emoji等特殊字符
    var times = 0;
    var subUsername = '';
    username || (username = '');
    for (let char of username) {
      if (times == 5) {
        subUsername += '...';
        break;
      }
      subUsername += char;
      times++;
    }

    let alignSelf = 'center';
    let rankImgSrc = '/static/week-list/num2.png';
    if (rank == 1) {
      alignSelf = 'flex-start';
      rankImgSrc = '/static/week-list/num1.png';
    } else if (rank == 3) {
      alignSelf = 'center';
      rankImgSrc = '/static/week-list/num3.png';
    }
    return (
      <AvatarWrapper alignSelf={alignSelf}>
        <img src={rankImgSrc} />
        <ImageWrapper>
          <Avatar
            src={avatar_url + '?x-oss-process=image/resize,l_90'}
            onClick={this.handleClickAvatar}
          />
          {pendant_decoration_url && (
            <Pendant src={pendant_decoration_url + '?x-oss-process=image/resize,l_130'} />
          )}
        </ImageWrapper>
        <Name is_vip={is_vip}>
          {subUsername}
          {is_vip && (
            <img src="/static/week-list/vip.png" style={{ position: 'relative', top: '7px' }} />
          )}
        </Name>
      </AvatarWrapper>
    );
  }

  handleClickAvatar() {
    !this.props.money && bridge.openAppToPage(`tongzhuo://users/${this.props.uid}`);
  }
}

export default WeekStarAvatar;

const AvatarWrapper = styled.div`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: ${(props) => {
    return props.alignSelf;
  }};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin-bottom: 30px;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  z-index: 10;
`;

const Name = styled.div`
  color: ${(props) => {
    return props.is_vip ? '#ff1a6e' : '#333333';
  }};
  font-size: 30px;
  margin-bottom: 10px;
`;

const Pendant = styled.img`
  width: 130px;
  height: 130px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;
