import React, { ReactNode, useState, useEffect } from "react";
import { MainContainerStyled, RootPageLoyoutStyled } from "./styled";
import HeaderComponent from "../../components/HeaderComponent";
import TableComponent from "../../components/TableComponent";
import ModalAddEmployee from "../../components/ModalAddEmployeeComponent";
import { IDataFromBack } from "../../interfaces/employee";
import LoadingSpinnerCommon from "../../commons/LoadingSpinnerCommon";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../../services/employees/employees";

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

  useEffect(() => {
    getAllEmployees()
      .then((result) => {
        setAllEmployees(result);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const onHandleAddEmployee = (data: any) => {
    setIsLoading(true);
    createEmployee(data)
      .then(() => getAllEmployees())
      .then((result) => {
        setAllEmployees(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error creating employee:", error);
        setIsLoading(false);
      });
  };

  const onHandleDeleteEmployee = (objectId: string) => {
    setIsLoading(true);
    deleteEmployee(objectId)
      .then(() => getAllEmployees())
      .then((result) => {
        setAllEmployees(result);
        setIsLoading(false);
        setIsModalDeleteOpen(false); // Close the delete modal after successful deletion
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setIsLoading(false);
      });
  };

  const onHandleEditEmployee = (objectId: string, newData: IDataFromBack) => {
    setIsLoading(true);
    updateEmployee(objectId, newData)
      .then(() => getAllEmployees())
      .then(result => {
        setAllEmployees(result);
        setIsLoading(false);
        setIsModalEditOpen(false); // Close the edit modal after successful update
      })
      .catch(error => {
        console.error("Error updating employee:", error);
        setIsLoading(false);
      });
  }

  return (
    <>
      <RootPageLoyoutStyled>
        <HeaderComponent/>
        <MainContainerStyled>
            <TableComponent 
                tableData={allEmployees}
                onAdd={() => setIsModalAddOpen(true)} 
                onEdit={onHandleEditEmployee} 
                onDelete={onHandleDeleteEmployee}
            />
        </MainContainerStyled>
        {isModalAddOpen && <ModalAddEmployee
          onHandleAddDevice={onHandleAddEmployee} 
          onClickOut={() => setIsModalAddOpen(false)} 
          onCancel={() => setIsModalAddOpen(false)}
        />}
        {isLoading && <LoadingSpinnerCommon/>}
      </RootPageLoyoutStyled>
    </>
  );
};

export default HomePage;
