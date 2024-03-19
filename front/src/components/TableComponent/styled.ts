import styled from 'styled-components';
import { colors } from '../../assets/styles/colors';

export const TableRootContainerStyled = styled.div`
    height: 100%;
    width: 80%;
    background-color: ${colors.FilterContainer};
    display: flex;  
    flex-direction: column;
    align-items: flex-start;
    border-radius: 10px;
    padding-left: 1rem;
    padding-right: 1rem;
`

export const TopWrapperStyled = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const TableTitleStyled = styled.h2`
    color: white;
` 

export const TableSemanticStyled = styled.table`
    //border: 3px solid red;
    width: 100%;
    height: fit-content;
`

export const THeadStyled = styled.thead`
    position: sticky;
    z-index: 1;
    top: 0;
    background-color: ${colors.DarkBackground};
    color: white;
    padding: 15px;
`
export const TBodyStyled = styled.tbody``

export const THeadRowStyled = styled.tr``
export const TBodyRowStyled = styled.tr`
    color: white;
`

export const THeadDataStyled = styled.td``
export const TBodyDataStyled = styled.td``

export const ButtonsWrapperStyled = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 3px;
`

export const TableWrapperStyled = styled.div`
    width: 100%;
    max-height: 84%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-self: start;

    &::-webkit-scrollbar {
                width: 16px;
              }

              &::-webkit-scrollbar-thumb {
                background-color: ${colors.NavBarBackground};
              }

              &::-webkit-scrollbar-track {
                background-color: rgba(210, 211, 212, 0.5);
              }
`