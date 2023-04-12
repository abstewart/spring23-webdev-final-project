import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({
  withCredentials: true,
});

export const findAllUsers = async () => {
  const response = await api.get(USERS_API);
  return response.data;
};

export const findUserById = async (id) => {
  return await api.get(`${USERS_API}/${id}`).then((response) => response.data);
};

export const createUser = async (user) => {
  return await api.post(USERS_API, user);
};

export const updateUser = async (newUser) => {
  return await api.put(`${USERS_API}/${newUser.id}`, newUser);
};

export const deleteUser = async (id) => {
  return await api.delete(`${USERS_API}/${id}`);
};

export const login = async (user) => {
  return await api.post(`${USERS_API}/login`, user);
};

export const logout = async () => {
  return await api.post(`${USERS_API}/logout`);
};

export const register = async (user) => {
  return await api.post(`${USERS_API}/register`, user);
};

export const getCurrentUser = async () => {
  const ret = await api.get(`${USERS_API}/currentUser`);
  return ret;
};