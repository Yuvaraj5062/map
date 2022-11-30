import * as React from 'react';
import { TextField, Typography } from '@mui/material';
import { baseURL } from '../../../redux/apis/appUrls';
import { useHistory } from 'react-router-dom';
import '../../../assets/css/Navbar.css'
import '../../../assets/css/Main.css'
import './AddRole.css'
import swal from 'sweetalert';
import {
    useTheme,
    useMediaQuery,

} from "@material-ui/core";
import api from '../../../redux/apis/axios';


const AddRole = () => {
    /**
 * @type {unkonwn}
 * for changing path
 
 */
    let history = useHistory();
    /**
     * @type {string} 
     * for storing role
     
     */
    const [role, setRole] = React.useState<string>("")
    const theme = useTheme();
    /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    /**
 * @type {object} 
 * for setting headers
 
 */
    const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }

    /**
   * @type {Function} 
   * for getting form data and add role
   
   */
    const onSubmit = () => {
        if (role) {

            /**
             * @type {string} 
             * for setting url
             
             */
            const URL = `${baseURL}/RoleMaster/CreateRole`;
            /**
 * @type {object} 
 * for storing form data
 
 */
            const payload = { "userRole": role }
            api.post(URL, payload, header).then((response) => {
                if (response.status === 200) {
                    if (response.data.responseMessage === "Role added successfully") {
                        history.push('/role_detail')
                        setRole("")
                        swal(response.data.responseMessage);

                    } else {
                        swal(response.data.responseMessage);
                    }
                }
            }).catch(function (error) {
                swal("something went wrong");
            });
        } else {
            swal("Role Required");
        }

    };


    return (
        <div className="m-2">
            <div className="role-info-header">
                <div className='role-info-text'>
                    Add Role
                </div>
                <div className='Show-role-button-container'>
                    <button className="Show-role-button"
                        onClick={() => {
                            history.push('/role_detail')
                        }}>
                        Show All Role
                    </button>
                </div>
            </div>
            <div className={!isMobile ? 'rolecard' : " "}>
                <div className="card ">
                    <div className="card-body">
                        <span className='role-subheading'>
                            Add Role
                        </span>
                        <TextField id="standard-basic"
                            sx={{ input: { color: '#777e84', } }}
                            label={
                                isMobile ? <Typography
                                    variant="body2"
                                    color="#777E84"

                                    fontSize="12px"
                                >
                                    Role *
                                </Typography> : <Typography
                                    variant="body2"
                                    color="#777E84"
                                    fontSize="14px"
                                >
                                    Role *
                                </Typography>
                            }
                            variant="standard"
                            value={role}
                            style={{ width: "100%" }} onChange={(e) => { setRole(e.target.value.trimLeft()) }} />

                        <div className="cancel-save-button-container">
                            <button className="cancel-button"
                                onClick={() => { history.push('/role_detail') }} >
                                <span style={{}}>  Cancel </span>
                            </button>
                            <button className="save-button"
                                onClick={() => { onSubmit() }}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddRole;
