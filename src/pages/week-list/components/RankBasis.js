import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.span`
  display: block;
  color: #ffeb95;
  font-size: 2.6em;
  position: absolute;
  top: 1em;
  right: 0.8em;
  font-weight: bold;
`;

class RankBasis extends React.Component {
  constructor(props) {
    super(props);
    this.getRankBasis = this.getRankBasis.bind(this);
  }

  render() {
    let rankBasis = this.getRankBasis();
    return <StyledWrapper>{rankBasis}</StyledWrapper>;
  }

  getRankBasis() {
    let listType = this.props.listType;
    switch (listType) {
      case 0:
        return "获得指定";
      case 1:
        return "送出指定礼物";
    }
  }
}

export default RankBasis;
