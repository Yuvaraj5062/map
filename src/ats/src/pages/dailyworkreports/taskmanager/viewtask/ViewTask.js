
import React, { useState, useEffect } from 'react'
import { Row, Col, FormGroup, Button, Label, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as FeatherIcon from 'react-feather';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from 'react-router-dom';
import * as api from './../../../../helpers/restApi'
import { useDispatch, useSelector } from "react-redux";
import { getUserList } from '../../../../redux/user/actions';
import moment from 'moment'
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import swal from 'sweetalert';
import { EditTask } from '../edittask/EditTask';


const defaultSorted = [
    {
        // dataField: 'id',
        // order: 'asc',
    },
];

const sizePerPageRenderer = ({ options, currSizePerPage, onSizePerPageChange }) => (
    <React.Fragment>
        <label className="d-inline mr-1">Show</label>
        <Input
            type="select"
            name="select"
            id="no-entries"
            className="custom-select custom-select-sm d-inline col-2"
            defaultValue={currSizePerPage}
            onChange={(e) => onSizePerPageChange(e.target.value)}>
            {options.map((option, idx) => {
                return <option key={idx}>{option.text}</option>;
            })}
        </Input>
        <label className="d-inline ml-1">Entry</label>
    </React.Fragment>
);

const TableWithSearch = (props) => {
    const { SearchBar } = Search;


    const NoDataIndication = () => (
        <div className="spinner">No records found        </div>
    );
    return (

        <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
            {(props) => (
                <React.Fragment>
                    <BootstrapTable
                        wrapperClasses="table-responsive"
                        {...props.baseProps}
                        bordered={false}
                        defaultSorted={defaultSorted}
                        // rowEvents={rowEvent}
                        noDataIndication={() => <NoDataIndication />}
                        pagination={
                            paginationFactory(
                                {
                                    sizePerPage: 10,
                                    sizePerPageRenderer: sizePerPageRenderer,
                                    sizePerPageList: [
                                        { text: '10', value: 10, },
                                        { text: '20', value: 20 },
                                        { text: '50', value: 50 },
                                        //{ text: 'Todos', value: (props.records ? props.records.length : 0) }
                                    ]
                                }
                            )
                        }

                    />
                </React.Fragment>
            )}
        </ToolkitProvider>
    );
};


export const ViewTask = () => {

    const [records, setREcords] = useState([])
    const [projectList, setProjectList] = useState([])
    const [project, setProject] = useState(0)
    const [startDate, setStartDate] = useState(0)
    const [endDate, setEndDate] = useState(0)
    const [employee, setEmployee] = useState(0)
    const [taskId, setTaskIs] = useState(0)
    const [flag, setFlag] = useState()
    const [phasesList, setPhasesList] = useState([])
    const [phase, setPhase] = useState(0)
    const [editFlag, setEditFlag] = useState(false)

    
    let loginDetails = useSelector((state) => state.Auth.user || []);

    let employeeList = useSelector((state) => state.Users.users || []);

    const [selectedTaskData, setSelectedTaskData] = useState()
    const [modal, setModal] = useState(false)


    const handelPopUp = (data) => {
        setModal(true)
        setSelectedTaskData(data)
        setEditFlag(false)
    }


    let data = {
        TaskId: 0,
        startDate: startDate ? moment(startDate).format("DD-MMM-yyyy") : startDate,
        endDate: endDate ? moment(endDate).format("DD-MMM-yyyy") : endDate,
        ProjectId: project, 
        PhaseId:phase,
        UserId: loginDetails.Role === 'Manager' ? employee : loginDetails.EmployeeCode
    }

    // useEffect(() => {
    //     api.getProjectList().then((res) => {
    //         setProjectList(res.data.Data)
    //     })


    // }, [])


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

   let added= localStorage.getItem('addFlag')
    useEffect(() => {
        api.getDailyWorkProgress(data).then((res) => {
            setREcords(res.data.Data)
        })
    }, [flag,editFlag,added])


    const getFilteredData = () => {
      setFlag(!flag)
    }

    const clearFilter = () => {
        setProject(0)
        setStartDate(0)
        setEndDate(0)
        setEmployee(0)
        setPhase(0)
        getFilteredData();
        setPhasesList([])
    }




    const [delmodal, setDelModal] = useState(false); //delet model
    const toggle = () => setDelModal(!delmodal);


    const onDelete = (row) => {
        setTaskIs(row.TaskId)
        setDelModal(true)
    }

    const onDeleteConfirm = () => {
        setFlag(true)
        api.deleteTask(taskId,loginDetails.EmployeeCode)
            .then((response) => {
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                if (response.data.Status) {
                    setFlag(false)
                    setDelModal(false)

                }

            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
            });
    }

    const dispatch = useDispatch();
    //Get all users lists
    useEffect(() => {
        dispatch(getUserList());
    }, []);



    const handelGetPhaseList=(ProjectId)=>{
        api.getProjectPhaseList(ProjectId)
        .then((response) => {
            if(response.data.Data){
                setPhasesList(response.data.Data)
         
         }  
        })
        
    }


    let columns = [
        {
            dataField: 'ProjectName',
            text: 'Project Name',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
        },

        {
            dataField: 'PhaseName',
            text: 'Phase',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
        },

        

        {
            dataField: 'TaskModule',
            text: 'Module',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },
        

   

        

        {
            dataField: 'SubmitDate',
            text: "Date",
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
            formatter: (cellContent, row) => {
                var date = moment(row.SubmitDate);
                return (
                    <label>{date.format('DD-MM-yyyy')}</label>

                )
            },
        },

        {
            dataField: 'TaskDesc',
            text: "Task Description",
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '300px' };
            },
        },
        {
            dataField: 'TaskStatus',
            text: 'Task Status',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },

        {
            dataField: 'TimeSpent',
            text: 'Time Spent',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },
        
      
      loginDetails.Role === 'Manager'&&
        {

        dataField: 'FullName',
            text: 'Employee Name ',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
        },
        

        {
            dataField: 'action',
            text: 'Action',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
            formatter: (cellContent, row) => {
                return (
                    <>

                    
<button
                            className="btn btn-link text-secondary"
                            title="Edit Task"
                            disabled={loginDetails.Role !== 'Manager' ? moment(row.CreatedDate).format("DD-MM-yyyy") !== (moment(new Date).format("DD-MM-yyyy")) : false}
                            onClick={() => { handelPopUp(row) }}>
                    
                  
                            <span className='ml-40 '>  <FeatherIcon.Edit /></span>
                        </button>
                        <Button
                            title="Delete Task"
                            color='link'
                            onClick={() => { onDelete(row) }}
                        >
                            <span className='mr-40 '>   <FeatherIcon.Trash2 /></span>
                        </Button>

                    </>
                );
            },
        }

    ];

    return (
        <React.Fragment>
            <Row className='bg-white pt-3 pb-3 mb-3'>
               
                    <Col >
                        <FormGroup>
                            <Label htmlFor="projectlist">Project</Label>
                            <select
                                type="text" 
                                className="style-input form-control"
                                id="project"
                                name="project"
                                value={project}
                                onChange={(e) => {
                                    setProject(e.target.value)
                                    handelGetPhaseList(e.target.value)
                                }}>
                                <option value="">Select Project</option>
                                {projectList?projectList.map((projects, i) => (
                                    <option key={i++} value={projects.ProjectId}>
                                        {projects.ProjectName}
                                    </option>
                                )):null}
                            </select>
                        </FormGroup>
                    </Col>

                    
                    <Col >
                        <FormGroup>
                            <Label htmlFor="Phase">Phase </Label>
                            <select
                                type="text" 
                                className="style-input form-control"
                                id="Phase"
                                name="Phase"
                                value={phase}
                                onChange={(e) => {
                                    setPhase(e.target.value)
                                }}>
                                <option value="">Select Phase</option>
                                {phasesList.length>0?phasesList[0].Phases.map((phases, i) => (
                                    <option key={i++} value={phases.PhaseId}>
                                        {phases.PhaseName}
                                    </option>
                                )):null}
                            </select>
                        </FormGroup>
                    </Col>


                    {loginDetails.Role === 'Manager' &&
                    <Col lg={2}>
                        <FormGroup>
                            <Label htmlFor="employee">Employee </Label>
                            <select
                                type="text" 
                                className="style-input form-control"
                                id="emp"
                                name="emp"
                                value={employee}
                                onChange={(e) => {
                                    setEmployee(e.target.value)
                                }}>
                                <option value="">Select Employee</option>
                                {employeeList.map((employee, i) => (
                                    <option key={i++} value={employee.ECode}>
                                        {employee.EFullname}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                    </Col>
                }


                <Col >
                    <FormGroup>
                        <Label htmlFor="empleadoApellidos">Start Date </Label>
                        <Input
                            type="date" 
                            className="style-input"
                            name="date"
                            id="date "
                            value={startDate}
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={(e) => {
                                setEndDate('')
                                setStartDate(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Col>

                <Col >
                    <FormGroup>
                        <Label htmlFor="empleadoApellidos">End Date </Label>
                        <Input
                            type="date" 
                            className="style-input"
                            onKeyDown={(e) => e.preventDefault()}
                            min={startDate}
                            name="date"
                            id="date "
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value)
                            }}
                        />
                    </FormGroup>
                </Col>

    
                <Col  className='mt-2'>
                    <button className='btn btn-primary w-100 mt-4'
                        onClick={() => {
                            getFilteredData()
                        }}
                    >Search</button>
                </Col>
                <Col  className='mt-2'>
                    <button className='btn btn-primary w-100 mt-4'
                        onClick={() => { clearFilter() }}>Clear</button>
                </Col>
            </Row>


            <Modal isOpen={delmodal} toggle={toggle} className='p-5 model-margin-top' >
                <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
                <ModalBody className='text-center'>
                    Are you sure you want to delete this record?

                </ModalBody>
                <ModalFooter className={"button-align"}>
                    <Button color="primary" className='model-btn' onClick={onDeleteConfirm}>Confirm</Button>
                    <Button color="secondary" className='model-btn' onClick={() => { setDelModal(false) }}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>

            <Row> <EditTask show={modal} setModel={setModal} data={selectedTaskData} setEditFlag={setEditFlag}/></Row>
        </React.Fragment>
    )
}
