import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row, ModalFooter, Button } from "reactstrap";
import Form from "reactstrap/lib/Form";
import './AddProject.css'
import { getUserList } from "../../../../redux/user/actions";
import * as api from './../../../../helpers/restApi'
import swal from "sweetalert";
import { Link } from "react-router-dom";
import * as FeatherIcon from 'react-feather';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


const CreateProject = (props, row) => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  useEffect(() => {
    dispatch(getUserList())
  }, []);

  let loginDetails = useSelector((state) => state.Auth.user || []);
  let employeeList = useSelector((state) => state.Users.users || []);

  let { show } = props;

  let TaskStatus = [
    { "taskStatus": "Todo" },
    { "taskStatus": "In Progress" },
    { "taskStatus": "Completed" },
  ]

  const [ProjectName, setProjectName] = useState();
  const [isActive, setIsActive] = useState();
  const [projectStatus, setProjectStatus] = useState("Todo");
  const [projectId, setProjectId] = useState(0)
  const ref = useRef(null);
  const [preSelectedValues, setPreSelectedValues] = useState([])
  const [phaseInputFields, setPhaseInputFields] = useState([]);
  const [phasesList, setPhasesList] = useState([]);
  const [isPhaseCreated, setIsPhaseCreated] = useState(false);



  const handleChangeInput = (index, event) => {
    const values = [...phaseInputFields];
    values[index][event.target.name] = event.target.value.trimLeft();
    setPhaseInputFields(values);
  }

  const handleAddFields = () => {
    setPhaseInputFields([...phaseInputFields, { PhaseName: '' }])
  }

  const handleRemoveFields = (index) => {
    const values = [...phaseInputFields];
    values.splice(index, 1);
    setPhaseInputFields(values);
  }


  const [selectedValue1, setSelectedValue1] = useState([]);
  const handleChange = (e) => {
    setSelectedValue1(Array.isArray(e) ? e.map(x => x.ECode) : []);
  }

  const togglePopup = () => {
    props.setModel(false)

    // if (props.action !== "Edit Project") {
    //   handleCleanForm()
    // }
    setPreSelectedValues()
    handleCleanForm()
  }

  useEffect(() => {
    if (props.data) {
      setProjectId(props.data.ProjectId)
      setProjectName(props.data.ProjectName)
      setIsPhaseCreated(props.data.IsPhaseCreated)
      setPhaseInputFields(props.data.Phases)
      setIsActive(props.data.IsActive)
      setProjectStatus(props.data.ProjectStatus)
      setSelectedValue1(props.data.AssignToEmp.split(","))
      setPhasesList(props.data.Phases)
      let selectedValues = []
      employeeList.map((data) => {
        let assignedList = props.data.AssignToEmp.split(",")
        if (assignedList) {
          for (let index = 0; index < assignedList.length; index++) {
            if (assignedList[index]?.toString() === data.ECode?.toString()) {
              selectedValues.push(data)
              // ////console.log(data,"data");
            }

          }
        }
      })

      setPreSelectedValues(selectedValues)
    }
  }, [props.data])





  const handleCleanForm = () => {
    setProjectName('')
    setProjectStatus('')
    setIsActive(false)
    // ref.current.resetSelectedValues();
    setSelectedValue1([]);
    setProjectId(0)
    setPreSelectedValues()
    setPhaseInputFields([])
    setPhasesList([])
  }

  const handelSubmit = e => {
    e.preventDefault();
    let body = {
      ProjectId: projectId,
      ProjectName: ProjectName,
      ProjectStatus: projectStatus,
      IsPhaseCreated: isPhaseCreated,
      AssignToEmp: selectedValue1.join(','),
      IsActive: isActive,
      CreatedBy: loginDetails.EmployeeCode,
      Phases: phaseInputFields
    }
    let isOk = true;
    if (selectedValue1.length === 0) {
      swal('Failed', "Please select employees ", "error")
      isOk = false
    }

    ////console.log(body,"hh")
    if (isOk) {
      api.createProject(body)
        .then((response) => {
          swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
          if (response.data.Status) {
            props.setEditFlag(true)
            togglePopup()
            handleCleanForm();
          }

        })
        .catch(function (error) {
          //  swal("Failed",error.response.data.Message, "error");
        });
    }
  }



  return (
    <div>
      <Modal isOpen={show} size={"md"} toggle={show} className='modal-dialog' >
        <ModalHeader toggle={() => {
          props.setModel(false)
          handleCleanForm()
        }} className='modal-header'>{props.action}</ModalHeader>
        <Form onSubmit={handelSubmit} >
          <ModalBody style={{
            maxHeight: 'calc(100vh - 210px)',
            overflowY: 'auto'
          }}>

            <Row>
              <Col lg={12} >
                <FormGroup>
                  <Label htmlFor="taskDescription">Project Name <span className="redspan">*</span></Label>
                  <Input
                    type="text" required
                    className="form-control "
                    name="desc "
                    value={ProjectName}
                    id="desc "
                    disabled={props.action === "Edit Project"}
                    placeholder="Project name"
                    onChange={(e) => props.action !== "Edit Project" ? setProjectName(e.target.value.trimLeft()) : null}
                  />
                </FormGroup>
              </Col>
            </Row>




            <Row>
              <Col lg={10} className='mt-2  '>
                Phases
              </Col>
              <Col lg={2} className='mt-1'>
                <button
                  className="btn btn-link text-secondary"
                  title="Add Phase(s)"
                  type='button'
                  onClick={() => {
                    handleAddFields()
                  }}>
                  <FeatherIcon.PlusCircle />
                </button>

              </Col>
            </Row>
            <hr />
            <Row >
              {phaseInputFields.map((inputField, index) => (

                <>
                  <Col lg={phasesList.length < index + 1 ? 10 : 4}    >
                    <FormGroup>
                      {/* {phasesList.length<index+1? */}
                      <Label htmlFor="taskDescription">Phase Name {index + 1}</Label>
                      {/* :null} */}
                      <Input
                        required
                        disabled={phasesList.length > index}
                        name="PhaseName"


                        value={inputField.PhaseName}

                        onChange={event => phasesList.length < index + 1 ? handleChangeInput(index, event) : null}
                      />
                    </FormGroup>
                  </Col>
                  {phasesList.length < index + 1 ?
                    <Col lg={2} className='mt-3' key={index + 1}>
                      <FeatherIcon.XCircle className="mt-3 link text-primary"

                        onClick={() => handleRemoveFields(index)}
                      />
                    </Col> : null}

                </>
              ))}
            </Row>
            <Row>


              <Col lg={12}>
                <FormGroup>
                  <Label htmlFor="employee">Employee  <span className="redspan">*</span></Label>

                  <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={preSelectedValues}
                    isMulti
                    ref={ref}
                    getOptionLabel={(option) => option.EFullname}
                    getOptionValue={(option) => option.ECode}
                    options={employeeList}
                    name="EFullname"
                    onChange={handleChange}

                  />
                </FormGroup>
              </Col>

              <Col md={12} >
                <FormGroup>
                  <Label htmlFor="taskstatus">Project Status <span className="redspan">*</span></Label>
                  <select
                    type="text" required
                    className="form-control"
                    id="projectstatus"
                    name="projectstatus"
                    value={projectStatus}
                    onChange={(e) => { setProjectStatus(e.target.value) }}
                  >
                    <option value="">Select Project Status</option>
                    {TaskStatus.map((task, i) => (
                      <option key={i++} value={task.taskStatus}>
                        {task.taskStatus}
                      </option>
                    ))}
                  </select>
                </FormGroup>
              </Col>

              <Col md={12} className=''>
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" className='checkbox mb-2'
                      checked={isActive}
                      value={isActive}
                      onChange={() => { setIsActive(!isActive) }} />{' '}

                  </Label>
                </FormGroup><span className="checkbox-text"> Is Active</span>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className={"add-button-align"}>
            <Button type='submit' color="primary" className='add-model-btn' >
              {props.action === "Edit Project" ? 'Save' : 'Submit'}</Button>
            <Button color="secondary" className='add-model-btn' type="button" onClick={() => togglePopup()} >Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default CreateProject;