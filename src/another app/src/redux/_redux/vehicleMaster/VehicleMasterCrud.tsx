import axios from "axios";
import { baseURL } from "../../apis/appUrls";
import api from "../../apis/axios";
const GET_vehicle = `${baseURL}/VehicleMaster/GetAllVehicle`

/**
 * @type {Function}
 * @return array of objects
 * for service call
 */

export function addVehicleMaster(body:any) {

  return axios.post(`${baseURL}/Auth`, body);
}
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */
export function getAllVehicle() {

  const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  return api.get(GET_vehicle,  header);
}