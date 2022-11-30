
import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import logo from '../../assets/images/user.jpg';
import dashboardicon from '../../assets/images/dash.svg'
import usericon from '../../assets/images/User Master.svg'
import vehicle from '../../assets/images/Vehicle Master.svg'
import assignvehicle from '../../assets/images/assign-icon.svg'
import trip from '../../assets/images/trip-master.svg'
import report from '../../assets/images/report.svg'
import Avatar from '@mui/material/Avatar';
import { Paper } from '@mui/material';
import '../../assets/css/Main.css'
import { Box } from '@mui/system';

const LeftSidebar = () => {
        /**
        * @type {string}
        * for active link functinality
        */
        const [isActive, setActive] = useState<string>('');
        React.useEffect(() => {
        }, []);

        return (
                <>
                        <Box
                                component={Paper}
                                className='ml-4'>
                                <Paper sx={{ overflow: 'hidden' }} elevation={0} className='ml-4'>
                                        <div className="img">
                                                <Avatar
                                                        alt="Remy Sharp"
                                                        src={logo}
                                                        sx={{ marginLeft: "28%", marginTop: "10%" }}
                                                />
                                                <span className='title' >
                                                        {localStorage.getItem("userName")}
                                                </span>
                                        </div>
                                        <div className='sidebar'>
                                                <div className={isActive === "Dashboard" ? 'bg-light mt-3 ml-2' : 'mt-3 ml-2'}>
                                                        <Link to="/" className="link"
                                                                onClick={() => setActive("Dashboard")}>
                                                                <img src={dashboardicon} className="avatar-sm-2 rounded-circle p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span  > Dashboard </span>
                                                        </Link>
                                                </div>
                                                <div className={isActive === "User Master" ? 'bg-light mt-3' : 'mt-3'}>
                                                        <Link to="/user_detail" className="link" onClick={() => setActive("User Master")} >
                                                                <img src={usericon} className="avatar-sm-2 rounded-circle p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span className='mobile' > User Master</span>
                                                        </Link>
                                                </div>
                                                <div className={isActive === "Vehicle Master" ? 'bg-light mt-3' : 'mt-3'}>

                                                        <Link to="/vehicleDetails" className="link"
                                                                onClick={() => setActive("Vehicle Master")}>
                                                                <img src={vehicle} className="avatar-sm-2 rounded-circle p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span className='mobile' >  Vehicle Master </span>
                                                        </Link>
                                                </div>
                                                <div className={isActive === "Role Master" ? 'bg-light mt-3' : 'mt-3'}>
                                                        <Link to="/role_detail" className="link"
                                                                onClick={() => setActive("Role Master")} >
                                                                <img src={assignvehicle} className="avatar-sm-2 rounded-circle p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span className='mobile' >Role Master </span>
                                                        </Link>
                                                </div>
                                                <div className={isActive === "Trip Master" ? 'bg-light mt-3' : 'mt-3'}>
                                                        <Link to="/trip_details" className="link"
                                                                onClick={() => setActive("Trip Master")}>
                                                                <img src={trip} className="avatar-sm-2  p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span className='mobile' > Trip Master</span>
                                                        </Link>
                                                </div>
                                                <div className={isActive === "Report" ? 'bg-light mt-3 pb-4' : 'mt-3 pb-4'} style={{ marginBottom: "52%", color: "#24B1E3" }}>
                                                        <Link to="/report" className="link" onClick={() => setActive("Report")}>
                                                                <img src={report} className="avatar-sm-2  p-2" alt="" />
                                                                {' '} {' '} {' '}
                                                                <span className='mobile' >  Report </span>
                                                        </Link>
                                                </div>
                                        </div>
                                </Paper>
                        </Box>


                </>
        );
}

export default LeftSidebar;



