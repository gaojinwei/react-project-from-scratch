import React from 'react';
import styled from 'styled-components';

import net from '../../../../static/annual-report/net.png';

class GoodAt extends React.Component {
  constructor(props) {
    super(props);

    /* this.canvasRef = React.createRef(); */
    this.state = {
      shouldUpadate: true
    };
    this.setCanvasRef = (element) => {
      this.canvasRef = element;
    };
  }

  render() {
    const {
      game_relaxation_score,
      game_speed_score,
      game_strategy_score,
      game_skill_score,
      game_hand_speed_score,
      game_chess_score,
      gender
    } = this.props;
    const valueArr = [
      game_relaxation_score,
      game_speed_score,
      game_strategy_score,
      game_skill_score,
      game_hand_speed_score,
      game_chess_score
    ];
    let index = -1;
    let max = 0;
    let title = '';

    for (let i = 0; i < valueArr.length; i++) {
      if (valueArr[i] > max) {
        max = valueArr[i];
        index = i;
      }
    }

    if (
      game_relaxation_score == 100 &&
      game_speed_score == 100 &&
      game_strategy_score == 100 &&
      game_skill_score == 100 &&
      game_hand_speed_score == 100 &&
      game_chess_score == 100
    ) {
      index = -1;
    }
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const firstIndexArr = ['飙车老司机', '速度与激情', '秋名山车神', '没时间了快上车'];
    const fourthIndexArr = [
      '光速圣手',
      '空手接白刃',
      '同桌闪电侠',
      '电动小马达',
      '电光火石',
      '风驰电掣',
      '同桌博尔特',
      '超光速穿越',
      '其疾如风',
      '每秒1000下'
    ];
    const secondIndexArr = ['同桌小诸葛', '神机妙算', '运筹帷幄'];
    const techArr = ['技巧王者', '天赋异禀', '骨骼惊奇', '奇门遁甲'];
    const qiArr = ['同桌棋圣', '国士无双'];
    const foGender = gender == 0 ? '佛系少女' : '佛系少年';
    const xiuArr = ['心静海鸥知', '清心拂尘服', '心远地自偏', '独钓寒江雪', foGender];
    const fullArr = ['菩提老祖', '十项全能', '同桌超人'];
    switch (index) {
      case 0:
        title = xiuArr[getRandomInt(5)];
        break;
      case 1:
        title = firstIndexArr[getRandomInt(4)];
        break;
      case 2:
        title = secondIndexArr[getRandomInt(3)];
        break;
      case 3:
        title = techArr[getRandomInt(4)];
        break;
      case 4:
        title = fourthIndexArr[getRandomInt(10)];
        break;
      case 5:
        title = qiArr[getRandomInt(2)];
        break;
      default:
        title = fullArr[getRandomInt(3)];
        break;
    }
    return (
      <Wrapper>
        <YouCanCall>你们可以叫我</YouCanCall>
        <Title>{title}</Title>
        <CanvasWrapper>
          <NetImg src={net} />
          <canvas
            //ref={this.canvasRef}
            ref={this.setCanvasRef}
            width={400}
            height={400}
            style={{
              fontFamily: 'Zpix',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
          <TextSpan1>休闲</TextSpan1>
          <TextSpan2>竞速</TextSpan2>
          <TextSpan3>策略</TextSpan3>
          <TextSpan4>技巧</TextSpan4>
          <TextSpan5>手速</TextSpan5>
          <TextSpan6>棋牌</TextSpan6>
        </CanvasWrapper>
      </Wrapper>
    );
  }

  shouldComponentUpdate() {
    if (this.state.shouldUpadate) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {
    //const categoryArr = ['休闲', '竞速', '策略', '技巧', '手速', '棋牌'];
    if (!this.state.shouldUpadate) {
      return;
    }
    const {
      game_relaxation_score,
      game_speed_score,
      game_strategy_score,
      game_skill_score,
      game_hand_speed_score,
      game_chess_score
    } = this.props;
    const valueArr = [
      game_relaxation_score,
      game_speed_score,
      game_strategy_score,
      game_skill_score,
      game_hand_speed_score,
      game_chess_score
    ];

    let max = 0;
    for (const item of valueArr) {
      item > max && (max = item);
    }

    //const context = this.canvasRef.current.getContext('2d');
    const context = this.canvasRef.getContext('2d');
    const canvasCenter = 200;
    const r = 349 / 2;
    const angle = (Math.PI * 2) / 6;

    context.save();
    context.beginPath();
    for (let i = 0; i < 6; i++) {
      let x = canvasCenter + (r * Math.cos(angle * i) * valueArr[i]) / max;
      let y = canvasCenter + (r * Math.sin(angle * i) * valueArr[i]) / max;
      context.lineTo(x, y);
    }
    context.closePath();
    context.fillStyle = 'rgba(87,255,249,0.5)';
    context.fill();

    for (let i = 0; i < 6; i++) {
      let x = canvasCenter + (r * Math.cos(angle * i) * valueArr[i]) / max;
      let y = canvasCenter + (r * Math.sin(angle * i) * valueArr[i]) / max;
      //let x = canvasCenter + r * Math.cos(angle * i);
      //let y = canvasCenter + r * Math.sin(angle * i);

      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fillStyle = 'rgba(124,255,250,1)';
      context.fill();
    }
    /* setTimeout(() => {
      for (let i = 0; i < 6; i++) {
        let x = canvasCenter + r * Math.cos(angle * i);
        let y = canvasCenter + r * Math.sin(angle * i);

        context.font = '30px Zpix';
        context.fillStyle = '#FFFFFF';
        context.fillText('哈哈', x, y);
      }
    }, 500); */

    context.restore();
    this.setState({
      shouldUpadate: false
    });
  }
}

export default GoodAt;

const Wrapper = styled.div`
  font-size: 2.8em;
  line-height: 55px;
  position: relative;
  top: 0px;
`;

const YouCanCall = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
`;

const Title = styled.div`
  background-image: linear-gradient(-148deg, #3be2bc 0%, #1b96f1 100%);
  border-radius: 20px;
  width: 272px;
  height: 96px;
  font-size: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 20px;
`;

const NetImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CanvasWrapper = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
`;

const TextSpan1 = styled.span`
  position: absolute;
  left: 435px;
  top: 220px;
`;
const TextSpan2 = styled.span`
  position: absolute;
  left: 338px;
  top: 398px;
`;
const TextSpan3 = styled.span`
  position: absolute;
  left: 105px;
  top: 398px;
`;
const TextSpan4 = styled.span`
  position: absolute;
  left: 8px;
  top: 220px;
`;
const TextSpan5 = styled.span`
  position: absolute;
  left: 105px;
  top: 47px;
`;

const TextSpan6 = styled.span`
  position: absolute;
  left: 338px;
  top: 47px;
`;
