import React from "react";
import styled, { keyframes } from "styled-components";
let w = 200;

const AvatarWrap = styled.div`
  width: ${(2 * w) / Math.sqrt(3)}px;
  height: ${(2 * w) / Math.sqrt(3)}px;
  position: relative;
`;

const AvatarItem = styled.div`
  position: absolute;
  top: ${w / 2 / Math.sqrt(3)}px;
  left: ${w / Math.sqrt(3) - w / 2}px;
  width: ${w}px; //
  height: ${w / Math.sqrt(3)}px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: ${(2 * w) / Math.sqrt(3)}px;
    height: ${(2 * w) / Math.sqrt(3)}px;
    /* background: red; */
    background-image: url("https://static.app.new.tongzhuogame.com/headimgs/2dd1d048-84b4-41f1-8691-eee058368304.jpeg?x-oss-process=image/resize,w_150,limit_0");
    background-size: 100% 100%;
  }
`;

const AvatarItemFirst = styled(AvatarItem)`
  &::before {
    transform: translate(-50%, -50%);
  }
`;

const AvatarItemSecond = styled(AvatarItem)`
  transform: rotate(60deg);
  &::before {
    transform: rotate(-60deg) translate(-50%, -50%);
    transform-origin: 0 0;
  }
`;

const AvatarItemThrid = styled(AvatarItem)`
  transform: rotate(-60deg);
  &::before {
    transform: rotate(60deg) translate(-50%, -50%);
    transform-origin: 0 0;
  }
`;