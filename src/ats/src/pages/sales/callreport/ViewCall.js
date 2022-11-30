import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import config from '../../../helpers/baseurl';
import { getCallList } from '../../../redux/salescallreport/actions';
import { formatDate } from '../../../constants/dateFormat';
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
    const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    
      const rowEvent = {
        onDoubleClick: (row) => {
            
                setrowData((rowData) => [...rowData, row]);
               // //console.log("rowdata", rowData)
              
        }
    }
   const NoDataIndication = () => (
        <div className="spinner">No records found        </div>
    );
      let loginDetails = useSelector((state)=> state.Auth.user || []);
      const downloadReport = (row) => {
        
        const link = document.createElement('a');
        //link.target="_blank"
        link.href = urlpattern + `SalesClientCallRecordMaster?username=${loginDetails.Username}&filetype=${'pdf'}`;
        link.setAttribute('download', 'CallReport.pdf'); //or any other extension
        document.body.appendChild(link);
        link.click();
       
}
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
                                Export PDF <FeatherIcon.ChevronDown />
                            </DropdownToggle>
                            <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                                <div className="dropdown-item notify-item p1">
                                <div className="btn-link cursor-pointer" onClick={() => downloadReport()}>Export PDF</div>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
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

const ViewCall = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.SalesCallReport.calls|| []);
   //const [callrecord, setCallRecord]=useState([]);
   let loginDetails = useSelector((state)=> state.Auth.user || []);
   ////console.log(loginDetails.Username);
   //let records=[]
  // //console.log(records, 'join list');
  var getUsername = loginDetails.Username;
    useEffect(() => {
        dispatch(getCallList(getUsername));
        // eslint-disable-next-line 
    }, []);
    const columns = [
      
        {
            dataField: 'client',
            text: 'Client Name',
            sort: true,
        },
        {
            dataField: 'dt',
            text: 'Date',
            formatter: (cellContent, row) => {
                var startdate = row.dt;
               
                return (
                 <label>{formatDate(startdate)}</label>
                );
              },
        },
        {
            dataField: 'poc',
            text: 'POC',
        },
        {
            dataField: 'agenda',
            text: 'Agenda',
        },
        {
            dataField: 'username',
            text: 'Sales Name',
        },
        
    ];
    
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ViewCall;


