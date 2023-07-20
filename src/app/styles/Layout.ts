"use client";

import styled from 'styled-components';

export const SiteWidth = styled.div`
  margin: 0 auto;
  width: calc(100% - 22px);
  max-width: 1370px;

  @media screen and (min-width: 560px) {
    width: calc(100% - 30px);
  }
  
  @media screen and (min-width: 890px) {
    width: calc(100% - 52px);
  }
`;

export const BodyContent = styled.div`
  flex-grow: 1;
`;