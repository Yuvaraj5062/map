import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { isMobileOnly } from "react-device-detect";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

//import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';

import AppMenu from './AppMenu';
import profilePic from '../assets/images/users/DP.png';
import { useSelector, useDispatch } from 'react-redux';

import logo from '../assets/images/logo.png';
//import logo2 from '../assets/images/logo2.png';
import { loginUser } from '../redux/auth/actions';
import { getProfileList } from '../../src/redux/profile/actions';
import  { useEffect} from 'react';

/**
 * User Widget
 */

/**
 * Sidenav
 */
const SideNav = () => {
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let userDetails = useSelector((state) => state.Profile.profile || []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileList(loginDetails.EmployeeCode));
    }, []);
    
    return <div className="sidebar-content">
        <div id="sidebar-menu">
            <AppMenu />
        </div>
    </div>
}


const Image = () => {
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let userDetails = useSelector((state) => state.Profile.profile || []);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfileList(loginDetails.EmployeeCode));
    }, []);
    
    return  <img src={userDetails.Ephoto?userDetails.Ephoto:profilePic} className="avatar-sm rounded-circle mr-2" alt="" />
}


class LeftSidebar extends Component {
    menuNodeRef;

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleOtherClick = this.handleOtherClick.bind(this);
    }

    /**
     * Bind event
     */
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Bind event
     */
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Handle the click anywhere in doc
     */
    handleOtherClick = (e) => {
        if (this.menuNodeRef.contains(e.target)) return;
        // else hide the menubar
        if (document.body && isMobileOnly) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    /**
     * Handle click
     * @param {*} e
     * @param {*} item
     */
    handleClick(e) {
       // //console.log(e);
    }

    render() {
        const isCondensed = this.props.isCondensed || false;
      //  //console.log("left side bar", this.props.user.Username);
        let username=this.props.user.Username;
        
        return (
            <React.Fragment>
                {/* {['left-side-menu','left-side-menu1'].join(' ')} */}
                <div className={['left-side-menu','left-side-menu1'].join(' ')}    ref={node => this.menuNodeRef = node}>
                <React.Fragment>
        <div style={{background:'#e5e5e5', padding:'12px 0px',position:"fixed",zIndex:"90"}}>
        <Link to="/" className="">
              <span className="logo-lg ml-3">
                <img src={logo} alt="" height="47" />
              </span>
            </Link>
            </div>
        <div className="media user-profile mt-5 mb-0">
            <div>
            <Image/>
            </div>
            <div className="media-body">
                <h6 className="pro-user-name mt-0 mb-0">{username}</h6>
                <a className="text-dark" href="/account/logout">Sign Out</a>
                
            </div>

            
        </div>
    </React.Fragment>
                    {!isCondensed && <PerfectScrollbar><SideNav /></PerfectScrollbar>}
                    {isCondensed && <SideNav />}
                </div>
            </React.Fragment>
        );
    }
}

//export default connect()(LeftSidebar);
const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
    
};

export default connect(mapStateToProps, { loginUser })(LeftSidebar);
