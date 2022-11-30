// @flow
import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, UncontrolledTooltip } from 'reactstrap';
import { Search } from 'react-feather';




class LanguageDropdown extends Component {
    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);

        this.state = {
            dropdownOpen: false,
        };
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }

    render() {
        const tag = this.props.tag || "div";

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} className="d-none d-lg-block" tag={tag} id="langDropdown">
                    <DropdownToggle
                        data-toggle="dropdown"
                        tag="a"
                        className="nav-link mr-0"
                        onClick={this.toggleDropdown}
                        aria-expanded={this.state.dropdownOpen}>
                        <Search />
                    </DropdownToggle>
                    <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items topserach">
                    <form className="">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search for datas and reports..." />                      
                    </div>
                  </form>
                </DropdownMenu>
                </Dropdown>

                <UncontrolledTooltip placement="left" target="langDropdown">Change language</UncontrolledTooltip>
            </React.Fragment>
        );
    }
}

export default LanguageDropdown;
