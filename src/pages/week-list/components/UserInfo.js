import React from 'react';
import styled from 'styled-components';

import { getAge, getConstellation } from '../utils/birthdayAge';
import bridge from '../../../plugins/bridge';
import areaJsonArr from '../tz_region_zh_CN_parsed';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickAvatar = this.handleClickAvatar.bind(this);
  }

  render() {
    console.log('userinfo');
    let { point, user } = this.props.value;
    if (point >= 100000) {
      point = (point / 10000).toFixed(2);
      if (Number.isInteger(parseFloat(point))) {
        point = Math.trunc(point);
      }
      point += '万';
    }
    let rankNum = this.props.rank;
    switch (rankNum) {
      case 1:
        rankNum = <RankNum src="/static/christmas_red_list/3@2x.png" />;
        break;
      case 2:
        rankNum = <RankNum src="/static/christmas_red_list/num2.png" />;
        break;
      case 3:
        rankNum = <RankNum src="/static/christmas_red_list/num3.png" />;
        break;
      default:
        rankNum = <RankTextNum>{rankNum}</RankTextNum>;
    }

    let pointImg = <img src="/static/christmas_red_list/beans.png" style={{ marginLeft: '5px' }} />;

    let {
      username,
      avatar_url,
      pendant_decoration_url,
      gender,
      birthday,
      is_vip,
      country,
      province,
      city
    } = user;

    //地区处理
    let areaArr = [];
    country && areaArr.push(country);
    province && areaArr.push(province);
    city && areaArr.push(city);
    let area = areaArr.join(' ');
    let areaKey = areaArr.join('_');
    if (areaKey) {
      for (const item of areaJsonArr) {
        if (item.c == areaKey) {
          area = item.n;
          break;
        }
      }
    }
    area.length > 6 && (area = area.substr(0, 6) + '...');

    //昵称处理
    username.length > 8 && (username = username.substr(0, 8) + '...');

    //性别处理
    gender == 2
      ? (gender = <img src="/static/christmas_red_list/nv.png" style={{}} />)
      : (gender = <img src="/static/christmas_red_list/nan.png" style={{}} />);

    let age = getAge(birthday);
    let constellation = getConstellation(birthday) + '座';

    return (
      <React.Fragment>
        <UserDiv>
          {rankNum}
          <ImageWrapper>
            <Avatar
              src={avatar_url + '?x-oss-process=image/resize,l_90'}
              onClick={this.handleClickAvatar}
            />
            {pendant_decoration_url && (
              <Pendant src={pendant_decoration_url + '?x-oss-process=image/resize,l_130'} />
            )}
          </ImageWrapper>
          <TextInfo>
            <Name is_vip={is_vip}>
              {username}
              {is_vip && (
                <img
                  src="/static/christmas_red_list/vip*40@2x.png"
                  style={{ position: 'relative', top: '7px' }}
                />
              )}
            </Name>
            <Detail>
              {gender}
              <SeparateSpan />
              {age}
              <SeparateSpan />
              {constellation}
              {area && <SeparateSpan />}
              {area}
            </Detail>
          </TextInfo>
          <GiftStatistic>
            {point}
            {pointImg}
          </GiftStatistic>
        </UserDiv>
      </React.Fragment>
    );
  }

  handleClickAvatar() {
    !(this.props.listType == 1) && bridge.openAppToPage(`tongzhuo://users/${this.props.uid}`);
  }
}

export default UserInfo;

const UserDiv = styled.div`
  border-bottom: 1px solid #eeeeee;
  margin: 0 30px;
  display: flex;
  align-items: center;
  position: relative;
`;

const RankNum = styled.img`
  position: absolute;
  top: 35px;
  left: -35px;
`;

const RankTextNum = styled.div`
  position: absolute;
  top: 55px;
  left: -35px;
  font-size: 24px;
  width: 100px;
  height: 100px;
  text-align: center;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  z-index: 10;
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

const ImageWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  margin-top: 30px;
  margin-bottom: 30px;
  margin-left: 60px;
`;

const TextInfo = styled.div`
  margin-left: 30px;
`;

const Name = styled.div`
  color: ${(props) => {
    return props.is_vip ? '#ff1a6e' : '#333333';
  }};
  font-size: 30px;
  margin-bottom: 10px;
`;

const Detail = styled.div`
  color: #bebdc1;
  font-size: 22px;
  display: flex;
  align-items: center;
`;

const SeparateSpan = styled.span`
  display: inline-block;
  width: 2px;
  height: 10px;
  background-color: #bebdc1;
  margin-left: 10px;
  margin-right: 10px;
`;

const GiftStatistic = styled.div`
  color: #ffc500;
  font-size: 32px;
  font-weight: bold;
  position: absolute;
  right: 0px;
`;
