import React, { useState, useEffect } from 'react';
import { Row, Col, Form,} from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import sampleSalaryFile from '../assets/sampledata/SalarySheet.xlsx'
import axios from 'axios';
import config from '../helpers/baseurl';
import swal from 'sweetalert';

var urlpattern = config.baseUrl;
//import axios from 'axios';
// import Select from 'react-select';
const UploadSalarySlip = ({companyName}) => { 
    const [uploadButton, setUploadButton] = useState(true)
    const [uploadResData, setuploadResData]=useState('');
    const [file, setFile] = useState(null);

    const UPLOAD_ENDPOINT = `${urlpattern}UploadSalarySheet?companayname=${companyName}`;
    useEffect( () => {
        // eslint-disable-next-line
    }, [] );
    // const dispatch = useDispatch(); 
    const handleSubmit = async e => {
        setUploadButton(true)
        e.preventDefault();
        try{
          let res = await uploadFile(file)
          if(res.status === 200){
              setUploadButton(true)
              setFile(null)
            //   dispatch(getSalarySlipList(data));
              setuploadResData(res.data.Message)
              swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
          }else{
            swal( "Failed",res.data.Message);
          }
        }catch(err){
            swal('Failed', err.response.data.Message,  "error");
        }

    }
    const uploadFile = file => {
        const formData = new FormData();
        formData.append("avatar", file);
    
        return axios.post(UPLOAD_ENDPOINT, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
        });
    };

    const handleOnChange = e => {
        setFile(e.target.files[0]);
        if(e.target.files[0]){
          setUploadButton(false)
        }
    };

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5" >
                            <h5 className="text-uppercase  text-center">Upload Salary Slip</h5>
                            <Row>
                            <Col lg={12} className="mb-2 mt-3">  <h5><a href={sampleSalaryFile} download="SalarySlip.xlsx">Download Salary Slip sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                                <Col lg={8}> <input type="file" className="form-control" onChange={handleOnChange} /></Col>
                                <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">Upload File</button></Col>
                                {/* <Col lg={12}><h4>{uploadResData}</h4></Col> */}
                            </Row>
                            {/* <Row className="mt-3">
                                <Col lg={12}>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                    <button className="btn btn-secondary ml-3">Cancel</button>
                                </Col>
                            </Row> */}
                        </div>
                    </Col>
                </Row>
                
            </Form>
        </React.Fragment>
    );
};

export default UploadSalarySlip;


