import ReactModal from 'react-modal';
import styled from 'styled-components';
import { ModalContent } from '../ModalContent/ModalContent';
import { ErrorMessage } from '../../../../types/api';

type ErrorModalProps = {
  isOpen: boolean,
  errorCode?: ErrorMessage,
  onCloseSignal: () => void,
}

const Title = styled.h2`
  color: ${({ theme }) => theme.colours.greyDark};
  font-weight: bold;
  margin: 16px auto;
  font-size: 24px;
`

export default function ErrorModal(props: ErrorModalProps) {
  const {
    isOpen,
    errorCode,
    onCloseSignal,
  } = props;

  const errorMessage = () => {
    if (errorCode === 'rate_limit') {
      return 'You\'ve made too many spins, please come back later!';
    }
    
    if (errorCode === 'csrf') {
      return 'You are not allowed to make that request.';
    }

    return 'An error occurred on our end, please try again later.'
  }

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseSignal}
      closeTimeoutMS={300}
      id='error-modal'
    >
      <ModalContent>
        <Title>Uh oh!</Title>
        <p>{ errorMessage() }</p>
      </ModalContent>
    </ReactModal>
  )
}