import React from "react";
import styled, { injectGlobal, keyframes } from "styled-components";
import SwipeableViews from "react-swipeable-views";

import contentBorder from "../../../../static/annual-report/contentBorder.png";
import darkBlue from "../../../../static/annual-report/darkBlue.png";

import next from "../../../../static/annual-report/next.png";

import Zpix from "../../../../static/annual-report/Zpix.ttf";

import ComeDay from "./ComeDay";
import AnnualGame from "./AnnualGame";
import GoodAt from "./GoodAt";
import FirstPage from "./FirstPage";
import FriendReport from "./FriendReport";
import PlayReport from "./PlayReport";
import DeskmateGame from "./DeskmateGame";

/* injectGlobal`
  @font-face {
    font-family: Zpix;
    src: url('${Zpix}') ;
  }
`; */

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      index,
      handleChangeIndex,
      handleNextPage,
      isSharePage,
      firstPageInfo,
      comeDayInfo,
      annualGameInfo,
      friendReportInfo,
      playReportArr,
      goodAtInfo,
      pageNum,
      showNext,
      showNextFn
    } = this.props;
    /* let game_relaxation_score;
    let game_speed_score;
    let game_strategy_score;
    let game_skill_score;
    let game_hand_speed_score;
    let game_chess_score; */
    if (goodAtInfo) {
      var {
        game_relaxation_score,
        game_speed_score,
        game_strategy_score,
        game_skill_score,
        game_hand_speed_score,
        game_chess_score
      } = goodAtInfo;
    }

    const boolean1 = playReportArr && !Object.is(playReportArr[0], undefined);
    const boolean2 = !(
      (game_relaxation_score || 0) +
        (game_speed_score || 0) +
        (game_strategy_score || 0) +
        (game_skill_score || 0) +
        (game_hand_speed_score || 0) +
        (game_chess_score || 0) ===
      0
    );
    let renderdSwipeableViews = (
      <SwipeableViews
        axis="y"
        style={{ height: "78em" }}
        animateHeight={true}
        index={index}
        onChangeIndex={index => {
          handleChangeIndex(index);
        }}
        springConfig={{
          duration: "1s",
          easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
          delay: "0s"
        }}
        onTransitionEnd={() => {
          showNextFn();
        }}
      >
        <SwipeableWrapper>
          <FirstPage handleChangeIndex={handleChangeIndex} {...firstPageInfo} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <ComeDay {...comeDayInfo} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <AnnualGame {...annualGameInfo} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <FriendReport {...friendReportInfo} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <PlayReport playReportArr={playReportArr} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <GoodAt {...goodAtInfo} />
        </SwipeableWrapper>
        <SwipeableWrapper>
          <DeskmateGame isSharePage={isSharePage} />
        </SwipeableWrapper>
      </SwipeableViews>
    );

    if (boolean1 && !boolean2) {
      renderdSwipeableViews = (
        <SwipeableViews
          axis="y"
          style={{ height: "78em" }}
          animateHeight={true}
          index={index}
          onChangeIndex={index => {
            handleChangeIndex(index);
          }}
          springConfig={{
            duration: "1s",
            easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
            delay: "0s"
          }}
          onTransitionEnd={() => {
            //showNextFn();
            console.log("end");
          }}
        >
          <SwipeableWrapper>
            <FirstPage
              handleChangeIndex={handleChangeIndex}
              {...firstPageInfo}
            />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <ComeDay {...comeDayInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <AnnualGame {...annualGameInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <FriendReport {...friendReportInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <PlayReport playReportArr={playReportArr} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <DeskmateGame isSharePage={isSharePage} />
          </SwipeableWrapper>
        </SwipeableViews>
      );
    }

    if (!boolean1 && boolean2) {
      renderdSwipeableViews = (
        <SwipeableViews
          axis="y"
          style={{ height: "78em" }}
          animateHeight={true}
          index={index}
          onChangeIndex={index => {
            handleChangeIndex(index);
          }}
          springConfig={{
            duration: "1s",
            easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
            delay: "0s"
          }}
          onTransitionEnd={() => {
            showNextFn();
          }}
        >
          <SwipeableWrapper>
            <FirstPage
              handleChangeIndex={handleChangeIndex}
              {...firstPageInfo}
            />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <ComeDay {...comeDayInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <AnnualGame {...annualGameInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <FriendReport {...friendReportInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <GoodAt {...goodAtInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <DeskmateGame isSharePage={isSharePage} />
          </SwipeableWrapper>
        </SwipeableViews>
      );
    }

    if (!boolean1 && !boolean2) {
      renderdSwipeableViews = (
        <SwipeableViews
          axis="y"
          style={{ height: "78em" }}
          animateHeight={true}
          index={index}
          onChangeIndex={index => {
            handleChangeIndex(index);
          }}
          springConfig={{
            duration: "1s",
            easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
            delay: "0s"
          }}
          onTransitionEnd={() => {
            //showNextFn();
            console.log("end");
          }}
        >
          <SwipeableWrapper>
            <FirstPage
              handleChangeIndex={handleChangeIndex}
              {...firstPageInfo}
            />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <ComeDay {...comeDayInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <AnnualGame {...annualGameInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <FriendReport {...friendReportInfo} />
          </SwipeableWrapper>
          <SwipeableWrapper>
            <DeskmateGame isSharePage={isSharePage} />
          </SwipeableWrapper>
        </SwipeableViews>
      );
    }
    return (
      <ContenDiv>
        <Border src={contentBorder} />
        {renderdSwipeableViews}
        {index != 0 && index != pageNum && showNext && (
          <NextButton onClick={handleNextPage}>
            <NextImg src={next} />
          </NextButton>
        )}
      </ContenDiv>
    );
  }

  componentDidUpdate() {
    /* setTimeout(() => {
      document.getElementsByClassName(
        "react-swipeable-view-container"
      )[0].style.transition =
        "transform 1s cubic-bezier(0.15, 0.3, 0.25, 1) 0s, height 1s cubic-bezier(0.15, 0.3, 0.25, 1) 0s";
    }, 100); */
    //不支持组件onTransitionEnd的迂回之术。。。。。。。。。
    /* setTimeout(() => {
      !this.props.showNext && this.props.showNextFn();
    }, 1000); */
  }
}

export default Content;

const SwipeableWrapper = styled.div`
  height: 78em;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 530px;
`;

const NextImg = styled.img``;

const OpacityAnimation = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

const NextButton = styled.button`
  animation: 1s ${OpacityAnimation} infinite;
  position: absolute;
  bottom: 100px;
  width: 5em;
  height: 5em;
  background: transparent;
  border: none;
  left: 50%;
  transform: translate(-50%);
`;

const Border = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContenDiv = styled.div`
    background: url("${darkBlue}");
    background-size: 100%;
    background-size: cover;
    width: 55.9em;
    height: 89.1em;
    position: relative;
    border-radius: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    * {
        font-family: 'Zpix';
        color: #FFFFFF;
    }
`;
