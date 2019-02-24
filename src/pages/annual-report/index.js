import React from 'react';
import styled, { keyframes } from 'styled-components';
import fetch from 'cross-fetch';
import queryString from 'query-string';

import purple from '../../../static/annual-report/purple.png';
import back from '../../../static/annual-report/back.png';
import left from '../../../static/annual-report/left.png';
import right from '../../../static/annual-report/right.png';
import corner from '../../../static/annual-report/corner.png';
import circle from '../../../static/annual-report/circle.png';
import share from '../../../static/annual-report/share.png';
import play from '../../../static/annual-report/play.png';
import friend from '../../../static/annual-report/friend.png';
import wechat from '../../../static/annual-report/wechat.png';
import qq from '../../../static/annual-report/qq.png';
import qqspace from '../../../static/annual-report/qqspace.png';
import gameMap from '../../../static/annual-report/game.json';
import PageWrapper from '../../components/PageWrapper';
import Head from '../../components/Head';
import Content from './components/Content';
import Dialog from './components/Dialog';
import bridge, { statistic } from '../../plugins/bridge';

let isSharePage = false;
let isIos = false;
let userAgent = navigator.userAgent.toLowerCase();
/* if (userAgent.includes('micromessenger') || userAgent.includes('qq')) {
  isSharePage = true;
} */
if (!getParameterByName('token')) {
  //alert('移动浏览器');
  isSharePage = true;
}

if (userAgent.includes('iphone')) {
  isIos = true;
}

const { search, origin, pathname } = location;
const query = queryString.parse(search);
const { uid, token } = query;
const shareLink = `${origin}${pathname}?uid=${uid}`;

// function setUpShareData(title, description, link, imgUrl) {
//   wx.onMenuShareTimeline({
//     title: title, // 分享标题
//     desc: description,
//     link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//     imgUrl: imgUrl, // 分享图标
//     success: function() {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//       // 用户取消分享后执行的回调函数
//     }
//   });

//   wx.onMenuShareAppMessage({
//     title: title, // 分享标题
//     desc: description,
//     link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//     imgUrl: imgUrl, // 分享图标
//     success: function() {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//       // 用户取消分享后执行的回调函数
//     }
//   });

//   wx.onMenuShareQQ({
//     title: title, // 分享标题
//     desc: description,
//     link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//     imgUrl: imgUrl, // 分享图标
//     success: function() {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//       // 用户取消分享后执行的回调函数
//     }
//   });

//   wx.onMenuShareWeibo({
//     title: title, // 分享标题
//     desc: description,
//     link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//     imgUrl: imgUrl, // 分享图标
//     success: function() {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//       // 用户取消分享后执行的回调函数
//     }
//   });

//   wx.onMenuShareQZone({
//     title: title, // 分享标题
//     desc: description,
//     link: link, // 分享链接，该链接域名必须与当前企业的可信域名一致
//     imgUrl: imgUrl, // 分享图标
//     success: function() {
//       // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//       // 用户取消分享后执行的回调函数
//     }
//   });
// }

// wx.ready(function() {
//   setUpShareData(
//     '我已经在等你啦，快来同桌游戏陪我玩',
//     '随时随地，一起小游戏！',
//     window.location.href,
//     avatar_url
//   );
// });

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results == null ? '' : decodeURIComponent(results[1]);
}

const baseURL =
  process.env.environment !== 'production'
    ? 'https://debug.activity.app.new.tongzhuogame.com'
    : 'https://activity.app.new.tongzhuogame.com';

function animate({ timing, draw, duration }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
}

document.addEventListener('pause', function() {
  alert('dddd');
  var videoElem = document.querySelector('audio');
  videoElem.pause();
});

function getHiddenProp() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];

  // if 'hidden' is natively supported just return it
  if ('hidden' in document) return 'hidden';

  // otherwise loop over all the known prefixes until we find one
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + 'Hidden' in document) return prefixes[i] + 'Hidden';
  }

  // otherwise it's not supported
  return null;
}

// 获取document.visibilityState属性
function getVisibilityState() {
  var prefixes = ['webkit', 'moz', 'ms', 'o'];
  if ('visibilityState' in document) return 'visibilityState';
  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + 'VisibilityState' in document) return prefixes[i] + 'VisibilityState';
  }
  // otherwise it's not supported
  return null;
}

