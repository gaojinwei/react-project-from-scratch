import React from "react";
import PropTypes from "prop-types";
import shallowEqual from "fbjs/lib/shallowEqual";

function mod(n, m) {
  const q = n % m;
  return q < 0 ? q + m : q;
}

export default function autoPlay(MyComponent) {
  class AutoPlay extends React.Component {
    timer = null;

    constructor(props) {
      super(props);
      this.state.index = props.index || 0;
    }

    state = {};

    componentDidMount() {
      this.startInterval();
    }

    /* componentDidUpdate(prevProps) {
        //如果这些这些值不再相等，重置Interval
      const shouldResetInterval = !shallowEqual(
        {
          index: prevProps.index,
          interval: prevProps.interval,
          autoplay: prevProps.autoplay
        },
        {
          index: this.props.index,
          interval: this.props.interval,
          autoplay: this.props.autoplay
        }
      );

      if (shouldResetInterval) {
        this.startInterval();
      }
    } */

    componentWillUnmount() {
      clearInterval(this.timer);
    }

    handleInterval = () => {
      const { children, onChangeIndex } = this.props;

      //当前index
      const indexLatest = this.state.index;

      //下一个index
      let indexNew = indexLatest;

      indexNew += 1;

      if (children) {
        indexNew = mod(indexNew, React.Children.count(children));
      }

      // autoPlay时暂不可外部更改index
      if (this.props.index === undefined) {
        this.setState({
          index: indexNew
        });
      }

      if (onChangeIndex) {
        onChangeIndex(indexNew, indexLatest);
      }
    };

    handleChangeIndex = (index, indexLatest) => {
      // Is uncontrolled
      if (this.props.index === undefined) {
        this.setState({
          index
        });
      }

      if (this.props.onChangeIndex) {
        this.props.onChangeIndex(index, indexLatest);
      }
    };

    //如果正在Switching，即拖拽时，暂停Interval，直到拖拽结束重置Interval
    //见handleTouchEnd最后部分
    //而拖拽后的重置如何知道当前index？因为拖拽可能导致index变化，而这里并未
    //感知，实际handleTouchEnd中在调用这里重置的回调后，立马回调onChangeIndex，
    //这里传给onChangeIndex的是handleChangeIndex，在state中更新了index
    handleSwitching = (index, type) => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else if (type === "end") {
        this.startInterval();
      }

      if (this.props.onSwitching) {
        this.props.onSwitching(index, type);
      }
    };

    //清除并开始新的Interval
    startInterval() {
      const { interval } = this.props;

      clearInterval(this.timer);

      this.timer = setInterval(this.handleInterval, interval);
    }

    render() {
      console.log("autoRender");
      const { interval, ...other } = this.props;

      const { index } = this.state;

      return (
        <MyComponent
          index={index}
          onChangeIndex={this.handleChangeIndex}
          onSwitching={this.handleSwitching}
          {...other}
        />
      );
    }
  }

  AutoPlay.defaultProps = {
    interval: 3000
  };

  return AutoPlay;
}
