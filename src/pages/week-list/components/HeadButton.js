import styled from 'styled-components';

import back from '../../../../static/week-list/back.png';

export const HeaderButton = styled.button`
  :focus: {
    outline: none;
  }
  border: none;
  width: 67px;
  height: 66px;
  margin-left: 25px;
  background: url("${back}")
`;

export default HeaderButton;
