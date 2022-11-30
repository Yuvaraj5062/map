import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { baseUrl } from '../../redux/apis/appUrls';
import swal from 'sweetalert';
import * as actions from '../../redux/_redux/roleMaster/roleMasterActions';
import { useDispatch } from 'react-redux';
import { editRoleProps } from '../Types';
import '../../assets/css/Navbar.css'
import '../../assets/css/Main.css'
import './AddRole/AddRole.css'
import {
    useTheme,
    useMediaQuery,
} from "@material-ui/core";
import api from '../../redux/apis/axios';
/**
 * @type {interface} 
 * for setting props types
 
 */
interface Props {
    flag: boolean;
    onFlagChange: (newValue: boolean) => void;
    row: editRoleProps;
}


const EditRole: React.FC<Props> = ({
    flag,
    onFlagChange,
    row
}) => {
    /**
* @type {unkonwn}
* for setting slice data
 
*/
    const dispatch = useDispatch();
    /**
  * @type {string}
  * for setting user role
  
  */

    const [userRole, setUserRole] = useState<string>(row.userRole ? row.userRole : "")
    const theme = useTheme();
    /**
* @type {boolean}
* for setting UI on mobile view
 
*/
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    /**
 * @type {Function} 
 * for getting form data and edit user functionality
 
 */
    const onSubmit = () => {
        if (userRole) {
            /**
* @type {object}
* for setting payload
 
*/
            const payload = {
                userRole: userRole,
            }
            const URL = `${baseUrl}/RoleMaster/UpdateRole?Id=${row.id}`
            api.post(URL, payload)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.responseMessage === "Role updated successfully") {
                            swal(response.data.responseMessage);
                            dispatch(actions.getAllRole());
                            onFlagChange(true)

                        } else {
                            swal(response.data.responseMessage);
                        }
                    }
                }).catch(function (error) {
                    swal("something Went Wrong");
                });
        }
        else {
            swal("Role is Required");
        }
    };

    return <React.Fragment>
        <div className="m-2">
            <div className="role-info-header">
                <div className='role-info-text'>
                    Edit Role
                </div>
                <div className='Show-role-button-container'>
                    <button className="Show-role-button"
                        onClick={() => { onFlagChange(true) }}>
                        Show All Role
                    </button>
                </div>
            </div>
            <div className={!isMobile ? 'rolecard' : " "}>
                <div className="card ">
                    <div className="card-body">
                        <span className='role-subheading'>
                            Edit Role
                        </span>
                        <TextField id="standard-basic" variant="standard"
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

                            value={userRole}
                            style={{ width: "100%" }} onChange={(e) => { setUserRole(e.target.value.trimLeft()) }} />
                        <div className='cancel-save-button-container'>
                            <button
                                className="cancel-button"
                                onClick={() => { onFlagChange(true) }}>
                                <span >  Cancel </span>
                            </button>
                            <button
                                className="save-button"
                                onClick={() => { onSubmit() }}>
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>;
};

export default EditRole;
