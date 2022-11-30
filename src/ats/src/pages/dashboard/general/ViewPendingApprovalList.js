import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import config from '../../../helpers/baseurl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
//import resumeFile from '../../../src/assets/sampledata/testResumeFile.docx'
import { formatDate } from '../../../constants/dateFormat';
import { getPendingApprovalList } from '../../../redux/dashboardTables/general/actions';
import PageTitle from '../../../components/PageTitle';
//import axios from 'axios';

var urlpattern =config.baseUrl;

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
   // const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    
      const rowEvent = {
        onDoubleClick: (row) => {
            
               // setrowData((rowData) => [...rowData, row]);
                ////console.log("rowdata", rowData)
              
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

const ResumeUpload = (props) => {
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    let records = useSelector((state)=> state.PendingApproval.pendingapproval || []);
    var getUsername = loginDetails.Username;
    const dispatch = useDispatch(); 
    //let records =  [];
  ////console.log(records, 'join list');
  useEffect(() => {
    dispatch(getPendingApprovalList(getUsername));

      // eslint-disable-next-line 
  }, []);
   // const [requireData, setrequireData]=useState([]);
   
   // var setjid = showrdt.jid;
    
  
    //const[rid ,setrid]=useState('');
//let records = [];
////console.log(records,"viewSingleRequirement records");

    const columns = [
        {
            dataField: 'rname',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'rcnt',
            text: 'Number',
        },
        {
            dataField: 'remail',
            text: 'Email',
        },
        {
            dataField: 'rtotexp',
            text: 'Total Experince',
        },
        {
            dataField: 'rrelexp',
            text: 'Notice Period',
        },
        {
          dataField: 'rctc',
          text: 'CTC',
      },
      {
        dataField: 'rupdateby',
        text: 'Upload By',
    },
  {
    dataField: 'rupdateon',
    text: 'Upload On',
    formatter: (cellContent, row) => {
        var joindate = row.rupdateon;
        return (
         <label>{formatDate(joindate)}</label>
        );
      },
},
// {
//     dataField: 'rstatus',
//     text: 'Status',
// },
        {
            dataField: 'accept',
            text: 'Accept',
            formatter: (cellContent, row) => {
              ////console.log(row, '1resume action data');
              //setrid(row.iid);
                return (
                    <button type="button" 
                    id="actionButton" title="Accept"
                onClick={() => {acceptresume(row)}} 
                className="btn btn-link text-secondary">
                 <FeatherIcon.CheckSquare />
                 {/* <i className="uil uil-file-exclamation-alt"></i> */}
                </button>
                );
              },
        },
        {
          dataField: 'reject',
          text: 'Reject',
          formatter: (cellContent, row) => {
           // //console.log(row, '1resume action data');
           // setrid(row.iid);
              return (
                  <button type="button" 
                  id="actionButton" title="Reject"
              onClick={() => {rejectresume(row)}} 
              className="btn btn-link text-secondary">
               <FeatherIcon.Delete />
               {/* <i className="uil uil-file-exclamation-alt"></i> */}
              </button>
              );
            },
      },
    ];
    function acceptresume(row , id) {    
      var resid= row.rid;
      ////console.log(row, 'acceptresume');
      var config = {
        method: 'PUT',
        url: `${urlpattern}ResumeStatus?resid=${resid}&resumestatus=Accept`, 
      };
      ////console.log(data);
      axios(config)
      .then(function (response) {
        ////console.log(JSON.stringify(response.data));
        //getAllRequirementMaster();
        swal("Status Updated Successful", "success");
        dispatch(getPendingApprovalList(getUsername));
        //toggle2();
      })
      .catch(function (error) {
        swal("Somthing went wrong !", "error");
      });
     }
     function rejectresume(row , id) {    
      var resid= row.rid;
      var config = {
        method: 'PUT',
        url: `${urlpattern}ResumeStatus?resid=${resid}&resumestatus=Reject`, 
      };
      ////console.log(data);
      axios(config)
      .then(function (response) {
       // //console.log(JSON.stringify(response.data));
       // getAllRequirementMaster();
        swal("Status Updated Successful", "success");
        dispatch(getPendingApprovalList(getUsername));
      
        //toggle2();
      })
      .catch(function (error) {
        swal("Somthing went wrong !", "error");
      });
     }
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={6}>
                    <PageTitle
                      breadCrumbItems={[
                          { label: 'Dashboard/ViewPendingApprovalList', path: '/ViewPendingApprovalList', active: true },
                      ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>         
        </React.Fragment>
    );
};

export default ResumeUpload;


