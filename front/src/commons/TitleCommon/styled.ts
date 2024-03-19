import styled, { css } from 'styled-components';


export const TitleRootBaseStyled = styled.h2`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TitleRootStyled = styled(TitleRootBaseStyled)<{
  $variant?: 'modal' | 'subtitle';
}>`
  ${(props) => {
    switch (props.$variant) {
      case "modal":
        return css`
          align-self: flex-start; 


        `;
      case "subtitle":
        return css`
          align-self: center; 
          font-weight: lighter;


        `;
      default:
        break;
    }
  }}
`;