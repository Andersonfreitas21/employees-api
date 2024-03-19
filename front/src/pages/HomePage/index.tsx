import React, { ReactNode, useState, useEffect } from 'react';
import { MainContainerStyled, RootPageLoyoutStyled } from './styled';
import HeaderComponent from '../../components/HeaderComponent';
import TableComponent from '../../components/TableComponent';
import ModalAddEmployee from '../../components/ModalAddEmployeeComponent';
import { IDataFromBack } from '../../interfaces/employee';
import LoadingSpinnerCommon from '../../commons/LoadingSpinnerCommon';
import { createEmployee } from '../../services/employees/employees';

interface IProps {
  children?: ReactNode;
}

const HomePage: React.FC<IProps> = () => {
  const [createData, setCreateData] = useState<any[]>([]);

  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [allEmployees, setAllEmployees] = useState<IDataFromBack[]>([]);

  const onHandleAddEmployee = (data: any) => {
    setIsLoading(true);
    createEmployee(data)
      // .then(() => getAllEmployees())
      .then(result => {
        setAllEmployees(result);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error creating employee:", error);
        setIsLoading(false);
      });
  }




  return (
    <>
      <RootPageLoyoutStyled>
        
      </RootPageLoyoutStyled>
    </>                                    
  );
};

export default HomePage;