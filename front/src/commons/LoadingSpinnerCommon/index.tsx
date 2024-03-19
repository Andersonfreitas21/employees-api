import React, { useEffect, useState } from 'react';
import { 
  LoadingSpinnerBackgroundStyled,
  LoadingStyled,
  SvgStyled,
  RectStyled
} from './styled';

interface IProps {
  children?: React.ReactNode;
}

const LoadingSpinnerCommon: React.FC<IProps> = ({ children }) => {
  
  return (
    <LoadingSpinnerBackgroundStyled>
      
    </LoadingSpinnerBackgroundStyled>
  );
};

export default LoadingSpinnerCommon;