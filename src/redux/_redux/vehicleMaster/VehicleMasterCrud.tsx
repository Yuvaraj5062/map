import axios from "axios";
import { baseUrl } from "../../apis/appUrls";
import api from "../../apis/axios";
const GET_vehicle = `${baseUrl}/VehicleMaster/GetAllVehicle`
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */export function addVehicleMaster(body:any) {
  return axios.post(`${baseUrl}/Auth`, body);
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