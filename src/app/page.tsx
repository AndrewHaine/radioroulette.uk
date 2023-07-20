"use client";

import { styled } from 'styled-components';

import Intro from './components/Intro/Intro';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`

export default function Home() {
  return (
    <Content>
      <Intro />
    </Content>
  )
}
