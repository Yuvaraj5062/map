import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { Menu, X,  Settings, User, HelpCircle, Lock, LogOut } from 'react-feather';
import { showRightSidebar } from '../redux/actions';
import NotificationDropdown from './NotificationDropdown';
import ProfileDropdown from './ProfileDropdown';
//import * as FeatherIcon from 'react-feather';
//import LanguageDropdown from './LanguageDropdown';

import profilePic from '../assets/images/users/DP.png';
import HomeTopbar from '../components/HomeTopbar';
//import {  Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
//import { Link } from "react-router-dom";
import SettingDropdown from "./SettingDropdown";

const Notifications = [{
  id: 1,
  text: 'New user registered',
  subText: '1 min ago',
  icon: 'uil uil-user-plus',
  bgColor: 'primary'
},
{
  id: 2,
  text: 'Karen Robinson',
  subText: 'Wow ! this admin looks good and awesome design',
  icon: 'uil uil-comment-message',
  bgColor: 'success'
},
{
  id: 3,
  text: 'Cristina Pride',
  subText: 'Hi, How are you? What about our next meeting',
  icon: 'uil uil-comment-message',
  bgColor: 'danger'
}, {
  id: 4,
  text: 'New user registered',
  subText: '1 day ago',
  icon: 'uil uil-user-plus',
  bgColor: 'info'
},];

const ProfileMenus = [{
  label: 'My Account',
  icon: User,
  redirectTo: "/",
},
{
  label: 'Settings',
  icon: Settings,
  redirectTo: "/"
},
{
  label: 'Support',
  icon: HelpCircle,
  redirectTo: "/"
},
{
  label: 'Lock Screen',
  icon: Lock,
  redirectTo: "/"
},
{
  label: 'Logout',
  icon: LogOut,
  redirectTo: "/account/logout",
  hasDivider: true
}]


class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state={
      dropdownOpen:false
    }
    this.handleRightSideBar = this.handleRightSideBar.bind(this);
    this.handleToggle=this.handleToggle.bind(this)
  }

  /**
   * Toggles the right sidebar
   */
  handleRightSideBar = () => {
    this.props.showRightSidebar();
  }
  handleToggle = () => {
    this.setState({
      dropdownOpen:!this.state.dropdownOpen
    })
  }
  render() {
    return (
        <React.Fragment>
            <div className="navbar navbar-expand flex-column flex-md-row navbar-custom">
                <Container fluid>
                    {/* menu*/}
                    <ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
                        <li className="">
                            <button
                                className="button-menu-mobile open-left disable-btn"
                                onClick={this.props.openLeftMenuCallBack}>
                                <Menu className="menu-icon" />
                                <X className="close-icon" />
                            </button>
                        </li>
                    </ul>

                    <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
                        {/* <li className="d-none d-sm-block">
                <div className="app-search">
                  <form>
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search..." />                      
                    </div>
                  </form>
                </div>
              </li> */}

                        {/* <LanguageDropdown tag="li" />  */}
                        <NotificationDropdown />
                        <SettingDropdown tag="li"/>
                        {/* <li className="notification-list">
                           

                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                                <DropdownToggle>
                                    <Settings />
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem header>Settings</DropdownItem>
                                    <DropdownItem>
                                        <Link to="/profile">
                                            <FeatherIcon.User className="icon-dual icon-xs mr-2" />
                                            <span>My Account</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />

                                    <DropdownItem>
                                        <Link to="/changepassword">
                                            <FeatherIcon.Lock className="icon-dual icon-xs mr-2" />
                                            <span>Change Password</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to="/account/logout">
                                            <FeatherIcon.LogOut className="icon-dual icon-xs mr-2" />
                                            <span>Logout</span>
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </li> */}

                        <ProfileDropdown
                            profilePic={profilePic}
                            menuItems={ProfileMenus}
                            username={''}
                            description=""
                        />
                    </ul>
                </Container>
            </div>
            <HomeTopbar />
        </React.Fragment>
    );
  }
}

export default connect(
  null,
  { showRightSidebar }
)(Topbar);
