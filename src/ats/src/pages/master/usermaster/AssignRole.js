
import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label} from 'reactstrap';
//import { getRecruiterList } from '../../../redux/recruiter/actions';
import { getUserList } from '../../../redux/user/actions';
import { createRole } from '../../../redux/role/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
// import Select from 'react-select';
const AssignRole = () => {

    const [uid	, setUid]=useState();
    const [role, setRole]=useState();

    let userList = useSelector((state) => state.Users.users || []);
    let roleList =[
        {"role":"IT"},
        {"role":"Recruiter"},
        {"role":"Project manager"},
        {"role":"HR"},
        {"role":"HR Manager"},
        {"role":"Sales"},
        {"role":"Teamlead"},
        {"role":"Admin"},
    
        // {"role":"Edit "},
        // {"role":"Delete"},

    ]
    ////console.log("userList", userList)
    const dispatch = useDispatch();
    useEffect(() => {
        // other code
        dispatch(getUserList());
        //dispatch(getRoleList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []) ;
     const handleSubmit = e => {
        e.preventDefault();
        const reqBody ={
            uid:uid ,
            role:role
        };
        //dispatch(createRole(reqBody));
        //dispatch(getRoleList());
        //cleanForm();
       // setLoader(true)
        api.createRole(reqBody).then((res)=>{
           // //console.log(res)
            dispatch(createRole(reqBody, res));
            swal('Success', res.data.Message, "success");
            cleanForm();
           }).catch((err)=>{
            //console.log(err)
            swal('Failed', err.response.data.Message,  "error");
           })
    }
    const cleanForm=()=>{
        setUid()
        setRole()
    }
    return (
        <React.Fragment>
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5">
                        <h5 className="text-uppercase  text-center">Assign User Role</h5>
                    <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> User</Label>
                                    <select className="form-control style-input"
                                    name="uid "
                                    value={uid}
                                    id="uid "
                                    onChange={(e) => {
                                        setUid (e.target.value);
                                    }}>
                                    <option value="">Select User</option>
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
                                    <Label htmlFor="empleadoApellidos">Assign Role</Label>
                                    <select className="form-control style-input"
                                    name="role "
                                    id="role "
                                    value={role}
                                    onChange={(e) => {
                                        setRole (e.target.value);
                                    }}>
                                    <option value="" >Select Role</option>
                                            {roleList.map((roles, i) => (
                                                <option key={i ++}  value={roles.role}>
                                                    {roles.role}
                                                </option>
                                            ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="submit" disabled={!role || !uid} className="btn btn-primary">Submit </button>
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

export default AssignRole;


