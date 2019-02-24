import React from 'react';
import styled from 'styled-components';

import activityRule from '../../../../static/week-list/activity-rule.png';
import closeButton from '../../../../static/week-list/close.png';

class Dialog extends React.Component {
  render() {
    return (
      <Scrim>
        <ContentDiv>
          <RuleWindow>
            <img src={activityRule} />
            <img onClick={this.props.onClose} src={closeButton} />
          </RuleWindow>
        </ContentDiv>
      </Scrim>
    );
  }
}

export default Dialog;

const Scrim = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const ContentDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const RuleWindow = styled.div``;
