import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import PageTitle from '../../components/PageTitle';
//import * as FeatherIcon from 'react-feather';
import config from '../../helpers/baseurl';
//import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
import { formatDate } from '../../constants/dateFormat';
//import { RefreshCcw } from 'react-feather';
var urlpattern = config.baseUrl;

const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];
// /const { ExportCSVButton } = CSVExport;
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
    //const dispatch = useDispatch();
    const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);

    const rowEvent = {
        onDoubleClick: (row) => {
            
            setrowData((rowData) => [...rowData, row]);
            ////console.log('rowdata', rowData);
        },
    };
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
                        pagination={paginationFactory({
                            sizePerPage: 10,
                            sizePerPageRenderer: sizePerPageRenderer,
                            sizePerPageList: [
                                { text: '10', value: 10 },
                                { text: '20', value: 20 },
                                { text: '50', value: 50 },
                               //{ text: 'Todos', value: (props.records ? props.records.length : 0) }
                            ],
                        })}
                    />
                </React.Fragment>
            )}
        </ToolkitProvider>
    );
};

const SetInterview = (props) => {
    //const dispatch = useDispatch();
    //let records =  [];
    ////console.log(records, 'join list');
    useEffect(() => {
        getAllRequirementMaster();

        // eslint-disable-next-line
    }, []);
    const [requireData, setrequireData] = useState([]);
    //let loginDetails = useSelector((state) => state.Auth.user || []);
    var showrdt = props.viewSingleRequirement;
    //var getUsername = loginDetails.Username;
    var setjid = showrdt.jid;
    const getAllRequirementMaster = () => {
        var axios = require('axios');

        var data = '';

        var config = {
            method: 'get',
            url: `${urlpattern}InterviewMaster?requirementid=${setjid}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
               // //console.log(JSON.stringify(response.data));
                var newrequireData = response.data.Data;
                setrequireData(newrequireData);
            })
            .catch(function (error) {
                //console.log(error);
            });
    };
    let records = requireData || [];
    ////console.log(records, 'viewSingleRequirement records');

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'idate',
            text: 'Date',
            formatter: (cellContent, row) => {
                var joindate = row.idate;
                return (
                 <label>{formatDate(joindate)}</label>
                );
              },
        },
        {
            dataField: 'itime',
            text: 'Time',
        },
        {
            dataField: 'by',
            text: 'By',
        },
        {
            dataField: 'location',
            text: 'Location',
        },
        {
            dataField: 'status',
            text: 'Status',
        },
        {
            dataField: '',
            text: 'Change Status',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button
                        type="button"
                        id="actionButton"
                        title="Action"
                        onClick={() => changeInterViewStatus(row)}
                        className="btn btn-link text-secondary p-0">
                        Change
                        {/* <i className="uil uil-file-exclamation-alt"></i> */}
                    </button>
                );
            },
        },
    ];
   
    const [modal, setModal] = useState(false);
    const  [status, setstatus] = useState('');
    const[interviewid, setinterviewid]=useState('');
    const toggle = () => setModal(!modal);
    ////console.log('showSetInterviewDetails',props.showSetInterviewDetails)
    function changeInterViewStatus(row, id) {
        var interviewid =row.iid;
        setinterviewid(interviewid);
        toggle();
    }
    const {
        // buttonLabel,
         className
       } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
      //var getcfid=formtDetails.cfid;
       var data = {
        status: status,
        cfid:interviewid
      };
        
        var config = {
          method: 'PUT',
          url: `${urlpattern}InterviewMaster?interviewid=${interviewid}&status=${status}`,          
          data : data
        };
       // //console.log(data);
        axios(config)
        .then(function (response) {
        //  //console.log(JSON.stringify(response.data));
          getAllRequirementMaster();
          //swal("Status Updated Successful", "success");
          swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
          toggle();
        })
        .catch(function (error) {
            swal('Failed', error.response.data.Message,  "error");
        });
      };
    return (
        <React.Fragment>
            <Row>
             <Col className="text-right" lg={12}>
                 <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={getAllRequirementMaster}>Refresh</button>
                 <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={props.goBackToRequirement}>Go Back To Requirement</button>
                 </Col>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Change Status</ModalHeader>
        <ModalBody>
        <Row>
                       <Col lg={12}>
                     <label>Status</label>
                           <select className="form-control"
                            onChange={(e) => {
                                setstatus(e.target.value);
                              }}
                              name="status">
                               <option value="">Select</option>
                               <option value="Set">Set</option>
                               <option value="Hold">Hold</option>
                               <option value="Interview">Interview</option>
                               <option value="Reject">Reject</option>
                               <option value="Re Schedule">Re Schedule</option>
                               <option value="No show">No show</option>
                               <option value="Offer">Offer</option>
                           </select>
                       </Col>
                       </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="primary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </form>
      </Modal>
        </React.Fragment>
    );
};

export default SetInterview;
