import React, { useState } from 'react';
import { ButtonsWrapperStyled, TBodyDataStyled, TBodyRowStyled, TBodyStyled, THeadDataStyled, THeadRowStyled, THeadStyled, TableRootContainerStyled, TableSemanticStyled, TableTitleStyled, TableWrapperStyled, TopWrapperStyled } from './styled';
import ButtonCommon from '../../commons/ButtonCommon';
import { IDataFromBack } from '../../interfaces/employee';
import ModalDeleteEmployeeComponent from '../ModalDeleteEmployeeComponent';
import ModalEditEmployeeComponent from '../ModalEditEmployeeComponent';

interface TableComponentProps {
  tableData?: IDataFromBack[];
  onAdd: () => void;
  onEdit: (objectId: string, newData: IDataFromBack) => void;  
  onDelete: (objectId: string) => void; // Function to handle delete action
}

const TableComponent: React.FC<TableComponentProps> = ({ tableData, onAdd, onEdit, onDelete }) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string>('');
  const [itemToEditId, setItemToEditId] = useState<string>('');

  const handleDeleteClick = (objectId: string) => {
    setItemToDeleteId(objectId);
    setIsModalDeleteOpen(true);
  };

  const handleEditClick = (objectId: string) => {
    setItemToEditId(objectId);
    setIsModalEditOpen(true);
  };

  return (
    <>
      <TableRootContainerStyled>
        <TopWrapperStyled>
          <TableTitleStyled>Funcionários</TableTitleStyled>
          <ButtonCommon onClick={onAdd}>Adicionar novo funcionário</ButtonCommon>
        </TopWrapperStyled>
        <TableWrapperStyled>
          <TableSemanticStyled>
            <THeadStyled>
              <THeadRowStyled>
                <THeadDataStyled>ID</THeadDataStyled>
                <THeadDataStyled>Nome</THeadDataStyled>
                <THeadDataStyled>Cargo</THeadDataStyled>
                <THeadDataStyled>Email</THeadDataStyled>
                <THeadDataStyled>Telefone</THeadDataStyled>
                <THeadDataStyled>Data de Nascimento</THeadDataStyled>
                <THeadDataStyled>Ações</THeadDataStyled>              
              </THeadRowStyled>
            </THeadStyled>
            <TBodyStyled>
              {tableData && tableData.map((item: any, index: any) => (
                <TBodyRowStyled key={index}>
                  <TBodyDataStyled>{item.objectId}</TBodyDataStyled>
                  <TBodyDataStyled>{item.name}</TBodyDataStyled>
                  <TBodyDataStyled>{item.position}</TBodyDataStyled>
                  <TBodyDataStyled>{item.email}</TBodyDataStyled>
                  <TBodyDataStyled>{item.cellPhoneNumber}</TBodyDataStyled>
                  <TBodyDataStyled>{item.birthdayDate}</TBodyDataStyled>
                  <TBodyDataStyled>
                    <ButtonsWrapperStyled>
                      <ButtonCommon onClick={() => handleEditClick(item.objectId)}>Editar</ButtonCommon>
                      <ButtonCommon onClick={() => handleDeleteClick(item.objectId)}>Deletar</ButtonCommon>
                    </ButtonsWrapperStyled>
                  </TBodyDataStyled>
                </TBodyRowStyled>
              ))}
            </TBodyStyled>
          </TableSemanticStyled>
        </TableWrapperStyled>
        {isModalDeleteOpen && <ModalDeleteEmployeeComponent 
          onConfirmDelete={() => {
            onDelete(itemToDeleteId);
            setIsModalDeleteOpen(false);
          }}
          onClickOut={() => setIsModalDeleteOpen(false)} 
          onCancel={() => setIsModalDeleteOpen(false)}
        />}
        {isModalEditOpen && <ModalEditEmployeeComponent
          // onHandleEditDevice={(data) => {
          //   onEdit(itemToEditId, data); // Pass the edited data along with the objectId
          //   setIsModalEditOpen(false);
          // }}
          // onClickOut={() => setIsModalEditOpen(false)} 
          // onCancel={() => setIsModalEditOpen(false)}
        />}
      </TableRootContainerStyled>
    </>
  );
};

export default TableComponent;