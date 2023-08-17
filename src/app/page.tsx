"use client";

import { useState } from 'react';
import { styled } from 'styled-components';
import { Station } from '@prisma/client';
import { useSWRConfig } from 'swr';
import Intro from './components/Intro/Intro';
import Wheel, { WheelStatus } from './components/Wheel/Wheel';
import wait from 'waait';
import Button from './components/Button/Button';
import SpinModal from './components/SpinModal/SpinModal';
import ErrorModal from './components/ErrorModal/ErrorModal';
import { ErrorMessage } from '../../types/api';
import { SiteWidth } from './styles/Layout';
import { trackGoal } from 'fathom-client';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 80px);
`;

const GameActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 0 50px;
`;

export default function Home() {
  const [wheelStatus, setWheelStatus] = useState<WheelStatus>('idle');
  const [spinInProgress, setSpinInProgress] = useState(false);
  const [resultModalOpen, setResultModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorCode, setErrorCode] = useState<ErrorMessage>();
  const [stations, setStations] = useState<Station[]>([]);

  const { mutate } = useSWRConfig();

  const spin = async () => {
    if (spinInProgress) {
      return;
    }

    trackGoal('GPAG4ZRN', 0);

    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

    setSpinInProgress(true);
    setStations([]);
    setWheelStatus('spinning');

    const response = await fetch('/api/spins', {
      method: 'POST',
      body: JSON.stringify({ "": csrfToken }),
    });

    if (!response.ok) {
      setSpinInProgress(false);
      setErrorModalOpen(true);
      setWheelStatus('idle');

      const { message } = await response.json();

      setErrorCode(message);

      return;
    }

    const stations = await response.json();

    setTimeout(() => {
      setStations(stations);
    }, 200);

    await wait(1000);

    setWheelStatus('spool-down');

    await wait(4200);

    setResultModalOpen(true);
    setSpinInProgress(false);

    mutate('/api/spins');
  }

  return (
    <SiteWidth>
      <Content>
        <SpinModal
          isOpen={resultModalOpen}
          station={stations[0]}
          onCloseSignal={() => setResultModalOpen(false)}
        />
        <ErrorModal
          isOpen={errorModalOpen}
          errorCode={errorCode}
          onCloseSignal={() => setErrorModalOpen(false)}
        />
        <Intro />
        <GameActions>
          <Button
            colour='orange'
            text='Spin the wheel'
            disabled={!spinInProgress}
            onClick={spin}
          />
        </GameActions>
        <Wheel
          status={wheelStatus}
          stations={stations}
        />
      </Content>
    </SiteWidth>
  )
}
