import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as FeatherIcon from 'react-feather';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Link } from 'react-router-dom';
import * as api from './../../../../helpers/restApi'
import CreateProject from '../addproject/CreateProject';
import './viewProject.css'
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import swal from 'sweetalert';
import { ViewPhases } from '../phases/ViewPhases';
import {  useSelector } from "react-redux";


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

const TableWithSearch = (props, { handelPopUp }) => {


    const togglePopup = () => {
        props.handelPopUp('Create Project')
    }
    const { SearchBar } = Search;


    const NoDataIndication = () => (
        <div className="spinner">No records found</div>
    );
    return (

        <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
            {(props) => (
                <React.Fragment>



                    <Row>
                        <Col md={6} className="">
                            <SearchBar {...props.searchProps} />
                        </Col>


                        <Col md={6} className="text-right">
                            <button className="btn btn-primary bg-primary upbtn  mr-0"
                                onClick={() => togglePopup()}>Create New Project</button>
                        </Col>

                    </Row>


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

export const ViewProject = () => {
    const [records, setREcords] = useState([])
    const [modal, setModal] = useState(false)
    const [projectId, setProjectId] = useState()
    const [flag, setFlag] = useState()
    const [action, setAction] = useState()
    const [selectedProjectData, setSelectedProjectData] = useState()
    const [viewPhase, setViewPhase] = useState(false)
    const [editFlag, setEditFlag] = useState(false)
    let loginDetails = useSelector((state) => state.Auth.user || []);


    const handelPopUp = (action, data) => {
        setModal(true)
        setAction(action)
        setSelectedProjectData(data)
    }

    useEffect(() => {
        api.getProjectsList().then((res) => {
            setREcords(res.data.Data)
        })
    }, [flag, editFlag])

    const [delmodal, setDelModal] = useState(false); //delet model
    const toggle = () => setDelModal(!delmodal);

    const onDelete = (row) => {
        setProjectId(row.ProjectId)
        setDelModal(true)

    }

    const onDeleteConfirm = () => {
        setFlag(true)
        api.deleteProject(projectId,loginDetails.EmployeeCode)
            .then((response) => {
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                if (response.data.Status) {
                    setFlag(false)
                    setDelModal(false)
                    localStorage.setItem('flag1', Math.random(0, 100))
                }

            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
            });
    }


    const handelViewPhase = (row) => {
        setViewPhase(true)
        setProjectId(row)
    }



    let columns = [
        {
            dataField: 'ProjectName',
            text: 'Project Name',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },

        {
            dataField: 'IsPhaseCreated',
            text: 'Phase ',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },


        {
            dataField: 'AssignToEmpName',
            text: "Assign To",
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '400px' };
            },
        },
        {
            dataField: 'ProjectStatus',
            text: 'Project Status',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },

        {
            dataField: 'IsActive',
            text: 'Is Active',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
        },



        {
            dataField: 'action',
            text: 'Action',
            events: {},
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '200px' };
            },
            formatter: (cellContent, row) => {
                return (
                    <>


                        <button
                            className="btn btn-link text-secondary"
                            title="View Phases"
                            disabled={!row.IsPhaseCreated}
                            onClick={() => {
                                handelViewPhase(row)
                            }}>
                            <FeatherIcon.Eye />
                        </button>

                        <button
                            className="btn btn-link text-secondary"
                            title="Edit Project"
                            disabled={row.ProjectStatus === "Completed"}
                            onClick={(e) => {
                                setEditFlag(false)
                                handelPopUp('Edit Project', row)
                            }}>
                            <FeatherIcon.Edit />
                        </button>

                        <button
                            className="btn btn-link text-primary"
                            disabled={row.ProjectStatus === "Completed"}
                            onClick={() => {
                                onDelete(row)
                            }
                            }
                            title="Delete Project"
                        >
                            <FeatherIcon.Trash2 />
                        </button>
                    </>
                );
            },
        }

    ];

    return (
        <React.Fragment>
            {!viewPhase ?
                <Row>
                    <CreateProject show={modal} setModel={setModal} action={action} data={selectedProjectData} setEditFlag={setEditFlag}/>
                    <Col>
                        <TableWithSearch records={records} columns={columns} handelPopUp={handelPopUp} />
                    </Col>

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
                </Row> :
                <div>
                    <Row>

                        <Col md={6} >
                            <h3>{projectId.ProjectName + ' ' + "Phases"}</h3>
                        </Col>
                        <Col md={6} className="text-right">
                            <button className="btn btn-primary bg-primary upbtn  mr-0"
                                onClick={() => setViewPhase(false)}>Back To Project List</button>
                        </Col>
                    </Row>
                    <ViewPhases ProjectId={projectId.ProjectId} />
                </div>
            }
        </React.Fragment>
    )
}
