import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Diagnosis>(
    `${apiBaseUrl}/diagnoses/`
  );

  return data;
};

const getByCode = async (code: string) => {
    const { data } = await axios.get<Diagnosis>(
      `${apiBaseUrl}/diagnoses/${code}`
    );
  
    return data;
};


const getByCodes = async (codes: string[]) => {
  const { data } = await axios.post<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`,
    codes
  );

  return data;
};


// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    getByCode,
    getByCodes
}