import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const PARK_LIKES_API = `${API_BASE}/parkLikes`;

const api = axios.create({
  withCredentials: true,
})

//searching
export const findAllParkLikes = async () => {
  const response = await axios.get(PARK_LIKES_API);
  return response.data
};
export const findParksLikedByUser = async (username) => {
  const response = await axios.get(`${PARK_LIKES_API}/byUser/${username}`);
  return response.data
};
export const findWhoLikedPark = async (parkId) => {
  const response = await axios.get(`${PARK_LIKES_API}/whoLiked/${parkId}`);
  return response.data
};
export const numLikesForPark = async (parkId) => {
  const response = await axios.get(`${PARK_LIKES_API}/numLikedPark/${parkId}`);
  return response.data
};
export const numParkLikesForUser = async (username) => {
  const response = await axios.get(`${PARK_LIKES_API}/numLikedUsername/${username}`);
  return response.data
};

//deleting
export const deleteParkLike = async (parkLikeId) => {
  const response = await api.delete(`${PARK_LIKES_API}/${parkLikeId}`);
  return response.data;
};
export const deleteParkLikeByParams = async (parkId, username) => {
  const response = await api.delete(`${PARK_LIKES_API}/${username}/${parkId}`);
  return response.data;
};

//creating
export const createParkLike = async (parkId, username) => {
  const pl = {username, park: parkId}
  const response = await axios.post(PARK_LIKES_API, pl);
  return response.data;
};