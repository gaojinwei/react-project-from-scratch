import React from "react";
import styled from "styled-components";

import Head from "./components/Head";
import ListContent from "./components/ListContent";
import Dialog from "./components/Dialog";
import redBack from "../../../static/week-list/red.png";
import purpleBack from "../../../static/week-list/purple.png";
import orangeBack from "../../../static/week-list/orange.png";

class RedListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeIndex: 0,
      isOpen: false
    };

    this.changeListType = this.changeListType.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    const { themeIndex, isOpen } = this.state;
    return (
      <PageWrapper themeIndex={themeIndex}>
        <Head onClick={this.handleClick} />
        <ListContent
          onThemeChange={this.changeListType}
          themeIndex={themeIndex}
        />
        {isOpen && <Dialog onClose={this.handleClose} />}
      </PageWrapper>
    );
  }

  changeListType(themeIndex) {
    this.setState({
      themeIndex
    });
  }

  handleClick() {
    this.setState({
      isOpen: true
    });
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }
}

export default RedListPage;

const changeTheme = props => {
  const themeIndex = props.themeIndex;
  switch (themeIndex) {
    case 0:
      return purpleBack;
    case 1:
      return orangeBack;
    case 2:
      return redBack;
  }
};

const PageWrapper = styled.div`
  font-size: 62.5%;
  background: url('${props => changeTheme(props)}');
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;
