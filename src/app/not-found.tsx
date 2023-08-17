"use client";

import styled from 'styled-components';
import { SiteWidth } from './styles/Layout';

const Content = styled.div`
  padding: 16px 0;

  @media screen and (min-width: 768px) {
    padding: 30px 0;
    font-size: 1.125rem;
  }
`;

export default function Error() {
  return (
    <SiteWidth>
      <Content>
        <h1>Page not found!</h1>
        <p>Not sure what page you&apos;re looking for but it ain&apos;t here no more! <br /> Head back to the homepage and have some fun spinning the wheel.</p>
      </Content>
    </SiteWidth>
  );
}