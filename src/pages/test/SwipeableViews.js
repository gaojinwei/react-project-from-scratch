import React from "react";
import transitionInfo from "dom-helpers/transition/properties";
import addEventListener from "dom-helpers/events/on";

const axisProperties = {
  root: {
    x: {
      overflowX: "hidden"
    },
    "x-reverse": {
      overflowX: "hidden"
    },
    y: {
      overflowY: "hidden"
    },
    "y-reverse": {
      overflowY: "hidden"
    }
  },
  flexDirection: {
    x: "row",
    "x-reverse": "row-reverse",
    y: "column",
    "y-reverse": "column-reverse"
  },
  rotationMatrix: {
    x: {
      x: [1, 0],
      y: [0, 1]
    },
    "x-reverse": {
      x: [-1, 0],
      y: [0, 1]
    },
    y: {
      x: [0, 1],
      y: [1, 0]
    },
    "y-reverse": {
      x: [0, -1],
      y: [1, 0]
    }
  },
  length: {
    x: "width",
    "x-reverse": "width",
    y: "height",
    "y-reverse": "height"
  },
  //计算container的偏移量
  transform: {
    x: translate => `translate(${-translate}%, 0)`,
    "x-reverse": translate => `translate(${translate}%, 0)`,
    y: translate => `translate(0, ${-translate}%)`,
    "y-reverse": translate => `translate(0, ${translate}%)`
  }
};

function createTransition(property, options) {
  const { duration, easeFunction, delay } = options;

  return `${property} ${duration} ${easeFunction} ${delay}`;
}

function applyRotationMatrix(touch, axis) {
  const rotationMatrix = axisProperties.rotationMatrix[axis];

  return {
    pageX:
      rotationMatrix.x[0] * touch.pageX + rotationMatrix.x[1] * touch.pageY,
    pageY: rotationMatrix.y[0] * touch.pageX + rotationMatrix.y[1] * touch.pageY
  };
}

function computeIndex(params) {
  const { children, startIndex, startX, pageX, viewLength } = params;

  const indexMax = React.Children.count(children) - 1;
  //初始点与当前touch点的距离长度与容器长度相除，在0到1之间
  let index = startIndex + (startX - pageX) / viewLength;

  if (index < 0) {
    //index = Math.exp(index * constant.RESISTANCE_COEF) - 1;
    index = 0;
  } else if (index > indexMax) {
    //index = indexMax + 1 - Math.exp((indexMax - index) * constant.RESISTANCE_COEF);
    index = indexMax;
  }

  return {
    index
  };
}

class SwipeableViews extends React.Component {
  //默认一开始第一页
  indexCurrent = 0;

  constructor(props) {
    super(props);
    this.state = {
      //是否在拖拽，解决两个问题，1.如果在拖拽，不会回调onTransitionEnd
      //2.拖拽时页面的translate方式不受springConfig影响，不该有任何transition效果，而是直接响应
      isDragging: false
    };

    this.rootNode = null;

    this.containerNode = null;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.setIndexCurrent(0);
  }

  //indexCurrent为一连续值，不需要为整数，根据其值对container进行偏移
  //也就是拖动slides和真正滑入上下页事件都会处理
  setIndexCurrent(indexCurrent) {
    this.indexCurrent = indexCurrent;

    if (this.containerNode) {
      const { axis } = this.props;
      const transform = axisProperties.transform[axis](indexCurrent * 100);
      //翻页时containerNode的transform为100%，因此如果为axis="y"，必须设置containerNode的高度
      this.containerNode.style.WebkitTransform = transform;
      this.containerNode.style.transform = transform;
    }

    /* if (this.props.onTransitionEnd) {
      this.props.onTransitionEnd();
    } */
  }

