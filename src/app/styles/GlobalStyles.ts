import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin-ext'],
});

export const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 16px;
    font-weight: 300;
    font-smooth: antialiased;
    font-family: ${ptSans.style.fontFamily};
  }

  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    box-sizing: border-box;
    color: white;
  }

  body {
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100vh;
    background: radial-gradient(ellipse at 50% 460px, #21112e 30%, #17151a);
  }

  body, html {
    overflow-x: hidden;
  }

  figure {
    img {
      width: 100%;
    }
  }

  h1,
  h2 {
    position: relative;
    display: block;
    width: 100%;
    padding-bottom: 0.75rem;
    margin-bottom: 1.3rem;
    font-size: 1.75rem;
    font-weight: bold;
    letter-spacing: 1.1px;

    &::after {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      opacity: .2;
      content: '';
      background: white;
    }
  }

  h1 {
    font-size: 2rem;
  }

  @media screen and (min-width: 980px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  h2 {
    font-size: 1.7rem;
  }

  p {
    display: block;
    position: relative;
    line-height: 1.2;

    &:not(:last-child) {
      margin-bottom: 1.5em;
    }
  }

  ul {
    margin: 1em 0 2.5rem;
    padding: 0 1em;
    list-style: disc;

    li {
      &:not(:last-child) {
        margin-bottom: 5px;
      }
    }
  }

  .ReactModal__Overlay {
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.75) !important;
    transition: all .3s ease-in-out;
  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
  
  .ReactModal__Content {
    left: 50% !important;
    top: 50% !important;
    padding: 0 !important;
    width: 80% !important;
    height: 80% !important;
    max-height: 400px;
    max-width: 400px;
    overflow: hidden;
    border: 0 !important;
    opacity: 0;
    transform: translate(-50%, -50%) scale(.75);
    transition: all .3s ease-in-out;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10px;
      content: '';
      background-color: ${({ theme }) => theme.colours.orange};
    }

    &[id="error-modal"] {
      &::before {
        background-color: #F15353;
      }
    }
  }

  .ReactModal__Content--after-open {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }

  .ReactModal__Content--before-close {
    transform: translate(-50%, -50%) scale(.75);
    opacity: 0;
  }
`;