
import api from "../../apis/axios";
const GET_ROLES = `/RoleMaster/GetRoleList`


/**
 * @type {Function}
 * @return array of objects
 * for service call
 */
export function getAllRole() {
  const header = { headers: { "Authorization":`Bearer `+ localStorage.getItem("token"),"Content-Type": "application/json" } }
  return api.get(GET_ROLES,  header);
}
