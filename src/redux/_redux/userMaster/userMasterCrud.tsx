import axios from "axios";
import { baseUrl } from "../../apis/appUrls";
import api from "../../apis/axios";
const GET_USERS = `${baseUrl}/UserMaster/GetAllUser`

/**
 * @type {Function}
 * @return array of objects
 * for service call
 */
 export function addUserMaster(body:any) {
  return axios.post(`${baseUrl}/Auth`, body);
}
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */
export function getAllUsers() {
  const header = { headers: {"Access-Control-Allow-Origin":"*",
  "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  return api.get(GET_USERS,  header);
}