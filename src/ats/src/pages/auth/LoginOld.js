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
        //("login isAuthTokenValid", isAuthTokenValid)
        if (isAuthTokenValid) {
            return <Redirect to='/' />
        }
    }

    render() {
        const isAuthTokenValid = isUserAuthenticated();
        return (
            <React.Fragment>

                {this.renderRedirectToRoot()}

                {(this._isMounted || !isAuthTokenValid) && <div className="account-pages my-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={10}>
                                        <Row>
                                            

                                            <Col md={6} className="d-none d-md-inline-block p-0">
                                                <div className="auth-page-sidebar">
                                                    </div>
                                            </Col>
                                            <Col md={6} className="p-5 position-relative">
                                                { /* preloader */}
                                                <div className="card shadow p-4">
                                                {this.props.loading && <Loader />}
                                                <div className="row">
                                                <div className="col-sm-12 mb-5">
                                                    <a href="/">
                                                        <img src={logo} alt="" className="logo1" />
                                                    </a>
                                                </div>
                                                {/* <div className="col-sm-6 mb-5">
                                                    <a href="/">
                                                        <img src={logo2} alt="" className="logo2 img-brd2"  />
                                                    </a>
                                                </div> */}
                                                </div>
                                                <h6 className="h5 mb-0 mt-2">Welcome back!</h6>


                                                {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                    <div>{this.props.error}</div>
                                                </Alert>}

                                                <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                    <AvGroup className="mt-3">
                                                        <Label htmlFor="username">Username</Label>
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Mail className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="text" name="username" id="username" placeholder="hello@coderthemes.com" value={this.state.username} required />
                                                        </InputGroup>
                                                        
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>


                                                    <AvGroup className="mb-3 mt-4">
                                                        <Label htmlFor="password">Password</Label>                                                        
                                                        <InputGroup>
                                                            <InputGroupAddon addonType="prepend">
                                                                <span className="input-group-text">
                                                                    <Lock className="icon-dual" />
                                                                </span>
                                                            </InputGroupAddon>
                                                            <AvInput type="password" name="password" id="password" placeholder="Enter your password" value={this.state.password} required />
                                                        </InputGroup>
                                                        <AvFeedback>This field is invalid</AvFeedback>
                                                    </AvGroup>
                                                    <div className="form-check mt-2">
                                                        {/* <input type="checkbox" className="form-check-input" id="rememberme" name="rememberme" value={this.state.rememberme}/>
                                                        <label className="form-check-label" htmlFor="rememberme">Remember Me</label> */}
                                                        <Link to="/account/forget-password" className="float-right text-muted text-unline-dashed ml-1">Forgot your password?</Link>
                                                    </div>
                                                    
                                                    <FormGroup className="form-group mb-0 mt-3 text-center">
                                                        <Button color="" className="login-btn btn-block">Log In</Button>
                                                    </FormGroup>
                                                </AvForm>
                                                </div>
                                            </Col>
                                        </Row>

                            </Col>
                        </Row>

                        {/* <Row className="mt-3">
                            <Col className="col-12 text-center">
                                <p className="text-muted">Don't have an account? <Link to="/account/register" className="text-primary font-weight-bold ml-1">Sign Up</Link></p>
                            </Col>
                        </Row> */}

                    </Container>
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