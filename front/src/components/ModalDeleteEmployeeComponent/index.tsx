import React, { useState } from "react";
import ModalCommon from "../../commons/ModalCommon";
import {
  ButtonsContainerStyled,
  ModalConfirmDeleteRootStyled,
  SubTitleModalStyled,
} from "./styled";
import TitleCommon from "../../commons/TitleCommon";
import ButtonCommon from "../../commons/ButtonCommon";

interface IProps {
  children?: React.ReactNode;
  onConfirmDelete?: () => void;
  onCancel?: () => void;
  onClickOut?: () => void;
}

const ModalDeleteEmployeeComponent: React.FC<IProps> = ({
  children,
  onConfirmDelete,
  onCancel,
  onClickOut,
}) => {
  return (
    <>
      <ModalCommon onClickOut={onClickOut}>
        <ModalConfirmDeleteRootStyled>
          <TitleCommon variant="modal">
            Deletar dados do funcionário
          </TitleCommon>
          <SubTitleModalStyled>
            Deseja excluir os dados desse funcionário do banco de dados?
          </SubTitleModalStyled>

          <ButtonsContainerStyled>
            <ButtonCommon onClick={onCancel}>Cancelar</ButtonCommon>
            <ButtonCommon onClick={onConfirmDelete}>Excluir</ButtonCommon>
          </ButtonsContainerStyled>
          {children}
        </ModalConfirmDeleteRootStyled>
      </ModalCommon>
    </>
  );
};

export default ModalDeleteEmployeeComponent;

