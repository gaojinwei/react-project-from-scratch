import React from "react";
import styled from "styled-components";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import fetch from "cross-fetch";
import queryString from "query-string";
import LazyLoad from "react-lazyload";

import UserInfo from "./UserInfo";
import RankListWrapper from "./RankListWrapper";
import LastWeekStarWrapper from "./LastWeekStarWrapper";
import { statistic } from "../../../plugins/bridge";

const baseURL =
  process.env.environment !== "production"
    ? "https://debug.activity.app.new.tongzhuogame.com"
    : "https://activity.app.new.tongzhuogame.com";

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      starList: [],
      giftList: [],
      topUsers: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  render() {
    console.log("render", this.state);
    const { index, starList, giftList, topUsers } = this.state;
    const { classes } = this.props;

    let mapFn = (value, index, listType) => {
      let uid = value.user.uid;
      //之前每次切换tab，每个tab的UserInfo都会重新render，所以listType被重新全部赋值，
      //也就是要不头像都可点要不都不行，现在改成首次渲染时写死
      return (
        <LazyLoad height={151} key={uid} overflow={true}>
          <UserInfo
            key={uid}
            uid={uid}
            value={value}
            rank={index + 1}
            //listType={this.props.listType}
            listType={listType}
          />
        </LazyLoad>
      );
    };
    const starListComponent = starList.map((value, index) =>
      mapFn(value, index, 0)
    );
    const giftListComponent = giftList.map((value, index) =>
      mapFn(value, index, 1)
    );

    return (
      <React.Fragment>
        <Tabs
          value={index}
          onChange={this.handleChange}
          style={{ color: "white", marginLeft: "10px" }}
          classes={{ indicator: classes.tabsIndicator }}
        >
          <Tab
            label="魅力榜"
            style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}
          />
          <Tab
            label="豪气榜"
            style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}
          />
          <Tab
            label="上期榜单"
            style={{ fontSize: "28px", color: "white", fontWeight: "bold" }}
          />
        </Tabs>
        <SwipeableViews
          index={index}
          onChangeIndex={this.handleChangeIndex}
          disabled={true}
        >
          <RankListWrapper list={starList} what={0}>
            <RankList>{starListComponent}</RankList>
          </RankListWrapper>
          <RankListWrapper list={giftList} what={1}>
            <RankList>{giftListComponent}</RankList>
          </RankListWrapper>
          <div style={{ margin: "0 10px" }}>
            <LastWeekStarWrapper rankUsers={topUsers.rank_user1} />
            <LastWeekStarWrapper money rankUsers={topUsers.rank_user2} />
          </div>
        </SwipeableViews>
      </React.Fragment>
    );
  }

  componentDidMount() {
    const { search, origin, pathname } = location;
    const query = queryString.parse(search);
    const { uid, token } = query;

    //this.fetchData(`/rank/receive_gift?uid=${uid}&token=${token}`, 'starList');
    this.fetchData(
      `/rank/20190214/receive_gift?uid=${uid}&token=${token}`,
      "starList"
    );

    let urls = [
      //`${baseURL}/rank/send_gift?uid=${uid}&token=${token}`,
      //`${baseURL}/rank/top?uid=${uid}&token=${token}`
      `${baseURL}/rank/20190214/receive_gift?uid=${uid}&token=${token}`,
      `${baseURL}/rank/20190214/receive_gift?uid=${uid}&token=${token}`
    ];
    setTimeout(() => {
      let requests = urls.map(url => fetch(url));
      Promise.all(requests)
        .then(responses => {
          return Promise.all(responses.map(response => response.json()));
        })
        .then(dataArr => {
          this.setState({
            giftList: dataArr[0],
            topUsers: dataArr[1]
          });
        });
    }, 10);

    statistic(
      "activity_page_view",
      JSON.stringify({ page_url: origin + pathname, uid })
    );
  }

  async fetchData(url, whichList) {
    let res = await fetch(`${baseURL}${url}`);
    let resJson = await res.json();
    this.setState({ [whichList]: resJson });
  }

  handleChange(event, value) {
    this.setState({
      index: value
    });
    this.props.onThemeChange(value);
  }

  handleChangeIndex(index) {
    this.setState({
      index
    });
    this.props.onThemeChange(index);
  }
}

const RankList = styled.div`
  background-color: #ffffff;
  overflow: scroll;
  position: relative;
  height: calc(100vh - 370px);
  -webkit-overflow-scrolling: touch;
  width: 100%;
  box-sizing: content-box;
  padding-right: 17px;
`;

const styles = function(theme) {
  return {
    tabsIndicator: {
      backgroundColor: "white",
      height: "3px",
      paddingLeft: "30px",
      paddingRight: "30px",
      boxSizing: "border-box",
      backgroundClip: "content-box"
    }
  };
};

export default withStyles(styles)(UserList);
