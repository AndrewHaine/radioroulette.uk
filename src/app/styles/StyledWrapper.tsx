"use client";

import Theme from './Theme';
import { GlobalStyles } from './GlobalStyles';
import StyledComponentsRegistry from '../registry';
import { ThemeProvider } from 'styled-components';

const StyledWrapper = ({ children } : { children: React.ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        { children }
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
};

export default StyledWrapper;