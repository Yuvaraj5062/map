import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class HomeTopbar extends Component{
    state = {
        links: [
          {
            id: 1,
            name: "REQUIREMENT",
            to: "/reqirement",
            className: "nav-link"
          },
          {
            id: 2,
            name: "LIST",
            to: "/list",
            className: "nav-link"
          },
          {
            id: 3,
            name: "ATTENDANCE",
            to: "/attendance",
            className: "nav-link"
          },
          // {
          //   id: 4,
          //   name: "HR POLICY",
          //   to: "/hrpolicy",
          //   className: "nav-link"
          // },
          {
            id: 5,
            name: "EMPLOYEE HANDBOOK",
            to: "/employeehandbook",
            className: "nav-link"
          },

          {
            id: 6,
            name: "INCENTIVE Policy",
            to: "/intensivePolicy",
            className: "nav-link" 
          },

          // {
          //   id: 6,
          //   name: "Registration Link",
          //   to: "/registration",
          //   className: "nav-link"
          // }
        ],
        activeLink: null
      };
    handleClick = id => {
      this.setState({ activeLink: id });
    };
    componentDidMount(){
      let tempLinks = [...this.state.links]
      if(this.props.user.Role !== 'Admin' && this.props.user.Role !== 'Manager'){
        tempLinks = tempLinks.filter((item) => {
          return item.name !== "LIST"
        })
      }
      if(this.props.user.Role !== 'Admin' && this.props.user.Role !== 'Manager' && this.props.user.Role !== 'Teamlead' && this.props.user.Role !== 'Recruiter'){
        tempLinks = tempLinks.filter((item) => {
          return item.name !== "REQUIREMENT"
        })
      }
      this.setState({links:tempLinks})
    }
    render(){
        const { links, activeLink } = this.state;
        return (
            <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light row home-navbar">
            <div className="container-fluid">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {links.map(link => {
          return (
                  <li key={link.id} className={"nav-item"+
                    link.className +
                    (link.id === activeLink ? " active" : "")
                  }>
                    <Link className="nav-link" key={link.id}  to={link.to}> {link.name} {link.id === activeLink}</Link>
                  </li>
                  );
                })}
                </ul>
            </div>
          </nav>
            </React.Fragment>
           
        )
    }
}
const mapStateToProps = state => {
  const { user } = state.Auth;
  return {
      menu: state.AppMenu,
      user
  };
};
export default connect(mapStateToProps)(HomeTopbar);