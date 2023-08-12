import styled from 'styled-components';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px;
  text-align: center;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100%;

  p {
    color: ${({ theme }) => theme.colours.greyDark};
    font-size: 16px;
    margin: 0 auto 30px;
  }
`;