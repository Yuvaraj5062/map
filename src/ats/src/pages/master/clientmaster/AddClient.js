import React, { useState } from 'react';
import { Row, Col, FormGroup, Form, Label, Input} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { createClient } from '../../../redux/client/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';
// import Select from 'react-select';
const AddClient = () => {
    const dispatch = useDispatch();
    const [cname, setCname]=useState('');
    const [cperson1, setCperson1 ]=useState('');
    const [cemail1, setCemail1 ]=useState('');
    const [ccnt1, setCcnt1 ]=useState('');
    const [cperson2, setCperson2]=useState('');
    const [cemail2, setCemail2 ]=useState('');
    const [ccnt2, setCcnt2 ]=useState('');
    const [caddress, setCaddress ]=useState('');
    const [ctype, setCtype ]=useState('');
    const [csegment, setCsegment ]=useState('');
    const [cmargintype, setCmargintype ]=useState('');
    const [ccategory, setCcategory]=useState('');
    const [cuser, setCuser]=useState('username');
    const [loader, setLoader]=useState(false);
    const [selectClientCategory] = React.useState([
        { label: 'IT', value: 'IT' },
        { label: 'Non IT', value: 'Non IT' },
    ]);
    const [selectClientType] = React.useState([
        {
            label: 'CONTRACTUAL',
            value: 'CONTRACTUAL',
        },
        { label: 'PERMANENT', value: 'PERMANENT' },
        { label: 'C2H', value: 'C2H' },
    ]);
    const [selectClientSegment] = React.useState([
        { label: 'Captive', value: 'Captive' },
        { label: 'Service', value: 'Service' },
        { label: 'Consulting', value: 'Consulting' },
    ]);
    const [selectClientMarginType] = React.useState([
        { label: 'Percent', value: 'Percent' },
        { label: 'Rupees', value: 'Rupees' }
    ]);

   const handleSubmit=(e)=>{
  
       e.preventDefault();
       let isOk=true;
       const reqBody ={
        cname,
        cperson1,
        cemail1,
        ccnt1,
        cperson2,
        cemail2,
        ccnt2,
        caddress,
        ctype,
        csegment,
        cmargintype,
        ccategory,
        cuser
       }
      // dispatch(createClient(reqBody));
      // dispatch(getClientList());
      // clearForm();
     // //console.log("cemail2",cemail2==undefined,"2",cemail1===" ","3",cemail2===null,"4",!cemail2)
      setLoader(true)
      const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if(!re.test(cemail1 )|| (cemail2?!re.test(cemail2):null)){
        swal("failed","Enter valid email","error")
        isOk=false
        setLoader(false)
      }

      if(isOk){
      api.setClient(reqBody).then((res)=>{
        ////console.log(res)
        dispatch(createClient(reqBody, res));
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        setLoader(false)
        clearForm();
       }).catch((err)=>{
        //console.log(err)
        setLoader(false)
        swal('Failed', err.response.data.Message,  "error");
       })
    }
   }
   const clearForm=()=>{
        setCname('');
        setCperson1 ('');
        setCemail1 ('');
        setCcnt1 ('');
        setCperson2('');
        setCemail2 ('');
        setCcnt2 ('');
        setCaddress ('');
        setCtype ('');
        setCsegment ('');
        setCmargintype ('');
        setCcategory('');
   }
    return (
        <React.Fragment>
              {loader!==true? 
            <Form onSubmit={handleSubmit}>
                                <Row>
                            <Col lg={4}>
                                <FormGroup>
                                <Input
                                        type="hidden" required
                                        className="style-input"
                                        value={cuser}
                                        id="cuser"
                                        name="cuser"
                                         onChange={(e) => {
                                            setCuser (e.target.value);
                                        }} />
                                    <Label htmlFor="empleadoApellidos">Client Name<span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        className="style-input"
                                        value={cname}
                                        id="cname"
                                        name="cname"
                                         onChange={(e) => {
                                            setCname (e.target.value.trimLeft());
                                        }} />
                                </FormGroup>
                            </Col>
                           
                        </Row>
                        <Row>
                        <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Contact Person 1 <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        value={cperson1}
                                        className="style-input"
                                        id="cperson1"
                                        name="cperson1"
                                         onChange={(e) => {
                                            setCperson1 (e.target.value.trimLeft());
                                        }} />
                                </FormGroup>
                            </Col>
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Email <span className="redspan">*</span></Label>
                                    <Input
                                        type="email" 
                                        className="style-input"
                                        value={cemail1}
                                        id="cemail1"
                                        name="cemail1" 
                                         onChange={(e) => {
                                            setCemail1 (e.target.value.trimLeft());
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Contact Number <span className="redspan">*</span></Label>
                                    <Input
                                        type="number" required
                                        className="style-input"
                                        value={ccnt1}
                                        id="ccnt1"
                                        name="ccnt1" 
                                         onChange={(e) => {
                                            setCcnt1 (e.target.value.trimLeft());
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Contact Person 2 </Label>
                                    <Input
                                        type="text" 
                                        className="style-input"
                                        value={cperson2}
                                        id="cperson2"
                                        name="cperson2" 
                                         onChange={(e) => {
                                            setCperson2 (e.target.value.trimLeft());
                                        }}/>
                                </FormGroup>
                            </Col>
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Email </Label>
                                    <Input
                                        type="text" 
                                        className="style-input"
                                        value={cemail2}
                                        id="cemail2"
                                        name="cemail2" 
                                         onChange={(e) => {
                                            setCemail2 (e.target.value.trimLeft());
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre"> Contact Number</Label>
                                    <Input
                                        type="number" 
                                        className="style-input"
                                        value={ccnt2}
                                        id="ccnt2"
                                        name="ccnt2" 
                                         onChange={(e) => {
                                            setCcnt2 (e.target.value.trimLeft());
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <Label>Address <span className="redspan">*</span></Label>
                            <textarea
                                className="form-control style-input"
                                value={caddress}
                                rows="3" required
                                name="caddress" id="caddress"
                                 onChange={(e) => {
                                    setCaddress (e.target.value.trimLeft());
                                }}></textarea>
                        </Col>
                    </Row>
                        <Row className="mt-4">         
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Category <span className="redspan">*</span></Label>
                                    {/* <input 
                                        type="text" required
                                        className="style-input form-control"
                                        id="ccategory"
                                        name="ccategory"  onChange={(e) => {
                                            setCcategory (e.target.value);
                                        }}/> */}
                                    <select className="form-control style-input" required
                                    value={ccategory}
                                        name="ccategory" id="ccategory" onChange={(e) => {
                                            setCcategory(e.target.value);
                                        }}>
                                        <option value="">Select</option>
                                        {selectClientCategory.map((category) => (
                                            <option key={category.value} value={category.value}>
                                                {category.label}
                                            </option>
                                        ))}
                                   </select>
                                </FormGroup>
                            </Col>                     
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Type <span className="redspan">*</span></Label>
                                    {/* <input 
                                        type="text" required
                                        className="style-input form-control"
                                        id="ctype"
                                        name="ctype"  onChange={(e) => {
                                            setCtype (e.target.value);
                                        }}/> */}
                                    <select className="form-control style-input" required
                                    value={ctype}
                                        name="ccategory" id="ccategory" onChange={(e) => {
                                            setCtype(e.target.value);
                                        }}>
                                        <option value="">Select</option>
                                        {selectClientType.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>  
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Segment <span className="redspan">*</span></Label>
                                    {/* <input
                                        type="text" required
                                        className="style-input form-control"
                                        id="csegment"
                                        name="csegment"  onChange={(e) => {
                                            setCsegment (e.target.value);
                                        }}/> */}
                                    <select className="form-control style-input" required
                                    value={csegment}
                                        name="ccategory" id="ccategory" onChange={(e) => {
                                            setCsegment(e.target.value);
                                        }}>
                                        <option value="">Select</option>
                                        {selectClientSegment.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>    
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Margin Type <span className="redspan">*</span></Label>
                                    {/* <input
                                        type="text" required
                                        className="style-input form-control"
                                        id="cmargintype"
                                        name="cmargintype"  onChange={(e) => {
                                            setCmargintype (e.target.value);
                                        }} /> */}
                                    <select className="form-control style-input" required
                                    value={cmargintype}
                                        name="ccategory" id="ccategory" onChange={(e) => {
                                            setCmargintype(e.target.value);
                                        }}>
                                        <option value="">Select</option>
                                        {selectClientMarginType.map((item) => (
                                            <option key={item.value} value={item.value}>
                                                {item.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>                              
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" onClick={clearForm} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </Form>:
                        <Loader/>
}
        </React.Fragment>
    );
};

export default AddClient;


