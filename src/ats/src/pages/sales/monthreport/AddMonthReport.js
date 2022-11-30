import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Form, Label, Input} from 'reactstrap';
import { getClientList } from '../../../redux/client/actions';
import { setMonth } from '../../../redux/salesmonthreport/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';
//import axios from 'axios';
// import Select from 'react-select';
const AddMonthReport = () => { 
    const dispatch = useDispatch();
    const [months, setmonths]=useState('');
    const [years, setyears]=useState('');
    const [bd, setbd]=useState('');
    const [join, setjoin]=useState('');
    const [client, setclient]=useState('');
    const [position, setposition]=useState('');
    const [passthrough, setpassthrough]=useState('');
    const [business, setbusiness]=useState('');
    const [bulkdeal, setbulkdeal]=useState('');
    const [submission, setsubmission]=useState('');
    const [poextend, setpoextend]=useState('');
    const [intreceived, setintreceived]=useState('');
    const [totrevenue, settotrevenue]=useState('');
    const [attrition, setattrition]=useState('');
    const [feedbackpending, setfeedbackpending]=useState('');
    const [noshow, setnoshow]=useState([]);
    const [remark, setremark]=useState('');
    const [offer, setoffer]=useState('');
    const [loader, setLoader]=useState(false);
    
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    var getUsername = loginDetails.Username;
    
  
    const handleSubmit = e => {
        e.preventDefault();
        const reqBody ={
            months:months,
            years:years,
            bd:parseFloat(bd),
            join:parseFloat(join),
            client:parseFloat(client),
            position:parseFloat(position),
            passthrough:parseFloat(passthrough),
            business:parseFloat(business),
            bulkdeal:parseFloat(bulkdeal),
            submission:parseFloat(submission),
            poextend:parseFloat(poextend),
            intreceived:parseFloat(intreceived),
            totrevenue:parseFloat(totrevenue),
            attrition:parseFloat(attrition),
            feedbackpending:parseFloat(feedbackpending),
            noshow:parseFloat(noshow),
            remark:remark,
            offer:parseFloat(offer),
            createby:getUsername,
        };
        // dispatch(setMonth(reqBody));
        // clearForm();
        setLoader(true)
        api.setMonth(reqBody).then((res)=>{
           // //console.log(res)
            dispatch(setMonth(reqBody, res));
            swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
            setLoader(false)
            clearForm();
           }).catch((err)=>{
            //console.log(err)
            setLoader(false)
            swal('Failed', err.response.data.Message,  "error");
           })
    }
   const  getDropList = () => {
        const year = new Date().getFullYear();
      return (
          Array.from( new Array(50), (v,i) =>
            <option key={i} value={year+i}>{year+i}</option>
        )
      );
    };
    let clientList = useSelector((state) => state.Client.clients || []);
    useEffect( () => {
        dispatch(getClientList());
    
        // eslint-disable-next-line
      }, [] );
      const [selectMonth] = React.useState([
        { label: 'January', value: '1'},
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },

    ]);
    const clearForm =()=>{
            setmonths('');
            setyears('');
            setbd('');
            setjoin('');
            setclient('');
            setposition('');
            setpassthrough('');
            setbusiness('');
            setbulkdeal('');
            setsubmission('');
            setpoextend('');
            setintreceived('');
            settotrevenue('');
            setattrition('');
            setfeedbackpending('');
            setnoshow([]);
            setremark('');
            setoffer('');
    }
    return (
        <React.Fragment>
            {loader!==true?  
            <Form onSubmit={handleSubmit}>
                                <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos">Month <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={months}
                                   name="months" id="months" onChange={(e) => {
                                    setmonths (e.target.value);
                                }}>
                                     <option  value="">Select Month</option>
                                {selectMonth.map((setmonth) => (
                                    <option key={setmonth.value} value={setmonth.value}>
                                        {setmonth.label}
                                    </option>
                                ))}
                                   </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Year <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={years}
                                   name="years" id="years" onChange={(e) => {
                                    setyears (e.target.value);
                                }}>
                                     <option  value="">Select Year</option>
                                     {getDropList()}
                                   </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">BD</Label>
                                    <Input
                                        type="number"
                                        value={bd}
                                        className="style-input"
                                        id="bd"
                                        name="bd" onChange={(e) => {
                                            setbd (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                            <Row className="mt-3">
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Client <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={client}
                                   name="client" id="client" onChange={(e) => {
                                    setclient (e.target.value);
                                }}>
                                     <option  value="">Select Client</option>
                                     {clientList.map((client) => (
                                    <option key={client.cid} value={client.cid}>
                                        {client.cname}
                                    </option>
                                ))}
                                   </select>
                                </FormGroup>
                            </Col>
                           
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Join</Label>
                                    <Input
                                        type="number" value={join}
                                        className="style-input"
                                        id="join"
                                        name="join" onChange={(e) => {
                                            setjoin (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Open Position </Label>
                                    <Input
                                        type="number"  
                                        className="style-input"
                                        id="position"
                                        value={position}
                                        name="position" onChange={(e) => {
                                            setposition (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col> 
                            </Row>
                        <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Passthrough</Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        value={passthrough}
                                        id="passthrough"
                                        name="passthrough" onChange={(e) => {
                                            setpassthrough (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Business Received</Label>
                                    <Input
                                        type="number" 
                                        className="style-input"
                                        value={business}
                                        id="business"
                                        name="business" onChange={(e) => {
                                            setbusiness (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Bulkdeal</Label>
                                    <Input
                                        type="number" 
                                        className="style-input"
                                        value={bulkdeal}
                                        id="bulkdeal"
                                        name="bulkdeal" onChange={(e) => {
                                            setbulkdeal (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                            <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">No. Of Submission </Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        value={submission}
                                        id="submission"
                                        name="submission" onChange={(e) => {
                                            setsubmission (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                           
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">PO Extend </Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        value={poextend}
                                        id="poextend"
                                        name="poextend" onChange={(e) => {
                                            setpoextend (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Interview Received</Label>
                                    <Input
                                        type="number"
                                        value={intreceived}
                                        id="intreceived"
                                        className="style-input"
                                        name="intreceived" onChange={(e) => {
                                            setintreceived (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Attrition Saved</Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        id="attrition"
                                        value={attrition}
                                        name="attrition" onChange={(e) => {
                                            setattrition (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Feedback Pending</Label>
                                    <Input
                                        type="number"
                                        id="feedbackpending"
                                        className="style-input"
                                        value={feedbackpending}
                                        name="feedbackpending" onChange={(e) => {
                                            setfeedbackpending (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Total Revenue</Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        id="totrevenue"
                                        value={totrevenue}
                                        name="totrevenue" onChange={(e) => {
                                            settotrevenue (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">No Show</Label>
                                    <Input
                                        type="number"
                                        id="noshow"
                                        value={noshow}
                                        className="style-input"
                                        name="noshow" onChange={(e) => {
                                            setnoshow (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                          
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Remark</Label>
                                    <Input
                                        type="text"
                                        className="style-input"
                                        value={remark}
                                        id="remark"
                                        name="remark" onChange={(e) => {
                                            setremark (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Offer</Label>
                                    <Input
                                        type="number"
                                        id="offer"
                                        value={offer}
                                        className="style-input"
                                        name="offer" onChange={(e) => {
                                            setoffer (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" onClick={clearForm} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </Form> :
                        <Loader/>
}
        </React.Fragment>
    );
};

export default AddMonthReport;


