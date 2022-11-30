import * as React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import logo from '../../../assets/images/Go-App-logo2.svg'
import { baseUrl } from '../../../redux/apis/appUrls';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useHistory } from 'react-router-dom';
import './forgetpassword.css'
import {
    useTheme,
    useMediaQuery,
} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
    modal: {
        display: "flex",
        marginTop: "15%",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontWeight: "bold",
        marginLeft: "30%"
    }
}))
interface Props {
    flag: boolean;
    onFlagChange: (newValue: boolean) => void;
}

const ForgotPassword = () => {
    /**
 * @type {unkonwn}
 * for changing path
 
 */
    let history = useHistory();
    const theme = useTheme();
     /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    /**
        * @type {string}
        * for getting email value
        */
    const [email, setEmail] = React.useState<string>("")
    /**
        * @type {object}
        * for setting error message
        */
    const [alertStatus, setAlertStatus] = React.useState({
        status: false,
        message: "",
        type: "",
    });
    /**
        * @type {object}
        * for setting header
        */
    const header = { headers: { "Content-Type": "application/json" } }
     /**
        * @type {Function}
        * for getting form data and Forgot password functionality
        */
    const onSubmit = () => {
        /**
        * @type {string}
        * for handling validation
        */
        let val = true
        /**
        * @type {boolean}
        * for email validation
        */
        let emailValidate = (/[A-Z]/.test(email));

        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {

            if (emailValidate === true) {
                val = false
                setAlertStatus({
                    status: true,
                    message: " Email ID is invalid ",
                    type: "error",
                });
                setTimeout(function () {
                    setAlertStatus({ status: false, message: "", type: "" });
                }, 3000);

            }
            else {
                val = true
            }
        } else {
            val = false
            setAlertStatus({
                status: true,
                message: " Email ID is invalid ",
                type: "error",
            });
            setTimeout(function () {
                setAlertStatus({ status: false, message: "", type: "" });
            }, 3000);

        }

        if (val) {

            if (email) {
                const URL = `${baseUrl}/Utility/ForgotPassword?EmailId=${email}`;
                axios.post(URL, null, header).then((response) => {
                    if (response.data.responseMessage === "Link send successfully") {

                        setAlertStatus({
                            status: true,
                            message: response.data.responseMessage,
                            type: "success",
                        });

                        setTimeout(function () {
                            setAlertStatus({ status: false, message: "", type: "" });
                        }, 5000); //5 Second delay

                    } else {
                        setAlertStatus({
                            status: true,
                            message: " Email ID is invalid' ",
                            type: "error",
                        });

                        setTimeout(function () {
                            setAlertStatus({ status: false, message: "", type: "" });
                        }, 3000); //3 Second delay
                    }
                }).catch(function (error) {
                    setAlertStatus({
                        status: true,
                        message: " Email ID is invalid' ",
                        type: "error",
                    });

                    setTimeout(function () {
                        setAlertStatus({ status: false, message: "", type: "" });
                    }, 3000); //3 Second delay
                });
            } else {
                setAlertStatus({
                    status: true,
                    message: "Email ID is Required",
                    type: "error",
                });

                setTimeout(function () {
                    setAlertStatus({ status: false, message: "", type: "" });
                }, 3000);
            }
            setEmail("")
        }
    };

    // Design UI Started
    return (
        <div className='homepage-bgimage'  >
            <div className='forgetPasswordPage' >
                <div className="logo">
                    <img style={{ height: "50px", width: "150px" }} src={logo} className="app-logo" alt="" />
                </div>
                <div className='forgetPasswordContent'>
                    <p className='loginInTitle'>
                        Trouble Logging In?
                    </p>

                    <p className="subHeading">
                        Enter your email and we'll send you link to get back  into your account
                    </p>
                    <TextField id="standard-basic"
                        sx={{ input: { color: '#777E84', fontSize: "14px" } }}
                        label={
                            isMobile ? <Typography
                                variant="body2"
                                color="white"
                                fontSize="12px"
                            >
                                Email address *
                            </Typography> : <Typography
                                variant="body2"
                                color="#777E84"
                                fontSize="14px"

                            >
                                Email address *
                            </Typography>
                        }


                        variant="standard" type="email"

                        value={email}
                        style={{ width: "100%" }} onChange={(e) => { setEmail(e.target.value) }}
                    />
                    {alertStatus.status && (
                        <div className="errorMsg">
                            {alertStatus.type === "success" ?
                                <Alert severity="success" className="mb-3">
                                    {alertStatus.message}
                                </Alert> :
                                <Alert severity="error" className="mb-3">
                                    {alertStatus.message}
                                </Alert>}
                        </div>
                    )}
                    <div className='btnGrp'>
                        <button className="cancelBtn"
                            onClick={() => { history.push('/') }}>
                            Cancel
                        </button>
                        <button className="sendBtn"
                            onClick={() => { onSubmit() }}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
