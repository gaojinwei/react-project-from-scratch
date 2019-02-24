import React from 'react';
import styled from 'styled-components';

import activeRule from '../../../../static/week-list/activeRule.png';

class RuleTitle extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={this.props.onClick} />
      </React.Fragment>
    );
  }
}

export default RuleTitle;

const Button = styled.button`
  background: url("${activeRule}");
  width: 143px;
  height: 66px;
  :focus: {
    outline: none;
  }
  border: none;
  margin-right: 25px;
`;
