
import React, { useEffect, useState } from 'react'
import { Row, Col, FormGroup, Form, Label, Input } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as api from './../../../../helpers/restApi'
import swal from 'sweetalert';
import moment from 'moment'


export const CreateTask = () => {

    let loginDetails = useSelector((state) => state.Auth.user || []);
    const [project, setProject] = useState()
    const [date, setDate] = useState('')
    const [taskDesc, setTaskDesc] = useState()
    const [taskStatus, setTaskStatus] = useState()
    const [taskTimeHours, setTaskTimeHours] = useState('00')
    const [taskTimeMinutes, setTaskTimeMinutes] = useState('00')
    const [projectList, setProjectList] = useState([])
    const [moduleName, setModuleName] = useState()
    const [activePhase,setActivePhase]=useState('')
    const [projectCreatedDate,setProjectCreatedDate]=useState('')
    const [phaseId, setPhaseId] = useState()
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

    // const handelTimeHourse=(time)=>{
    //     setTaskTimeHours(time)
    //     if(time==="00"){
    //         setMinutes( [
    //             { "minute": "05" },
    //             { "minute": 10 },
    //             { "minute": 15 },
    //             { "minute": 20 },
    //             { "minute": 25 },
    //             { "minute": 30 },
    //             { "minute": 35 },
    //             { "minute": 40 },
    //             { "minute": 45 },
    //             { "minute": 50 },
    //             { "minute": 55 },
    //         ])
    //     }else{
    //         setMinutes([
    //             { "minute": "00" },
    //             { "minute": "05" },
    //             { "minute": 10 },
    //             { "minute": 15 },
    //             { "minute": 20 },
    //             { "minute": 25 },
    //             { "minute": 30 },
    //             { "minute": 35 },
    //             { "minute": 40 },
    //             { "minute": 45 },
    //             { "minute": 50 },
    //             { "minute": 55 },
    //         ])
    //     }
    // }

    let data = localStorage.getItem("flag1")
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

    }, [data])

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
        setTaskTimeHours('00')
        setTaskTimeMinutes('00')
        setModuleName('')
        setActivePhase('')
        setProjectCreatedDate('')

    }

    /**
 * @type {function}
 * @returns null
 * @description function for crate task (post api call) 
 
*/
    const handleSubmit = e => {
        e.preventDefault();
        let body = {
            ProjectId: project,
            SubmitDate: date,
            TaskDesc: taskDesc,
            PhaseId:phaseId,
            TaskModule: moduleName,
            TaskStatus: taskStatus,
            TimeSpent:!taskTimeMinutes? taskTimeHours + ":" + "00":taskTimeHours + ":" + taskTimeMinutes,
            IsActive: true,
            CreatedBy: loginDetails.EmployeeCode,
        }

        let isOk=true
        if(!date){
            swal("Failed","Please select date ","error")
            isOk=false
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
                localStorage.setItem('addFlag', Math.random(0, 100))
            }

        })
        .catch(function (error) {
            swal("Failed", error.response.data.Message, "error");
        });
}

       }

       const handelGetActivePhase=(ProjectId)=>{
           setActivePhase('---')
           setProjectCreatedDate('')
        setDate(moment(new Date()).format("YYYY-MM-DD"))
           api.getActivePhase(ProjectId)
           .then((response) => {
               if(response.data.Data){
               // //console.log(response.data.Data,response.data.Data.CreatedDate)
               setActivePhase(response.data.Data.Phase?.PhaseName)
               setProjectCreatedDate(response.data.Data.CreatedDate)
               setPhaseId(response.data.Data.Phase?.PhaseId)
              //setDate('')
            }  
           })
           
       }

    return (
        <React.Fragment>
            <Form onSubmit={handleSubmit} >
                <Row className='mt-3'>
                    <Col lg={4}>
                        <FormGroup>
                            <Label htmlFor="projectlist">Project <span className="redspan">*</span></Label>
                            <select
                                type="text" required
                                className="style-input form-control"
                                id="project"
                                name="project"
                                value={project}
                                onChange={(e) => {
                                    setProject(e.target.value)
                                    handelGetActivePhase(e.target.value)
                                }}>
                                <option value="">Select Project</option>
                                {projectList?projectList.map((projects, i) => (
                                   projects.IsActive && projects.ProjectStatus!=='Completed'?
                                    <option key={i++} value={projects.ProjectId}>
                                        {projects.ProjectName}
                                    </option>:null
                                    
                                )):null}
                            </select>
                        </FormGroup>
                    </Col>


                    <Col lg={4} >
                        <FormGroup>
                            <Label htmlFor="Phase">Phase </Label>
                            <Input
                                type="text"
                                disabled 
                                style={ { backgroundColor: "#D3D3D3" } }
                                className="style-input form-control "
                                name="Phase "
                                value={activePhase}
                            />
                        </FormGroup>
                    </Col>

                    <Col lg={4} >
                        <FormGroup>
                            <Label htmlFor="module">Module  <span className="redspan">*</span></Label>
                            <Input
                                type="text" required
                                className="style-input form-control"
                                name="module "
                                value={moduleName}
                                id="module "

                                placeholder="Module name"
                                onChange={(e) => { setModuleName(e.target.value.trimLeft()) }}

                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className='mt-4'>
                   
                <Col lg={4}>
               
                        <FormGroup>
                            <Label htmlFor="date">Date <span className="redspan">*</span></Label>
                            <Input
                                type="date" 
                                className="style-input"
                                onKeyDown={(e) => e.preventDefault()}  //
                                min={projectCreatedDate && moment(new Date(projectCreatedDate)).format("YYYY-MM-DD")}   
                                max={moment(new Date()).format("YYYY-MM-DD")}    
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value)
                                }}
                            />
                            
                        </FormGroup>
                    </Col>
                    <Col lg={4}>
                        <FormGroup>
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


         


                    {/* <Col lg={4}>
                        <FormGroup>
                            <Label htmlFor="taskDescription">Time Spent <span className="redspan">*</span></Label>
                            <Input
                                type="time" required
                                className="style-input"
                                min="00:30" max="08:00"
                                name="time "
                                value={taskTime}
                                onChange={(e) => {
                                    setTaskTime(e.target.value)
                                }}
                            />
                        </FormGroup>
                    </Col> */}

                    <Col lg={2}>
                        <FormGroup>
                            <Label htmlFor="taskTimeHours">Time Spent (Hours)  </Label>
                            <select
                                type="text"
                                className="style-input form-control"
                                id="taskTimeHours"
                                name="taskTimeHours"
                                value={taskTimeHours}
                                onChange={(e) => {
                                    setTaskTimeHours(e.target.value)

                                }}>
                                <option value=" ">Select Hours</option>
                                {hours.map((time, i) => (
                                    <option key={i++} value={time.hour}>
                                        {time.hour}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>


                    <Col lg={2}>
                        <FormGroup>
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

                                {minutes.map((minute, i) => (
                                    <option key={i++} value={minute.minute}>
                                        {minute.minute}
                                    </option>
                                ))}

                            </select>
                        </FormGroup>
                    </Col>


                    <Col lg={4} className='mt-4'>
                        <FormGroup>
                            <Label htmlFor="taskDesc">Task Description <span className="redspan">*</span></Label>
                            <Input
                                type="textarea" required
                                className="style-input form-control"
                                name="taskDesc "
                                value={taskDesc}
                                id="taskDesc "

                                placeholder="Task Description"
                                onChange={(e) => { setTaskDesc(e.target.value.trimLeft()) }}
                            />
                        </FormGroup>
                    </Col>

                </Row>

                <Row className='mt-4'>
                    <Col lg={2}>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 ">
                            Submit
                        </button>
                    </Col>

                    <Col lg={2}>
                        <button type="button" onClick={() => {
                            handelCleanForm()
                        }}
                            className="btn btn-secondary w-100">
                            Reset
                        </button>
                    </Col>

                </Row>
            </Form>
        </React.Fragment>
    )
}
