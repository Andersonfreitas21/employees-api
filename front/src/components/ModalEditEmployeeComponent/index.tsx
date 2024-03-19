import React, { useState } from 'react';
import ModalCommon from '../../commons/ModalCommon';
import { 
  ButtonsContainerStyled, 
  InputWraperStyled, 
  ModalConfirmDeleteRootStyled, 
  SubTitleModalStyled,
} from './styled';
import TitleCommon from '../../commons/TitleCommon';
import ButtonCommon from '../../commons/ButtonCommon';
import InputCommon from '../../commons/InputCommon';

interface IProps {
  children?: React.ReactNode;
  onHandleEditDevice: (data: any) => void;  
  onCancel: () => void;
  onClickOut?: () => void;
}

const ModalEditEmployeeComponent: React.FC<IProps> = ({ children, onHandleEditDevice, onCancel, onClickOut }) => {

  const [name, setName] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [cellPhoneNumber, setCellPhoneNumber] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "position":
        setPosition(value);
        break;
      case "email":
        setEmail(value);
        break;
        case "cellNumber":
          setCellPhoneNumber(value);
          break;
      default:
        break;
    }
  };

  const handleEditEmployee = () => {
    const newData = {
      name,
      position,
      email,
      cellPhoneNumber,
    };
  
    const notNullData = Object.fromEntries(
      Object.entries(newData).filter(([key, value]) => value !== null)
    );
  
    onHandleEditDevice(notNullData);
  
    onCancel();
  };

  return (
    <>
      <ModalCommon variant='square-medium' onClickOut={onClickOut}>
        <ModalConfirmDeleteRootStyled>
          <TitleCommon variant='modal'>Editar dados do Funcionário</TitleCommon>
          <InputWraperStyled>
            <InputCommon name='name' onChange={handleChange} label='Nome' placeholder='Nome'/>
            <InputCommon name='email' onChange={handleChange} label='Email' placeholder='Email'/>
          </InputWraperStyled>
          <InputWraperStyled>
            <InputCommon name='position' onChange={handleChange} label='Cargo' placeholder='Cargo'/>
            <InputCommon name='cellNumber' onChange={handleChange} label='Telefone' placeholder='Telefone'/>
          </InputWraperStyled>
          <ButtonsContainerStyled>
            <ButtonCommon onClick={onCancel} >Cancelar</ButtonCommon>
            <ButtonCommon onClick={handleEditEmployee} >Finalizar</ButtonCommon>
          </ButtonsContainerStyled>
          {children}
        </ModalConfirmDeleteRootStyled>
      </ModalCommon>
    </>
  );
};

export default ModalEditEmployeeComponent;