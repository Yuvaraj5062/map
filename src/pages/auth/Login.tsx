import * as React from 'react';

import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import '../../assets/css/Navbar.css'
import { useDispatch } from "react-redux";
import { adminSlice } from "../../redux/_redux/adminSlice"
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { baseUrl } from '../../redux/apis/appUrls';
import logo from '../../assets/images/Go-App-logo2.svg'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import '../../assets/css/Main.css'
import './login.css'
import { Modal } from 'react-bootstrap';

import { connect } from "react-redux";
import * as auth from '../../module/Auth/_redux/authRedux'

import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: "flex",
    marginTop: "40%",
    marginLeft: "8%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  lmodal: {
    display: "flex",
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },

}))


const Login = (props: any) => {
/**
 * @type {unkonwn}
 * for setting slice data
 
 */
  const dispatch = useDispatch();
  const classes = useStyles();
  /**
        * @type {Function}
        * for closing popup
        */
  const handleClose = () => setOpen(false);
   /**
        * @type {string|null}
        * for setting user name 
        */
  const val = localStorage.getItem("rUserName")
  /**
        * @type {string}
        * for setting first name
        */
  const [firstName, setFirstname] = React.useState<string>(val ? val : '')
   /**
        * @type {string|null}
        * for setting password value
        */
  const pass = localStorage.getItem("rPass")
  /**
        * @type {string}
        * for getting password 
        */
  const [password, setPassword] = React.useState<string>(pass ? pass : '')
  const theme = useTheme();
  /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {any}
 * for getting actions
 
 */
  const { actions } = adminSlice;
  const {

    handleSubmit,
    formState: { errors },
    reset,

  } = useForm();
/**
          * @type {boolean}
          * for handling popup
          */
  const [open, setOpen] = React.useState(false)
   /**
        * @type {boolean}
        * for remember me functionality
        */
  const [remember, setRemember] = React.useState(localStorage.getItem("rPass") ? true : false)
 /**
        * @type {object}
        * for setting header
        */
  const header = { headers: { "Content-Type": "application/json" } }
/**
 * @type {Function}
 * for setting user name and password values for remember me functionality
 
 */
  React.useEffect(() => {
    const val = localStorage.getItem("rUserName")
    const pass = localStorage.getItem("rPass")
    setFirstname(val ? val : '')
    setPassword(pass ? pass : '')
  }, []);

  /**
          * @type {Function}
          * for getting form data and login functionality
          */
  const onSubmit = () => {
    localStorage.removeItem("rUserName")
    localStorage.removeItem("rPass")
    setFirstname(firstName)
    setPassword(password)
    if (remember) {
      localStorage.setItem("rUserName", firstName);
      localStorage.setItem("rPass", password);
    }
/**
 * @type {boolean}
 * for checking user details
 
 */
    let flag = true
    if (!firstName && !password) {
      flag = false;
      swal("Username and Password is Required")
    }
    else if (!firstName) {
      flag = false;
      swal("Username is Required")
    }
    else if (!password) {
      flag = false;
      swal("Password is Required")
    } else {
      flag = true;
    }

    if (flag) {
      /**
 * @type {object}
 * for setting payload
 
 */
      const payload = {
        "userName": firstName,
        "password": password
      }
/**
 * @type {string}
 * for login url
 
 */
      const LOGIN_URL = `${baseUrl}/Auth`

      axios.post(LOGIN_URL, payload, header)
        .then((response) => {

          if (response.status === 200) {
            if (response.data.responseMessage === "Login successfull") {
              const userId = response.data.responseData.userId
              const token = response.data.responseData.token
              const refreshtoken = response.data.responseData.refreshtoken
              const userName = response.data.responseData.firstName + " " + response.data.responseData.lastName
              const role = response.data.responseData.role

              localStorage.setItem("role", role);

              if (role === "Admin" || role === "Sub-Admin") {

                setOpen(true)
                setTimeout(function () {
                  setOpen(false)
                  props.login({ authKey: response.data.responseData, user: response.data.responseData });
                  localStorage.setItem("userId", userId);
                  localStorage.setItem("token", token);
                  localStorage.setItem("userName", userName);
                  localStorage.setItem("refreshtoken", refreshtoken)
                  dispatch(actions.getUser(response.data.responseData))
                }, 3000);
                if (remember) {
                  localStorage.setItem("rUserName", firstName);
                  localStorage.setItem("rPass", password);
                }
                else {
                  localStorage.removeItem("rUserName")
                  localStorage.removeItem("rPass")
                }
              } else {
                swal("Access Denied")
              }
            }
            else {
              swal(response.data.responseMessage);
            }
          }
        })
      reset();
    }
  };

  return (
    <React.Fragment>
      <div className="homepage-bgimage">
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='heading'>
            <img style={{ height: "50px", width: "150px" }} src={logo} className="app-logo" alt="" />
          </div>
          <div className='form-content'>
            <div className='login-title'>
              Login
            </div>
            <div className='login-text'>
              Login to access your account
            </div>
            <div className='username-container'>
              <TextField id="standard-basic"
                sx={{ input: { color: '#777E84', fontSize: "14px" } }}
                label={
                  isMobile ? <Typography
                    variant="body2"
                    color="#ffffff"
                    fontSize="12px"
                  >
                    Username
                  </Typography> : <Typography
                    variant="body2"
                    color="#777E84"
                    fontSize="14px"
                  >
                    Username
                  </Typography>
                }
                variant="standard"
                value={firstName}
                style={{ width: "100%" }}
                onChange={(e) => { setFirstname(e.target.value) }}
              />
            </div>
            <div className='password-container'>
              <TextField type="password" id="standard-basic"
                sx={{ input: { color: '#777E84', fontSize: "14px" } }}
                label={
                  isMobile ? <Typography
                    variant="body2"
                    color="white"
                    fontSize="12px"
                  >
                    Password
                  </Typography> : <Typography
                    variant="body2"
                    color="#777E84"
                    fontSize="14px"
                  >
                    Password
                  </Typography>
                }
                variant="standard"
                value={password}
                style={{ width: "100%" }}
                onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div className='remember-password mt-3'>
              <FormGroup>
                <FormControlLabel control={
                  localStorage.getItem("rPass") ? <Checkbox
                    defaultChecked /> :
                    <Checkbox />
                } label={
                  isMobile ? <Typography
                    variant="body2"
                    color="#777E84"
                    fontSize="12px"
                  >
                    Remember Me
                  </Typography> : <Typography
                    variant="body2"
                    color="#777E84"
                    fontSize="14px"

                  >
                    Remember Me
                  </Typography>
                }
                  onChange={() => { setRemember(!remember) }} />
              </FormGroup>
              <Link to="/forgot"
              >
                {isMobile ? <span style={{ color: "white" }}>Forgot your password?</span> : <span style={{ color: "#24B1E3" }}>Forgot your password?</span>}</Link>
            </div>
          </div>
          <div className='login-button-container'>
            <button type="submit" className='button text-white'>
              Login
            </button>
          </div>
        </form>
      </div>

      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={isMobile ? classes.modal : classes.lmodal}
      >
        <Modal.Header closeButton>
          <Modal.Title><span className='title' style={{ color: "#777E84" }}>Please Wait... </span></Modal.Title>
        </Modal.Header>
      </Modal>
    </React.Fragment>
  );
}


export default connect(null, auth.actions)(Login);
