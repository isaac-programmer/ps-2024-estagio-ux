import axios, { AxiosError } from "axios";
import { User } from "../types";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

// Obtém o usuário associado ao 'id' informado
export const getUserById = async (
  id: string,
  setFormData: Dispatch<SetStateAction<User>>
) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/user/${id}`);
    setFormData(data);
  } catch (error) {
    console.log(error);
    alert("Usuário não encontrado");
  }
};

// Obtém todos os usuários
export const getUsers = async (
  setUsers: Dispatch<SetStateAction<User[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const { data } = await axios.get("http://localhost:5000/users");

    const userRoleSigned = sessionStorage.getItem("userRole");

    if(userRoleSigned && userRoleSigned === "admin") {
      setUsers(data.filter((user: User) => { return user.role === "client" }));
    } else {
      setUsers(data);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

// Requisita a inserção de um usuário
export const postUser = async (
  formData: User,
  history: NavigateFunction,
  e: React.FormEvent<HTMLFormElement>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();
  
  try {
    await axios.post(`http://localhost:5000/user`, {...formData});
    alert("Usuário cadastrado com sucesso!");

    // Redireciona para a tela de login
    history("/");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);

      if (error.response?.data.error === "CPF existente") {
        alert("O CPF informado já está cadastrado");
      }
    }
  } finally {
    setLoading(false);
  }
};

// Requisita a atualização do usuário associado ao 'id' informado
export const putUser = async (
  id: string,
  formData: User,
  history: NavigateFunction,
  e: React.FormEvent<HTMLFormElement>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  e.preventDefault();

  try {
    await axios.put(`http://localhost:5000/user/${id}`, formData);
    alert("Usuário atualizado com sucesso!");

    // Redireciona para a tela home
    history("/");
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);

      if (error.response?.data.error === "CPF existente") {
        alert("O CPF informado já está cadastrado");
      }
    }
  } finally {
    setLoading(false);
  }
};

// Requisita a deleção do usuário associado ao 'id' informado
export const deleteUser = async (
  idUser: number,
  reload: boolean,
  setReload: Dispatch<SetStateAction<boolean>>
) => {
  try {
    await axios.delete(`http://localhost:5000/user/${idUser}`);
    alert("Usuário deletado com sucesso!");
    setReload(!reload);
  } catch (error) {
    console.log(error);
    alert("Erro ao deletar usuário!");
  }
};
