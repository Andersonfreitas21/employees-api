import React, { useState, useEffect } from 'react';
import { InputLabelStyled, InputFieldStyled, InputElementContainerStyled, InputContainerStyled, InputErrorAlertContainerStyled, InputErrorAlertWrapperStyled, InputErrorIconStyled, InputErrorAlertMsgStyled } from './styled';


interface IErrorObject {
  type: string;
  fields: string[];
}

interface IProps {
  name?: string;
  label?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRequiredErrorList?: IErrorObject | null;
  width?: string;
}

const InputCommon: React.FC<IProps> = ({ 
  name,
  label, 
  placeholder, 
  type = 'text', 
  value, 
  onChange,
  inputRequiredErrorList,
  width = '100%'
}) => {
  const [inputError, setInputError] = useState(true);

  useEffect(() => {
    // Check if the current input name is in the error list
    if (inputRequiredErrorList && inputRequiredErrorList.fields.includes(name || '')) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  }, [name, inputRequiredErrorList]);

  const handleInputFocus = () => {
    setInputError(false);
  };

  const getErrorDescription = (errorType: string): string => {
    switch (errorType) {
      case 'requiredField':
        return 'Campo obrigatório';
      case 'invalidEmail':
        return 'Email inválido';
      case 'shortPassword':
        return 'Senha muito curta';
      case 'differentPasswords':
        return 'Senhas diferentes';
      default:
        return 'Erro desconhecido';
    }
  };

  return (
    <InputContainerStyled $width={width}>
      <InputLabelStyled>{label}</InputLabelStyled>
      <InputElementContainerStyled>
        <InputFieldStyled
          name={name}
          type={type}
          placeholder={(type === 'password' || type === 'confirmPassword') ? 'Pelo menos 8 caracteres' : placeholder}
          onChange={onChange}
          $state={inputError ? 'error' : undefined}
          onFocus={handleInputFocus}
          autoComplete={(type === 'password') ? 'new-password' : 'off'} 
          width={width}
          value={value}
          />  
      </InputElementContainerStyled>
      <InputErrorAlertContainerStyled>
        {inputRequiredErrorList && inputError && (<InputErrorAlertWrapperStyled><InputErrorIconStyled/><InputErrorAlertMsgStyled>{getErrorDescription(inputRequiredErrorList.type)}</InputErrorAlertMsgStyled></InputErrorAlertWrapperStyled>)}
      </InputErrorAlertContainerStyled>
    </InputContainerStyled>
  );
};

export default InputCommon;