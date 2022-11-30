import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Input, FormGroup, Label } from 'reactstrap'

import swal from 'sweetalert'
import { useSelector } from "react-redux";
import * as api from './../../../helpers/restApi'
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import { SendEmail } from './SendEmail';

export const GenereteReport = () => {
    const [weekDay, setWeekDay] = useState()
    const [emailTime, setEmailTime] = useState()
    const [id, setId] = useState()
    // const [emailScheduleDate, setEmailScheduleDate] = useState([])

    let loginDetails = useSelector((state) => state.Auth.user || []);


    // open send email pop up 
    const [modal, setModal] = useState(false)

    // //Edit email configuration model 
    // const [editEmailModel, setEditEmailModel] = useState(false);
    // const toggle = () => setEditEmailModel(!editEmailModel);
    // const onEditEmailConfiguration = (row) => {
    //     setEditEmailModel(true)
    // }


    let weekDays = [
        { "day": "Monday" },
        { "day": "Tuesday" },
        { "day": "Wednesday" },
        { "day": "Thursday" },
        { "day": "Friday" },
        // { "day": "Saturday" },
        // { "day": "Sunday" },
    ]

    useEffect(() => {
        api.getEmailScheduleDate()
            .then((res) => {
                if (res.data.Status) {
                    setWeekDay(res.data.Data[0].WeekDay)
                    setEmailTime(res.data.Data[0].Time)
                    setId(res.data.Data[0].Id)
                    // setEmailScheduleDate(res.data.Data[0])
                }


            })

    }, [])

    const handelDownloadReport = () => {
        api.generateTaskReport()
            .then((res) => {
                if (res.data.Status === true) {
                    window.open("https://" + res.data.Data)
                }
                else {
                    swal("Failed", res.data.Message, "error")
                }
            }).catch(function (error) {

                swal("Error", error.response.data.Message, 'error')
            });
    }


    const handelSubmit = e => {
        e.preventDefault();
        let body = {
            Id: id,
            WeekDay: weekDay,
            Time: emailTime,
            IsActive: true,
            CreatedBy: loginDetails.EmployeeCode
        }

        api.setEmailScheduleDate(body)
            .then((response) => {
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                // if (response.data.Status) {
                //     setEditEmailModel(false)
                // }

            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
            });

    }


    return (
        <React.Fragment>
            <Form onSubmit={handelSubmit} className="card">
                <Row className="card-body">
                    <Col lg={3}>
                        <FormGroup>
                            <Label htmlFor="weekDay">Week Day </Label>
                            <select
                                type="text" required
                                className="style-input form-control"
                                id="weekDay"
                                name="weekDay"
                                value={weekDay}
                                onChange={(e) => {
                                    setWeekDay(e.target.value)
                                }}
                            >
                                <option value="">Select Week Day</option>
                                {weekDays.map((days, i) => (
                                    <option key={i++} value={days.day}>
                                        {days.day}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>

                    <Col lg={3} >
                        <FormGroup>
                            <Label htmlFor="emailTime">Time <span className="redspan">*</span></Label>
                            <Input
                                type="time" required
                                className="style-input form-control"
                                name="emailTime "
                                value={emailTime}
                                id="emailTime "
                                placeholder="Time"
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(e) => { setEmailTime(e.target.value) }}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg={2} className='mt-4'>
                        <Button color='primary'
                            type='submit' className='w-100 mt-2'>
                            Save
                        </Button>
                    </Col>


                    <Col lg={2} className='mt-4'>
                        <Button color="secondary" type='button'
                            className='w-100  mt-2'
                            onClick={() => { setModal(true) }}
                        >
                            Send Email
                        </Button>
                    </Col>

                    <Col lg={2} className='mt-4'>
                        <Button color="secondary" type='button'
                            className='w-100  mt-2'
                            onClick={() => handelDownloadReport()}
                        >
                            Download Report
                        </Button>
                    </Col>
                </Row>

            </Form>


            {/* <Modal isOpen={editEmailModel} toggle={toggle} className='modal-dialog' >
                <ModalHeader toggle={toggle} className='modal-header'>Reset Email configuration</ModalHeader>
                <Form onSubmit={handelSubmit}>
                    <ModalBody style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'
                    }}>

                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="weekDay">Week Day </Label>
                                    <select
                                        type="text"
                                        className="style-input form-control"
                                        id="weekDay"
                                        name="weekDay"
                                        value={weekDay}

                                        onChange={(e) => {
                                            setWeekDay(e.target.value)
                                        }}
                                    >
                                        <option value="">Select Week Day</option>

                                        {weekDays.map((days, i) => (
                                            <option key={i++} value={days.day}>
                                                {days.day}
                                            </option>
                                        ))}

                                    </select>
                                </FormGroup>
                            </Col>
                            <Col lg={12} >
                                <FormGroup>
                                    <Label htmlFor="emailTime">Time <span className="redspan">*</span></Label>
                                    <Input
                                        type="time" required
                                        className="style-input form-control"
                                        name="emailTime "
                                        value={emailTime}
                                        id="emailTime "
                                        placeholder="Time"
                                        onChange={(e) => { setEmailTime(e.target.value) }}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className={"add-button-align"}>
                        <Button type='submit' color="primary" className='add-model-btn' >
                            Save</Button>
                        <Button color="secondary" className='add-model-btn' type="button" onClick={() => { setEditEmailModel(false) }} >Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal> */}

            <SendEmail show={modal} setModel={setModal} />

        </React.Fragment>
    )
}
