import React from 'react';  // React imported
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Button } from "react-bootstrap"; // Bootstrap Imported
import { useForm } from "react-hook-form";  // Hookform Imported
import swal from 'sweetalert';   // Aleart Popup Imported
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Redux Imported
import * as actions from '../../../redux/_redux/userMaster/userMasterActions';
import * as actionsRole from '../../../redux/_redux/roleMaster/roleMasterActions';
import * as EmailValidator from "email-validator";
import './addusers.css';  // Add User Css Imported
import Moment from 'moment';   // Moment For Timing Format Imported

import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import api from '../../../redux/apis/axios';
//Main Function OF User Info
const UserInfo = () => {
  /**
 * @type {unkonwn}
 * for changing path
 
 */
  let history = useHistory();
  /**
 * @type {any}
 * for setting slice
 */
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const theme = useTheme();
  /**
 * @type {boolean}
 * for mobile size
 */
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {slice variable}
 * for getting slice data
 */
  const { roleMaster }: any = useSelector((state) => state);
  /**
     * @type {string}
     * for storing first name 
     */
  const [fName, setFname] = React.useState('')
  /**
 * @type {string}
 * for storing last name 
 */
  const [lName, setLname] = React.useState('')
  /**
 * @type {string}
 * for storing username
 */
  const [userName, setUserName] = React.useState<string>("")
  /**
 * @type {string}
 * for storing password
 */
  const [password, setPassword] = React.useState<string>("")
  /**
 * @type {object}
 * for storing date 
 */
  const [dateOfBirth, setDateOfBirth] = React.useState({
    isError: false,
    value: "",
    msg: "",
  });
  /**
 * @type {object}
 * for storing driving license number
 */
  const [dlNo, setDlNo] = React.useState({
    isError: false,
    value: "",
    msg: "",
  })
  /**
 * @type {object}
 * for storing mobile number
 */
  const [mobile, setMobile] = React.useState({
    isError: false,
    value: "",
    msg: "",
  })
  /**
 * @type {object}
 * for storing postal code
 */
  const [postalCode, setPostalCode] = React.useState({
    isError: false,
    value: "",
    msg: "",
  })
  /**
 * @type {string}
 * for storing user role
 */
  const [userRole, setUserRole] = React.useState('');
  /**
 * @type {date}
 * for getting current date
 */
  let date = new Date().toISOString().split("T")[0]
  /**
   * @type {object}
   * for service call header
   */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }

  /**
   * @type {Function}
   * for getting all roles
   */

  React.useEffect(() => {
    dispatch(actionsRole.getAllRole());
  }, []);
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
     * @param {object}  data - A object param.
     * for getting all form values on onSubmit button and add user
     */
  const onSubmit = (data: any) => {
    /**
* @type {boolean}
* for valiadation
*/
    let val = true
    /**
* @type {RegExp}
* for mobile valiadation
*/
    const re = /^[0-9\b]+$/;

    if (!fName) {
      val = false
      swal("First Name is Required")
    }
    else if (!lName) {
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
      swal("Phone Number Must Be 10 Digit Number")
    }
    else if (!data.emailId) {
      val = false
      swal(" Email ID is Required")
    }

    else if (data.emailId && !EmailValidator.validate(data.emailId)) {
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
    else if (!dateOfBirth.value) {
      val = false
      swal("Date of Birth is Required")
    }

    else if (dateOfBirth.value >= Moment(new Date()).format('YYYY-MM-DD')) {
      val = false
      swal("Invalid Date of birth")
      val = false
    } else if (dateOfBirth.value < '1950-01-01') {
      swal("Invalid Date of birth")
      val = false
    }
    else if (!dlNo.value) {
      val = false
      swal("Driving License is Required")
    }
    else if (dlNo.value.length !== 16) {
      val = false
      swal("Driving License Must Be 16 Digit")
    }

    else if (!data.address) {
      val = false
      swal("Address is Required")
    }

    else if (!postalCode.value) {
      val = false
      swal("Postal Code is Required")
    }
    else if (String(postalCode.value).length !== 6) {
      val = false
      swal("Postal Code Must Be 6 Digit Number")
    } else if (!userRole) {
      val = false
      swal("User Role is Required")
    }

    if (val) {
      /**
* @type {string}
* for getting url
*/
      const URL = `/UserMaster`
      const payload = {
        firstName: fName,
        lastName: lName,
        dob: dateOfBirth.value,
        dlNo: dlNo.value,
        address: data.address,
        postalCode: postalCode.value,
        mobile: Number(mobile.value),
        emailId: data.emailId,
        userName: userName,
        password: password,
        userRole: userRole
      }
      //post service call for add users
      api.post(URL, payload, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "User created successfully") {
              dispatch(actions.getAllUsers());
              history.push('/user_detail')
              reset();
              swal(response.data.responseMessage);
            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("Something Went Wrong");
        });
    }
  };

  // Design of Add User Started
  return <div className="m-2">
    <div className="user-info-header">
      <div className='user-info-title'>
        User Information
      </div>
      <div className='show-users-container'>
        {/* show all users on onclick */}
        <button
          onClick={() => {
            history.push('/user_detail')
          }} className="show-users-btn">
          <b>   Show All Users</b>
        </button>
      </div>
    </div>
    {/* If screen gets rolemaster data then this method should render */}
    {roleMaster.RoleMasterData ?
      <div className="card">
        <div className="card-body">
          <div className='sub-heading' >
            Please fill the Information below
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
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
                        First Name *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        First Name *
                      </Typography>
                    }
                    variant="standard" style={{ width: "100%" }}
                    value={fName} onChange={(e) => { setFname(e.target.value.trimLeft()) }} />
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
                        Last Name *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Last Name *
                      </Typography>
                    }
                    variant="standard" style={{ width: "100%" }}
                    value={lName} onChange={(e) => { setLname(e.target.value.trimLeft()) }} />
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
                        Phone number *
                      </Typography> : <Typography
                        variant="body2"
                        color="#777E84"
                        fontSize="14px"

                      >
                        Phone number *
                      </Typography>
                    }

                    variant="standard"
                    className='mt-2'
                    style={{ width: "100%", marginTop: "2px" }}
                    value={mobile.value} onChange={(e) => {
                      setMobile({
                        value: e.target.value.trim(),
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? "phone is Required" : "",
                      });

                    }}
                  />
                </div>
                <div className="user-info-field">
                  <TextField id="standard-basic"
                    sx={{ input: { color: '#777e84', } }}
                    variant="standard" style={{ width: "100%", marginTop: "4px" }}

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
                    }

                    className={`form-control ${errors.email && "invalid"}`}
                    {...register("emailId",)}

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
                    value={dateOfBirth.value}

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
                    variant="standard"

                    style={{ width: "100%", marginTop: "4px" }}
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
                  <TextField type="textarea" id="standard-basic"
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
                    className={`form-control ${errors.address && "invalid"}`}
                    {...register("address")}
                    onSubmit={() => {
                      trigger("address");
                    }} />

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
                          e.target.value.length === 6 ? "" : "Postal Must Be 6 Digit",
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
                      fontSize: "12px",

                    }} >
                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "12px",

                      }}>Select Role *</InputLabel></span> :
                      <span  >
                        <InputLabel id="demo-simple-select-standard-label" style={{
                          color: "#777E84",
                          fontSize: "14px",
                          marginTop: "3%"

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
                <Button className="save-btn"
                  type="submit">
                  Save
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

export default UserInfo;
