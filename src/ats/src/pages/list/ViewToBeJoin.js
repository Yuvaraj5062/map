import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search,CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import { getViewToBeJoinList } from '../../redux/list/actions';
import { Link } from 'react-router-dom';
//import PageTitle from '../../components/PageTitle';
import config from '../../helpers/baseurl';
import swal from 'sweetalert';
import axios from 'axios';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import Button from 'reactstrap/lib/Button';
import { formatDate } from '../../constants/dateFormat';
import moment from 'moment'
//import axios from 'axios';

var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];
const { ExportCSVButton } = CSVExport;
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
    // const dispatch = useDispatch();

    // const rowEvent = {
    //     onDoubleClick: ( e, row, index ) => {

    //         dispatch( setList( row ) );

    //        // dispatch( getViewToBeJoinModal() );
    //         ////console.log(props.result)
    //     }
    // }
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
                                <Col md={6} className="text-right">
                                <UncontrolledDropdown className=" profile-dropdown-menu">
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="button"
                    className="btn btn-secondary dropdown-toggle bg-secondary  mr-0">
                    Download <FeatherIcon.ChevronDown />
                </DropdownToggle>
                <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                    <div className="dropdown-item notify-item p1">
                    <ExportCSVButton className="btn-link" { ...props.csvProps }>Export CSV</ExportCSVButton>
                    </div>
                    {/* <div  className="dropdown-item notify-item p1">
                    <ExportCSVButton className="btn-link" { ...props.csvProps }>Export PDF</ExportCSVButton>
                    </div>
                    <div  className="dropdown-item notify-item p1">
                    <ExportCSVButton className="btn-link" { ...props.csvProps }>Export EXCEL</ExportCSVButton>
                    </div> */}
                </DropdownMenu>
            </UncontrolledDropdown>
                                {/* <ExportCSVButton className="btn-primary" { ...props.csvProps }>Export CSV!!</ExportCSVButton> */}
                                </Col>                            
                            </Row>

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                defaultSorted={defaultSorted}
                                //rowEvents={rowEvent}
                                noDataIndication={ () => <NoDataIndication /> }
                                pagination={
                                    paginationFactory( 
                                        { 
                                            sizePerPage: 10, 
                                            sizePerPageRenderer: sizePerPageRenderer, 
                                            sizePerPageList: [
                                                { text: '10', value: 10, }, 
                                                { text: '20', value: 20 }, 
                                                { text: '50', value: 50 }, 
                                               
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

const ViewToBeJoin = (props) => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.List.viewtobejoin|| []); 
   let loginDetails = useSelector((state)=> state.Auth.user || []);
   ////console.log(records, 'view to be join')
    useEffect(() => {
        dispatch(getViewToBeJoinList(loginDetails.Username));

        // eslint-disable-next-line 
    }, []);

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
        },
        {
            dataField:'client',
            text:"Client"
        },
        {
            dataField: 'skill',
            text: 'Skill',
        },
        {
            dataField: 'location',
            text: 'Location',
        },
        {
            dataField: 'seldate',
            text: 'Select Date',
            formatter: (cellContent, row) => {
                // var selectedDate = row.seldate;
               
                // return (
                //  <label>{formatDate(selectedDate)}</label>
                // );

                const selectedDate = moment(row.seldate);
                return (
                  <label>  {row.seldate?selectedDate.format('DD-MM-yyyy'):row.seldate}</label>
                );
              },
        },
        {
            dataField: 'offdate',
            text: 'Offer Date',
            formatter: (cellContent, row) => {
                // var offdate = row.offdate;
                // return (
                //  <label>{formatDate(offdate)}</label>
                // );

                const offdate = moment(row.offdate);
                return (
                  <label>  {row.offdate?offdate.format('DD-MM-yyyy'):row.offdate}</label>
                );
              },
        },
        {
            dataField: 'joindate',
            text: 'Start Date',
            formatter: (cellContent, row) => {
                // var joindate = row.joindate;
                // return (
                //  <label>{formatDate(joindate)}</label>
                // );

                const startdate = moment(row.joindate);
                return (
                  <label>  {row.joindate?startdate.format('DD-MM-yyyy'):row.joindate}</label>
                );
              },
        },
        {
            dataField: 'recruitername',
            text: 'Recruiter',
            
        },  
        {
            dataField: 'status',
            text: 'Status',
        },
        {
            dataField: 'cstatus',
            text: 'Change Status',
            formatter: (cellContent, row) => {
                //const id = row.id;
                return (
                  <Link
                    onClick={() => onChangeStatus(row)}
                    title="Change Status"
                  >
                    Change Status
                  </Link>
                );
              },
        }
    ];
    const [modal2, setModal2] = useState(false);
    const { className } = props;
    const  [status, setstatus] = useState('');
    const [offerId, setOfferid]=useState();
    const toggle2 = () => setModal2(!modal2);
 const onChangeStatus=(row)=>{
   // //console.log('clicked',row);
    toggle2();
    setOfferid(row.oid)
 }
 const handleSubmitAction = (e) => {
    e.preventDefault();
  //var getcfid=formtDetails.cfid;
   var data = {
    status: status
  };
    
    var config = {
      method: 'PUT',
      url: `${urlpattern}OfferMaster?offerid=${offerId}&status=${status}`,          
      data : data
    };
    ////console.log(data);
    axios(config) 
    .then(function (response) {
     // //console.log(JSON.stringify(response.data));
     
     swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
      
      toggle2();
      dispatch(getViewToBeJoinList());
    })
    .catch(function (error) {
        swal('Failed', error.response.data.Message,  "error");
    });
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
                           <select className="form-control"
                            onChange={(e) => {
                                setstatus(e.target.value);
                              }}
                              name="status">
                               <option value="">Select</option>
                               <option value="ToBeJoin">To Be Join</option>
                               <option value="Hold">Hold</option>
                               <option value="BD">BD</option>
                               <option value="Join">Join</option>
                               <option value="Reject">Reject</option>
                           </select>
                       </Col>
                       </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="primary" onClick={toggle2}>Cancel</Button>
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

export default ViewToBeJoin;


