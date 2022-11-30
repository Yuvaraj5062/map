import React, {useState,useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label, Input} from 'reactstrap';
import { createPass } from '../../redux/changepassword/actions';
//import api from '../../../helpers/axios';
import * as api from '../../helpers/restApi';
import swal from 'sweetalert';
import {useForm} from "react-hook-form";
const ChangePassword =(props)=>{
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    //let userDetails = useSelector((state)=> state.Profile.profile || []);
    //console.log(loginDetails)
    const dispatch = useDispatch();
   
     const [oldpwd, setoldpwd] = useState()
     const [newpwd, setnewpwd] = useState('')
     const [confpwd, setconfpwd] = useState('')

     const[passwordMatch, setpasswordMatch]=useState('')
    //  const { register, errors, handleSubmit, watch } = useForm({});
    //  const password = useRef({});
    //  password.current = watch("password", "");
     const handleSubmit=(e)=>{
        e.preventDefault();
        //var newteam =teammember;
       // var teammemberlist = newteam.replace(/[\])}[{(]/g, '');
      // if(newpwd===oldpwd){       
       const reqBody ={
        oldpwd:oldpwd,
        newpwd:newpwd,
        username:loginDetails.Username
       }
      // dispatch(createTeam(reqBody));
       api.changePass(reqBody).then((res)=>{
        //console.log(res)
        dispatch(createPass(reqBody, res));
        swal('Success', "Password update Successful", "success");
        cleanForm();
       }).catch((err)=>{
        //console.log(err)
        swal('Failed', err.response.data.Message,  "error");
       })
    //}
     }
     const handlePasswordMatch=(e)=>{
        let val = e.target.value;
        setconfpwd (e.target.value);
        if (newpwd === val) {
            ////console.log(confirmPass);
            setpasswordMatch("Password Matched !");
            // setConfirmPass("Password matched");
          } else {
            ////console.log(confirmPass);
            setpasswordMatch("Password dont match !");
          }
     }
    const cleanForm=()=>{
        setnewpwd('')
        setconfpwd('')
        setoldpwd('')
    }
        return (
            <React.Fragment>
            
            <form onSubmit={e => e.preventDefault()}>
                <Row className="mt-5">
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5">
                        <h5 className="text-uppercase  text-center">Change Password</h5>
                    <Row>
                            <Col lg={12}>
                                <FormGroup>                                    
                                    <Label htmlFor="empleadoApellidos">Old Password</Label>
                                    <Input
                                        type="password" required
                                        className=""
                                        name="oldpwd "
                                        id="oldpwd "
                                       
                                        value={oldpwd}
                                        onChange={(e) => {
                                            setoldpwd (e.target.value);
                                        }}/>
                                       
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>                                    
                                    <Label htmlFor="empleadoApellidos">New Password</Label>
                                    <Input
                                        type="password" required
                                        className=""
                                        name="newpwd "
                                        id="newpwd "
                                        value={newpwd}
                                       
                                        onChange={(e) => {
                                            setnewpwd (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>                                    
                                    <Label htmlFor="empleadoApellidos">Confirm Password</Label>
                                    <Input
                                        type="password" required
                                        className=""
                                        name="confpwd "
                                        id="confpwd "                                     
                                        onChange={(e) => {
                                           handlePasswordMatch(e)
                                        }}/>
                                        {passwordMatch}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                            <button type="button" onClick={cleanForm} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </div>
                    </Col>
                </Row>
            
                       
                        </form>
        </React.Fragment>
        );
    }

export default ChangePassword;
