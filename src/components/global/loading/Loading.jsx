import React from "react";
import styled, { keyframes } from "styled-components";

export default function Loading() {
  return (
    <LoadingContainer>
      <Circle />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 10%;
  }
  50% {
    border-radius: 50%;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 10%;
  }
`;

const Circle = styled.div`
  margin: auto;
  width: 90px;
  height: 90px;
  border: 2px dashed #0066ff;
  animation: ${rotate} 2s linear infinite;
`;
