"use client";

import { SiteWidth } from '@/app/styles/Layout';
import { rgba } from 'polished';
import { styled } from 'styled-components';

const StyledFooter = styled.footer`
  padding: 20px;
  background-color: ${({ theme }) => theme.colours.purpleDark};
  border-top: 3px solid ${({ theme }) => rgba(theme.colours.white, .2)};

  a {
    color: ${({ theme }) => theme.colours.white};

    &:hover {
      text-decoration: none;
    }
  }
`

const FooterInner = styled(SiteWidth)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  p {
    margin: 0;

    &:not(:last-child) {
      margin: 0 0 .5rem;
    }
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;

    p:not(:last-child) {
      margin: 0;
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <FooterInner>
        <p>&copy; 2021 - {new Date().getFullYear()} | Built by <a href="https://andrewhaine.co.uk" target='_blank' rel='noopener'>Andrew Haine</a></p>
        <p>Our website uses <a href="https://usefathom.com/ref/KMHXMF" rel="noopener" target="_blank">Fathom</a> for privacy-focused analytics.</p>
      </FooterInner>
    </StyledFooter>
  )
};