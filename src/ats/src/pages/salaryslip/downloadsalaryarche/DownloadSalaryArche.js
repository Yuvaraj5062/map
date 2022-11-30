import React, { useState } from 'react'
import { Row, Col, FormGroup, Form, Label, Input } from 'reactstrap';
import swal from 'sweetalert';
import axios from 'axios'
import { monthsList, yearsList } from '../../../constants/dateFormat';
import config from '../../../helpers/baseurl';
var urlpattern = config.baseUrl;




export const DownloadSalaryArche = () => {
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')
    const [loader, setLoader] = useState(false);
    const handleSubmit = e => {
        setLoader(true)
        e.preventDefault()
        axios.get(urlpattern + `GenerateRecruiterSalaryExcelSheetController?salarymonth=${month}&salaryyear=${year}`).then((res) => {
            if (res.status === 200) {
                setLoader(false)
                window.open(urlpattern + `GenerateRecruiterSalaryExcelSheetController?salarymonth=${month}&salaryyear=${year}`)

            }
            else {
                setLoader(false)
                swal("Failed", res.data.responseMessage,"error");
            }
        })
            .catch(function (error) {
                setLoader(false)
                swal("Error",error.response.data.responseMessage,'error')
            });

    }
    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5" >
                            {/* <h5 className="text-uppercase  text-center">
                            Download Salary Slip of arche
                        </h5> */}

                            <Row>
                                <Col className="">
                                    <FormGroup>
                                        <Label for="year"> Year <span className="redspan">*</span></Label>
                                        <select className="form-control style-input" value={year} required
                                            onChange={(event) => setYear(event.target.value)}>
                                            <option value="">Select Year</option>
                                            {
                                                yearsList().map((year) => (
                                                    <option value={year} key={year}>{year}</option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <FormGroup>
                                        <Label for="month"> Month <span className="redspan">*</span></Label>
                                        <select className="form-control style-input" value={month} required
                                            onChange={(event) => setMonth(event.target.value)}>
                                            <option value="">Select Month</option>
                                            {
                                                monthsList.map((month) => (
                                                    <option value={month} key={month}>{month}</option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                </Col>
                            </Row>


                            <Row>
                                <Col className=" text-center">
                                    <div className="form-group mb-0 mt-2 text-center">
                                        <button className="btn-block btn btn-primary"
                                            type='submit'
                                            disabled={!month || !year }
                                        >
                                            {loader ? <span className="spinner-border text-secondary" role="status">

                                            </span> : "Download Salary Slip"}
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Form>

        </React.Fragment>
    )
}
