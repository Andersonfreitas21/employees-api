+import styled from 'styled-components';
import { colors } from '../../assets/styles/colors';

export const RootPageLoyoutStyled = styled.div`
    height: calc(100vh - 70px);
    margin-top: 70px;
    width: 100vw;
    background-color: ${colors.DarkBackground};
    display: flex;
    align-items: center;
    justify-content: center;    
`

export const MainContainerStyled = styled.div`
    width: 90%;
    height: 90%;
    //margin-top: 30px;
   // border: 3px solid red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`