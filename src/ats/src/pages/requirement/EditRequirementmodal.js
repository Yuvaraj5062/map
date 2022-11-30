import React, { useState, useEffect, useRef } from 'react';
//import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import {getReqModal, hideReqModal,updateReq} from '../../redux/req/actions';
import { getClientList } from '../../redux/client/actions';
import { Multiselect } from "multiselect-react-dropdown";
const EditRequirementmodal = (props, row) => {
    const {
        //buttonLabel,
        className,
    } = props;
    const dispatch = useDispatch();  
    

    const modal = useSelector((state) => state.Req.modal);
    const requirmentStore = useSelector((state) => state.Req.req|| []);
    const [jclientid, setjclientid] = useState(0);
    const [jcreatedby, setJcreatedby] = useState('');
    const [jobcode, setJobcode] = useState();
    const [jskill, setJskill] = useState('');
    const [jposition, setJposition] = useState('');
    const [jlocation, setJlocation] = useState([]);
    const [jendclient, setJendClient] = useState('');
    const [jtotmin, setJtoMin] = useState('');
    const [jtotmax, setJtoMax] = useState('');
    const [jrelmin, setJelMin] = useState('');
    const [jrelmax, setJelMax] = useState('');
    const [jbillrate, setBillRate] = useState('');
    const [jpayrate, setPayRate] = useState('');
    const [jpocno, setJpocNo] = useState(0);
    const[jpoc, setJpoc]=useState('')
    const [jmandatoryskill, setJmandatoryskill] = useState('');
    const [jjd, setJobDesc] = useState('');
    const [jcategory, setJcategory] = useState([]);
    const [jtype, setJtype] = useState([]);
    const [jemployementtyp, setJemployementtyp] = useState([]);
    const jcreatedbyRef=useRef();
    let clientList = useSelector((state) => state.Client.clients || []);
    let recruterList = useSelector((state) => state.Recruiter.recruiters || []);
    //const[loader, setloader]=useState(false)
    const [preSelectedValues, setPreSelectedValues] = useState([])
    const [selectedValue, setSelectedValue] = useState([]);
    const [jrequirement_for, setjrequirement_for]=useState('')
    
    ////console.log(jcategory,jtype,jemployementtyp,selectedValue)
    const [categoryList] = React.useState([
        {
            label: 'IT',
            value: 'IT',
        },
        { label: 'NON IT', value: 'NON IT' }
    ]);
    const [reqTypeList] = React.useState([
        {
            label: 'DRIVE',
            value: 'DRIVE',
        },
        { label: 'PROCESS', value: 'PROCESS' },
        { label: 'EXCLUSIVE', value: 'EXCLUSIVE' },
    ]);
    const [empTypelist] = React.useState([
        {
            label: 'CONTRACTUAL',
            value: 'CONTRACTUAL',
        },
        { label: 'PERMANENT', value: 'PERMANENT' },
        { label: 'C2H', value: 'C2H' },
    ]);
    const [selectRequirementFor] = React.useState([
        { label: 'Inhouse', value: 'Inhouse' },
        { label: 'Client', value: 'Client' },
        { label: 'Both', value: 'Both' }
    ]);
    useEffect( () => {
       
        dispatch( getClientList() ); 
        //if(requirmentStore!==null && requirmentStore!==undefined){
        if(requirmentStore !== null && requirmentStore !== undefined && requirmentStore.jassignuser !== undefined){
        setjclientid( requirmentStore.jclientid || 0 );
        setJcategory(requirmentStore.jcategory||'')
        setJtype(requirmentStore.jtype||'')
        setJemployementtyp(requirmentStore.jemployementtyp||'')
        setJobcode( requirmentStore.jobcode || '' );
        setJcreatedby( requirmentStore.jcreatedby || '' );
        setJskill( requirmentStore.jskill || '' );
        setJposition(requirmentStore.jposition||'')
        setJlocation(requirmentStore.jlocation)
        setJendClient(requirmentStore.jendclient)
        setJtoMin(requirmentStore.jtotmin)
        setJtoMax(requirmentStore.jtotmax)
        setJelMin(requirmentStore.jrelmin)
        setJelMax(requirmentStore.jrelmax)
        setBillRate(requirmentStore.jbillrate);
        setPayRate(requirmentStore.jpayrate)
        setJpocNo(requirmentStore.jpocno)
        setJpoc(requirmentStore.jpoc)
        setJmandatoryskill(requirmentStore.jmandatoryskill);
        setJobDesc(requirmentStore.jjd)
        setjrequirement_for(requirmentStore.jrequirement_for)
       // //console.log('requirmentStore.jassignuser',requirmentStore.jassignuser)
        if(requirmentStore.jassignuser.includes(',')){
            let jassignuser = requirmentStore.jassignuser.split(",")
            setSelectedValue(jassignuser)
            // eslint-disable-next-line array-callback-return
            setPreSelectedValues(recruterList.filter((item) => {
              if(jassignuser.includes(item.EFullname)){
                return item
              }
            }))
          }else{
            let jassignuser = [requirmentStore.jassignuser]
            setSelectedValue(jassignuser)
            // eslint-disable-next-line array-callback-return
            setPreSelectedValues(recruterList.filter((item) => {
              if(jassignuser.includes(item.EFullname)){
                return item
              }
            }))
          }
    
    }
      // eslint-disable-next-line
    }, [requirmentStore] );
    const onSelect=(selectedList, selectedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
      //  //console.log('selectedvalue',selectedValue)        
    }
    
    const onRemove=(selectedList, removedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
    
    const toggle = () => {
        if (!modal) {
            dispatch(getReqModal());
           
        } else {
            dispatch(hideReqModal());
        }
    }
    
    const handleRequirementForm = () => {
      //  e.preventDefault();
       // setloader(true)
        let commaStr = ''
        // eslint-disable-next-line array-callback-return
        // selectedValue.map((item) => {
        // commaStr += item + ','
        // }) 
        let reqBody = {
            jid: requirmentStore.jid,
            jclientid: parseInt(jclientid),
            jobcode: jobcode,
            jskill: jskill,
            jposition: jposition,
            jlocation: jlocation,
            jendclient: jendclient,
            jtotmin: parseInt(jtotmin),
            jtotmax: parseInt(jtotmax),
            jrelmin: parseInt(jrelmin),
            jrelmax: parseInt(jrelmax),
            jbillrate: parseInt(jbillrate),
            jpayrate: parseInt(jpayrate),
            jpocno: parseInt(jpocno),
            jpoc:jpoc,
            jmandatoryskill: jmandatoryskill,
            jjd: jjd,
            jcategory: jcategory,
            jtype:jtype,
            jemployementtyp:jemployementtyp,
            jassignuser: commaStr,
            jcreatedby:jcreatedby,
            jclientname:requirmentStore.jclientname,
            jstatus:requirmentStore.jstatus,
            jcreatedon:requirmentStore.jcreatedon,
            jrequirement_for:jrequirement_for
        };
       ////console.log(reqBody);
       dispatch(updateReq(reqBody));
        //cleanForm();
    };
    const cleanForm = () => {
       // setjclientid([]);
        setJobcode('');
        setJskill('');
        setJposition('');
        setJendClient('');
        setJtoMin('');
        setJtoMax('');
        setJelMin('');
        setJelMax('');
        setBillRate('');
        setPayRate('');
        setJpocNo('');
        setJmandatoryskill('');
        setJobDesc('');
        setJlocation('');
        //setSelectedValue([]);
        setJcategory([]);
        setJtype([]);
        setJemployementtyp([]);
    
    };
    return (
        <div>
            <Modal isOpen={modal} size={"lg"} toggle={toggle} className={` ${className} 'modal-lg' `}>
                <ModalHeader toggle={toggle}>Update Requirement</ModalHeader>
                {/* style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }} */}
                <ModalBody style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
                <form >
                                <Row>
                                <Col lg={4}>
                        {/* <input
                            type="hidden"
                            value="testUi"
                            onChange={(e) => {
                                setJid(e.target.value);
                            }}
                            name="jid"
                        /> */}
                        <Input
                            type="hidden"
                            name="jcreatedby"
                            id="jcreatedby"
                            defaultValue={jcreatedby}
                            innerRef={jcreatedbyRef}
                        />
                        <FormGroup>
                            <Label htmlFor="empleadoApellidos">
                                Client <span className="redspan">*</span>
                            </Label>
                            <select className="form-control" required disabled
                                name="EEtype" id="EEtype" value={jclientid} onChange={(e) => {
                                    setjclientid(e.target.value);
                                }}> 
                                <option value="">Select</option>
                                {clientList.map((emptype) => (
                                <option key={emptype.cid} value={emptype.cid}>
                                    {emptype.cname}
                                </option>
                            ))}
                                </select>
                        </FormGroup>
                    </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Job Code<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        name="jobcode"
                                        required
                                        id="jobcode" disabled                                        
                                        value={jobcode}
                                        onChange={(e) => {
                                            setJobcode(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Main Skill<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        required
                                        name="jskill"
                                        id="jskill"
                                        defaultValue={jskill}
                                        onChange={(e) => {
                                            setJskill(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Number of Position<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"                                        
                                        name="jposition"
                                        required
                                        id="jposition"
                                        defaultValue={jposition}
                                        onChange={(e) => {
                                            setJposition(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Location<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        required
                                        name="jlocation"
                                        id="jlocation" 
                                        defaultValue={jlocation}
                                        onChange={(e) => {
                                            setJlocation(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">End Client<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"      
                                        required                                  
                                        name="jendclient"
                                        id="jendclient"
                                        defaultValue={jendclient}
                                        onChange={(e) => {
                                            setJendClient(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Total Minimum Experience<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"      
                                        required                                  
                                        name="jtotmin"
                                        id="jtotmin"
                                        defaultValue={jtotmin}
                                        onChange={(e) => {
                                            setJtoMin(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Total Maximum Experience<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        required
                                        name="jtotmax"
                                        id="jtotmax"
                                        defaultValue={jtotmax}
                                        onChange={(e) => {
                                            setJtoMax(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Relevant Minimum Experience<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"  
                                        required                                      
                                        name="jrelmin" 
                                        id="jrelmin"
                                        defaultValue={jrelmin}
                                        onChange={(e) => {
                                            setJelMin(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Relevant Maximum Experience<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"    
                                        required                                    
                                        name="jrelmax" 
                                        id="jrelmax"
                                        defaultValue={jrelmax}
                                        onChange={(e) => {
                                            setJelMax(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Bill Rate<span className="redspan">*</span></Label>
                                    <Input
                                        type="text" 
                                        required                                       
                                        name="jbillrate" 
                                        id="jbillrate" defaultValue={jbillrate}
                                        onChange={(e) => {
                                            setBillRate(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Pay Rate<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"    
                                        required                                    
                                        name="jpayrate"
                                        id="jpayrate" 
                                        defaultValue={jpayrate}
                                        onChange={(e) => {
                                            setPayRate(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">Select Category</Label>                                   
                                    <select className="form-control" required
                                name="jcategory" id="jcategory" value={jcategory} onChange={(e) => {
                                    setJcategory(e.target.value);
                                }}> 
                                <option value="">Select</option>
                                {categoryList.map((emptype) => (
                                <option key={emptype.value} value={emptype.value}>
                                    {emptype.label}
                                </option>
                            ))}
                                </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Requirements Type<span className="redspan">*</span></Label>
                                   <select className="form-control" required
                                name="Jtype" id="Jtype" value={jtype} onChange={(e) => {
                                    setJtype(e.target.value);
                                }}> 
                                <option value="">Select</option>
                                {reqTypeList.map((emptype) => (
                                <option key={emptype.value} value={emptype.value}>
                                    {emptype.label}
                                </option>
                            ))}
                                </select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Requirements For <span className="redspan">*</span>
                            </Label>
                            <select
                                className="form-control"
                                name="jrequirement_for"
                                required
                                value={jrequirement_for}
                                onChange={(e) => {
                                    setjrequirement_for(e.target.value);
                                }}>
                                    <option value="" >Select</option>
                                {selectRequirementFor.map((reqtype) => (
                                    <option key={reqtype.value} value={reqtype.value}>
                                        {reqtype.label}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>
                    </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Type Of Employment<span className="redspan">*</span></Label>
                                    <select className="form-control" required
                                name="Jtype" id="Jtype" value={jemployementtyp} onChange={(e) => {
                                    setJemployementtyp(e.target.value);
                                }}> 
                                <option value="">Select</option>
                                {empTypelist.map((emptype) => (
                                <option key={emptype.value} value={emptype.value}>
                                    {emptype.label}
                                </option>
                            ))}
                                </select>
                                </FormGroup>
                            </Col>
                       
                            <Col lg={4}>
                                <FormGroup>
                                <Label htmlFor="empleadoNombre">POC Name<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        id="jpoc"
                                        required
                                        name="jpoc"
                                        defaultValue={jpoc}
                                        onChange={(e) => {
                                            setJpoc(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Mandatory Skills<span className="redspan">*</span></Label>
                                    <Input
                                        type="text"
                                        required
                                        id="jmandatoryskill"
                                        name="jmandatoryskill" 
                                        defaultValue={jmandatoryskill}
                                        onChange={(e) => {
                                            setJmandatoryskill(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                    <Col lg={12}>
                        <Label>Description<span className="redspan">*</span></Label>
                        
                        <Input
                        type="textarea"
                            required
                            id="jjd"
                            defaultValue={jjd}
                            onChange={(e) => {
                                setJobDesc(e.target.value);
                            }}
                            name="jjd"/>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg={6} className="mb-5">
                        <h5 className="text-uppercase mt-4">Assign To :</h5>
                        <Multiselect
                            options={recruterList}
                            onSelect={onSelect}
                            selectedValues={preSelectedValues}
                            onRemove={onRemove}
                            name="jassignuser"
                            displayValue="EFullname"
                            showCheckbox={true}
                            />
                    </Col>
                </Row>
                        </form>
            
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleRequirementForm}>Add</Button>
                    <Button color="secondary" type="button" className="ml-1" onClick={toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default EditRequirementmodal;
