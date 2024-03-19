import React, { ReactNode, useState, useEffect } from 'react';
import { HeaderStyled, HeaderTitle } from './styled';

const HeaderComponent: React.FC = () => {
  
  return (
    <>
      <HeaderStyled>
        <HeaderTitle>N697 - Desenvolvimento de Software em Nuvem</HeaderTitle>
      </HeaderStyled>
    </>
  );
};

export default HeaderComponent;