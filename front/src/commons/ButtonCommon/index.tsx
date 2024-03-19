import React, { useEffect } from 'react';
import { ButtonRootStyled } from './styled';

interface IProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const ButtonCommon: React.FC<IProps> = ({ children, onClick }) => {

  return (
    <ButtonRootStyled onClick={onClick} >
      {children}
    </ButtonRootStyled>
  );
};

export default ButtonCommon;