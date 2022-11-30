import React, { useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label} from 'reactstrap';
import { getRecruiterList } from '../../../redux/recruiter/actions';
import { getTeamLeadList } from '../../../redux/teamLead/actions';
import { Multiselect } from "multiselect-react-dropdown";
//import moment from 'moment';
import { createTeam } from '../../../redux/teammaster/actions';
//import api from '../../../helpers/axios';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
// import Select from 'react-select';
const AddTeam = () => {
    //const [selectedValue, setSelectedValue] = useState([]);
    //var currentTime = moment().format('DD/MM/YYYY HH:mm'); 

    //console.log(recruterList,"recruterList")
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    let recruterList = useSelector((state) => state.Recruiter.recruiters || []);
    let teamLeadList = useSelector((state) => state.TeamLead.teamlead || []);
    ////console.log("recruter", recruterList)
    var getUsername = loginDetails.Username;
    const [createdby, setCreatedby]=useState(getUsername);
    const [teamlead, setTeamlead]=useState('');
    const [teammember, setSelectedValue]=useState([]);
    const ref = useRef(null);
    const onSelect=(selectedList, selectedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
  
    const onRemove=(selectedList, removedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
    
    const dispatch = useDispatch();
     useEffect(() => {
        dispatch(getRecruiterList());
        dispatch(getTeamLeadList());
         // eslint-disable-next-line 
     }, []);
     const handleSubmit=(e)=>{
        e.preventDefault();
        //var newteam =teammember;
       // var teammemberlist = newteam.replace(/[\])}[{(]/g, '');
       const reqBody ={
        createdby:createdby,
        teamlead:teamlead,
        teammember:teammember.join()
       }
      // dispatch(createTeam(reqBody));
       api.setTeam(reqBody).then((res)=>{
       // //console.log(res)
        dispatch(createTeam(reqBody, res));
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        cleanForm();
       }).catch((err)=>{
        //console.log(err)
        swal('Failed', err.response.data.Message,  "error");
       })
      
     }
    const cleanForm=()=>{
        setTeamlead([])
        ref.current.resetSelectedValues();
        setSelectedValue([]);
    }
    return (
        <React.Fragment>
            
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col className="col-md-6 offset-md-3">
                        <div className="card p-5" style={{height:'600px'}}>
                        <h5 className="text-uppercase  text-center">Create Team</h5>
                    <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <input type="hidden" name="createdby" id="createdby" 
                                        onChange={(e) => {
                                            setCreatedby (e.target.value);
                                        }}value={getUsername} />
                                    <Label htmlFor="empleadoApellidos"> Team Lead</Label>
                                   
                                    <select className="form-control" name="teamlead"
                                    id="teamlead" value={teamlead} onChange={(e) => {
                                        setTeamlead (e.target.value);
                                    }}>
                                         <option value=''>Select Team Lead</option>
                                   
                                    {teamLeadList.map((teamLead,i) => (
                                    <option key={i++} value={teamLead.EFullname}>
                                        {teamLead.EFullname}
                                    </option>
                                ))}
                                    </select>
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                <Label htmlFor="empleadoApellidos"> Team Member</Label>
                                <Multiselect
                            options={recruterList}
                            onSelect={onSelect}
                            onRemove={onRemove}
                            
                            ref={ref}
                            name="teammember"
                            displayValue="EFullname"
                            showCheckbox={true}
                            />   
                                {/* {recruterList.map((recruter, i, index) => (
                            <div className="form-check mt-1">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        key={i ++}
                                        className="form-check-input"
                                        onClick={logToConsole}
                                        value={recruter.Eid}
                                    />
                                    {recruter.EFullname}
                                </label>
                            </div>
                        ))}  */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                        <Col lg={12}>
                            <button type="submit"  disabled={!teamlead || teammember.length===0} className="btn btn-primary">Submit</button>
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

export default AddTeam;


