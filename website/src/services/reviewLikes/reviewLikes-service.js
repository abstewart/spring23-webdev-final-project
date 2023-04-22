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
export const findReviewsLikedByUser = async (username) => {
  const response = await axios.get(`${REVIEW_LIKES_API}/byUser/${username}`);
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
export const numLikesByUser = async (username) => {
  const response = await axios.get(`${REVIEW_LIKES_API}/numLikedUsername/${username}"`);
  return response.data;
};
export const createReviewLike = async (reviewId, username) => {
  const rl = {review: reviewId, username}
  const response = await axios.post(REVIEW_LIKES_API, rl);
  return response.data;
};
export const deleteReviewLike = async (reviewLikeId) => {
  const response = await api.delete(`${REVIEW_LIKES_API}/${reviewLikeId}`);
  return response.data;
};
export const deleteReviewLikeByParams = async (review, username) => {
  const response = await api.delete(`${REVIEW_LIKES_API}/${username}/${review}`);
  return response.data;
};