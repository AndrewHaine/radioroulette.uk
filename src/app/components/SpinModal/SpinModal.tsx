import { Station } from '@prisma/client';
import Image from 'next/image';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import Link from 'next/link';
import { darken } from 'polished';
import { ModalContent } from '../ModalContent/ModalContent';

type SpinModalProps = {
  station: Station | null,
  isOpen: boolean,
  onCloseSignal: () => void,
}

const StationTitle = styled.h2`
  color: ${({ theme }) => theme.colours.greyDark};
  font-weight: bold;
  margin: 16px auto;
  font-size: 24px;
`

const ListenLink = styled(Link)`
  display: inline-block;
  appearance: none;
  padding: 9px 30px;
  font-size:  18px;
  font-family: inherit;
  font-weight: 800;
  border-radius: 200px;
  background-color: ${({ theme }) => theme.colours.orange};
  color: ${({ theme }) => theme.colours.greyDark};
  border-color: ${({ theme }) => theme.colours.orange};
  text-decoration: none;
  text-align: center;
  transition: all .2s ease-out;

  &:hover {
    background-color: ${({ theme }) => darken(.2, theme.colours.orange)};
    border-color: ${({ theme }) => darken(.2, theme.colours.orange)};
    color: black;
  };
`

export default function SpinModal(props: SpinModalProps) {
  const {
    station,
    isOpen,
    onCloseSignal,
  } = props;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseSignal}
      closeTimeoutMS={300}
      ariaHideApp={false}
    >
      <ModalContent>
        {
          station ? (
            <>
              {
                station.image ? <Image src={station.image} width={100} height={100} alt={station.name} /> : null
              }
              <StationTitle>{ station.name }</StationTitle>
              <p>{ station.description }</p>
              <ListenLink target='_blank' rel='noopener' href={station.url}>Listen live</ListenLink>
            </>
          ) : null
        }
      </ModalContent>
    </ReactModal>
  )
}