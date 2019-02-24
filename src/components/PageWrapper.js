import React from 'react';
import styled from 'styled-components';

function PageWrapper(props) {
  return <Background {...props}>{props.children}</Background>;
}

export default PageWrapper;

const Background = styled.div`
  font-size: 10px;
  background: url('${(props) => props.backImg}');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
`;
