import React, { useState, useEffect } from 'react'
import { Row, Col, Input, Button, Label, Form, FormGroup } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as api from './../../../../helpers/restApi'
import moment from 'moment';
import * as FeatherIcon from 'react-feather';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import swal from 'sweetalert';


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

export const ViewPhases = (props) => {
    const [records, setREcords] = useState([])
    const [phaseStatus, setPhaseStatus] = useState();
    const [phaseName, setPhaseName] = useState();
    const [selectedPhaseData, setSelectedPhaseData] = useState([])
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        api.getProjectPhaseList(props.ProjectId).then((res) => {
            setREcords(res.data.Data[0].Phases)
        })
    }, [flag])


    const [editPhaseModel, setEditPhaseModel] = useState(false); //edit phase  model
    const toggle = () => setEditPhaseModel(!editPhaseModel);

    const onEditPhase = (row) => {
        setPhaseStatus(row.PhaseStatus)
        setPhaseName(row.PhaseName)
        setSelectedPhaseData(row)
        setEditPhaseModel(true)

    }
    let PhaseStatus = [
        { "PhaseStatus": "Todo" },
        { "PhaseStatus": "In Progress" },
        { "PhaseStatus": "Completed" },
    ]


    const handelSubmit = e => {
        e.preventDefault();
        let body = {
            PhaseId: selectedPhaseData.PhaseId,
            PhaseName: phaseName,
            PhaseStatus: phaseStatus,
            CreatedBy: selectedPhaseData.CreatedBy
        }
        api.updatePhase(body)
            .then((response) => {
                swal(response.data.Status == true ? 'Success' : 'Failed', response.data.Message, response.data.Status == true ? 'success' : 'error');
                if (response.data.Status) {
                    setEditPhaseModel(false)
                    setFlag(!flag)
                }

            })
            .catch(function (error) {
                swal("Failed", error.response.data.Message, "error");
            });
    }


    let columns = [
        {
            dataField: 'PhaseName',
            text: 'Phase Name',

        },
        {
            dataField: 'CreatedDate',
            text: "Created On",

            formatter: (cellContent, row) => {
                var date = moment(row.CreatedDate);
                return (
                    <label>{date.format('DD-MM-yyyy')}</label>

                )
            },
        },
        {
            dataField: 'PhaseStatus',
            text: 'Phase Status',

        },


        {
            dataField: 'action',
            text: 'Action',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
            formatter: (cellContent, row) => {
                return (

                    <Button
                        title="Edit Phase"
                        color="link"
                        disabled={row.PhaseStatus!=='Todo'}
                        onClick={() => { onEditPhase(row) }}
                    >
                        <span className='ml-40'>  <FeatherIcon.Edit /></span>
                    </Button>
                );
            },
        }

    ];

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>:

            <Modal isOpen={editPhaseModel} toggle={toggle} className='modal-dialog' >
                <ModalHeader toggle={toggle}>Update Phase</ModalHeader>
                <Form onSubmit={handelSubmit} >
                    <ModalBody style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'
                    }}>

                        <Row>
                            <Col lg={12} >
                                <FormGroup>
                                    <Label htmlFor="Phase">Phase Name <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        className="style-input form-control "
                                        value={phaseName}
                                        onChange={(e) => {
                                            setPhaseName(e.target.value.trimLeft())
                                        }}
                                    />
                                </FormGroup>
                            </Col>


                            <Col md={12} >
                                <FormGroup>
                                    <Label htmlFor="PhaseStatus">Phase Status <span className="redspan">*</span></Label>
                                    <select
                                        type="text" required
                                        className="style-input form-control"
                                        id="phaseStatus"
                                        name="phaseStatus"
                                        value={phaseStatus}
                                        onChange={(e) => { setPhaseStatus(e.target.value) }}
                                    >
                                        <option value="">Select Phase Status</option>
                                        {PhaseStatus.map((task, i) => (
                                            <option key={i++} value={task.PhaseStatus}>
                                                {task.PhaseStatus}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter className={"add-button-align"}>
                        <Button type='submit' color="primary" className='add-model-btn' >
                            Save</Button>
                        <Button color="secondary" className='add-model-btn' type="button" onClick={() => { setEditPhaseModel(false) }} >Cancel</Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </React.Fragment>
    )
}