// 给document添加事件
var visProp = getHiddenProp();
if (visProp) {
  var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
  document.addEventListener(
    evtname,
    function() {
      //document.title = document[getVisibilityState()] + '状态';
      if (document[getVisibilityState()] == 'visible') {
        //alert('回来了');
        var videoElem = document.querySelector('audio');
        videoElem.play();
      } else {
        var videoElem = document.querySelector('audio');
        videoElem.pause();
      }
    },
    false
  );
}

class AnnualReportPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isSharePage,
      openApp: false,
      showNext: false
    };

    this.handleNextPage = this.handleNextPage.bind(this);
    this.handlePreviousPage = this.handlePreviousPage.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleOpenApp = this.handleOpenApp.bind(this);
    this.showNext = this.showNext.bind(this);
    this.pages = 6;

    this.setAudioRef = (element) => {
      this.audioRef = element;
    };
  }
  render() {
    console.log(this.state);
    const { isSharePage, openApp } = this.state;
    return (
      <PageWrapper onClick={this.handleClickPage} backImg={purple}>
        {isSharePage ? (
          <div style={{ height: '50px' }} />
        ) : (
          <Head title="同桌游戏年度成就" color="#FFFFFF" imgUrl={back} />
        )}
        <Main>
          <BorderImg src={right} />
          <Content
            index={this.state.index}
            handleChangeIndex={this.handleChangeIndex}
            handleNextPage={this.handleNextPage}
            isSharePage={isSharePage}
            {...this.state}
            pageNum={this.pages}
            showNext={this.state.showNext}
            showNextFn={this.showNext}
          />
          <BorderImg src={left} />
        </Main>
        <Foot>
          <CircleDiv>
            <PreviousPageButton onClick={this.handlePreviousPage} />
            <NextPageButton onClick={this.handleNextPage} />
            <UpButton onClick={this.handlePreviousPage} />
            <DownButton onClick={this.handleNextPage} />
            <CircleImg src={circle} />
            <PlayImg
              innerRef={(element) => {
                this.playImgRef = element;
              }}
              src={play}
            />
          </CircleDiv>
          <ShareDiv
            onClick={() => {
              bridge.openAppShareToSNS({
                title: '2018，我的同桌年度成就',
                url: shareLink,
                summary: '看看我在同桌游戏的经历',
                thumb: this.state.firstPageInfo.avatar_url
              });
            }}>
            <ShareImg src={share} />
            <WechatImg
              onClick={() => this.animateShareButton(this.wechatImgRef)}
              innerRef={(element) => {
                this.wechatImgRef = element;
              }}
              src={wechat}
            />
            <FriendImg
              onClick={() => this.animateShareButton(this.friendImgRef)}
              innerRef={(element) => {
                this.friendImgRef = element;
              }}
              src={friend}
            />
            <QQImg
              onClick={() => this.animateShareButton(this.qqImgRef)}
              innerRef={(element) => {
                this.qqImgRef = element;
              }}
              src={qq}
            />
            <QQspaceImg
              onClick={() => this.animateShareButton(this.qqspaceImgRef)}
              innerRef={(element) => {
                this.qqspaceImgRef = element;
              }}
              src={qqspace}
            />
          </ShareDiv>
        </Foot>
        {/* <div style={{ marginBottom: '50px', height: '10px' }}> */}
        <CornerImg src={corner} />
        {/* </div> */}
        {/* {isSharePage && <MyReportButton>我的年度成就></MyReportButton>} */}
        {isSharePage && (
          <MyReportButton onClick={(e) => this.handleOpenApp(e)}>我的年度成就></MyReportButton>
        )}
        <Dialog openApp={openApp} />
        <audio
          ref={this.setAudioRef}
          autoPlay
          loop
          preload="auto"
          src="../../../static/annual-report/game.mp3"
        />
      </PageWrapper>
    );
  }

  componentDidMount() {
    /* setTimeout(() => {
      this.audioRef.play();
    }, 100); */
    document.title = '同桌游戏年度成就';

    const { search, origin, pathname } = location;
    const query = queryString.parse(search);
    const { uid, token } = query;

    fetch(`${baseURL}/annual/${uid}`)
      .then((res) => {
        return res.json();
      })
      .then((resJson) => {
        console.log(resJson);
        let { user_info, annual_user_play, annual_user_with, annual_user_win } = resJson;
        // annual_user_play = [];
        // annual_user_with = [];
        // annual_user_win = [];
        let { avatar_url, username, is_vip, gender } = user_info.user;

        //注册时长
        let day = 24 * 60 * 60 * 1000;
        let diff = Date.now() - Date.parse(user_info.register_at.replace(/\-/g, '/'));
        let dayCount = Math.trunc(diff / day);
        //注册时间
        let timeArr = user_info.register_at.split(' ')[0].split('-');
        let registerTime = timeArr[0] + '年' + timeArr[1] + '月' + timeArr[2] + '日';

        let favorite_fight_game;
        let fight_count;
        let fight_win_count;
        let opponentName;
        let opponentNum;
        if (annual_user_play.favorite_fight_game) {
          favorite_fight_game = gameMap[annual_user_play.favorite_fight_game.game_id];
          fight_count = annual_user_play.favorite_fight_game.count;
          fight_win_count = annual_user_play.favorite_fight_game.win_count;
        }
        if (annual_user_with.with_user) {
          opponentName = annual_user_with.with_user.username;
        }
        opponentNum = annual_user_with.count;
        let favorite_single_game;
        let single_count;
        if (annual_user_play.favorite_single_game) {
          favorite_single_game = gameMap[annual_user_play.favorite_single_game.game_id];
          single_count = annual_user_play.favorite_single_game.count;
        }

        let friend_count = user_info.friend_count;
        let firstFriendTime;
        let friendName;
        if (friend_count) {
          let first_friend_date = user_info.first_friend.created_at;
          let firstFriendTimeArr = user_info.register_at.split(' ')[0].split('-');
          firstFriendTime = timeArr[0] + '年' + timeArr[1] + '月' + timeArr[2] + '日';
          friendName = user_info.first_friend.data.username;
        }

        let playReportArr = Object.values(annual_user_win);
        Object.is(playReportArr[0], undefined) && this.pages--;

        const {
          game_relaxation_score,
          game_speed_score,
          game_strategy_score,
          game_skill_score,
          game_hand_speed_score,
          game_chess_score
        } = annual_user_play;
        (game_relaxation_score || 0) +
          (game_speed_score || 0) +
          (game_strategy_score || 0) +
          (game_skill_score || 0) +
          (game_hand_speed_score || 0) +
          (game_chess_score || 0) ===
          0 && this.pages--;

        this.setState({
          firstPageInfo: {
            avatar_url,
            username,
            is_vip
          },
          comeDayInfo: {
            registerTime, //注册时间
            register_rank: user_info.register_rank, //注册排名
            dayCount, //注册时长
            play_count: annual_user_play.play_count || 0
          },
          annualGameInfo: {
            favorite_fight_game,
            fight_count,
            fight_win_count,
            opponentName,
            opponentNum,
            favorite_single_game,
            single_count
          },
          friendReportInfo: {
            friend_count,
            firstFriendTime,
            friendName
          },
          playReportArr,
          goodAtInfo: {
            game_relaxation_score,
            game_speed_score,
            game_strategy_score,
            game_skill_score,
            game_hand_speed_score,
            game_chess_score,
            gender
          }
        });
      });

    statistic('annual_review_page_view');

    window.TzGame = {};
    window.TzGame.shareDone = function() {
      statistic('annual_review_share');
    };
  }

  componentDidUpdate() {
    if (this.audioRef.paused) {
      this.audioRef.play();
    }
  }

  componentWillUnmount() {
    window.TzGame.shareDone = null;
  }

  animateShareButton(ref) {
    let duration = 200;
    function linear(timeFraction) {
      return timeFraction;
    }
    const draw = (progress) => {
      if (progress < 0.5) {
        ref.style.width = 82 - 20 * progress + 'px';
        ref.style.height = 87 - 20 * progress + 'px';
      } else {
        ref.style.width = 82 - 20 * (1 - progress) + 'px';
        ref.style.height = 87 - 20 * (1 - progress) + 'px';
      }
    };
    animate({
      duration: duration,
      timing: linear,
      draw: draw
    });
  }

  handleNextPage() {
    if (this.state.index == this.pages) {
      return;
    }

    let duration = 200;
    function linear(timeFraction) {
      return timeFraction;
    }
    const draw = (progress) => {
      if (progress < 0.5) {
        this.playImgRef.style.width = 200 - 40 * progress + 'px';
        this.playImgRef.style.height = 200 - 40 * progress + 'px';
      } else {
        this.playImgRef.style.width = 200 - 40 * (1 - progress) + 'px';
        this.playImgRef.style.height = 200 - 40 * (1 - progress) + 'px';
      }
    };
    animate({
      duration: duration,
      timing: linear,
      draw: draw
    });

    this.setState((state) => ({
      index: ++state.index,
      showNext: false
    }));
  }

  handlePreviousPage() {
    if (this.state.index == 0) {
      return;
    }

    let duration = 200;
    function linear(timeFraction) {
      return timeFraction;
    }
    const draw = (progress) => {
      if (progress < 0.5) {
        this.playImgRef.style.width = 200 - 40 * progress + 'px';
        this.playImgRef.style.height = 200 - 40 * progress + 'px';
      } else {
        this.playImgRef.style.width = 200 - 40 * (1 - progress) + 'px';
        this.playImgRef.style.height = 200 - 40 * (1 - progress) + 'px';
      }
    };
    animate({
      duration: duration,
      timing: linear,
      draw: draw
    });

    this.setState((state) => ({
      index: --state.index,
      showNext: false
    }));
  }

  handleChangeIndex(index) {
    this.setState({
      index,
      showNext: false
    });
  }

  showNext() {
    this.setState({
      showNext: true
    });
  }

  handleClickPage() {
    this.state.openApp &&
      this.setState({
        openApp: false
      });
  }

  handleOpenApp(e) {
    e.stopPropagation();
    // var appLink = 'tongzhuo://users/12951';
    // var iframe = document.createElement('iframe');
    // iframe.style.cssText = 'display:none;width=0;height=0';
    // iframe.src = appLink;
    // document.body.appendChild(iframe);
    setTimeout(function() {
      if (isIos) {
        window.location = 'https://itunes.apple.com/app/id1057866090';
      } else {
        window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tongzhuo.tongzhuogame';
      }
    }, 500);
    /* this.setState({
      openApp: true
    }); */
  }
}

