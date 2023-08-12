import { keyframes } from 'styled-components';

export const Spin = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(1turn);
  }
`;

export const SpoolDown = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(967.5deg);
 }
`