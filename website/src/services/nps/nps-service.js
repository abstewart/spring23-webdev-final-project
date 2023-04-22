import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const NPS_API = `${API_BASE}/parks`;

export const getParkDetails = async (parkId) => {
  //console.log("getParkDetails: ", parkId)
  const response = await axios.get(`${NPS_API}/getPark/${parkId}`);
  //console.log(response.data.data);
  return response.data.data;
}

export const generalParkSearch = async ({state, term}) => {
  console.log("generalParkSearch: ", state, term)
  const response = await axios.get(`${NPS_API}/search?stateCode=${state}&searchTerm=${term}`)
  console.log(response.data.data);
  return response.data.data;
}