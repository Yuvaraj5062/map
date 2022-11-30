import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import swal from 'sweetalert';
import axios from 'axios';
import config from '../../helpers/baseurl';

var uploadurlpattern = config.punchFileUpload;

const UploadAttendance = () => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false)
    const [officeUrl, setOfficeUrl] = useState('')
    const UPLOAD_ENDPOINT = `${uploadurlpattern}${officeUrl}`;

    const handleSubmit = async e => {
        e.preventDefault();
        setLoader(true)
        try {
            let res = await uploadFile(file)
            if (res.data.responseCode === 201) {
                setFile(null)
                setLoader(false)
                swal("Success", res.data.responseMessage,'success');

            }

            else {
                swal("Failed", res.data.responseMessage,'error');
                setLoader(false)
            }
        }
        catch (err) {
            swal("Failed", err.response.data.responseMessage,'error');
            setLoader(false)
        }
    }

    const [file, setFile] = useState(null);
    const uploadFile = file => {
        const formData = new FormData();
        formData.append("file", file);
        return axios.post(UPLOAD_ENDPOINT, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
    };

    const handleOnChange = e => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
        }
    };


    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="authentication-form card p-5">
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg={12}>
                                        <FormGroup>
                                            <Label for="office">Select Office <span className="redspan">*</span></Label>
                                            <select className="form-control style-input"
                                                value={officeUrl}
                                                onChange={(e) => setOfficeUrl(e.target.value)} >
                                                <option value=" ">Select Office</option>
                                                <option value={"Upload-CSV-File-202"} >{"Office 202"}</option>
                                                <option value={"Upload-CSV-File-401"} >{"Office 401"}</option>
                                            </select>
                                        </FormGroup>
                                    </Col>

                                    <Col lg={12} className="mt-4">
                                        <input type="file" className="form-control" required7
                                        accept=".xlsx, .xls, .csv"
                                            onChange={handleOnChange} />
                                    </Col>
                                    <Col lg={12} className="mt-4">
                                        <button className="btn btn-primary w-100"
                                            type="submit" disabled={!officeUrl}>
                                            {loader ?
                                                <span className="spinner-border text-secondary" role="status"></span>
                                                :
                                                "Upload File"
                                            }
                                        </button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default UploadAttendance;


