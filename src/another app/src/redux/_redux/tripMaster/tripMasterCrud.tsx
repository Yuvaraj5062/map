
import api from "../../apis/axios";
const GET_TRIPS = `/TripMaster/GetAllTrip`
/**
 * @type {Function}
 * @return array of objects
 * for service call
 */

export function getAllTrips() {
  const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  return api.get(GET_TRIPS,  header);
}
