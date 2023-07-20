"use client";

import Link, { LinkProps } from 'next/link';
import { styled } from 'styled-components';
import { lighten } from 'polished';

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
`

const NavItem = styled.li`
  display: block;
  margin: 0 8px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  @media screen and (min-width: 768px) {
    margin: 0 14px;
  }
`

const NavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.colours.white};

  &::after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.colours.white};
    content: "";
    transition: all .2s ease-out;
  }

  &:hover {
    &::after {
      width: 100%;
      left: 0;
    }
  }
`;

const NavLinkButton = styled(NavLink)`
  padding: 2px 28px 5px;
  border-radius: 200px;
  background-color: ${({ theme }) => theme.colours.purpleLighter};
  transition: all .2s ease-out;

  &:hover {
    background-color: ${({ theme }) => lighten(.1, theme.colours.purpleLighter)};
  }

  &::after {
    display: none;
  }
`;

export default function Navigation() {
  return (
    <nav>
      <NavMenu>
        <NavItem>
          <NavLinkButton href='/'>Play</NavLinkButton>
        </NavItem>
        <NavItem>
          <NavLink href='/about'>About</NavLink>
        </NavItem>
      </NavMenu>
    </nav>
  )
}