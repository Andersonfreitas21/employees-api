import styled from 'styled-components';

export const ButtonsContainerStyled = styled.div`
  height: fit-content;
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 576px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

export const ModalConfirmDeleteRootStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`

export const SubTitleModalStyled = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  align-self: flex-start;
`

export const RememberChoiceContainerStyled = styled.div`
  height: fit-content;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
  display: flex;
  justify-content: start;
`

export const CheckBoxInputStyled = styled.input`
  position: relative;
  appearance: none;
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;

export const CheckBoxLabelStyled = styled.p`
  margin-top: 0px;
  margin-bottom: 0px;
  align-self: flex-start;
  margin-left: 0.5rem;
`

export const CheckBoxContainerStyled = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  margin-right: 0.5rem;
`

export const InputWraperStyled = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  gap: 10px;
`