import axios from "axios";
import { baseURL } from "../apis/appUrls";
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */
export function userLogin(body:any) {
  return axios.post(`${baseURL}/Auth`, body);
}
