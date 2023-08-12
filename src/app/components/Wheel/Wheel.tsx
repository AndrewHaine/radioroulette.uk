import { Station } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { loadWheel } from './lib/canvas';
import { defaultSegments } from './lib/segments';
import { Spin, SpoolDown } from './WheelAnimations';

export type WheelStatus = 'idle' | 'spinning' | 'spool-down';

type WheelProps = {
  status?: WheelStatus,
  stations?: Station[],
};

const WheelOuter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
`

const WheelContainer = styled.div`
  position: relative;
  width: 150%;
  height: 350px;
  overflow: hidden;
  text-align: center;

  @media screen and (min-width: 650px) {
    width: 140%;
    height: 600px;
  }
  
  @media screen and (min-width: 980px) {
    width: 120%;
    height: 650px;
  }
`;

type WheelCanvasProps = {
  $visible: boolean,
  $status: WheelStatus,
}

const WheelCanvas = styled.canvas<WheelCanvasProps>`
  position: relative;
  display: ${({ $visible }) => $visible ? 'inline-block' : 'none'};
  background-color: ${({ theme }) => theme.colours.greyDark};
  border: 20px solid ${({ theme }) => theme.colours.purpleLight};
  border-radius: 50%;
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;

  @media screen and (min-width: 768px) {
    border-width: 40px;
  }

  ${({ $status }) => {
    if ($status === 'idle') {
      return;
    }

    if ($status === 'spinning') {
      return css`
        transform: rotate(0);
        animation: ${Spin} .4s linear infinite;
      `
    }

    if ($status === 'spool-down') {
      return css`
        transform: rotate(0);
        animation: ${SpoolDown} 4s cubic-bezier(0, 0, .1, 1);
        animation-fill-mode: forwards;
      `
    }
  }}
`;

export default function Wheel(props: WheelProps) {
  const {
    status = 'idle',
    stations = [],
  } = props;

  const canvas = useRef<HTMLCanvasElement|null>(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    canvas.current.width = 1008;
    canvas.current.height = 1008;

    setCanvasLoaded(true);
  }, []);

  useEffect(() => {
    if (!canvasLoaded || !canvas.current) {
      return;
    }

    const ctx = canvas.current.getContext('2d');

    if (!ctx) {
      return;
    }

    let wheelSegments = defaultSegments;

    if (stations?.length) {
      wheelSegments = wheelSegments.map((segment, i) => {
        const station = stations[i];
        segment.color = station.color;
        segment.image = station.image;
        segment.name = station.name;
        return segment;
      });

    };

    console.log(wheelSegments[0]);
    
    loadWheel(ctx, wheelSegments);
  }, [canvasLoaded, stations]);

  return (
    <WheelOuter>
      <WheelContainer>
        <WheelCanvas $visible={canvasLoaded} $status={status} ref={canvas} />
      </WheelContainer>
    </WheelOuter>
  );
}