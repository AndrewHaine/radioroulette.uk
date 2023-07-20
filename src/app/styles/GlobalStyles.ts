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
    min-height: 100vh;
    background: radial-gradient(ellipse at 50% 460px, #21112e 30%, #17151a);
  }

  figure {
    img {
      width: 100%;
    }
  }
`;