import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
//import { getRequirementList, setRequirement } from '../../redux/requirement/actions';
import { getClientList } from '../../redux/client/actions';
import { getRecruiterList } from '../../redux/recruiter/actions';
import { Row, Col, FormGroup,  Label } from 'reactstrap';
import axios from 'axios';
import { setReq } from '../../redux/req/actions';
import { Multiselect } from "multiselect-react-dropdown";
import * as api from '../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../components/Loader';
import config from '../../helpers/baseurl';

var urlpattern = config.baseUrl;
const AddRequirement = (props) => {
    //const [jidPost, setJid] = useState('1000034');
    const [jclientPost, setJclient] = useState();
    const [jobcodePost, setJobcode] = useState('');
    const [jskillPost, setJskill] = useState('');
    const [jpositionPost, setJposition] = useState('');
    const [jlocationPost, setJlocation] = useState('');
    const [jendclientPost, setJendClient] = useState('');
    const [jtotminPost, setJtoMin] = useState('');
    const [jtotmaxPost, setJtoMax] = useState('');
    const [jrelminPost, setJelMin] = useState('');
    const [jrelmaxPost, setJelMax] = useState('');
    const [jbillratePost, setBillRate] = useState('');
    const [jpayratePost, setPayRate] = useState('');
    const [jpocnoPost, setJpocNo] = useState(0);
    const [jpocPost, setJpoc]=useState('');
    const [jmandatoryskillPost, setJmandatoryskill] = useState('');
    const [jjdPost, setJobDesc] = useState('');
    const [jcreatedbyPost, setJcreatedby] = useState('');
    const [jrequirement_for, setjrequirement_for]=useState('')
    const [jcategoryPost, setJcategory] = useState([]);
    const [jtypePost, setJtype] = useState([]);
    const [jemptypePost, setJemployementtyp] = useState([]);
    //const[loader, setloader]=useState(false)
    //const [jassignuserPost, setJassignuser] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);
    const [loader, setLoader]=useState(false);
    const onSelect=(selectedList, selectedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
    
    const onRemove=(selectedList, removedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }

    // const handleMultiChange = (e) => {
    //     //console.log("console EE", e);
    //     setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    //     //console.log("selected value", selectedValue);
    //   }
    let clientList = useSelector((state) => state.Client.clients || []);
    let recruterList = useSelector((state) => state.Recruiter.recruiters || []);
    ////console.log("recruter", recruterList)
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getClientList());
        dispatch(getRecruiterList());
         // eslint-disable-next-line 
     }, []);
    const handleRequirementForm = (e) => {
        e.preventDefault();
       // setloader(true)
        let commaStr = ''
        // eslint-disable-next-line array-callback-return
        selectedValue.map((item) => {
        commaStr += item + ','
        }) 
        ////console.log(">>>>>", commaStr)
        let reqBody = {
            //jid: jidPost,
            jclientid: parseInt(jclientPost),
            jobcode: jobcodePost,
            jskill: jskillPost,
            jposition: jpositionPost,
            jlocation: jlocationPost,
            jendclient: jendclientPost,
            jtotmin: parseInt(jtotminPost),
            jtotmax: parseInt(jtotmaxPost),
            jrelmin: parseInt(jrelminPost),
            jrelmax: parseInt(jrelmaxPost),
            jbillrate: parseInt(jbillratePost),
            jpayrate: parseInt(jpayratePost),
            jpocno: parseInt(jpocnoPost),
            jpoc:jpocPost,
            jmandatoryskill: jmandatoryskillPost,
            jjd: jjdPost,
            jcategory: jcategoryPost,
            jtype: jtypePost,
            jemployementtyp: jemptypePost,
            jassignuser: commaStr,
            jcreatedby:jcreatedbyPost,
            jrequirement_for:jrequirement_for
        };
        
       //dispatch(setReq(reqBody))
        //cleanForm();
        setLoader(true)
        api.setRequirement(reqBody).then((res)=>{
           // //console.log(res)
            dispatch(setReq(reqBody, res));
            swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
            setLoader(false)
            cleanForm();
           }).catch((err)=>{
            //console.log(err)
            setLoader(false)
            swal('Failed', err.response.data.Message,  "error");
           })
    };

    
    
   
    
    
    const cleanForm = () => {
        //alert();
        setJclient([]);
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
        setSelectedValue('');
        setJcategory([]);
        setJtype([]);
        setJemployementtyp([]);
        setjrequirement_for([])
    };
    
    const [selectRequirementFor] = React.useState([
        { label: 'Inhouse', value: 'Inhouse' },
        { label: 'Client', value: 'Client' },
        { label: 'Both', value: 'Both' }
    ]);
    const [selectCatagory] = React.useState([
        {
            label: 'IT',
            value: 'IT',
        },
        { label: 'NON IT', value: 'NON IT' }
    ]);
    const [selectReqType] = React.useState([
        {
            label: 'DRIVE',
            value: 'DRIVE',
        },
        { label: 'PROCESS', value: 'PROCESS' },
        { label: 'EXCLUSIVE', value: 'EXCLUSIVE' },
    ]);
    const [selectEmpType] = React.useState([
        {
            label: 'CONTRACTUAL',
            value: 'CONTRACTUAL',
        },
        { label: 'PERMANENT', value: 'PERMANENT' },
        { label: 'C2H', value: 'C2H' },
    ]);
    // const recruterList=[
    //     {name: 'EFullname', id: 'Eid'}
    // ]
   const handleClientChange=(e)=>{
     setJclient(e.target.value.trimLeft());
     //(e.target.value.trimLeft())
     var jcid=e.target.value.trimLeft()
     var config = {
        method: 'GET',
        url: `${urlpattern}GenerateJobCode/${jcid}`,   
      };
      axios(config)
      .then(function (response) {
      //  //console.log(JSON.stringify(response.data.Data));
        setJobcode(response.data.Data);
      })
      .catch(function (error) {
        //console.log(error);
      });
    }
   
    return (
        <React.Fragment>
           {loader!==true?  
            <form onSubmit={handleRequirementForm}>            
                <Row>
               
                    <Col lg={4}>
                    
                        {/* <input
                            type="hidden"
                            value="testUi"
                            onChange={(e) => {
                                setJid(e.target.value.trimLeft());
                            }}
                            name="jid"
                        /> */}
                        <input
                            type="hidden"
                            value="testUi"
                            onChange={(e) => {
                                setJcreatedby (e.target.value.trimLeft());
                            }}
                            name="jcreatedby"
                        />
                        <FormGroup>
                            <Label htmlFor="empleadoApellidos">
                                Client <span className="redspan">*</span>
                            </Label>
                            <select
                                className="style-input form-control"
                                name="jclientid"
                                value={jclientPost}
                                required 
                                onChange={(e) => {handleClientChange(e)                                  
                                }}>
                                    <option value="" >Select Client</option>
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
                            <Label>
                                Job Code<span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                disabled
                                className="style-input form-control"
                                value={jobcodePost}
                                onChange={(e) => {
                                    setJobcode(e.target.value.trimLeft());
                                }}
                                name="jobcode"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Main Skill<span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jskillPost}
                                onChange={(e) => {
                                    setJskill(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jskill"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Number of Position <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jpositionPost}
                                onChange={(e) => {
                                    setJposition(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jposition"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Location <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jlocationPost}
                                onChange={(e) => {
                                    setJlocation(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jlocation"
                            />
                            {/* <select
                                required
                                className="style-input form-control"
                                required
                                name="jlocation"
                                onChange={(e) => {
                                    setJlocation(e.target.value.trimLeft());
                                }}>
                                {selectLocation.map((sellocation) => (
                                    <option key={sellocation.value} value={sellocation.value}>
                                        {sellocation.label}
                                    </option>
                                ))}
                            </select> */}
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                End Client <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jendclientPost}
                                onChange={(e) => {
                                    setJendClient(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jendclient"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Total Minimum Experience <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jtotminPost}
                                onChange={(e) => {
                                    setJtoMin(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jtotmin"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Total Maximum Experience <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                value={jtotmaxPost}
                                required
                                onChange={(e) => {
                                    setJtoMax(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jtotmax"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Relevant Minimum Experience <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jrelminPost}
                                onChange={(e) => {
                                    setJelMin(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jrelmin"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Relevant Maximum Experience <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jrelmaxPost}
                                onChange={(e) => {
                                    setJelMax(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jrelmax"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Bill Rate <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jbillratePost}
                                onChange={(e) => {
                                    setBillRate(e.target.value.trimLeft());
                                }}
                                className="style-input form-control"
                                name="jbillrate"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Pay Rate <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jpayratePost}
                                className="style-input form-control"
                                onChange={(e) => {
                                    setPayRate(e.target.value.trimLeft());
                                }}
                                name="jpayrate"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>Select Category</Label>
                            <select
                                className="style-input form-control"
                                name="jcategory"
                                value={jcategoryPost}
                                required
                                onChange={(e) => {
                                    setJcategory(e.target.value.trimLeft());
                                }}>
                                    <option value=""  >Select Category</option>
                                {selectCatagory.map((catagory) => (
                                    <option key={catagory.value} value={catagory.value}>
                                        {catagory.label}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Requirements Type <span className="redspan">*</span>
                            </Label>
                            <select
                                className="style-input form-control"
                                name="jtype"
                                required
                                value={jtypePost}
                                onChange={(e) => {
                                    setJtype(e.target.value.trimLeft());
                                }}>
                                    <option value="" >Select Requirements Type</option>
                                {selectReqType.map((reqtype) => (
                                    <option key={reqtype.value} value={reqtype.value}>
                                        {reqtype.label}
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
                                className="style-input form-control"
                                name="jrequirement_for"
                                required
                                value={jrequirement_for}
                                onChange={(e) => {
                                    setjrequirement_for(e.target.value.trimLeft());
                                }}>
                                    <option value="" >Select Requirements For </option>
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
                            <Label>
                                Type Of Employment <span className="redspan">*</span>
                            </Label>
                            <select
                                className="style-input form-control"
                                name="jemployementtyp"
                                value={jemptypePost}
                                required
                                onChange={(e) => {
                                    setJemployementtyp(e.target.value.trimLeft());
                                }}>
                                    <option value="" >Select type of employment</option>
                                {selectEmpType.map((emptype) => (
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
                                POC Name <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jpocPost}
                                className="style-input form-control"
                                onChange={(e) => {
                                    setJpoc(e.target.value.trimLeft());
                                }}
                                name="jpocno"
                            />
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
                            <Label>
                                Mandatory Skills <span className="redspan">*</span>
                            </Label>
                            <input
                                type="text"
                                required
                                value={jmandatoryskillPost}
                                className="style-input form-control"
                                onChange={(e) => {
                                    setJmandatoryskill(e.target.value.trimLeft());
                                }}
                                name="jmandatoryskill"
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="mt-2">
                    <Col lg={12}>
                        <Label>Description</Label>
                        <textarea
                            className="form-control style-textarea"
                            rows="7"
                            value={jjdPost}
                            onChange={(e) => {
                                setJobDesc(e.target.value.trimLeft());
                            }}
                            name="jjd"></textarea>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col lg={6} className="mb-5">
                        <h5 className="text-uppercase mt-4">Assign To :</h5>
                        <Multiselect
                            options={recruterList}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            name="jassignuser"
                            displayValue="EFullname"
                            showCheckbox={true}
                            />
                    </Col>
                </Row>
                <div className="row">
                    <div className="col-md-12 mt-3 text-right">
                        <button type="submit" className="btn btn-primary mr-2">
                            Submit
                        </button>
                        <button type="button" onClick={cleanForm} className="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </form>
            :
                        <Loader/>
}
        
        </React.Fragment>
    );
};

export default AddRequirement;
