"use client";

import { styled } from 'styled-components';
import { rgba } from 'polished';
import { SiteWidth } from '@/app/styles/Layout';
import Navigation from '../Navigation/Navigation';

const StyledHeader = styled.header`
  margin-bottom: 20px;
  padding: 20px 0;
  background-color: ${({ theme }) => theme.colours.purpleLight};
  box-shadow: ${({ theme }) => `0 3px 6px ${rgba(theme.colours.greyDark, .7)}`};
`

const HeaderInner = styled(SiteWidth)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  return (
    <StyledHeader>
      <HeaderInner>
        <div></div>
        <div>
          <Navigation />
        </div>
      </HeaderInner>
    </StyledHeader>
  )
}