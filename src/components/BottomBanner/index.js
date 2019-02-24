import React from 'react';
import styled, { keyframes } from 'styled-components';

const BottomBanner = styled.div`
  position: fixed;
  left: 0;
  bottom: 0px;
  padding: 0 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  background: #fff;
  box-sizing: border-box;
`;

const Avatar = styled.div`
  height: 100px;
  width: 275px;
  background-image: url('/static/tz-download.png');
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
  font-weight: 600;
  line-height: 50px;
  color: #140f1a;
`;

const BannerLittleTitle = styled.h4`
  margin: 0;
  padding: 0;
  font-family: PingFangSC-Regular;
  font-size: 24px;
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
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  background: #ff2777;
  border: none;
  border-radius: 30px;
`;

export default class DownloadBanner extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { schemeURL } = this.props;
    return (
      <BottomBanner
        onClick={() => {
          let appLink = schemeURL
          let isAndroid = !!navigator.userAgent.match(/android/ig);
          if(isAndroid) {
            let iframe = document.createElement('iframe');
            iframe.style.cssText = 'display:none;width=0;height=0';
            iframe.src = appLink;
            document.body.appendChild(iframe);
            setTimeout(function() {
                window.location = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tongzhuo.tongzhuogame';
            }, 500);
          } else {
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.tongzhuo.tongzhuogame';
          }
        }}>
        <Avatar />
        {/* <BannerContent>
          <BannerTitle>同桌游戏</BannerTitle>
          <BannerLittleTitle>随时随地，一起小游</BannerLittleTitle>
        </BannerContent> */}
        <BannerBtn>下载</BannerBtn>
      </BottomBanner>
    )
  }
}