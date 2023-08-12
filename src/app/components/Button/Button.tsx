import { darken } from 'polished';
import React from 'react';
import { css, styled } from 'styled-components';

interface ButtonStyleProps {
  $colour?: 'orange' | 'purple',
}

interface ButtonProps extends React.ComponentProps<'button'> {
  colour?: 'orange' | 'purple',
  text: string,
  onClick: () => void,
};

const PurpleButtonStyles = css`
  background-color: ${({ theme }) => theme.colours.purpleMid};
  color: white;
  border-color: ${({ theme }) => theme.colours.purpleMid};

  &:hover {
    color: ${({ theme }) => darken(.2, theme.colours.purpleMid)};
    border-color: ${({ theme }) => darken(.2, theme.colours.purpleMid)};
    color: white;
  }
`;

const OrangeButtonStyles = css`
  background-color: ${({ theme }) => theme.colours.orange};
  color: ${({ theme }) => theme.colours.purpleMid};
  border-color: ${({ theme }) => theme.colours.orange};

  &:hover {
    background-color: ${({ theme }) => darken(.2, theme.colours.orange)};
    border-color: ${({ theme }) => darken(.2, theme.colours.orange)};
    color: black;
  }
`;

const StyledButton = styled.button<ButtonStyleProps>`
  display: inline-block;
  appearance: none;
  padding: 11px 50px;
  color: white;
  font-size:  20px;
  font-family: inherit;
  font-weight: 600;
  border-width: 1px;
  border-style: solid;
  border-radius: 200px;
  text-decoration: none;
  text-align: center;
  outline: none;
  user-select: none;
  cursor: pointer;
  transition: all .2s ease-out;

  @media (min-width: 768px) {
    font-size: 25px;
  }

  ${({ $colour }) => $colour === 'orange' ? OrangeButtonStyles : PurpleButtonStyles}
`;

export default function Button(props: ButtonProps) {
  const {
    text,
    colour = 'purple',
    onClick,
  } = props;

  return (
    <StyledButton $colour={colour} onClick={onClick}>
      {text}
    </StyledButton>
  )
};