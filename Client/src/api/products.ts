import { useParams } from "react-router-dom";
import instance from ".";
import { IProduct, formAdd } from "../interface";

const getAll = (url: string) => {
  return instance.get(url);
};

const getItem = (url: string, id: string | undefined) => {
  return instance.get(`${url}/${id}`);
};

const createItem = (url: string, data: IProduct) => {
  return instance.post(url, data);
};

const updateItem = (url: string, data: IProduct) => {
  return instance.put(url, data);
};

const deleteItem = (url: string) => {
  return instance.delete(url);
};

export { getAll, getItem, createItem, updateItem, deleteItem };
