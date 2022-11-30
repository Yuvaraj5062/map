import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

import { Container, Row, Col, FormGroup, Button, Alert, Label, InputGroup, InputGroupAddon } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail } from 'react-feather';

import { isUserAuthenticated } from '../../helpers/authUtils';
import Loader from '../../components/Loader';
import logo from '../../assets/images/logo.png';
import logo2 from '../../assets/images/logo2.png';
import * as api from '../../helpers/restApi';
import swal from 'sweetalert';


class ForgetPassword extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);

        this.handleValidSubmit = this.handleValidSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.state = {
            passwordResetSuccessful: false,
            isLoading: false
        }
    }


    componentDidMount() {
        this._isMounted = true;
        document.body.classList.add('authentication-bg');
    }

    componentWillUnmount() {
        this._isMounted = false;
        document.body.classList.remove('authentication-bg');
    }

    /**
     * On error dismiss
     */
    onDismiss() {
        this.setState({ passwordResetSuccessful: false });
    }

    /**
     * Handles the submit
     */
    handleValidSubmit = (event, values) => {


        this.setState({ isLoading: true });
        api.forgetPassword(values.email)
            .then((response) => {
              
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                if (response.data.Status == true) {
                    this.props.history.push('/account/login')
                }
            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
            });

        window.setTimeout(() => {
            this.setState({ isLoading: false, passwordResetSuccessful: true });
        }, 1000)
    }


    /**
     * Redirect to root
     */
    renderRedirectToRoot = () => {
        const isAuthTokenValid = isUserAuthenticated();
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


                                    <Col md={6} className="d-none d-md-inline-block">
                                        <div className="auth-page-sidebar">
                                        </div>
                                    </Col>
                                    <Col md={6} className="p-5 position-relative">
                                        { /* preloader */}
                                        <div className="card shadow p-4">
                                            {this.state.isLoading && <Loader />}

                                            <div className="row">
                                                <div className="col-sm-6 mb-5">
                                                    <a href="/">
                                                        <img src={logo} alt="" className="logo1" />
                                                    </a>
                                                </div>
                                                {/* <div className="col-sm-6 mb-5">
                                                    <a href="/">
                                                        <img src={logo2} alt="" className="logo2"  />
                                                    </a>
                                                </div> */}
                                            </div>

                                            <h6 className="h5 mb-0 mt-4">Reset Password</h6>
                                            <p className="text-muted mt-1 mb-4">
                                                Enter your email address and we'll send you an email with instructions to reset your password.
                                            </p>


                                            {this.props.error && <Alert color="danger" isOpen={this.props.error ? true : false}>
                                                <div>{this.props.error}</div>
                                            </Alert>}

                                            <AvForm onValidSubmit={this.handleValidSubmit} className="authentication-form">
                                                <AvGroup className="">
                                                    <Label htmlFor="email">Email Address</Label>
                                                    <InputGroup>
                                                        <InputGroupAddon addonType="prepend">
                                                            <span className="input-group-text">
                                                                <Mail className="icon-dual" />
                                                            </span>
                                                        </InputGroupAddon>
                                                        {this.state.email}
                                                        <AvInput type="text" name="email" id="email" placeholder="hello@coderthemes.com"
                                                            value={this.state.email} required />
                                                    </InputGroup>

                                                    <AvFeedback>This field is invalid</AvFeedback>
                                                </AvGroup>


                                                <FormGroup className="form-group mb-0 text-center">
                                                    <Button color="" className="btn-block login-btn">Submit</Button>
                                                </FormGroup>
                                            </AvForm>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>

                        <Row className="mt-1">
                            <Col className="col-12 text-center">
                                <p className="texttext-muted">Back to <Link to="/account/login" className="text-primary font-weight-bold ml-1">Login</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </div>}
            </React.Fragment>
        )
    }
}

export default connect()(ForgetPassword);