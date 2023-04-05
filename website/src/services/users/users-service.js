import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

// const api = axios.create({
//   withCredentials: true,
// });

export const findAllUsers = async () => {
  const response = await axios.get(USERS_API);
  return response.data;
};

export const findUserById = (id) => {
  return axios.get(`${USERS_API}/${id}`).then((response) => response.data);
};

export const createUser = (user) => {
  return axios.post(USERS_API, user);
};

export const updateUser = (newUser) => {
  return axios.put(`${USERS_API}/${newUser.id}`, newUser);
};

export const deleteUser = (id) => {
  return axios.delete(`${USERS_API}/${id}`);
};

export const login = (user) => {
  return axios.post(`${USERS_API}/login`, user);
};

export const logout = () => {
  return axios.post(`${USERS_API}/logout`);
};

export const register = (user) => {
  return axios.post(`${USERS_API}/register`, user);
};