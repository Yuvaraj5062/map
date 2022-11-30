import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Input, Label, Form, Modal, ModalBody, ModalHeader, Row, ModalFooter, Button } from "reactstrap";
import { useSelector } from 'react-redux';
import * as api from './../../../../helpers/restApi'
import swal from 'sweetalert';
import moment from 'moment'

export const EditTask = (props) => {

    let loginDetails = useSelector((state) => state.Auth.user || []);
    const [project, setProject] = useState()
    const [projectName, setProjectName] = useState();
    const [date, setDate] = useState()
    const [taskDesc, setTaskDesc] = useState()
    const [taskStatus, setTaskStatus] = useState()
    const [taskTimeHours, setTaskTimeHours] = useState("00")
    const [taskTimeMinutes, setTaskTimeMinutes] = useState("00")
    const [projectList, setProjectList] = useState([])
    const [taskId, setTaskId] = useState(0)
    const [moduleName, setModuleName] = useState()
    const [phaseName, setPhaseName] = useState()
const [phaseId, setPhaseId] = useState()
const [projectCreatedDate,setProjectCreatedDate]=useState('')

    useEffect(() => {
        if (props.data) {
            let time = props.data.TimeSpent.split(':')
            setProjectCreatedDate(props.data.ProjectCreatedDate)
            setProject(props.data.ProjectId)
            setProjectName(props.data.ProjectName)
            setModuleName(props.data.TaskModule)
            setDate(moment(props.data.SubmitDate).format('YYYY-MM-DD'))
            setTaskTimeHours(time[0])
            setTaskTimeMinutes(time[1])
            setTaskId(props.data.TaskId)
            setTaskDesc(props.data.TaskDesc)
            setTaskStatus(props.data.TaskStatus)
            setPhaseId(props.data.PhaseId)
            setPhaseName(props.data.PhaseName)
            
            
        }
    }, [props.data])


    const [minutes, setMinutes] = useState([
        { "minute": "00" },
        { "minute": "05" },
        { "minute": 10 },
        { "minute": 15 },
        { "minute": 20 },
        { "minute": 25 },
        { "minute": 30 },
        { "minute": 35 },
        { "minute": 40 },
        { "minute": 45 },
        { "minute": 50 },
        { "minute": 55 },
    ])
    const [hours, setHours] = useState([
        { "hour": "00" },
        { "hour": "01" },
        { "hour": "02" },
        { "hour": "03" },
        { "hour": "04" },
        { "hour": "05" },
        { "hour": "06" },
        { "hour": "07" },
        { "hour": "08" },

    ])


    useEffect(() => {
        if (loginDetails.Role === "Manager") {
            api.getProjectList().then((res) => {
                setProjectList(res.data.Data)
            })
        }
        else {
            api.getAssignedProjectList(loginDetails.EmployeeCode).then((res) => {
                setProjectList(res.data.Data)
            })
        }

    }, [])

    /**
     * @type {array of object}
     * @returns list of task status 
    */
    let TaskStatus = [
        { "taskStatus": "Todo" },
        { "taskStatus": "In Progress" },
        { "taskStatus": "Done" },
    ]


    /**
* @type {function}
* @returns null
* @description clean form data 
*/

    const handelCleanForm = () => {
        setProject('')
        setDate('')
        setTaskDesc('')
        setTaskStatus('')
        setTaskTimeHours('')
        setTaskTimeMinutes('')

    }

    /**
 * @type {function}
 * @returns null
 * @description function for crate task (post api call) 
 
*/
    const handleSubmit = e => {
        e.preventDefault();
        let isOk=true
        let body = {
            ProjectId: project,
            TaskId: taskId,
            PhaseId:phaseId,
            SubmitDate: date,
            TaskModule: moduleName,
            TaskDesc: taskDesc,
            TaskStatus: taskStatus,
            TimeSpent: taskTimeHours + ":" + taskTimeMinutes,
            IsActive: true,
            CreatedBy: loginDetails.EmployeeCode,
        }
        if(taskTimeMinutes==="00"&&taskTimeHours==="00"){
            swal("Failed","Please select min 5 minutes ","error")
            isOk=false
        }

       if(isOk)
       {

        api.addDailyTask(body)
            .then((response) => {
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                if (response.data.Status) {
                    handelCleanForm()
                  props.setEditFlag(true)
                    togglePopup()
                }



            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
                   });
           }    }
    let { show } = props;
    const togglePopup = () => {
        props.setModel(false)
        // handleCleanForm()
    }


    
    return (
        <Modal isOpen={show} size={"md"} toggle={show} >
            <ModalHeader toggle={() => props.setModel(false)} className='modal-header'>Edit Task</ModalHeader>
            <Form onSubmit={handleSubmit} >
                <ModalBody style={{
                    maxHeight: 'calc(100vh - 210px)',
                    overflowY: 'auto'
                }}>

                    <Row className='mt-3'>
                        <Col lg={12}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="projectlist">Project <span className="redspan">*</span></Label>
                                <Input
                                    type="text" required
                                    className="style-input form-control"
                                    id="project"
                                    name="project"
                                    value={projectName}
                                    disabled
                                // onChange={(e) => {
                                //     setProject(e.target.value)
                                // }}
                                >
                                    {/* <option value="">Select Project</option>
                                    {projectList.map((projects, i) => (
                                        <option key={i++} value={projects.ProjectId}>
                                            {projects.ProjectName}
                                        </option> 
                                    ))} */}
                                </Input>
                            </FormGroup>
                        </Col>


                        <Col lg={12} >
                            <FormGroup>
                                <Label htmlFor="module">Phase  <span className="redspan">*</span></Label>
                                <Input
                                  disabled
                                    value={phaseName?phaseName:'---'}
                                   

                                />
                            </FormGroup>
                        </Col>

                        <Col lg={12} >
                            <FormGroup>
                                <Label htmlFor="module">Module  <span className="redspan">*</span></Label>
                                <Input
                                    type="text" required
                                    className="style-input form-control"
                                    name="module "
                                    value={moduleName}
                                    id="module "

                                    placeholder="Enter module name"
                                    onChange={(e) => { setModuleName(e.target.value.trimLeft()) }}

                                />
                            </FormGroup>
                        </Col>

                        <Col lg={12}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="empleadoApellidos">Date <span className="redspan">*</span></Label>
                                <Input
                                    type="date" required
                                    className="style-input"
                                    name="date"
                                    id="date "
                                    onKeyDown={(e) => e.preventDefault()}
                                    min={projectCreatedDate && moment(new Date(projectCreatedDate)).format("YYYY-MM-DD")}   
                                    max={moment(new Date()).format("YYYY-MM-DD")} 
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                    }}
                                />
                            </FormGroup>
                        </Col>


                        <Col md={12}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="taskstatus">Task Status <span className="redspan">*</span></Label>
                                <select
                                    type="text" required
                                    className="style-input form-control"
                                    id="taskstatus"
                                    name="taskstatus"
                                    value={taskStatus}
                                    onChange={(e) => {
                                        setTaskStatus(e.target.value)
                                    }}>
                                    <option value="">Select Task Status</option>
                                    {TaskStatus.map((task, i) => (
                                        <option key={i++} value={task.taskStatus}>
                                            {task.taskStatus}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >

                        <Col lg={12}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="taskDescription">Task Description <span className="redspan">*</span></Label>
                                <Input
                                    type='textarea' required
                                    className="style-input"
                                    name="desc "
                                    id="desc "
                                    placeholder="Add task description"
                                    value={taskDesc}
                                    onChange={(e) => {
                                        setTaskDesc(e.target.value.trimLeft())
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col lg={6}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="taskTimeHours">Time Spent (Hours)  </Label>
                                <select
                                    className="style-input form-control"
                                    id="taskTimeHours"
                                    name="taskTimeHours"
                                    value={taskTimeHours}
                                    onChange={(e) => {
                                        setTaskTimeHours(e.target.value)

                                    }}>
                                    <option value="">Select Hours</option>
                                    {hours.map((time, i) => (
                                        <option key={i++} value={time.hour}>
                                            {time.hour}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>


                        <Col lg={6}>
                            <FormGroup className='mt-2'>
                                <Label htmlFor="taskTimeMinutes">Time Spent (Minutes) </Label>
                                <select
                                    type="text"
                                    className="style-input form-control"
                                    id="taskTimeMinutes"
                                    name="taskTimeMinutes"
                                    value={taskTimeMinutes}

                                    onChange={(e) => {
                                        setTaskTimeMinutes(e.target.value)
                                    }}>
                                    <option value="">Select Minutes</option>
                                    <>
                                        {minutes.map((minute, i) => (
                                            <option key={i++} value={minute.minute}>
                                                {minute.minute}
                                            </option>
                                        ))}
                                    </>


                                </select>
                            </FormGroup>
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter className={"add-button-align"}>
                    <Button type='submit' color="primary" className='add-model-btn' >
                        Save</Button>
                    <Button color="secondary" className='add-model-btn' type="button" onClick={() => togglePopup()} >Cancel</Button>
                </ModalFooter>
            </Form>

        </Modal>
    )
}
