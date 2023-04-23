import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";
const USERS_API = `${API_BASE}/users`;
console.log("USERS_API: ", USERS_API)

const api = axios.create({
  withCredentials: true,
});

export const findAllUsers = async () => {
  const response = await api.get(USERS_API);
  return response.data;
};

export const findUserByUsername = async (username) => {
  const response = await api.get(`${USERS_API}/username/${username}`);
  return response.data;
};

export const createUser = async (user) => {
  const response = await api.post(USERS_API, user);
  return response.data;
};

export const updateUser = async (user) => {
  const response = await api.put(`${USERS_API}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const login = async (user) => {
  const response = await api.post(`${USERS_API}/login`, user);
  return response.data;
};

export const logout = async () => {
  const response = await api.post(`${USERS_API}/logout`);
  return response.data;
};

export const register = async (user) => {
  const response = await api.post(`${USERS_API}/register`, user);
  return response.data;
};

export const getCurrentUser = async () => {
  const ret = await api.get(`${USERS_API}/currentUser`);
  return ret.data;
};