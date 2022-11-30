import * as React from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import logo from "../../assets/images/Go-App-logo2.svg";
import { baseUrl } from "../../redux/apis/appUrls";
import axios from "axios";
import { TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import "../../assets/css/Main.css";
import swal from "sweetalert";
import { useTheme, useMediaQuery } from "@material-ui/core";

const SetPassword = () => {

  const theme = useTheme();
  /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   /**
 * @type {unkonwn}
 * for changing path
 
 */
  let history = useHistory();
   /**
          * @type {string}
          * for getting password value
          */
  const [password, setPassword] = React.useState<string>("");
   /**
        * @type {string}
        * for getting new password value
        */
  const [NewPassword, setNewPassword] = React.useState<string>("");
  /**
        * @type {object}
        * for error message
        */
  const [alertStatus, setAlertStatus] = React.useState({
    status: false,
    message: "",
    type: "",
  });
  /**
        * @type {string}
        * for validation
        */
  const [isValid, setIsValid] = React.useState<boolean>(false);
  /**
        * @type {object}
        * for setting header
        */
  const header = { headers: { "Content-Type": "application/json" } };
  React.useEffect(() => {
   /**
        * @type {string}
        * for set password url
        */
    let passurl = window.location.href.toString();
    /**
            * @type{object}
            */

    axios
      .get(`${baseUrl}/Utility/CheckLinks`, {
        params: {
          Type: "OneTimeClick",
          URL: `${passurl}`,
        },
      })
      .then((response) => {
      
        if (response.status === 200) {
          if (response.data.responseCode === 200) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        } else {
          setIsValid(false);
        }
      })
      .catch((error) => {
        
      });


  }, []);
  /**
        * @type{Function}
        * for getting form data and setpassword functionality
        */
  const onSubmit = () => {
   /**
        * @type{boolean}
        * for handling validation
        */
    let val = true;
    /**
        * @type {string}
        * for getting url
        */
    const userId = window.location.href.split("=");

    if (password.length === 0 && NewPassword.length === 0) {
      swal("New password or Confirm password required");
      val = false;
    } else if (password.length === 0) {
      swal("Confirm password is required");
      val = false;
    } else if (NewPassword.length === 0) {
      swal(" New Password is required");
      val = false;
    } else {
      val = true;
    }

    if (val) {
      if (NewPassword === password) {
        /**
        * @type {object}
        * for setting payload
        */
        const payload = {
          userId: userId[1],
          newPassword: password,
        };

        const URL = `${baseUrl}/Utility/SetForgotPassword`;
        axios
          .post(URL, payload, header)
          .then((response) => {
            if (response.status === 200) {
              setAlertStatus({
                status: true,
                message: response.data.responseMessage,
                type: "success",
              });
              swal("Password Changed Successfully");


              history.push("/");
            } else {
              setAlertStatus({
                status: true,
                message: "New Password and Confirm Password not match",
                type: "error",
              });

              setTimeout(function () {
                setAlertStatus({ status: false, message: "", type: "" });
              }, 3000); //3 Second delay
            }
          })
          .catch(function (error) {
            setAlertStatus({
              status: true,
              message: "New Password and Confirm Password not match",
              type: "error",
            });

            setTimeout(function () {
              setAlertStatus({ status: false, message: "", type: "" });
            }, 3000); //3 Second delay
          });
      } else {
        swal("New Password and Confirm Password do not match");
      }
    }
  };

//UI Design Started
  return (
    <div className="homepage-bgimage">
      <div className="forgetPasswordPage">
        <div className="logo">
          <img
            style={{ height: "50px", width: "150px" }}
            src={logo}
            className="app-logo"
            alt=""
          />
        </div>
        {isValid ? (
          <div className="forgetPasswordContent">
            <p className="loginInTitle">Trouble Logging In?</p>
            <p className="subHeading">Enter your new password</p>
            <TextField
              id="standard-basic"
              variant="standard"
              label={
                isMobile ? (
                  <Typography
                    variant="body2"
                    color="white"
                    fontSize="12px"
                  >
                    New Password *
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ input: { color: "#777E84", fontSize: "14px" } }}
                  >
                    New Password *
                  </Typography>
                )
              }
              type="password"
              value={NewPassword}
              style={{ width: "100%" }}
              onChange={(e) => {
                setNewPassword(e.target.value.trimLeft());
              }}
            />
            <TextField
              id="standard-basic"
              variant="standard"
              sx={{ input: { color: "#777E84", fontSize: "14px" } }}
              label={
                isMobile ? (
                  <Typography
                    variant="body2"
                    color="white"
                    fontSize="12px"
                  >
                    Confirm Password *
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{ input: { color: "#777E84", fontSize: "14px" } }}
                  >
                    Confirm Password *
                  </Typography>
                )
              }
              type="password"
              value={password}
              style={{ width: "100%" }}
              onChange={(e) => {
                setPassword(e.target.value.trimLeft());
              }}
            />

            {alertStatus.status && (
              <div className="errorMsg">
                {alertStatus.type === "success" ? (
                  <Alert severity="success" className="mb-3">
                    {alertStatus.message}
                  </Alert>
                ) : (
                  <Alert severity="error" className="mb-3">
                    {alertStatus.message}
                  </Alert>
                )}
              </div>
            )}
            <div className="btnGrp">
              <button
                className="cancelBtn"
                onClick={() => {
                  history.push("/");
                }}
              >
                Cancel
              </button>
              <button
                className="sendBtn"
                onClick={() => {
                  onSubmit();
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p
            style={{
              alignSelf: "center",
              marginLeft: "30%",
              marginTop: "20%",
              fontSize: "18px",
              color: "#24B1E3",
            }}
          >
            Link is expired
          </p>
        )}
      </div>
    </div>
  );
};

export default SetPassword;
