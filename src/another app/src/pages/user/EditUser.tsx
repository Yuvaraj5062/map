import React, { useState } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Button } from "react-bootstrap";
import { baseURL } from '../../redux/apis/appUrls';
import swal from 'sweetalert';
import '../../assets/css/Navbar.css'
import { editUserProps } from '../Types';
import * as actions from '../../redux/_redux/userMaster/userMasterActions';
import { useDispatch, useSelector } from 'react-redux';
import * as actionsRole from '../../redux/_redux/roleMaster/roleMasterActions';
import './AddUser/addusers.css';
import * as EmailValidator from "email-validator";
import Moment from 'moment'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import api from '../../redux/apis/axios';
interface Props {
  flag: boolean;
  onFlagChange: (newValue: boolean) => void;
  row: editUserProps;
}
const EditUser: React.FC<Props> = ({
  flag,
  onFlagChange,
  row
}) => {
  /**
   * @type {Unknown}
   * for getting slice data
   */

  const dispatch = useDispatch();
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
* @type {string}
* for storing slice data(roles)
 
*/
  const { roleMaster }: any = useSelector((state) => state);
  /**
* @type {string}
* for setting first name
 
*/
  const [firstName, setFirstName] = useState<string>(row.firstName ? row.firstName : "")
  /**
* @type {string}
* for setting last name
*/
  const [lastName, setlastName] = useState<string>(row.lastName ? row.lastName : "")
  /**
* @type {string}
* for setting emailID 
*/
  const [emailId, setEmailId] = useState<string>(row.emailId ? row.emailId : "")
  /**
* @type {string}
* * for setting user name
 
*/
  const [userName, setUserName] = useState<string>(row.userName ? row.userName : "")
  /**
* @type {string}
* * for setting password
 
*/
  const [password, setPassword] = useState<string>(row.password ? row.password : "")
  /**
* @type {string}
* * for setting address
 
*/
  const [address, setAddress] = useState<string>(row.address ? row.address : "")
  /**
* @type {string}
* * for setting user role
 
*/
  const [userRole, setUserRole] = useState<string>(row.userRole ? row.userRole : "")
  /**
  * @type {string|null}
  * for setting user name in local storage
  
  */
  let testVar = localStorage.getItem("userName")
  /**
 * @type {string}
 * for setting user name in user name
 
 */
  let name = row.firstName + " " + row.lastName
  /**
 * @type {boolean}
 * for updating user name
 
 */
  let var2 = String(testVar) === name

  /**
   * @type {object}
   * for setting  date of birth
   
   */
  const [dateOfBirth, setDateOfBirth] = React.useState({
    isError: false,
    value: row.dob ? row.dob : "",
    msg: "",
  });
  /**
   * @type {object}
   * for setting Driving License number
   
   */
  const [dlNo, setDlNo] = useState({
    isError: false,
    value: row.dlNo ? row.dlNo : "",
    msg: "",
  })
  /**
 * @type {object}
 * for setting mobile number
 
 */
  const [mobile, setMobile] = useState({
    isError: false,
    value: row.mobile ? String(row.mobile) : '',
    msg: "",
  })
  /**
   * @type {object}
   * for setting postal code
   
   */
  const [postalCode, setPostalCode] = useState({
    isError: false,
    value: row.postalCode ? row.postalCode : "",
    msg: "",
  })
  /**
 * @type {string}
 * for getting current date
 
 */
  let date = new Date().toISOString().split("T")[0]
  /**
 * @type {Function}
 * @param {HTMLSelectElement}  SelectChangeEvent - A HTMLSelectElement param.
 * for getting selected role
 */

  const handleChange = (event: SelectChangeEvent) => {
    setUserRole(event.target.value);

  };
  /**
* @type {Function}
* for getting all roles
*/
  React.useEffect(() => {
    dispatch(actionsRole.getAllRole());
  }, []);
  /**
 * @type {object}
 * for setting header
 
 */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
   * @type {Function}
   * for getting all form data and update user
   
   */
  const onSubmit = () => {
    /**
 * @type {boolean}
 * for handling validation
 
 */
    let val = true
    /**
 * @type {RegExp}
 * for mobile validation
 
 */
    const re = /^[0-9\b]+$/;

    if (!firstName) {
      val = false
      swal("First Name is Required")
    }
    else if (!lastName) {
      val = false
      swal("Last Name is Required")
    }

    else if (!mobile.value) {
      val = false
      swal("Phone Number is Required")
    }
    else if (!re.test(mobile.value.toString())) {
      val = false
      swal("Phone Number Must Be  Numbers Only")
    }
    else if (String(mobile.value).length !== 10) {
      val = false
      swal("Phone Number Must Be 10 Digit")

    }
    else if (!emailId) {
      val = false
      swal("Email Id is Required")
    }
    else if (emailId && !EmailValidator.validate(emailId)) {
      val = false
      swal("Invalid Email ID")
    }
    else if (!userName) {
      val = false
      swal("User Name is Required")
    }
    else if (!password) {
      val = false
      swal("Password is Required")
    }

    else if (dateOfBirth.value >= Moment(new Date()).format('YYYY-MM-DD')) {
      swal("Invalid Date of birth")
      val = false
    }
    else if (dateOfBirth.value < '1950-01-01') {
      swal("Invalid Date of birth")
      val = false
    }
    else if (!address) {
      val = false
      swal(" Address is Required")
    }

    else if (dlNo.value.length !== 16) {
      val = false
      swal("Driving License Must Be 16 Digit")
    }

    else if (String(postalCode.value).length !== 6) {
      val = false
      swal("Postal Code Must Be 6 Digit")
    }



    if (val) {
      const payload = {
        firstName: firstName,
        lastName: lastName,
        dob: dateOfBirth.value,
        dlNo: dlNo.value,
        address: address,
        postalCode: postalCode.value,
        mobile: mobile.value,
        emailId: emailId,
        userName: userName,
        password: password,
        userRole: userRole
      }
      const URL = `${baseURL}/UserMaster/UpdateUser?UserId=${row.userId}`
      api.post(URL, payload, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "User updated successfully") {
              const userName = response.data.responseData.firstName + " " + response.data.responseData.lastName
              if (var2) {
                localStorage.setItem("userName", userName);
              }
              swal(response.data.responseMessage);
              dispatch(actions.getAllUsers());
              onFlagChange(true)

            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("Somthing Went wrong");
        });
    }
  };

  return <div className="m-2">
    <div className="user-info-header">
      <div className='user-info-title'>
        Edit User Information
      </div>
      <div className='show-users-container'>
        <button
          onClick={() => { onFlagChange(true) }}
          className="show-users-btn">
          <b>  Show All Users</b>
        </button>
      </div>
    </div>

    {roleMaster.RoleMasterData ?
      <div className="card">
        <div className="card-body">
          <div className='sub-heading' >
            Please fill the Information below
          </div>
          <form >
            <div className="container">
              <div className="user-info">
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84' } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        First Name *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        First Name *
                      </Typography>
                    } variant="standard" style={{ width: "100%" }}
                    value={firstName} onChange={(e) => { setFirstName(e.target.value.trimLeft()) }} />
                </div>
                <div className="user-info-field">

                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84' } }} label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Last Name *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="16px"

                      >
                        Last Name *
                      </Typography>
                    } variant="standard" style={{ width: "100%" }}
                    value={lastName} onChange={(e) => { setlastName(e.target.value.trimLeft()) }} />
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84' } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Phone number *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Phone number *
                      </Typography>
                    }
                    variant="standard" style={{ width: "100%", marginTop: "4px" }}

                    value={mobile.value} onChange={(e) => {
                      setMobile({
                        value: e.target.value.trim(),
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? "DOB is Required" : "",
                      });

                    }}

                  />
                </div>
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Email Id *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Email Id *
                      </Typography>
                    } variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    type="email"
                    value={emailId} onChange={(e) => { setEmailId(e.target.value.trimLeft()) }} />
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="12px"
                      >
                        User Name *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        User Name *
                      </Typography>
                    } variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    value={userName} onChange={(e) => { setUserName(e.target.value.trimLeft()) }} />
                </div>
                <div className="user-info-field">
                  <TextField type="password" id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="12px"
                      >
                        Password *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Password *
                      </Typography>
                    }

                    variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    value={password} onChange={(e) => { setPassword(e.target.value.trimLeft()) }} />

                </div>
              </div>
              <div className="user-info">
                <div className="user-info-field">
                  {isMobile ? <span style={{
                    color: "#777E84",

                    fontSize: "12px"
                  }}
                  >    DOB *</span> :
                    <span style={{
                      color: "#777E84",

                      fontSize: "14px"
                    }}
                    >    DOB *</span>}
                  <TextField
                    sx={{ input: { color: '#777e84', } }}
                    type="date"
                    className="rounded-sh"
                    variant="standard"
                    style={{ width: "100%" }}
                    inputProps={{ max: date }}
                    value={dateOfBirth.value.slice(0, 10)}
                    required
                    onChange={(e) => {
                      setDateOfBirth({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? "DOB is Required" : "",
                      });

                    }}

                  />
                </div>
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Driving License Number *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Driving License Number *
                      </Typography>
                    }

                    variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    value={dlNo.value}
                    onChange={(e) => {
                      setDlNo({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value.length === 16 ? "" : "Driving License Must Be 16 Digit",
                      });

                    }}

                  />
                </div>
              </div>
              <div className="user-info">
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Address *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Address *
                      </Typography>
                    }
                    variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    value={address} onChange={(e) => { setAddress(e.target.value) }} />
                </div>
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    label={
                      isMobile ? <Typography
                        variant="body2"
                        color="#777E84"

                        fontSize="12px"
                      >
                        Postal Code *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Postal Code *
                      </Typography>
                    }


                    variant="standard" style={{ width: "100%", marginTop: "4px" }}
                    value={postalCode.value} onChange={(e) => {
                      setPostalCode({
                        value: e.target.value.trim(),
                        isError: e.target.value === "",
                        msg:
                          e.target.value.length === 6 ? "" : "Driving License Must Be 16 Digit",
                      });

                    }}

                  />
                </div>
              </div>

              <div className="user-info">
                <div className="user-info-field">
                  <div className='mt-3'>
                    {isMobile ? <span style={{
                      color: "#777E84",
                      fontSize: "16px",

                    }} >
                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "16px",

                      }}>Select Role *</InputLabel></span> :
                      <span style={{
                        color: "#777E84",
                        fontSize: "12px",

                      }} >
                        <InputLabel id="demo-simple-select-standard-label" style={{
                          color: "#777E84",
                          fontSize: "14px",

                        }}>Select Role *</InputLabel>
                      </span>}
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      style={{ width: "100%" }}
                      value={userRole}
                      onChange={handleChange}

                    >


                      {roleMaster.RoleMasterData.map((row: any) => {

                        return (
                          <MenuItem value={row.userRole} style={{
                            display: "block", color: "#777E84",
                            fontSize: "14px", margin: "3%"

                          }}>{row.userRole}</MenuItem>
                        );
                      })}

                    </Select>
                  </div>
                </div>
              </div>
              <div className="save-btn-container">
                <Button className="save-btn" onClick={() => { onSubmit() }}>
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      :
      < div className="spinner-border m-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }


  </div>;
};

export default EditUser;
