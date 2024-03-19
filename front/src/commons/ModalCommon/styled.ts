import styled, { css } from 'styled-components';
import { colors } from '../../assets/styles/colors';

export const ModalBackgroundStyled = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(000, 00, 00, 0.7);
  position: fixed;
  top: 50%; /* Vertically center the modal */
  left: 50%; /* Horizontally center the modal */
  transform: translate(-50%, -50%); /* Center both horizontally and vertically */
  z-index: 99999; /* Adjust the z-index value as needed */
`
export const ModalRootContainerBasedStyled = styled.div`
  background-color: ${colors.FilterContainer};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  color: white;
  padding: 4rem 2rem 4rem 2rem;
  display: flex;
  flex-direction: column; 
  justify-content: space-evenly;
  gap: 3rem;

`

export const ModalRootContainerStyled = styled(ModalRootContainerBasedStyled)<{
  $variant?: 'small' | 'medium' | 'large' | 'extra-large' | 'square-medium';
}>`
  ${(props) => {
    switch (props.$variant) {
      case "small":
        return css`
          height: 20vh;
          width: 30vw;
      `
      case "medium":
        return css`
          height: 30vh;
          width: 40vw;
      `
      case "large":
        return css`
          height: 40vh;
          width: 60vw;
      `
      case "extra-large":
        return css`
          height: 60vh;
          width: 80vw;
      ` 
      case "square-medium":
        return css`
          height: 25rem;
          width: 40rem;
      ` 
      default:
        return css`
          height: 30vh;
          width: 40vw;
      `

    }
  }}
`;