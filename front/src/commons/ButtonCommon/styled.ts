import styled, { css } from 'styled-components';
import { colors } from '../../assets/styles/colors';


const ButtonBaseRootStyled = styled.button`
  //align-self: center;
  background-color: transparent;
  border: none;
  color: white;
  height: 2.25rem;
  letter-spacing: 0.1em;
  padding-left: 1rem;
  padding-right: 1rem;
  width: fit-content;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: solid 3px ${colors.DarkBackground};
  text-wrap: nowrap;
  user-select: none;


  &:hover{
    background-color: ${colors.DarkBackground};
  }

  &:active{
    background-color: ${colors.DarkBackground};
    border: solid 3px ${colors.NavBarBackground};


  }
`

export const ButtonRootStyled = styled(ButtonBaseRootStyled)<{
  $variant?: 'outline' | 'disabled' | 'default';
  $isDisabled?: boolean | undefined;
  $isActive?: boolean | undefined;
}>`
          ${ButtonBaseRootStyled}{}
`;

