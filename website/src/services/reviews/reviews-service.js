import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEWS_API = `${API_BASE}/reviews`;

const api = axios.create({
  withCredentials: true,
});

export const findAllReviews = async () => {
  const response = await api.get(REVIEWS_API);
  return response.data;
};
export const findReviewsByUser = async (uId) => {
  const response = await api.get(`${REVIEWS_API}/user/${uId}`);
  return response.data;
};
export const findReviewsByPark = async (pId) => {
  const response = await api.get(`${REVIEWS_API}/park/${pId}`);
  return response.data;
};
export const createReview = async (review) => {
  const response = await api.post(REVIEWS_API, review);
  return response.data;
};
export const updateReview = async () => {
  const response = await api.put(REVIEWS_API, review);
  return response.data;
};
export const deleteReview = async (rId) => {
  const response = await api.delete(`${REVIEWS_API}/rId`)
  return response.data;
};