import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import PageTitle from '../../components/PageTitle';
//import $ from "jquery";
import config from '../../helpers/baseurl';
import { getLeaveList } from '../../redux/leave/actions';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import { formatDate } from '../../constants/dateFormat';
import moment from 'moment'


var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];
//const { ExportCSVButton } = CSVExport;
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
        <div className="spinner">No records found   </div>
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
                                        { text: '50', value: 50 }
                                
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

const ViewLeave = (props) => {

    const dispatch = useDispatch();
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let records = useSelector((state) => state.Leave.leave || []);

    let getUsername = loginDetails.Username;
    let getUserrole = loginDetails.Role;

    useEffect(() => {
        //getleaveReport();
        dispatch(getLeaveList({ getUsername, getUserrole }));    
        roleWiseStatusChange();
        // eslint-disable-next-line 
    }, []);
    const [changeRle, setchangeRle] = useState(true)

    const roleWiseStatusChange = () => {

        if (loginDetails.Role === 'HR' || loginDetails.Role === 'Manager' ) {
            setchangeRle(false)
        } else {
            return null
        }
    }
    const columns = [
        {
            dataField: 'ApplyBy',
            text: 'Name',
        },
        {
            dataField: 'Type',
            text: "Type"
        },
        {
            dataField: 'InWords',
            text: 'No. Of days',
        },
        {
            dataField: 'Reason',
            text: 'Reason',
        },
        {
            dataField: 'StartDate',
            text: 'Start Date',
            formatter: (cellContent, row) => {
                var startdate = row.StartDate;

                return (
                    <label>{moment(startdate).format("DD-MM-YYYY")}</label>
                );
            },
        },
        {
            dataField: 'EndDate',
            text: 'End Date',
            formatter: (cellContent, row) => {
                var enddate = row.EndDate;

                return (
                    <label>{moment(enddate).format("DD-MM-YYYY")}</label>
                );
            },
        },
        {
            dataField: 'ManagerStatus',
            text: 'Manager Status',

        },
        {
            dataField: 'HRStatus',
            text: 'HR Status',
        },
        {
            dataField: 'cstatus',
            text: 'Action',
            hidden: changeRle,
            formatter: (cellContent, row) => {
                //const id = row.id;
                return (
                    <Link
                        onClick={() => onChangeStatus(row)}
                        title="Change Status">
                    {/* // {row.HRStatus==="Pending"|| row.ManagerStatus==='Pending'? 
                    //     'Change Status':null}  */}

                    {loginDetails.Role==="HR"?
                    row.ManagerStatus==='Rejected' || row.HRStatus==="Approved" && row.ManagerStatus==='Approved' ||row.ApplyBy===loginDetails.Username|| row.ManagerStatus==='Pending'?
                    
                    null
                    :
                    "Change Status "
                    :row.HRStatus==="Approved" && row.ManagerStatus==='Approved'
                    ?
                    null
                    :
                    "Change Status" }
                    </Link>
                );
            },
        }
    ];

     //   consolee.log("loginDetails.Role",loginDetails.Role)
    const [modal2, setModal2] = useState(false);
    const { className } = props;
    const [status, setstatus] = useState('');
    const [leaveid, setleaveid] = useState();
    const [managerstatus, setManagerStatus] = useState();
    const [reason, setReson] = useState();

    const toggle2 = () =>{ setModal2(!modal2);
        setstatus('')
    }

    const onChangeStatus = (row) => {
        toggle2();
        setleaveid(row.Id)
        setManagerStatus(row.ManagerStatus)
        setReson(row.Reason)

    }
    const handleSubmitAction = (e) => {
        e.preventDefault();
        var data = {

            LeaveId: leaveid,
            Status: status,
            Reason: reason,
            UpdateBy: getUsername

        };
        if (status === "Approved" | status === "Rejected") {
            if (loginDetails.Role.includes('Manager')) {

               
                var config = {
                    method: 'post',
                    url: `${urlpattern}ReportingMangagerLeaveStatus`,
                    data: data
                };

                axios(config)
                    .then(function (response) {
                        swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
                        dispatch(getLeaveList({ getUsername, getUserrole }));
                        toggle2()
                    })
                    .catch(function (error) {
                        swal(error, "error");
                        toggle2()
                    });
            }
            else {
                var config = {
                    method: 'post',
                    url: `${urlpattern}HRLeaveStatus`,
                    data: data
                }
                axios(config)
                    .then(function (response) {
                        swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
                        dispatch(getLeaveList({ getUsername, getUserrole }));
                        toggle2()
                    })
                    .catch(function (error) {
                        swal(error, "error");
                        toggle2()
                    });
            }
        }
       // else swal("Something went wrong");

    };

    return (
        <React.Fragment>
            <Modal isOpen={modal2} toggle={toggle2} className={className}>
                <form onSubmit={handleSubmitAction}>
                    <ModalHeader toggle={toggle2}>Change Status</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <label>Status</label>
                                <select className="form-control" required
                                value={status}
                                    onChange={(e) => {
                                        setstatus(e.target.value);
                                    }}
                                    name="status">
                                    <option value=" ">Select Status</option>
                                    {loginDetails.Role === 'HR' ?
                                        <>{managerstatus === "Approved" && <option value="Approved">Approve</option>
                                        }
                                            <option value="Rejected">Reject</option>
                                        </> :
                                        <><option value="Approved">Approve</option>
                                            <option value="Rejected">Reject</option>
                                        </>

                                    }
                                </select>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <button disabled={!status} color="primary" className='btn btn-primary' type="submit" >Save</button>
                        <Button color="primary" type='button' onClick={toggle2}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ViewLeave;


