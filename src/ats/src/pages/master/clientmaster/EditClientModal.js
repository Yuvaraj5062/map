import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, FormGroup, Form, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';
import * as actions from '../../../redux/client/actions'
import swal from 'sweetalert';

const EditClientModal = (props, row) => {
  const {
    //buttonLabel,
    className,
  } = props;

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Client.modal);
  const clientStore = useSelector((state) => state.Client.client|| []);

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

  const toggle = () => {
    if (!modal) {
      dispatch(actions.getClientModal()); 
    } else {
      dispatch(actions.hideClientModal());
    }
  }

  useEffect(() => {
    if(clientStore !== null && clientStore !== undefined){
      setCname(clientStore.cname||'')
      setCemail1(clientStore.cemail1||'')
      setCcnt1(clientStore.ccnt1||'')
      setCperson1(clientStore.cperson1||'')
      setCemail2(clientStore.cemail2||'')
      setCcnt2(clientStore.ccnt2||'')
      setCperson2(clientStore.cperson2||'')
      setCaddress(clientStore.caddress||'')
      setCtype(clientStore.ctype||'')
      setCsegment(clientStore.csegment||'')
      setCmargintype(clientStore.cmargintype||'')
      setCcategory(clientStore.ccategory||'')
      setCuser(clientStore.cuser||'')
    }
  },[clientStore])

  const handleUpdate = (e) => {
    e.preventDefault();
    let isOk=true
      const reqBody ={
      cid:clientStore.cid,
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
      const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if(!re.test(cemail1 )|| (cemail2?!re.test(cemail2):null)){
        swal("failed","Enter valid email","error")
        isOk=false
       // setLoader(false)
      }
      if(isOk){
        dispatch(actions.updateClient(reqBody));
      }
     
  }

  return(
    <div>
      <Modal isOpen={modal} size={"lg"} toggle={toggle} className={` ${className} 'modal-lg' `}>
        <ModalHeader toggle={toggle}>Update Client</ModalHeader>
        <ModalBody style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
        <Form onSubmit={handleUpdate}>
          <Row>
            <Col lg={4}>
              <FormGroup>
                <Input
                  type="hidden" required
                  className="style-input"
                  id="cuser"
                  name="cuser"
                  value={cuser}
                    onChange={(e) => {
                      setCuser (e.target.value);
                  }} />
                <Label htmlFor="empleadoApellidos">Client Name<span className="redspan">*</span></Label>
                <Input
                  type="text" required
                  className="style-input"
                  id="cname"
                  name="cname"
                  value={cname}
                    onChange={(e) => {
                      setCname (e.target.value);
                  }} />
                </FormGroup>
            </Col>              
          </Row>
          <Row>
            <Col lg={4}>
              <FormGroup>
              <Label htmlFor="empleadoNombre">Contact Person 1<span className="redspan">*</span></Label>
                  <Input
                      type="text" required
                      className="style-input"
                      id="cperson1"
                      name="cperson1"
                      value={cperson1}
                        onChange={(e) => {
                          setCperson1 (e.target.value);
                      }} />
              </FormGroup>
            </Col>
            <Col lg={4}>
              <FormGroup>
                  <Label htmlFor="empleadoNombre">Email <span className="redspan">*</span></Label>
                  <Input
                      type="email" required
                      className="style-input"
                      id="cemail1"
                      name="cemail1" 
                      value={cemail1}
                        onChange={(e) => {
                          setCemail1 (e.target.value);
                      }}/>
              </FormGroup>
            </Col>
                <Col lg={4}>
                    <FormGroup>
                    <Label htmlFor="empleadoNombre">Contact Number <span className="redspan">*</span></Label>
                        <Input
                            type="number" required
                            className="style-input"
                            id="ccnt1"
                            name="ccnt1"
                            value={ccnt1} 
                              onChange={(e) => {
                                setCcnt1 (e.target.value);
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
                                        id="cperson2"
                                        name="cperson2"
                                        value={cperson2} 
                                         onChange={(e) => {
                                            setCperson2 (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Email </Label>
                                    <Input
                                        type="text" 
                                        className="style-input"
                                        id="cemail2"
                                        name="cemail2" 
                                        value={cemail2}
                                         onChange={(e) => {
                                            setCemail2 (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Contact Number </Label>
                                    <Input
                                        type="number" 
                                        className="style-input"
                                        id="ccnt2"
                                        name="ccnt2" 
                                        value={ccnt2}
                                         onChange={(e) => {
                                            setCcnt2 (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <Label>Address <span className="redspan">*</span></Label>
                            <textarea
                                className="form-control style-input"
                                rows="3" required
                                value={caddress}
                                name="caddress" id="caddress"
                                 onChange={(e) => {
                                    setCaddress (e.target.value);
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
                                        value={ccategory}
                                        name="ccategory"  onChange={(e) => {
                                            setCcategory (e.target.value);
                                        }}/> */}
                                    <select className="form-control style-input" required
                                        name="ccategory" id="ccategory" value={ccategory} onChange={(e) => {
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
                                        value={ctype}
                                        name="ctype"  onChange={(e) => {
                                            setCtype (e.target.value);
                                        }}/> */}
                                      <select className="form-control style-input" required
                                        name="ccategory" id="ccategory" value={ctype} onChange={(e) => {
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
                                        value={csegment}
                                        name="csegment"  onChange={(e) => {
                                            setCsegment (e.target.value);
                                        }}/> */}
                                    <select className="form-control style-input" required
                                        name="ccategory" id="ccategory" value={csegment} onChange={(e) => {
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
                                        value={cmargintype}
                                        name="cmargintype"  onChange={(e) => {
                                            setCmargintype (e.target.value);
                                        }} /> */}
                                    <select className="form-control style-input" required
                                        name="ccategory" id="ccategory" value={cmargintype} onChange={(e) => {
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
                            <button type="button" onClick={toggle} className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
                        </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditClientModal;