import React, { useEffect, useState } from 'react';
import { Row, Col, Label } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import { formatDate } from '../../../constants/dateFormat';
import config from '../../../helpers/baseurl';
var urlpattern = config.baseUrl;
const ViewApprasalForm = (props) => {
    useEffect(() => {
        getAllAppraisal();       
        // eslint-disable-next-line
    }, []);
    var paid = props.apprasalviewdata.paid;
    const [apprasalList, setapprasalList] = useState([]);
    const getAllAppraisal = () => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: `${urlpattern}AppraisalMaster?paid=${paid}`,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        axios(config)
            .then(function (response) {
                ////console.log(JSON.stringify(response.data));
                var apprasallist = response.data.Data;
                setapprasalList(apprasallist);
            })
            .catch(function (error) {
                //console.log(error);
            });
    };
    ////console.log(apprasalList.empployeereview, "empployeereview");
    const [mangReviewColor, setmangReviewColor] = useState('')
    const [empReviewColor, setempReviewColor] = useState('')
    var employerieviedetails = apprasalList.empployeereview || [];
    var rmrieviedetails = apprasalList.rmreview || [];
    //('employerieviedetails', employerieviedetails);
    useEffect(() => {       
       if(employerieviedetails.total>60){
         setmangReviewColor('green-text')
       }
       if(employerieviedetails.total<60&&employerieviedetails.total>50){
        setmangReviewColor('yellow-text')
      }
      if(employerieviedetails.total<40&&employerieviedetails.total>30){
        setmangReviewColor('orange-text')
      }
      if(employerieviedetails.total<30){
        setmangReviewColor('red-text')
      }
      if(rmrieviedetails.total>60){
        setempReviewColor('green-text')
      }
      if(rmrieviedetails.total<60&&rmrieviedetails.total>50){
        setempReviewColor('yellow-text')
     }
     if(rmrieviedetails.total<40&&rmrieviedetails.total>30){
        setempReviewColor('orange-text')
     }
     if(rmrieviedetails.total<30){
        setempReviewColor('red-text')
     }
    },[employerieviedetails,rmrieviedetails])
    return (
        <React.Fragment>
            <div className="row">
                <div className="header-info">EMPLOYEE APPRAISAL</div>
                <Col className="text-right">
                    <button type="button" onClick={props.gobacktoAppraisal} className="btn btn-primary mr-2">
                        Go Back To List
                    </button>
                </Col>
            </div>
            <Row>
                <Col lg={4}>
                    <Label>Employee Name</Label>
                    <input type="text" className="style-input form-control" value={apprasalList.empname} />
                </Col>
                <Col lg={4}>
                    <Label>Date</Label>
                    <input
                        type="text"
                        className="style-input form-control"
                        value={formatDate(apprasalList.createdOn)}
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col lg={4}>
                    <Label>Department</Label>
                    <input type="text" className="style-input form-control" value={apprasalList.department} />
                </Col>
                <Col lg={4}>
                    <Label>Review Date</Label>
                    <input
                        type="text"
                        className="style-input form-control"
                        value={formatDate(apprasalList.createdOn)}
                    />
                </Col>
            </Row>
            <div className="row mt-4">
                <div className="header-info">
                    <Row>
                        <Col lg={6}>SELF RATINGS</Col>
                        <Col lg={6}>APPRAISER'S RATING</Col>
                    </Row>
                </div>
            </div>
            <Row>
                <Col lg={6} className="mb-4">
                    <Col lg={8} className="mt-3">
                        <Label>Quality of work & Task Completion</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.qualityofworkntaskcompletion}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Goals and Target Achievement</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.goalsntargetachievement}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Written and Verbal Communication Skill</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.writtennverbalcommunicationskills}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Initiative and Motivation</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.initiativenmotivation}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Teamwork and Leadership Skills</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.teamworknleadershipskills}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Ability to Problem Solve </Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.abilitytoproblemsolve}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Attendance & Regularization</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={employerieviedetails.attendancenregualrization}
                        />
                    </Col>
                </Col>

                <Col lg={6} className="mb-4">
                    <Col lg={8} className="mt-3">
                        <Label>Quality of work & Task Completion </Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.qualityofworkntaskcompletion}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Goals and Target Achievement</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.goalsntargetachievement}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Written and Verbal Communication Skill</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.writtennverbalcommunicationskills}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Initiative and Motivation</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.initiativenmotivation}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Teamwork and Leadership Skills</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.teamworknleadershipskills}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Ability to Problem Solve </Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.abilitytoproblemsolve}
                        />
                    </Col>
                    <Col lg={8} className="mt-3">
                        <Label>Attendance & Regularization</Label>
                        <input
                            type="text"
                            className="style-input form-control"
                            value={rmrieviedetails.attendancenregualrization}
                        />
                    </Col>
                </Col>
            </Row>
            <div className="row mt-4">
                <div className="header-info">
                    <Row>
                        <Col lg={6}>
                            <Row>
                                <Col lg={6}>Total</Col>
                                <Col lg={6} className={mangReviewColor}>{employerieviedetails.total}</Col>
                            </Row>
                        </Col>
                        <Col lg={6}>
                            <Row>
                                <Col lg={6}>Total</Col>
                                <Col lg={6} className={empReviewColor}>{rmrieviedetails.total}</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="row mt-4">
                <Col lg={6}>
                    <h5>Employee's Comments :</h5>
                    <lable>{employerieviedetails.comment}</lable>
                </Col>
                <Col lg={6}>
                    <h5>Appraiser Comments :</h5>
                    <label>{rmrieviedetails.comment}</label>
                </Col>
                <Col lg={3} className="mt-3">
                    <input type="text" className="style-input form-control" />
                    <Label>Date :</Label>
                </Col>
                <Col lg={3} className="mt-3"></Col>
                <Col lg={3} className="mt-3">
                    <input type="text" className="style-input form-control" />
                    <Label>Appraiser Signiture :</Label>
                </Col>

                <Col lg={3} className="mt-3">
                    <input type="text" className="style-input form-control" />
                    <Label>Date :</Label>
                </Col>
            </div>
            {/* <div className="row mt-4">
                        <Col lg={12}>
                            <label>Target/ Training Needs/ Requests </label>
                            <textarea className="form-control" rows="8"/>
                        </Col>
            </div> */}
            <div className="row mt-4">
                <Col lg={6}>
                    <Row>
                        <Col lg={2}>
                            <div className="squire green-bg"></div>{' '}
                        </Col>
                        <Col lg={10} className="pl-0">
                            <label className="pt-2">
                                Rating <FeatherIcon.ChevronRight /> 60 Outstanding Performance{' '}
                            </label>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={2}>
                            <div className="squire orange-bg"></div>{' '}
                        </Col>
                        <Col lg={10} className="pl-0">
                            <label className="pt-2">
                                Rating <FeatherIcon.ChevronLeft /> 40 Average Performance{' '}
                            </label>
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <Row>
                        <Col lg={2}>
                            <div className="squire yellow-bg"></div>{' '}
                        </Col>
                        <Col lg={10} className="pl-0">
                            <label className="pt-2">
                                Rating <FeatherIcon.ChevronLeft /> 50 Good Performance{' '}
                            </label>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={2}>
                            <div className="squire red-bg"></div>{' '}
                        </Col>
                        <Col lg={10} className="pl-0">
                            <label className="pt-2">
                                Rating <FeatherIcon.ChevronLeft /> 30 Poor Performance{' '}
                            </label>
                        </Col>
                    </Row>
                </Col>
            </div>
        </React.Fragment>
    );
};

export default ViewApprasalForm;
