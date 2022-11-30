import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownMenu, DropdownToggle, Alert ,Toast, ToastBody, ToastHeader } from 'reactstrap';
import { Bell } from 'react-feather';

import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { getNotificationList } from '../redux/notification/actions';
import { formatDate } from '../constants/dateFormat';
import config from '../helpers/baseurl';

var urlpattern = config.baseUrl;
const notificationContainerStyle = {
    'maxHeight': '230px'
};


const NotificationDropdown =(props)=> {

    const dispatch = useDispatch();
    let notifications = useSelector((state) => state.Notification.notification || []);
    let userDeatails = useSelector((state) => state.Auth.user || []);
   // //console.log(notifications, 'notifications');
    useEffect(() => {
       // alert('call')
        dispatch(getNotificationList(userDeatails.Username));

        // eslint-disable-next-line
    }, []);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    const { buttonLabel } = props;
  const [show, setShow] = useState(true);

  const toggleToast = () => setShow(!show);
    const closeNotify=(item,i)=>{
       // //console.log(item, 'noticlear',i)
        var axios = require('axios');
        var data = '';

        var config = {
        method: 'put',
        url: `${urlpattern}Notification_Master?id=${item.id}&userName=${userDeatails.Username}`,
        headers: { },
        data : data
        };

        axios(config)
        .then(function (response) {
        ////console.log(JSON.stringify(response.data));
        dispatch(getNotificationList(userDeatails.Username));
        })
        .catch(function (error) {
        //console.log(error);
        });
    }
 
        return (
            <React.Fragment>                
               
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="notification-list"  id="notiDropdown">
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="a"
                    className="nav-link dropdown-toggle">
                    <Bell />
                    <span className="badge badge-danger rounded-circle">{notifications.length}</span>
                </DropdownToggle>
                <DropdownMenu right className="dropdown-lg">
                    <div onClick={toggle}>
                        <div className="dropdown-item noti-title border-bottom">
                            <h5 className="m-0 font-size-16">
                                <span className="float-right">
                                    {/* <Link to="/notifications" className="text-dark">
                                        <small>Clear All</small>
                                    </Link> */}
                                </span>{notifications.length} Notification
                                </h5>
                        </div>
                        <PerfectScrollbar style={notificationContainerStyle}>
                            {notifications.map((item, i) => {
                                return <div className="dropdown-item notify-item" key={i + "-noti"}>
                                
                                    <div className={`notify-icon bg-primary`}>
                                        <i className='uil uil-comment-message'></i>
                                    </div>
                                    <p className="notify-details">{item.msg}
                                    <small className="text-muted">{formatDate(item.createdon)}</small>
                                    </p>
                                    <div className="close-notify">
                                    <button type="button" onClick={() =>closeNotify(item,i)}  key={item.id} className="btn btn-primary btn-sm">X</button>
                                    </div>
                                </div>
                            })}
                        </PerfectScrollbar>

                        {/* <Link to="/" className="dropdown-item text-center text-primary notify-all border-top">View All</Link> */}
                    </div>
                </DropdownMenu>
            </Dropdown>

            {/* <UncontrolledTooltip placement="left" target="notiDropdown">
                {notifications.length} 
                new unread notificationse</UncontrolledTooltip> */}
            </React.Fragment>
        );
    }


export default NotificationDropdown;
// const mapStateToProps = (state) => {
//     const { notification } = state.Notification;
//     return { notification };
    
// };

// export default connect(mapStateToProps, { getNotificationList })(NotificationDropdown);