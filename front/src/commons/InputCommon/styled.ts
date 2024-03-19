import styled from 'styled-components';
import { colors } from '../../assets/styles/colors';
import InputErrorIcon from '../../assets/icons/AlertRedIcon.svg';

// Container for Input and Label
export const InputContainerStyled = styled.div<{
  $width?: string;
}>`

  width: ${props => (props.$width ? `${props.$width}` : '100%')};
`;

// Label for Input
export const InputLabelStyled = styled.label`
  font-size: 10px;
  color: white;
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.25rem; 
`;

// Input Field
export const InputFieldStyled = styled.input<{
  $state?: 'error' 
  $width?: string
}>`
  height: 30px;
  appearance: none;
  width: ${props => props.$width ? (props.$width) : ('100%')};;
  border-color: ${colors.NavBarBackground};
  color: black;
  background-color: ${colors.DarkBackground};
  padding: 0rem 0.5rem 0rem 0.5rem; 
  border: 3px solid ${props => props.$state === 'error' ? 'red' : colors.DarkBackground};


  &:focus {
    outline: none;                                       
    color: white;
    border-color: ${colors.NavBarBackground};
  }

  &:not(:placeholder-shown) {
    color: white;
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

// Toggle Button
export const ToggleButtonStyled = styled.button`
  position: absolute;
  top: 55%;
  right: 8px;
  margin: 0px;
  transform: translateY(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
  align-self: center;

  &:focus {
    outline: none;
  }
`;

// Input Element Container
export const InputElementContainerStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  position: relative;
`;

export const InputErrorAlertContainerStyled = styled.div`
  height: 1rem; 
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`


export const InputErrorAlertWrapperStyled = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2rem;
  align-items: flex-end;
`
export const InputErrorAlertMsgStyled = styled.p`
  color: red;
  font-size: 0.7rem;
  position: relative;
  bottom: 0;
`

export const InputErrorIconStyled = styled.img`
  content: url(${InputErrorIcon});
  align-self: center;
`