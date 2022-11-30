import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label} from 'reactstrap';
import { getClientList } from '../../../redux/client/actions';
import { setCall } from '../../../redux/salescallreport/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';
const AddCall = () => {
    let clientList = useSelector((state) => state.Client.clients || []);
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    ////console.log(loginDetails.Username);
    var getUsername = loginDetails.Username;
    const [dt, setdt]=useState('');
    const [client, setclient]=useState('');
    const [poc, setpoc]=useState('');
    const [agenda, setagenda]=useState('');
    const [loader, setLoader]=useState(false);
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getClientList());
         // eslint-disable-next-line 
     }, []);
     const handleSubmit=(e)=>{
        e.preventDefault();
       const reqBody ={
        dt:dt,
        client:client,
        poc:poc,
        agenda:agenda,
        username:getUsername
       // teammember
       }
      // dispatch(setCall(reqBody));
      // cleanForm()
      setLoader(true)
      api.setCall(reqBody).then((res)=>{
        //console.log(res)
        dispatch(setCall(reqBody, res));
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        setLoader(false)
        cleanForm();
       }).catch((err)=>{
        //console.log(err)
        setLoader(false)
        swal('Failed', err.response.data.Message,  "error");
       })
     }
   const  cleanForm=()=>{
        setdt('')
        setclient('')
        setpoc('')
        setagenda('')
     }
    return (
        <React.Fragment>
            {loader!==true?  
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5" style={{height:'600px'}}>
                        <h5 className="text-uppercase  text-center">Create Call</h5>
                    <Row>
                    <Col lg={12}>
                                <FormGroup>
                                <Label htmlFor="empleadoApellidos">Call Date</Label>
                                    <input type="date" name="dt" className="form-control" id="dt" 
                                    value={dt}
                                        onChange={(e) => {
                                            setdt (e.target.value);
                                        }} />
                                    
                                   
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Client</Label>
                                   
                                    <select className="form-control" name="client"
                                    value={client}
                                    id="client"  onChange={(e) => {
                                        setclient (e.target.value);
                                    }}>
                                         <option  >Select Client</option>
                                         {clientList.map((client) => (
                                    <option key={client.cid} value={client.cname}>
                                        {client.cname}
                                    </option>
                                ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                <Label htmlFor="empleadoApellidos">POC</Label>
                                    <input type="text" name="poc" className="form-control" id="poc" 
                                    value={poc}
                                        onChange={(e) => {
                                            setpoc (e.target.value);
                                        }} />
                                    
                                   
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                <Label htmlFor="empleadoApellidos">Agenda</Label>
                                    <input type="text" name="agenda" className="form-control" id="agenda" 
                                    value={agenda}
                                        onChange={(e) => {
                                            setagenda (e.target.value);
                                        }} />
                                    
                                   
                                </FormGroup>
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
            
                       
                        </Form>:
                        <Loader/>
}
        </React.Fragment>
    );
};

export default AddCall;



