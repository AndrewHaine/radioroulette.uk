"use client";

import { styled } from 'styled-components';

const IntroContainer = styled.div`
  position: relative;
  display: block;
  margin: 30px auto 40px;
  width: 80%;
  max-width: 680px;
  text-align: center;

  @media screen and (min-width: 768px) {
    margin-top: 50px
  }
`;

const IntroLogo = styled.figure`
  display: inline-block;
  width: 80px;
  margin-bottom: 20px;

  @media screen and (min-width: 560px) {
    width: 110px
  }
  
  @media screen and (min-width: 768px) {
    width: 130px;
    margin-bottom: 25px;
  }
`;

const IntroText = styled.p`
  font-size: 1.4rem;
  font-weight: 300;

  @media screen and (min-width: 768px) {
    font-size: 1.625rem;
  }
`

export default function Intro() {
  return (
    <IntroContainer>
      <IntroLogo>
        <img src='/images/branding/logo.svg' alt="Radio Roulette Logo" />
      </IntroLogo>
      <IntroText>
        Welcome to radioroulette.uk! The game is simple - spin the wheel to discover a random radio station from around the UK. Who knows, it could become the new soundtrack to your day.
      </IntroText>
    </IntroContainer>
  )
};