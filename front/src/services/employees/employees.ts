import axios from "axios";
import { IDataFromBack } from "../../interfaces/employee";
import { API_URL, HEADERS } from "../../models/constants/api";


export const createEmployee = async (createData: any) => {
    try {
      const response = await axios.post(API_URL, createData, { headers: HEADERS });
      //console.log('Employee added:', response.data);
      return response.data; // Optionally return the created employee data
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Rethrow the error to handle it elsewhere if needed
    }
  };