  handleTouchStart(event) {
    console.log("start");

    const { axis } = this.props;

    //touch开始的坐标
    const touch = applyRotationMatrix(event.touches[0], axis);

    //容器长度
    this.viewLength = this.rootNode.getBoundingClientRect()[
      axisProperties.length[axis]
    ];
    this.startX = touch.pageX;
    this.lastX = touch.pageX;
    //用来算是否迅速滑动
    this.vx = 0;
    this.startY = touch.pageY;
    this.isSwiping = undefined;
    //开始滑动
    this.started = true;

    //计算this.startIndex，即当前在第几页滑动，注意与this.indexCurrent不同，这是非连续的，只能是0，1，2这样的整数
    //touch开始时偏移量必然是根容器长度的整数倍
    const computedStyle = window.getComputedStyle(this.containerNode);
    const transform =
      computedStyle.getPropertyValue("-webkit-transform") ||
      computedStyle.getPropertyValue("transform");
    const transformValues = transform
      .split("(")[1]
      .split(")")[0]
      .split(",");
    const rootStyle = window.getComputedStyle(this.rootNode);

    const tranformNormalized = applyRotationMatrix(
      {
        pageX: parseInt(transformValues[4], 10), //x轴真实偏移量
        pageY: parseInt(transformValues[5], 10)
      },
      axis
    );

    this.startIndex =
      -tranformNormalized.pageX /
        (this.viewLength -
          parseInt(rootStyle.paddingLeft, 10) -
          parseInt(rootStyle.paddingRight, 10)) || 0;
  }

  handleTouchMove() {
    console.log("move");
    //return;

    const { axis, children, onSwitching } = this.props;
    const touch = applyRotationMatrix(event.touches[0], axis);

    if (this.isSwiping === undefined) {
      const dx = Math.abs(touch.pageX - this.startX);
      const dy = Math.abs(touch.pageY - this.startY);

      const isSwiping = dx > dy && dx > 3;

      this.isSwiping = isSwiping;
    }

    //相同的距离迅速滑动时touchMove事件回调调用次数比较少，this.vx算出的值会更大，在touchEnd回调中判断大于5认为为迅速滑动
    //>0是在左滑，index趋势是变小，<0右滑，index趋势是变大
    this.vx = this.vx * 0.5 + (touch.pageX - this.lastX) * 0.5;
    //记录当前触发点作为下次触发点的比对点
    this.lastX = touch.pageX;

    //计算连续的this.indexCurrent
    const { index } = computeIndex({
      children,
      pageX: touch.pageX,
      startIndex: this.startIndex,
      startX: this.startX,
      viewLength: this.viewLength
    });

    //根据this.indexCurrent改变container偏移量
    this.setIndexCurrent(index);

    const callback = () => {
      //onSwitching回调，当需要实现跟当前silde位置相关（index值连续）的功能时需要
      if (onSwitching) {
        onSwitching(index, "move");
      }
    };

    if (!this.state.isDragging) {
      this.setState({
        isDragging: true
      });
    }

    callback();
  }

  handleTouchEnd() {
    //当下在第几页
    const indexLatest = this.startIndex;
    //当前滑动到哪
    const indexCurrent = this.indexCurrent;
    //偏移量，0到1之间
    const delta = indexLatest - indexCurrent;

    //即将滑到第几页
    let indexNew;

    //快速滑动
    if (Math.abs(this.vx) > 5) {
      if (this.vx > 0) {
        indexNew = Math.floor(indexCurrent);
      } else {
        indexNew = Math.ceil(indexCurrent);
      }
      //或者偏移量大于0.6
    } else if (Math.abs(delta) > 0.6) {
      // Some hysteresis with indexLatest.
      indexNew = delta > 0 ? Math.floor(indexCurrent) : Math.ceil(indexCurrent);
      //否则如果滑动慢或者滑动程度不够，仍在当前页
    } else {
      indexNew = indexLatest;
    }

    const indexMax = React.Children.count(this.props.children) - 1;

    if (indexNew < 0) {
      indexNew = 0;
    } else if (indexNew > indexMax) {
      indexNew = indexMax;
    }

    this.setIndexCurrent(indexNew);

    this.setState(
      {
        isDragging: false
      },
      () => {
        if (this.props.onSwitching) {
          this.props.onSwitching(indexNew, "end");
        }

        //如果不是停留当前页，调用回调onChangeIndex
        if (this.props.onChangeIndex && indexNew !== indexLatest) {
          this.props.onChangeIndex(indexNew, indexLatest, {
            reason: "swipe"
          });
        }
      }
    );

    //与move不同，传的是即将滑到第几页的值而非连续值
    /* if (this.props.onSwitching) {
      this.props.onSwitching(indexNew, "end");
    } */
  }

