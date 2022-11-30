import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col,Label, FormGroup, Button, Alert, InputGroup, InputGroupAddon } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, Lock } from 'react-feather';

import { loginUser } from '../../redux/actions';
import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import archeLogo from '../../assets/images/ARCHE  shine-03.png';
import reyanaLogo from '../../assets/images/rayna LOGOblack-02.png';
import Input from 'reactstrap/lib/Input';
//import logo2 from '../../assets/images/logo2.png';

class Login extends Component {
    //_isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.state = {
            username: '',
            password: '',
            rememberme:true
        }
    }

    componentDidMount() {
       // this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        //this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * Handles the submit
     */
    handleValidSubmit (event, values) {
        this.props.loginUser(values.username, values.password, values.rememberme=true, this.props.history.push);
    }


    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
        ////console.log("login isAuthTokenValid", isAuthTokenValid)
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages">
                   
                                        <Row>  
                                            <div className="login-bg ">
                                                <div className="vertical-center">
                                                    <div className="w-100">
                                               <div className="text-center ">
                                                   <img src={archeLogo} width="53%" alt="logo-Arche"/>
                                               </div>
                                               <div className="text-center">
                                                   <img src={reyanaLogo} width="53%" alt="logo-Reyna"/>
                                               </div>
                                               </div>
                                               </div>
                                            </div>
                                            <div className="login-sec">
                                                { /* preloader */}
                                                <div className="vertical-center">
                                                {this.props.loading && <Loader />}
                                                <div class="w-100 pl-5 pr-5">
                                                <h5 className="h5 mb-0 text-center">Welcome !</h5>


                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form p-5">
                                                    <AvGroup className="mt-3">
                                                        <Label htmlFor="username">Username</Label>
                                                        <InputGroup>
                                                            {/* <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon> */}
                                                            <AvInput className="style-input" type="text" name="username"  id="username" placeholder="Username" value={this.state.username} required />
                                                        </InputGroup>
                                                        
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>


                                                    <AvGroup className="mb-3 mt-4">
                                                        <Label htmlFor="password">Password</Label>                                                        
                                                        <InputGroup>
                                                            {/* <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon> */}
                                                            <AvInput type="password" className="style-input" name="password" id="password" placeholder="Enter your password" value={this.state.password} required />
                                                        </InputGroup>
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>
                                                    <div className="form-check mt-2 mb-3">
                                                        {/* <input type="checkbox" className="form-check-input" id="rememberme" name="rememberme" value={this.state.rememberme}/>
                                                        <label className="form-check-label" htmlFor="rememberme">Remember Me</label> */}
                                                        <Link to="/account/forget-password" className="float-right text-muted text-unline-dashed ml-1">Forgot your password?</Link>
                                                    </div>
                                                    <div className="clearfix"></div>
                                                    <FormGroup className="form-group mb-0 mt-4 text-center">
                                                        <Button color="" className="login-btn btn-block">Log In</Button>
                                                    </FormGroup>
                                                </AvForm>
                                                </div>
                                                </div>
                                            </div>
                                        </Row>

                           
                </div>}
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    const { user, loading, error } = state.Auth;
    return { user, loading, error };
};

export default connect(mapStateToProps, { loginUser })(Login);