import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const REVIEW_LIKES_API = `${API_BASE}/reviewLikes`;

const api = axios.create({
  withCredentials: true,
})

export const findAllReviewLikes = async () => {
  const response = await axios.get(REVIEW_LIKES_API);
  return response.data;
};
export const findReviewsLikedByUser = async () => {
  const response = await api.get(`${REVIEW_LIKES_API}/byUser`);
  return response.data;
};
export const findWhoLikedReview = async (reviewId) => {
  const response = await axios.get(`${REVIEW_LIKES_API}/whoLiked/${reviewId}`);
  return response.data;
};
export const numLikesForReview = async (reviewId) => {
  const response = await axios.get(`${REVIEW_LIKES_API}/numLikedReview/${reviewId}`);
  return response.data;
};
export const numLikesByUser = async () => {
  const response = await api.get(`${REVIEW_LIKES_API}/numLikedUsername`);
  return response.data;
};
export const createReviewLike = async (reviewId) => {
  const response = await api.post(`${REVIEW_LIKES_API}/${reviewId}`);
  return response.data;
};
export const deleteReviewLike = async (reviewLikeId) => {
  const response = await api.delete(`${REVIEW_LIKES_API}/${reviewLikeId}`);
  return response.data;
};
export const deleteReviewLikeByParams = async (review) => {
  const response = await api.delete(`${REVIEW_LIKES_API}/reviewId/${review}`);
  return response.data;
};