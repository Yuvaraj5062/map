import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, FormGroup, Form, Label, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { getRecruiterList } from "../../../redux/recruiter/actions";
import { getTeamLeadList } from "../../../redux/teamLead/actions";
import * as actions from '../../../redux/teammaster/actions'
import { Multiselect } from "multiselect-react-dropdown";

const EditTeamModal = (props, row) => {
  const {
    //buttonLabel,
    className,
  } = props;

  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Teams.modal);
  const teamStore = useSelector((state) => state.Teams.team|| []);
  let loginDetails = useSelector((state)=> state.Auth.user || []);
    let recruterList = useSelector((state) => state.Recruiter.recruiters || []);
    let teamLeadList = useSelector((state) => state.TeamLead.teamlead || []);
    ////console.log("recruter", recruterList)
    var getUsername = loginDetails.Username;
    const [createdby, setCreatedby]=useState(getUsername);
    const [teamlead, setTeamlead]=useState('');
    const [teammember, setSelectedValue]=useState('');
    const [preSelectedValues, setPreSelectedValues] = useState()
    const onSelect=(selectedList, selectedItem)=> {
     // //console.log("Selected Values", teammember)
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
  
    const onRemove=(selectedList, removedItem)=> {
        setSelectedValue(selectedList.map(x=>x.EFullname));
    }
     useEffect(() => {
        dispatch(getRecruiterList());
        dispatch(getTeamLeadList());
         // eslint-disable-next-line 
     }, []);

  const toggle = () => {
    if (!modal) {
      dispatch(actions.getTeamModal()); 
    } else {
      dispatch(actions.hideTeamModal());
    }
  }

  useEffect(() => {
    if(teamStore !== null && teamStore !== undefined && teamStore.teammember !== undefined){
      setTeamlead(teamStore.teamlead)
      if(teamStore.teammember.includes(',')){
        let teamMembers = teamStore.teammember.split(",")
        setSelectedValue(teamMembers)
        // eslint-disable-next-line array-callback-return
        setPreSelectedValues(recruterList.filter((item) => {
          if(teamMembers.includes(item.EFullname)){
            return item
          }
        }))
      }else{
        let teamMembers = [teamStore.teammember]
        setSelectedValue(teamMembers)
        // eslint-disable-next-line array-callback-return
        setPreSelectedValues(recruterList.filter((item) => {
          if(teamMembers.includes(item.EFullname)){
            return item
          }
        }))
      }
    }
  },[recruterList, teamStore])

  const handleUpdate = (e) => {
    e.preventDefault();
      const reqBody ={
        "tid": teamStore.tid,
        createdby:createdby,
        teamlead:teamlead,
        teammember:teammember.join()
      }
      dispatch(actions.updateTeam(reqBody));
  }

  return(
    <div>
      <Modal isOpen={modal} size={"md"} toggle={toggle} className={` ${className} 'modal-lg' `}>
        <ModalHeader toggle={toggle}>Update Team</ModalHeader>
        <ModalBody style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
          <Form onSubmit={handleUpdate}>
            <Row>
                  <Col lg={12}>
                    <FormGroup>
                      <input type="hidden" name="createdby" id="createdby" 
                          onChange={(e) => {
                              setCreatedby (e.target.value);
                          }}value={getUsername} />
                      <Label htmlFor="empleadoApellidos"> Team Lead</Label>
                        
                      <select className="form-control" name="teamlead"
                      id="teamlead" value={teamlead}
                      required  
                      onChange={(e) => {
                          setTeamlead(e.target.value);
                      }}>
                        <option value="">Select</option>
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
                              selectedValues={preSelectedValues}
                              onSelect={onSelect}
                              onRemove={onRemove}
                              required
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
                        <button type="submit" disabled={!teamlead || teammember.length===0 } className="btn btn-primary">Submit</button>
                        <button type="button"  onClick={toggle} className="btn btn-secondary ml-3">Cancel</button>
                        </Col>
                    </Row>                       
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditTeamModal;