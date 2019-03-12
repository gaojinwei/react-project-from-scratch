import React from "react";
import styled, { keyframes } from "styled-components";
import bridge from "../../plugins/bridge";

let isiOS = true;

let height = 2.2 * 750;

const staicPath = "/static/three_kingdom";

if (typeof navigator != "undefined") {
  const u = navigator.userAgent;
  isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const w = window.screen.width;
  const h = window.screen.height;
  height = (h / w) * 750;
}

const Wrap = styled.div`
  position: relative;
  padding-bottom: 220px;
  width: 750px;
  min-height: ${height}px;
  box-sizing: border-box;
  color: #fff;
  font-size: 40px;
  overflow: hidden;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 40px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.4);
  border: none;
  border-radius: 100%;
  z-index: 100;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    transform-origin: 50% 50%;
    width: 26px;
    height: 4px;
    border-radius: 2px;
    background: #fff;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    transform-origin: 50% 50%;
    width: 26px;
    height: 4px;
    border-radius: 2px;
    background: #fff;
  }
`;

const VideoWrap = styled.div`
  position: relative;
  width: 750px;
  height: 422px;
  background: rgba(0, 0, 0, 0.91);
  z-index: 10;
  overflow: hidden;
`;

const VideoBtn = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background-color: rgba(255, 255, 255, 0.2);
  background-image: url("/static/wildernessCombat3/playIcon.png");
  background-repeat: no-repeat;
  background-position: 70px 50%;
  transform-origin: 50% 50%;
  border-radius: 50%;
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  transition: all 10s ease;
`;

const Loading = styled.div`
  background-image: url("/static/westward-journey/loading.gif");
  opacity: ${({ hidden }) => (hidden ? 0 : 1)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background-size: 100%;
  background-repeat: no-repeat;
`;

const TitleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.h1`
  margin: 40px 0 0 70px;
  padding: 0;
  height: 60px;
  font-family: PingFangSC-Semibold;
  font-size: 42px;
  line-height: 60px;
  color: #140f1a;
`;

const Share = styled.img`
  width: 75px;
  height: 75px;
  margin: 40px 60px 0 0;
`;

const LittleTitle = styled.h2`
  margin: 40px 0 0 70px;
  height: 48px;
  font-family: PingFangSC-Semibold;
  font-size: 34px;
  line-height: 48px;
  color: #140f1a;
`;

const Paragraph = styled.p`
  margin: 12px 70px 0 70px;
  padding: 0;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  line-height: 40px;
  color: #140f1a;
  letter-spacing: 0;
  text-align: justify;
`;

const ViewWrap = styled.div`
  margin: 40px 0 0 50px;
  width: 100%;
  height: 530px;
  box-sizing: border-box;
  overflow: hidden;
`;

const marginLeft = keyframes`
  0% {
    margin-left: 0;
  }
  50% {
    margin-left: -1256px;
  }
  100% {
    margin-left: 0;
  }
`;

const BlockWrap = styled.div`
  width: 1956px;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;
  justify-content: space-between;
  animation: ${marginLeft} 8s 0.2s linear infinite;
  font-family: PingFangSC-Regular;
`;

const BlockAvatar = styled.div`
  width: 372px;
  height: 530px;
  background-color: #222;
  background-image: url(${({ src }) => `'${src}'`});
  border-radius: 20px;
  background-size: 100%;
`;

const BottomBanner = styled.div`
  position: fixed;
  left: 30px;
  bottom: 0px;
  margin: 20px auto;
  padding: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 690px;
  height: 148px;
  border-radius: 24px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0px 0px 30px #555;
`;

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background-image: url("https://static.app.new.tongzhuogame.com/promotions/mhxy_logo.png");
  background-size: 100% 100%;
  border-radius: 10px;
`;

const BannerContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100px;
  padding-left: 20px;
`;

const BannerTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  font-weight: 700;
  line-height: 50px;
  color: #140f1a;
`;

const BannerLittleTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  font-weight: 400;
  color: #140f1a;
  line-height: 33px;
`;

const ScaleAnimation = keyframes`
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
`;

const BannerBtn = styled.button`
  width: 162px;
  height: 60px;
  animation: 2s ${ScaleAnimation} infinite;
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background: #ff2777;
  border: none;
  border-radius: 30px;
  font-weight: 700;
`;

// const items = [
//   `${staicPath}/1.jpg`,
//   `${staicPath}/2.jpg`,
//   `${staicPath}/3.jpg`,
//   `${staicPath}/4.jpg`,
//   `${staicPath}/5.jpg`
// ];
const items = [
  `https://static.app.new.tongzhuogame.com/promotions/mhxy_1.png`,
  `https://static.app.new.tongzhuogame.com/promotions/mhxy_2.png`,
  `https://static.app.new.tongzhuogame.com/promotions/mhxy_3.png`,
  `https://static.app.new.tongzhuogame.com/promotions/mhxy_4.png`,
  `https://static.app.new.tongzhuogame.com/promotions/mhxy_5.png`
];

