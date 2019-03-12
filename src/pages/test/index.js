import React from "react";

import SwipeableViews from "./SwipeableViews";
//import SwipeableViews from "./swipeable";
import autoPlay from "./autoPlay";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      slidesNum: 0
    };
  }

  setSlidesNum = num => {
    this.setState({
      slidesNum: num
    });
  };

  nextPage = () => {
    //if (this.state.index < this.state.slidesNum - 1) {
    this.setState(state => {
      return { index: state.index + 1 };
    });
    //}
  };
  previousPage = () => {
    if (this.state.index > 0) {
      this.setState(state => {
        return { index: state.index - 1 };
      });
    }
  };
  render() {
    let index = this.state.index;
    return (
      <React.Fragment>
        <div style={{ height: "500px" }}>
          <AutoPlaySwipeableViews
            //style={{ height: "400px" }}
            //containerStyle={{ height: "400px" }}
            //animateHeight={true}
            //axis="y"
            springConfig={{
              duration: "1s",
              easeFunction: "cubic-bezier(0.15, 0.3, 0.25, 1)",
              delay: "0s"
            }}
            //index={index}
            //setSlidesNum={this.setSlidesNum}
            onTransitionEnd={() => {
              console.log("end");
            }}
          >
            <div style={{ background: "red ", height: "400px" }}>0</div>
            <div style={{ background: "blue", height: "400px" }}>1</div>
            <div style={{ background: "yellow", height: "400px" }}>2</div>
            <div style={{ background: "green", height: "400px" }}>3</div>
          </AutoPlaySwipeableViews>
        </div>
        <button onClick={this.previousPage} style={{ fontSize: "30px" }}>
          上一页
        </button>
        <button onClick={this.nextPage} style={{ fontSize: "30px" }}>
          下一页
        </button>
      </React.Fragment>
    );
  }
}

export default Test;
