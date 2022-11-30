import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Calendar, File } from 'react-feather';
import config from '../../helpers/baseurl';
import axios from 'axios';
import swal from 'sweetalert';
import { getLeaveBalanceList } from '../../redux/leave/actions'
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment'
import { getLeaveList } from '../../redux/leave/actions';
var urlpattern = config.baseUrl;
const ApplyForLeave = () => {
    let loginDetails = useSelector((state) => state.Auth.user || []);
    var getUsername = loginDetails.Username;
    let records = useSelector((state) => state.Leave.leavebalance || []);
    const dispatch = useDispatch();
    const [type, settype] = useState('');
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [reason, setreason] = useState('');
    const [leavedata, setleaveData] = useState({}); 
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    let getUserrole = loginDetails.Role;
    const [loader, setLoader] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        const data = {
            LeaveType: type,
            // inwords: inwords,
            StartDate: startdate,
            StartTime: startTime,
            EndDate: enddate,
            EndTime: endTime,
            Reason: reason,
            ApplyBy: getUsername
        }

        var config = {
            method: 'post',
            url: `${urlpattern}LeaveMaster`,
            data: data
        };

        axios(config)
            .then(function (response) {
                setleaveData(response.data.Data)
                setModal2(true)
                setLoader(false)
               // cleanForm();
            })
            .catch(function (error) {
                swal(error, "error");
                setLoader(false)
            });
    }
    const cleanForm = () => {
        settype([])
        setStartTime()
        setEndTime()
        setstartdate('')
        setenddate('')
        setreason('')
        setStartTime('')
        setEndTime('')
    }
    useEffect(() => {
        dispatch(getLeaveBalanceList(loginDetails.Username))
    }, []);
    const onCancel = () => {
        toggle2()
       // cleanForm()
    }

    const onConfrim = () => {
        const data = {
            LeaveType: leavedata.Type,
            LeaveDays: leavedata.LeaveDays,
            PaidDays: leavedata.PaidDays,
            UnPaidDays: leavedata.UnPaidDays,
            InWords: leavedata.InWords,
            StartDate: leavedata.StartDate,
            StartTime: leavedata.StartTime,
            EndDate: leavedata.EndDate,
            EndTime: leavedata.EndTime,
            Reason: leavedata.Reason,
            ApplyBy: leavedata.ApplyBy
        }
        var config = {
            method: 'post',
            url: `${urlpattern}ConfirmLeaveApply`,
            data: data
        };

        axios(config)
            .then(function (response) {
                //swal("Leave Applied Successfully", "success");
                swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
                cleanForm();
                dispatch(getLeaveList({ getUsername,getUserrole}));
                dispatch(getLeaveBalanceList(getUsername))
                toggle2()
            })
            .catch(function (error) {
                swal(error, "error");
            });
    }
    
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit} className="authentication-form card p-5">
                            <h5 className="text-uppercase  text-center">Apply Your Leave</h5>
                            <div className="form-group">
                                <label htmlFor="fullname"> Leave Type <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><User className="icon-dual" /></span>
                                    </div>
                                    <select
                                        name="type"
                                        required
                                        id="type"
                                        className="form-control"
                                        value={type}
                                        onChange={(e) => {
                                            settype(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Earn Leave">Earn Leave</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname"> Start Date <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><Calendar className="icon-dual" /></span>
                                    </div>
                                    <input
                                        type="date"
                                        onKeyDown={(e) => e.preventDefault()}
                                        required
                                        name="startdate"
                                        id="startdate"
                                        className="form-control"
                                        min={moment(new Date).format('YYYY-MM-DD')}
                                        value={startdate}
                                        onChange={(e) => {
                                            setstartdate(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname"> Start Time <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                            </svg></span>
                                    </div>
                                    <select
                                        name="type"
                                        id="type"
                                        required
                                        className="form-control"
                                        value={startTime}
                                        onChange={(e) => {
                                            setStartTime(e.target.value);
                                        }}
                                    >
                                        <option value="">Select Start Time</option>
                                        <option value="09:30">9:30 AM</option>
                                        <option value="02:00">2:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname"> End Date <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><Calendar className="icon-dual" /></span>
                                    </div>
                                    
                                    <input
                                        type="date"
                                        name="enddate"
                                        id="enddate"
                                        onKeyDown={(e) => e.preventDefault()}
                                        required
                                        min={startdate}
                                        value={enddate}
                                        className="form-control"
                                        onChange={(e) => {
                                            setenddate(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fullname"> End Time <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                                            </svg></span>
                                    </div>
                                    <select
                                        name="type"
                                        id="type"
                                        className="form-control"
                                        required
                                        value={endTime}
                                        onChange={(e) => {
                                            setEndTime(e.target.value);
                                        }}
                                    >
                                        <option value="">Select End Time</option>
                                        
                                        {startTime != "02:00" && <option value="02:00">2:00 PM</option>}
                                        <option value="06:30">6:30 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fullname">Enter Reason <span className="redspan">*</span></label>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-lg" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z" />
                                            </svg></span>
                                    </div>
                                    <input
                                        type="text"
                                        name="reason"
                                        required
                                        value={reason}
                                        id="reason" className="form-control"
                                        onChange={(e) => {
                                            setreason(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-group mb-0 text-center">
                                <button type="submit" className="btn-block btn btn-secondary">
                                   {loader?<span className="spinner-border text-primary" role="status"></span>:"Apply"} 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Modal isOpen={modal2} toggle={toggle2} width="80%" height="80%">

                <ModalHeader toggle={toggle2}>Leave Detail</ModalHeader>
                <ModalBody>
                    <Row>
                        <Col lg={6}>
                            <b>Leave Type : </b>{leavedata.Type}
                        </Col>
                        <Col lg={5}>
                            <b>Leave Days :</b> {leavedata.LeaveDays}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            <b>Paid Days :</b> {leavedata.PaidDays}
                        </Col>
                        <Col lg={5}>
                            <b>UnPaid Days : </b>{leavedata.UnPaidDays}
                        </Col>
                    </Row>
                    <Row>
                       
                        <Col lg={6}>
                            <b>Start Date : </b> {moment(leavedata.StartDate).format("DD-MM-YYYY")}
                        </Col>
                        <Col lg={5}>
                            <b>Start Time : </b> {startTime==="02:00"? startTime +" " + "PM":startTime +" " +  "AM"  }
                        </Col>
                    </Row>
                    <Row>
                      
                        <Col lg={6}>
                            <b>End Date : </b>{moment(leavedata.EndDate).format("DD-MM-YYYY")}
                        </Col>
                        <Col lg={5}>
                        <b>End Time : </b>{endTime +"  " + "PM"}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            
                            <b>In Words : </b>{leavedata.InWords}
                        </Col>
                        <Col lg={5}>
                            <b>Reason :</b> {leavedata.Reason}
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <b>Applied By :</b> {leavedata.ApplyBy}
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onConfrim}>Confirm</Button>
                    <Button color="primary" onClick={onCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default ApplyForLeave;
