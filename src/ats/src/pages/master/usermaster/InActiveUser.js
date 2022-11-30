import * as api from './../../../helpers/restApi'
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import config from '../../../helpers/baseurl';
import { Row, Col, Input, ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label } from 'reactstrap';
import * as FeatherIcon from 'react-feather';

var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
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
    const [rowData, setrowData] = useState([]);
    const rowEvent = {
        onDoubleClick: (row) => {
            
            setrowData((rowData) => [...rowData, row]);

        }
    }
  const NoDataIndication = () => (
        <div className="spinner">No records found        </div>
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
                        {...props.baseProps}
                        bordered={false}
                        defaultSorted={defaultSorted}
                        rowEvents={rowEvent}
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

export const InActiveUser = () => {
    const [records, setRecords] = useState([])

    useEffect(() => {
        api.getInActiveEmp()
            .then((res) => {
                setRecords(res.data.Data)
            })
    },[])

 

    const [certModel, setCertModel] = useState(false);
    const certficketModel = () => setCertModel(!certModel);
    const [certificate, setCertificate] = useState();
    const [emplyeeId, setEmployeeId] = useState();

    const handelShowCertificket = (row) => {
        setEmployeeId(row.Ecode)
        setCertModel(true)
    }

    const handleSubmitAction = (e) => {


        if (emplyeeId !== null || emplyeeId !== undefined) {

            if (certificate === "ExperienceAndRelievingLetter") {
                // dispatch(getCertficates(emplyeeId))
                window.open(urlpattern + 'ExperienceAndRelievingLetter?employeecode=' + emplyeeId)
            }

        }

    }
    const onUpdateCancel = () => {
        certficketModel()
        //cleanForm()
    }

    const [certificateType] = React.useState([
        {
            label: 'Experience And Relieving Letter',
            value: 'ExperienceAndRelievingLetter',
        },
        // { label: 'Confirmation Letter Download', value: 'ConfirmationLetterDownload' },
        // { label: 'Internship Letter', value: 'InternshipLetter' },
    ]);

    const columns = [

        {
            dataField: 'Ecode',
            text: 'Employee Code',
            sort: true,
        },
        {
            dataField: 'FullName',
            text: 'Employee Name',
        },
        {
            dataField: 'action',
            text: 'Action',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button className="btn btn-outline-secondary"
                        onClick={() => handelShowCertificket(row)}>
                        View
                    </button>
                );

            //     <button
            //     className="btn btn-link text-secondary"
            //       onClick={() => handleSubmitAction(row.Ecode)}
            //       title="Download experience and relieving letter"
            //     >
            //      <FeatherIcon.Download />
            //     </button>
            //   );
            },
        }
    ];


    return (
        <React.Fragment>
            <Row>
                <Modal isOpen={certModel} toggle={certficketModel}>
                    <ModalHeader toggle={onUpdateCancel}>Download Certificate</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label >Certificate Type <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required
                                        name="certificate" id="certificate" onChange={(e) => {
                                            setCertificate(e.target.value);
                                        }}>
                                        <option value="">Select Certificate Type</option>
                                        {certificateType.map((certificate) => (
                                            <option key={certificate.value} value={certificate.value}>
                                                {certificate.label}
                                            </option>
                                        ))}
                                    </select>
                                </FormGroup>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit"
                        disabled={!certificate}
                            onClick={handleSubmitAction}>Download</Button>
                        <Button color="primary" onClick={onUpdateCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Col>
               
                        <TableWithSearch records={records} columns={columns} />
                       
                </Col>
            </Row>
        </React.Fragment>
    );
};


