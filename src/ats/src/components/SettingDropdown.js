import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {  Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Settings } from 'react-feather';
import * as FeatherIcon from 'react-feather';
//import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';




class SettingDropdown extends Component {

    // static defaultProps = {
    //     notifications: []
    // }

    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            dropdownOpen: false
        };
    }

    /*:: toggleDropdown: () => void */
    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    // getRedirectUrl = (item) => {
    //     return `/notification/${item.id}`;
    // }

    render() {
//const tag = this.props.tag || "div";

        return (
            <React.Fragment>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} >
                <DropdownToggle
                    className="nav-link dropdown-toggle" onClick={this.toggleDropdown} aria-expanded={this.state.dropdownOpen}>
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

            {/* <UncontrolledTooltip placement="left" target="notiDropdown">{this.props.notifications.length} new unread notificationse</UncontrolledTooltip> */}
            </React.Fragment>
        );
    }
}

export default SettingDropdown;