import axios from "axios";
import { baseUrl } from "../apis/appUrls";
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */export function userLogin(body:any) {
  return axios.post(`${baseUrl}/Auth`, body);
}
