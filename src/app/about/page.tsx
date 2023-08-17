"use client";

import styled from 'styled-components';
import { SiteWidth } from '../styles/Layout';

const Content = styled.div`
  padding: 16px 0;

  @media screen and (min-width: 768px) {
    padding: 30px 0;
    font-size: 1.125rem;
  }
`;

export default function About() {
  return (
    <SiteWidth>
      <Content>
        <h1>About Radio Roulette</h1>
        <p>Born out of office indecision, Radio Roulette will open your ears to radio stations from across the UK. In a matter of seconds you could be:</p>
        <ul>
          <li>Rocking out to AC/DC (<a href="https://planetradio.co.uk/absolute-classic-rock/" target="_blank" rel="noopener">Absolute Classic Rock</a>)</li>
          <li>Egging on your new favourite sports team (<a href="https://www.bbc.co.uk/sounds/play/live:bbc_radio_five_live_sports_extra" target="_blank" rel="noopener">BBC 5 Live Sports Extra</a>)</li>
          <li>Discovering your new favourite stage show soundtrack (<a href="https://planetradio.co.uk/magic-at-the-musicals/" target="_blank" rel="noopener">Magic at the Musicals</a>)</li>
          <li>Channeling your inner Alan Partridge (<a href="https://www.radionorwich.radio/" target="_blank" rel="noopener">Radio Norwich</a>)</li>
          <li>Shutting out the world (<a href="https://www.jack3.co.uk/" target="_blank" rel="noopener">Jack 3 & Chill</a>)</li>
        </ul>
        <p>The Radio Roulette catalog covers national, regional and local stations. Listen to hosts from across the country: from Ipswich to the Isle of Wight, Sheffield to Scotland, Wessex to The Wirral.</p>
        <h2>Credits</h2>
        <p>Radio Roulette was <a href="https://www.andrewhaine.co.uk" rel="noopener" target="_blank">built by Andrew Haine</a> with copywriting and additional sanity checking from Abi&nbsp;Murr.</p>
        <h2>Analytics</h2>
        <p>We use <a href="https://usefathom.com/ref/KMHXMF" target="_blank" rel="noopener">Fathom Analytics</a> for fully GDPR-compliant analytics. We use this anonymised data for usage reports and to see where we can make improvements to our site.</p>
      </Content>
    </SiteWidth>
  );
}