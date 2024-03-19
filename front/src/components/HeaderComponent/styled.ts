import styled from 'styled-components';
import { colors } from '../../assets/styles/colors';

export const HeaderStyled = styled.div`
    position: fixed;
    height: 70px;
    width: 100vw;
    background-color: ${colors.NavBarBackground};
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const HeaderTitle = styled.h2`
    color: ${colors.NavBarTitle};
`