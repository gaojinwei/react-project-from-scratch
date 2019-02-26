import React from 'react';
import styled from 'styled-components';
import queryString from 'query-string';

import card1 from '../../../static/birthday-page/card1.png';
import card2 from '../../../static/birthday-page/card2.png';
import card3 from '../../../static/birthday-page/card3.png';
import card4 from '../../../static/birthday-page/card4.png';
import logo1 from '../../../static/birthday-page/logo1.png';
import logo2 from '../../../static/birthday-page/logo2.png';
import shareLogo from '../../../static/birthday-page/logo.png';

import Head from './components/Head';

let isIos = false;
let userAgent = navigator.userAgent.toLowerCase();
if (userAgent.includes('iphone')) {
  isIos = true;
}

let isSharePage = false;
const { search, origin, pathname } = location;
const query = queryString.parse(search);
const {
  uid,
  token,
  url_id,
  url_username,
  url_birthday,
  url_avatar_url,
  url_gender,
  url_pendant_decoration_url
} = query;
if (url_id) {
  isSharePage = true;
}

const baseURL =
  process.env.environment !== 'production'
    ? 'https://debug.api.app.new.tongzhuogame.com'
    : 'https://api.app.new.tongzhuogame.com';

class BirthdayPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        id: '',
        username: '',
        birthday: '',
        avatar_url: '',
        pendant_decoration_url: '',
        gender: -1
      }
      /* card,
      logo,
      borderColor,
      smallTextColor,
      bigTextColor */
    };
  }
  render() {
    //let { card, logo, borderColor, smallTextColor, bigTextColor } = this.state;
    let {
      id,
      username,
      birthday,
      avatar_url,
      gender,
      pendant_decoration_url
    } = this.state.userInfo;

    if (isSharePage) {
      id = url_id;
      username = url_username;
      birthday = url_birthday;
      avatar_url = url_avatar_url;
      gender = url_gender;
      pendant_decoration_url = url_pendant_decoration_url;
    }

    let theme = -1;
    let randomCard = Math.floor(Math.random() * Math.floor(2));
    let boyCards = [card2, card4];
    let girlCards = [card1, card3];
    let card = '';
    //女
    if (gender == 2) {
      card = girlCards[randomCard];
      randomCard == 0 ? (theme = 0) : (theme = 3);
    } else if (gender == 1) {
      card = boyCards[randomCard];
      randomCard == 0 ? (theme = 1) : (theme = 2);
    }

    //let theme = Math.floor(Math.random() * Math.floor(4));
    //let card = '';
    let logo = logo1;
    if (theme == 2 || theme == 3) {
      logo = logo2;
    }
    let borderColor = '#FFFFFF';
    if (theme == 0) {
      //粉
      borderColor = '#FFDC66';
    } else if (theme == 1) {
      //淡蓝
      borderColor = '#87F2FF';
    }

    let smallTextColor = '#FFFFFF';
    let bigTextColor = '#FFFFFF';
    if (theme == 0) {
      smallTextColor = '#282433';
      bigTextColor = '#FF5D65';
    } else if (theme == 1) {
      smallTextColor = '#282433';
      bigTextColor = '#3ED0DF';
    }

    //处理emoji等特殊字符
    var times = 0;
    var subUsername = '';
    for (let char of username) {
      if (times == 12) {
        subUsername += '...';
        break;
      }
      subUsername += char;
      times++;
    }

    function getMonth(strBirthday) {
      var strBirthdayArr = strBirthday.split('-');
      var birthMonth = strBirthdayArr[1];
      return birthMonth;
    }

    function getDay(strBirthday) {
      var strBirthdayArr = strBirthday.split('-');
      var birthDay = strBirthdayArr[2];
      return birthDay;
    }
    let month = '';
    let day = '';
    if (birthday) {
      month = getMonth(birthday);
      day = getDay(birthday);
    }

    const shareLink = `${origin}${pathname}?url_id=${id}&url_username=${username}&url_birthday=${birthday}&url_avatar_url=${avatar_url}&url_gender=${gender}&url_pendant_decoration_url=${pendant_decoration_url}`;

    return (
      <Wrapper>
        <Image src={card} />
        <Head shareLink={shareLink} isSharePage={isSharePage} />
        <Main>
          <AvatarDiv avatar_url={avatar_url} borderColor={borderColor}>
            <Pendant
              src={
                'https://tz-newapp-static.oss-cn-beijing.aliyuncs.com/user_decorations/birthday_pendant.png'
              }
            />
          </AvatarDiv>
          <TextDiv smallTextColor={smallTextColor}>{subUsername}</TextDiv>
          <TextDiv1 smallTextColor={smallTextColor}>
            ID：
            {id}
          </TextDiv1>
          <TextDiv2 bigTextColor={bigTextColor}>
            {month}月{day}日
          </TextDiv2>
          <TextDiv3 bigTextColor={bigTextColor}>今天是我的生日</TextDiv3>
        </Main>
        <Logo src={logo} />
        {isSharePage && (
          <Footer>
            <LogoImg src={shareLogo} />
            <PlayButton onClick={(e) => this.handleOpenApp(e)}>玩更多游戏</PlayButton>
          </Footer>
        )}
      </Wrapper>
    );
  }

  componentDidMount() {
    !isSharePage &&
      fetch(`${baseURL}/users/web/batch_info?uid=${uid}&token=${token}&uids[]=${uid}`)
        .then((res) => {
          return res.json();
        })
        .then((resJson) => {
          const { id, username, birthday, avatar_url, gender, pendant_decoration_url } = resJson[0];
          this.setState({
            userInfo: {
              id,
              username,
              birthday,
              avatar_url,
              gender,
              pendant_decoration_url
            }
          });
        });
  }

  handleOpenApp(e) {
    setTimeout(function() {
      if (isIos) {
        window.location = 'https://itunes.apple.com/app/id1057866090';
      } else {
        window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tongzhuo.tongzhuogame';
      }
    }, 500);
  }
}

export default BirthdayPage;

const Image = styled.img`
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
`;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 100vh;
`;

const AvatarDiv = styled.div`
    background: url("${(props) => props.avatar_url}");
    background-size: 100%;
    border-radius: 100%;
    border: 8px solid ${(props) => props.borderColor};
    width: 160px;
    height: 160px;
    margin: 0 auto;
    margin-top: 10px;
    position: relative;
`;

const Pendant = styled.img`
  width: 240px;
  height: 240px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

const Main = styled.main`
  position: relative;
  text-align: center;
`;

const TextDiv = styled.div`
  margin-top: 20px;
  font-family: FZY4JW--GB1-0;
  color: ${(props) => props.smallTextColor};
  font-size: 28px;
`;

const TextDiv1 = styled(TextDiv)`
  margin-top: 0px;
  color: ${(props) => props.smallTextColor};
`;

const TextDiv2 = styled(TextDiv)`
  margin-top: 30px;
  font-size: 80px;
  color: ${(props) => props.bigTextColor};
`;

const TextDiv3 = styled(TextDiv)`
  margin-top: 20px;
  font-size: 40px;
  color: ${(props) => props.bigTextColor};
`;

const Logo = styled.img`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const Footer = styled.footer`
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #9a4cff;
  box-sizing: border-box;
`;

const LogoImg = styled.img`
  height: 55px;
`;

const PlayButton = styled.button`
  color: #fff;
  background: #ff1a6e;
  border: none;
  padding: 0.5em 1rem;
  border-radius: 12px;
  font-size: 20px;
  :focus {
    outline: none;
  }
`;
