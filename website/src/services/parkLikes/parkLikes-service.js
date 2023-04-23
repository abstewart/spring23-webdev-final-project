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
//uses session to identify username
export const findParksLikedByUser = async () => {
  const response = await api.get(`${PARK_LIKES_API}/byUser`);
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
//gets username via session
export const numParkLikesForUser = async () => {
  const response = await api.get(`${PARK_LIKES_API}/numUserLiked`);
  return response.data
};

//deleting
export const deleteParkLike = async (parkLikeId) => {
  console.log("deleteParkLike called");
  const response = await api.delete(`${PARK_LIKES_API}/${parkLikeId}`);
  return response.data;
};
//gets username via session
export const deleteParkLikeByParams = async (parkId) => {
  const response = await api.delete(`${PARK_LIKES_API}/parkId/${parkId}`);
  return response.data;
};

//creating
//get username from session
export const createParkLike = async (parkId, parkName) => {
  const response = await api.post(`${PARK_LIKES_API}/${parkId}/${parkName}`);
  return response.data;
};