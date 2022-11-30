import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Input, FormGroup, Label } from 'reactstrap'
import swal from 'sweetalert'
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import * as api from './../../../helpers/restApi'

export const SendEmail = (props) => {
    const [email, setEmail] = useState()
    let { show } = props;
    const togglePopup = () => {
        props.setModel(false)
        handelCleanForm()
    }

    const handelCleanForm = () => {
        setEmail('')
    }
    const handelSubmit = e => {
        e.preventDefault();
        let emailArray = email.split(',')
        emailArray = emailArray[emailArray.length - 1] === '' ? emailArray.slice(0, -1) : emailArray
        let isOk = true;
        for (let index = 0; index < emailArray.length; index++) {
            if (! /^\w+([\.-]?\w+)*@([\.-]?\w+)*(\.\w{2,3})+$/.test(emailArray[index])) {
                swal("Failed", `Enter valid email`, 'error')
                isOk = false
            }
        }

        if (isOk) {
            api.sendReportEmail(emailArray.join(','))
                .then((response) => {
                    swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');

                    if (response.data.Status) {
                        togglePopup()
                    }
                })
                .catch(function (error) {
                    swal("Failed", error.response.data.Message, "error");
                });
        }
    }


    return (
        <div>
            <Modal isOpen={show} size={"md"} toggle={show} className='modal-dialog' >
                <ModalHeader toggle={() => props.setModel(false)} className='modal-header'>Send Email</ModalHeader>
                <Form onSubmit={handelSubmit}>
                    {/* <Form > */}
                    <ModalBody style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'
                    }}>
                        <Row>
                            <Col lg={12} >
                                <FormGroup>
                                    <Label htmlFor="email">Email <span className="redspan">*</span></Label>
                                    <Input
                                        type="textarea" required
                                        className=" form-control"
                                        name="email "
                                        value={email}
                                        id="email "
                                        placeholder="Enter Email..."
                                        onChange={(e) => { setEmail(e.target.value.trimLeft()) }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className={"add-button-align"}>
                        <Button type='submit' color="primary" className='add-model-btn' >
                            Send </Button>
                        <Button color="secondary" className='add-model-btn' type="button" onClick={() => togglePopup()} >Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    )
}