export default class ThreeKingdom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoBtnHidden: false,
      hideLoading: true,
      mes: ""
    };
  }
  render() {
    return (
      <Wrap>
        {this.state.mes}
        <CloseBtn
          onClick={() => {
            bridge.openAppToBackPage();
          }}
        />
        <VideoWrap
          onClick={e => {
            window.e = e;
            if (this.videoEle.paused) {
              this.videoEle.play();
            } else {
              this.videoEle.pause();
            }
          }}
        >
          <img
            ref={ele => {
              this.imgEle = ele;
            }}
            style={{
              display: "none"
            }}
            src={`https://static.app.new.tongzhuogame.com/promotions/mhxy_post.png`}
            width="750px"
            height="422px"
          />
          <video
            //style={{ objectFit: "fill" }}
            width="100%"
            height="150%"
            poster={`https://static.app.new.tongzhuogame.com/promotions/mhxy_post.png`}
            ref={ele => {
              this.videoEle = ele;
            }}
            src="https://static.app.new.tongzhuogame.com/promotions/mhxy_video.mp4"
            webkit-playsinline="true"
            playsInline="playsinline"
            x-webkit-airplay="true"
            //x5-video-player-type="h5"
            //x5-video-player-fullscreen="false"
            x5-playsinline="true"
            x5-video-ignore-metadata="true"
            preload="auto"
          />
          <VideoBtn hidden={this.state.videoBtnHidden} />
          <Loading hidden={this.state.hideLoading} />
        </VideoWrap>
        <TitleWrap>
          <Title>简介</Title>
          <Share
            src={`${staicPath}/share.png`}
            onClick={() => {
              return bridge.openAppShareToSNS({
                title: "我正在玩梦幻西游，快来跟我一起~",
                url:
                  "https://web.activity.app.new.tongzhuogame.com/activity/westward-journey.html",
                summary: "我正在玩梦幻西游，快来跟我一起~",
                thumb:
                  "https://static.app.new.tongzhuogame.com/promotions/mhxy_logo.png"
              });
            }}
          />
        </TitleWrap>
        <LittleTitle>国民级回合制手游</LittleTitle>
        <Paragraph>
          蚩尤动乱，仙魔大战。或投身于两方之一，或自成一伍，一场人、仙、魔三界混战就此拉开帷幕。一切都是未知，等你来探寻！
        </Paragraph>
        <ViewWrap>
          <BlockWrap>
            {items.map(item => (
              <BlockAvatar key={item} src={item} />
            ))}
          </BlockWrap>
        </ViewWrap>
        <BottomBanner
          onClick={() => {
            // if (isiOS) {
            //   return bridge.openAppToAppStore({
            //     itunes_url:
            //       'https://itunes.apple.com/us/app/%E8%8D%92%E9%87%8E%E5%A4%A7%E4%BD%9C%E6%88%98-%E6%96%B0%E7%89%88%E6%9D%A5%E8%A2%AD/id1236753785?l=zh&ls=1&mt=8'
            //   });
            // }
            let a = document.createElement("a");
            a.href =
              "https://ally.gdl.netease.com/g18_netease_pconline_dev_1.214.0_com.netease.my_19fq3SX.apk";
            a.download = "z";
            a.click();
          }}
        >
          <Avatar />
          <BannerContent>
            <BannerTitle>梦幻西游</BannerTitle>
            <BannerLittleTitle>国民级回合制手游</BannerLittleTitle>
          </BannerContent>
          <BannerBtn>开始游戏</BannerBtn>
        </BottomBanner>
      </Wrap>
    );
  }
  componentWillMount() {
    if (typeof document != "undefined") {
      document.title = "梦幻西游";
    }
  }
  componentDidMount() {
    this.videoEle.onplay = () => {
      this.timer = this.setState({
        videoBtnHidden: true
      });
    };
    this.videoEle.onpause = this.videoEle.onended = () => {
      this.setState({
        videoBtnHidden: false,
        hideLoading: true
      });
    };
    this.videoEle.onwaiting = () => {
      this.setState({
        hideLoading: false
      });
    };
    this.videoEle.oncanplay = () => {
      this.setState({
        hideLoading: true
      });
    };
  }
}
