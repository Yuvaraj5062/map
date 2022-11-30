import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Form, Label, Input} from 'reactstrap';
import { getClientList } from '../../../redux/client/actions';
import { setRevenue } from '../../../redux/salesrevenue/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';
const AddRevenuReport = () => { 
    const dispatch = useDispatch();
    const [srmonth, setsrmonth]=useState('');
    const [srattrition, setsrattrition]=useState();
    const [srbd, setsrbd]=useState();
    const [srclient, setsrclient]=useState();
    const [srtotgp, setsrtotgp]=useState();
    const [sractualstart, setsractualstart]=useState();
    const [sravggpadded, setsravggpadded]=useState();
    const [srnettotgp, setsrnettotgp]=useState();
    const [srstart, setsrstart]=useState();
    const [srnettotgpadded, setsrnettotgpadded]=useState();
    const [srtypeofemployement, setsrtypeofemployement]=useState();
    const [sryear, setsryear] = useState()
    const [loader, setLoader]=useState(false);
    const [srcurrenthc, setsrcurrenthc] = useState()
    
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    var getUsername = loginDetails.Username;
    const handleSubmit = e => {
        e.preventDefault();
        const reqBody ={
            srmonth:srmonth,
            srattrition:parseFloat(srattrition),
            srbd:parseFloat(srbd),
            srclient:parseFloat(srclient),
            srtotgp:parseFloat(srtotgp),
            sractualstart:parseFloat(sractualstart),
            sravggpadded:parseFloat(sravggpadded),
            srnettotgp:parseFloat(srnettotgp),
            srstart:parseFloat(srstart),
            srnettotgpadded:parseFloat(srnettotgpadded),
           // srmargintype:srmargintype,
            srtypeofemployement:srtypeofemployement,
            srcurrenthc:parseFloat(srcurrenthc),
            srusername:getUsername,
            sryear:sryear
        };
        // dispatch(setRevenue(reqBody));
        // clearForm();
        setLoader(true)
        api.setRevenue(reqBody).then((res)=>{
           // //console.log(res)
            dispatch(setRevenue(reqBody, res));
            swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
            setLoader(false)
            clearForm();
           }).catch((err)=>{
            //console.log(err)
            setLoader(false)
            swal('Failed', err.response.data.Message,  "error");
           })
    }
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
    const [selectEmpType] = React.useState([
        {
            label: 'CONTRACTUAL',
            value: 'CONTRACTUAL',
        },
        { label: 'PERMANENT', value: 'PERMANENT' },
        { label: 'C2H', value: 'C2H' },
    ]);
    let clientList = useSelector((state) => state.Client.clients || []);
    useEffect( () => {
        dispatch(getClientList());
    
        // eslint-disable-next-line
      }, [] );
      const clearForm=()=>{
            setsrmonth([]);
            setsrattrition('');
            setsrbd('');
            setsrclient([]);
            setsrtotgp('');
            setsractualstart('');
            setsravggpadded('');
            setsrnettotgp('');
            setsrstart('');
            setsrnettotgpadded('');
            setsrtypeofemployement('');
      }
      const  getDropList = () => {
        const year = new Date().getFullYear();
      return (
          Array.from( new Array(50), (v,i) =>
            <option key={i} value={year+i}>{year+i}</option>
        )
      );
    };
    return (
        <React.Fragment>
             {loader!==true?   
            <Form onSubmit={handleSubmit}>
                                <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Month <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={srmonth}
                                   name="srmonth" id="srmonth" onChange={(e) => {
                                    setsrmonth (e.target.value);
                                }}>
                                     <option value="">Select Month</option>
                                {selectMonth.map((selmonth) => (
                                    <option key={selmonth.value} value={selmonth.value}>
                                        {selmonth.label}
                                    </option>
                                ))}
                                   </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Year <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={sryear}
                                   name="sryear" id="sryear" onChange={(e) => {
                                    setsryear (e.target.value);
                                }}>
                                     <option  value="">Select Year</option>
                                     {getDropList()}
                                   </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Attrition</Label>
                                    <Input
                                        type="number"
                                        className="style-input"
                                        value={srattrition}
                                        id="srattrition"
                                        name="srattrition" onChange={(e) => {
                                            setsrattrition (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoApellidos"> Client <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required value={srclient}
                                   name="srclient" id="srclient" onChange={(e) => {
                                    setsrclient (e.target.value);
                                }}>
                                     <option value="">Select Client</option>
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
                                    <Label htmlFor="empleadoNombre">BD </Label>
                                    <Input
                                        type="text" 
                                        className="style-input"
                                        value={srbd}
                                        id="srbd"
                                        name="srbd" onChange={(e) => {
                                            setsrbd (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Total GP </Label>
                                    <Input
                                        type="number" 
                                        className="style-input"
                                        value={srtotgp}
                                        id="srtotgp"
                                        name="srtotgp" onChange={(e) => {
                                            setsrtotgp (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Actual Start</Label>
                                    <Input
                                         type="number"
                                        className="style-input"
                                        value={sractualstart}
                                        id="sractualstart"
                                        name="sractualstart" onChange={(e) => {
                                            setsractualstart (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Avg GP Added <span className="redspan">*</span></Label>
                                    <Input
                                         type="number" required
                                        className="style-input"
                                        value={sravggpadded}
                                        id="sravggpadded"
                                        name="sravggpadded" onChange={(e) => {
                                            setsravggpadded (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Net Total GP </Label>
                                    <Input
                                         type="number" 
                                        className="style-input"
                                        value={srnettotgp}
                                        id="srnettotgp"
                                        name="srnettotgp" onChange={(e) => {
                                            setsrnettotgp (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                            <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Start </Label>
                                    <Input
                                         type="number" 
                                        className="style-input"
                                        value={srstart}
                                        id="srstart"
                                        name="srstart" onChange={(e) => {
                                            setsrstart (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                           
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Net Total GP Added </Label>
                                    <Input
                                         type="number"
                                        className="style-input"
                                        value={srnettotgpadded}
                                        id="srnettotgpadded"
                                        name="srnettotgpadded" onChange={(e) => {
                                            setsrnettotgpadded (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Current HC </Label>
                                    <Input
                                         type="number"
                                        className="style-input"
                                        value={srcurrenthc}
                                        id="srcurrenthc"
                                        name="srcurrenthc" onChange={(e) => {
                                            setsrcurrenthc (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Type Of Employment</Label>
                                        <select className="form-control style-input" value={srtypeofemployement}
                                   name="srtypeofemployement" id="srtypeofemployement" onChange={(e) => {
                                    setsrtypeofemployement (e.target.value);
                                }}>
                                     <option value="">Select</option>
                                {selectEmpType.map((emptype) => (
                                    <option key={emptype.value} value={emptype.value}>
                                        {emptype.label}
                                    </option>
                                ))}
                                   </select>
                                </FormGroup>
                            </Col>
                            </Row>
                        <Row className="mt-3">
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Save</button>
                            <button type="button" onClick={clearForm} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </Form>:
                        <Loader/>
}
        </React.Fragment>
    );
};

export default AddRevenuReport;


