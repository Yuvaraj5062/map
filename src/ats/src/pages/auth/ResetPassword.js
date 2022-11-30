import React, { useState, useMemo } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Col, Row, Container, Label, FormGroup, Input, Button, Form } from 'reactstrap'
import swal from 'sweetalert'
import './Resetpass.css'
import * as api from '../../helpers/restApi';
import {
    BrowserRouter as Router,
    Link,
    useLocation
} from "react-router-dom";
import {

    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import * as FeatherIcon from 'react-feather';

const ResetPassword = () => {
    function useQuery() {

        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const history = useHistory()
    const [passVisibility, setPassVisibility] = useState(false)
    const [cPassVisibility, setCPassVisibility] = useState(false)


    const handelResetPassword = e => {
        e.preventDefault()
        let isOk = true
        if (pass !== confirmPass) {
            swal("Failed", "Password and confirm password not match", 'error')
            isOk = false
        }
        if (isOk) {
            let body = {

                Email: query.get('u'),
                Password: pass

            }

            api.resetPassword(body)
                .then((response) => {

                    swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                    if (response.data.Status == true) {
                        history.push('/account/login')
                    }
                })
                .catch(function (error) {
                    swal("Failed", error.response.data.Message, "error");
                });

        }


    }


    return (
        <React.Fragment>
            <div className='mt-5'>
                <div className=" my-5 ">
                    <Container>
                        <Row className="justify-content-center ">

                            <Col md={6} className="p-5 ">
                                { /* preloader */}
                                <div className="card shadow p-5">

                                    <div className="row">
                                        <div className="col-sm-6 mb-5 ">
                                            <h6 className="h5 mb-0  reset-title">Reset Password</h6>
                                        </div>

                                    </div>
                                    <Form onSubmit={handelResetPassword}>
                                        <FormGroup className='relative-class'>
                                            <Label htmlFor="pass">New Password  <span className="redspan">*</span></Label>
                                            <InputGroup>

                                                <Input
                                                    type={passVisibility ? "text" : "password"}
                                                    className="style-input form-control"
                                                    value={pass}
                                                    key={"1"}
                                               
                                                    onChange={(e) => setPass(e.target.value.trim())}
                                                    placeholder="Enter password"
                                                />

                                                <InputGroupAddon addonType="prepend"
                                                    onClick={() => { setPassVisibility(!passVisibility)
                                                     }
                                                }
                                                >
                                                    <span className="absolute-class ">
                                                        {passVisibility ? <FeatherIcon.EyeOff />
                                                            : <FeatherIcon.Eye />
                                                        }

                                                    </span>
                                                </InputGroupAddon>
                                            </InputGroup>
                                        </FormGroup>

                                        <FormGroup className='relative-class'>
                                            <Label htmlFor="cpass">Confirm Password  <span className="redspan">*</span></Label>
                                            <InputGroup>

                                                <Input
                                                    type={cPassVisibility ? "text" : "password"}
                                                    className="style-input form-control"
                                                    value={confirmPass}
                                                    key='confirmPass'
                                                    onChange={(e) => setConfirmPass(e.target.value.trim())}
                                                    placeholder="Enter password"
                                                />

                                             
                                                    <span className="absolute-class "
                                                     onClick={() => { setCPassVisibility(!cPassVisibility) }}>
                                                        {cPassVisibility ? <FeatherIcon.EyeOff />
                                                            : <FeatherIcon.Eye />
                                                        }

                                                    </span>
                                               
                                            </InputGroup>
                                        </FormGroup>

                                        <div className='container'>
                                            <div className="row justify-content-between ">
                                                <div className="col-md-5 mt-4">
                                                    <Button type='submit' color="primary" className='buttons-size'>Submit</Button>
                                                </div>
                                                <div className="col-md-5 mt-4">
                                                    <Button type='button' color="secondary" className='buttons-size'
                                                        onClick={() => { history.push('/account/login') }}>Cancel</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div></React.Fragment>
    )
}

export default ResetPassword