export default AnnualReportPage;

const Main = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BorderImg = styled.img`
  height: 67.7em;
`;

const CornerImg = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
`;

const Foot = styled.footer`
  display: flex;
  margin-top: 5em;
  margin-left: 5.5em;
  margin-right: 5.5em;
  justify-content: space-between;
  align-items: center;
`;

const CircleImg = styled.img`
  //pointer-events: none;
`;
const CircleDiv = styled.div`
  position: relative;
`;

const PlayImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  width: 200px;
  height: 200px;
`;

const WechatImg = styled.img`
  position: absolute;
  top: 1em;
  left: 1em;
`;
const QQImg = styled.img`
  position: absolute;
  bottom: 1em;
  left: 1em;
`;
const QQspaceImg = styled.img`
  position: absolute;
  bottom: 1em;
  right: 1em;
`;
const FriendImg = styled.img`
  position: absolute;
  top: 1em;
  right: 1em;
`;

const ShareImg = styled.img``;
const ShareDiv = styled.div`
  position: relative;
  z-index: 999;
`;

const PreviousPageButton = styled.button`
  background: transparent;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 25px;
  top: 85px;
  border: none;
`;

const NextPageButton = styled.button`
  background: transparent;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 145px;
  top: 85px;
  border: none;
`;
const UpButton = styled.button`
  background: transparent;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 85px;
  top: 20px;
  border: none;
`;
const DownButton = styled.button`
  background: transparent;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 85px;
  bottom: 20px;
  border: none;
`;

const MyReportButton = styled.button`
  background: transparent;
  border: none;
  font-size: 2.8em;
  color: #ffffff;
  position: fixed;
  bottom: 50px;
  font-family: 'Zpix';
  left: 50%;
  transform: translate(-50%);
`;
