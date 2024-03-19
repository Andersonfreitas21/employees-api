import React, { useEffect, useState } from 'react';
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
import { IDataFromBack, initialDataFromBack } from '../../interfaces/employee';
import { IErrorObject } from '../../interfaces/inputErrorHandling';

interface IProps {
  children?: React.ReactNode;
  onHandleAddDevice: (data: any) => void;  
  onCancel: () => void;
  onClickOut?: () => void;
}

const ModalAddEmployeeComponent: React.FC<IProps> = ({ children, onHandleAddDevice, onCancel, onClickOut }) => {

  const [name, setName] = useState<string | null>(null);
  const [position, setPosition] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [cellPhoneNumber, setCellPhoneNumber] = useState<string | null>(null);
  const [birthdayDate, setBirthdayDate] = useState<string | null>(null);

  const [inputRequiredErrorList, setInputRequiredErrorList] = useState<IErrorObject | null>(null);

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
        case "date":
          setBirthdayDate(value);
          break;
      default:
        break;
    }
  };

  const handleAddEmployee = () => {

    const missingFields = [];

    if (!name) { missingFields.push("name") }
    if (!position) { missingFields.push("position") }
    if (!email) { missingFields.push("email") }
    if (!cellPhoneNumber) { missingFields.push("cellNumber") }
    if (!birthdayDate) { missingFields.push("date") }


    if (missingFields.length > 0) {
      setInputRequiredErrorList({
        type: "requiredField",
        fields: missingFields,
      });
      return; 
    }

    const newData = {
      name,
      position,
      email,
      cellPhoneNumber,
      birthdayDate,
    };
  
    onHandleAddDevice(newData);
  
    onCancel();
  };

  return (
    <>
      <ModalCommon variant='square-medium' onClickOut={onClickOut}>
        <ModalConfirmDeleteRootStyled>
          <TitleCommon variant='modal'>Adicionar novo funcionário</TitleCommon>
          <InputCommon 
            name='name' 
            onChange={handleChange} 
            label='Nome' 
            placeholder='Nome'
            inputRequiredErrorList={inputRequiredErrorList}
          />
          <InputWraperStyled>
            <InputCommon             
              inputRequiredErrorList={inputRequiredErrorList}
              name='position' 
              onChange={handleChange} 
              label='Cargo' 
              placeholder='Cargo'
            />
            <InputCommon             
              inputRequiredErrorList={inputRequiredErrorList}
              name='email' 
              onChange={handleChange} 
              label='Email' 
              placeholder='Email'
            />
          </InputWraperStyled>
          <InputWraperStyled>
            <InputCommon             
              inputRequiredErrorList={inputRequiredErrorList}
              name='cellNumber' 
              onChange={handleChange} 
              label='Telefone' 
              placeholder='Telefone'
            />
            <InputCommon             
              inputRequiredErrorList={inputRequiredErrorList}
              name='date' 
              onChange={handleChange} 
              type='date' 
              label='Data de Nascimento'
              placeholder='Data de Nascimento'
            />
          </InputWraperStyled>
          <ButtonsContainerStyled>
            <ButtonCommon onClick={onCancel} >Cancelar</ButtonCommon>
            <ButtonCommon onClick={handleAddEmployee} >Adicionar</ButtonCommon>
          </ButtonsContainerStyled>
          {children}
        </ModalConfirmDeleteRootStyled>
      </ModalCommon>
    </>
  );
};

export default ModalAddEmployeeComponent;