  handleTransitionEnd() {
    if (!this.props.onTransitionEnd) {
      return;
    }

    //如果是在拖拽，onTransitionEnd不会执行
    if (!this.state.isDragging) {
      this.props.onTransitionEnd();
    }
  }

  render() {
    //style给最外层div提供
    //containerStyle针对axis="y"的情况，需要给container提供height
    //axis="x"不需要是因为width默认都为100%，而height会被子元素撑大
    //这里起别名containerStyleProp
    const {
      axis,
      children,
      springConfig,
      style,
      containerStyle: containerStyleProp
    } = this.props;

    const { isDragging } = this.state;

    let transition;

    if (isDragging) {
      //拖拽不该有transition效果
      transition = "all 0s ease 0s";
    } else {
      transition = createTransition("transform", springConfig);
    }

    const containerStyle = {
      height: null,
      flexDirection: axisProperties.flexDirection[axis],
      transition,
      direction: "ltr",
      display: "flex",
      transform: axisProperties.transform[axis](this.indexCurrent * 100)
      //willChange: "transform"
    };

    const slideStyle = {
      width: "100%",
      flexShrink: 0,
      overflow: "auto"
    };

    const touchEvents = {
      onTouchStart: this.handleTouchStart,
      onTouchMove: this.handleTouchMove,
      onTouchEnd: this.handleTouchEnd
    };
    return (
      //最外层div，溢出隐藏，默认水平滑
      <div
        ref={node => (this.rootNode = node)}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...touchEvents}
      >
        <div
          ref={node => (this.containerNode = node)}
          style={Object.assign({}, containerStyle, containerStyleProp)}
        >
          {React.Children.map(children, child => {
            return <div style={slideStyle}>{child}</div>;
          })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    //提供额外的setSlidesNum属性，通知外部有多少slides，适用于slides数量动态变化的情况
    if (this.props.setSlidesNum) {
      const num = React.Children.count(this.props.children);
      this.props.setSlidesNum(num);
    }

    //针对非拖拽事件的页面切换完成事件，回调onTransitionEnd
    //实际上每次调用this.setIndexCurrent造成的transform属性的改变都会被响应
    //handleTransitionEnd中判断是否在拖拽，如果是，不作处理
    addEventListener(this.containerNode, transitionInfo.end, event => {
      if (event.target !== this.containerNode) {
        return;
      }

      this.handleTransitionEnd();
    });
  }

  //原作者写在componentWillReceiveProps中，v17后不再可用
  //我一开始直接写在render中，直接拿props中的index调用，这样有个问题，拖拽导致的
  //state中的isDragging发生改变，这里主要是handleTouchEnd后，isDragging重新
  //置为false从而导致重新render，而props中的index并未变化，
  //调用setIndexCurrent导致仍在当前页无法翻页
  //通过componentDidUpdate判断重新render时也就是isDragging变化时props中的index是否
  //变化，实际这里就是只对props的变化响应，原作者的componentWillReceiveProps作用相同
  //https://reactjs.org/docs/react-component.html#componentdidupdate
  componentDidUpdate(prevProps) {
    if (this.props.index !== prevProps.index) {
      //跳转整数页，针对非滑动事件，如点击按钮触发翻页，配合tabs等
      this.setIndexCurrent(this.props.index);
    }
  }
}

SwipeableViews.defaultProps = {
  axis: "x",
  springConfig: {
    duration: "0.35s",
    easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
    delay: "0s"
  }
};

export default SwipeableViews;
