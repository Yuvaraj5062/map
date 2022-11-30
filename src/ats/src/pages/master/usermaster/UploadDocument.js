
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label} from 'reactstrap';
//import { getRecruiterList } from '../../../redux/recruiter/actions';
import { getUserList } from '../../../redux/user/actions';
import { createRole } from '../../../redux/role/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import { useRef } from "react";
import config from '../../../helpers/baseurl';

var urlpattern = config.baseUrl;

// import Select from 'react-select';
const UploadDocument = () => {

   
    const inputElement = useRef();
    let userList = useSelector((state) => state.Users.users || []);
    //let roleList = useSelector((state) => state.Role.role || []);
    ////console.log("userList", userList)
    const dispatch = useDispatch();
    useEffect(() => {
        // other code
        dispatch(getUserList());
        //dispatch(getRoleList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []) ;
    
     //let loginDetails = useSelector((state)=> state.Auth.user || []);
     const [selectDocstype] = React.useState([
        { label: 'Photograph', value: 'Photograph' },
        { label: 'Aadhar Card', value: 'Aadhar Card' },
        { label: 'Pan Card', value: 'Pan Card' },
        { label: 'Address Proof for Permanent Address', value: 'Address Proof for Permanent Address' },
        { label: 'Address Proof for Temporary Address', value: 'Address Proof for Temporary Address' },
        { label: 'Marksheet (10th/12th/Graduation/Post Graduation)', value: 'Marksheet (10th/12th/Graduation/Post Graduation)' },
        { label: 'Appointment/ Relieving Letter of the all Last Employer', value: 'Appointment/ Relieving Letter of the all Last Employer' },
        { label: 'Last Three Months’ Salary Slip', value: 'Last Three Months’ Salary Slip' },
        { label: 'Bank Details (If you have ICICI Bank Account, Active OR Inactive)', value: 'Bank Details (If you have ICICI Bank Account, Active OR Inactive)' }

    ]);
     const [file, setFile] = useState(null);
     const [ecode, setecode] = useState('');
     const [doctype, setdoctype] = useState('');
   const handleSubmit = async e => {
     e.preventDefault();
     const formData = new FormData();
     //SetUploadButton(true)
     formData.append('files', file);
     formData.append('ecode',ecode);
     formData.append('doctype',doctype);
    // formData={
    //     ecode:ecode,
    //     doctype:doctype
    // }
    //console.log(formData,'formdata')
     fetch(
      `${urlpattern}FileAPI/SaveFile`,
         {
             method: 'POST',
             body: formData,
         }
     )
         .then((response) => response.json())
         .then((result) => {
             
            swal(result.Status==true?'Success':'Failed', result.Message, result.Status==true?'success':'error');
            if(result.Status)
            {
              
              cleanForm()
            }
            // setuploadResData(result.Message)
           // cleanForm()
           //  swal("Document uploaded successfully !", "success");
            // getAllRequirementMaster();
            // SetUploadButton(false)
         })
         .catch((error) => {
             console.error('Error:', error);
            // swal("Something went wrong !", "error");
            swal("Failed","Something went wrong",'error');
            // SetUploadButton(false)
         });
 };
 const handleOnChange = e => {
    ////console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
 const cleanForm=()=>{
    setecode([])
    setdoctype([])
    setFile('')
    inputElement.current.value='';
 }
    return (
        <React.Fragment>
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5">
                        <h5 className="text-uppercase  text-center">Upload Document</h5>
                    <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> User</Label>
                                    <select className="form-control style-input"
                                    name="ecode "
                                    value={ecode}
                                    id="ecode "
                                    required
                                    onChange={(e) => {
                                        setecode (e.target.value);
                                    }}>
                                    <option value={''}>Select User</option>
                                    {userList.map((user,i) => (
                                    <option key={i++} value={user.ECode}>
                                        {user.EFullname}
                                    </option>
                                ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos">Document type</Label>
                                    <select className="form-control style-input"
                                    name="doctype "
                                    id="doctype "
                                    required
                                    value={doctype}
                                    onChange={(e) => {
                                        setdoctype (e.target.value);
                                    }}>
                                   <option value="" >Select Document Type</option>
                                {selectDocstype.map((doctype) => (
                                    <option key={doctype.value} value={doctype.value}>
                                        {doctype.label}
                                    </option>
                                ))}
                                    </select>
                                </FormGroup>
                                
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos">Upload Document</Label>
                                    <input type="file"  className="form-control style-input"  
                                    accept='.pdf' ref={inputElement} 
                                    required                               
                                    onChange={handleOnChange}/>
                                </FormGroup>
                                <label className="redspan">Upload Only PDF Documents</label>
                            </Col>
                           
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" onClick={cleanForm} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                </Row>
            
                       
                        </Form>
        </React.Fragment>
    );
};

export default UploadDocument;


