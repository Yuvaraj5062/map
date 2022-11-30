import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Row, Col, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';
import config from '../../../helpers/baseurl'

import { getDatewiseReportList } from '../../../redux/allreport/actions';
import { getClientList } from '../../../redux/actions';

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
   // const { SearchBar } = Search;
    //const dispatch = useDispatch();
   // const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    
    //   const rowEvent = {
    //     onDoubleClick: (row) => {
    //         
    //             setrowData((rowData) => [...rowData, row]);
    //             //console.log("rowdata", rowData)
              
    //     }
    // }
    const NoDataIndication = () => (
        <div className="spinner">
          {/* <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" /> */}
        </div>
      );
    return (
            
                <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                    {(props) => (
                        <React.Fragment>
                            {/* <Row>
                                <Col md={6} className="">
                                    <SearchBar {...props.searchProps} />
                                </Col>                    
                            </Row> */}
                            

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                defaultSorted={defaultSorted}
                               // rowEvents={rowEvent}
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

const Datewise = () => {
 
    const dispatch = useDispatch();
    let clients = useSelector((state) => state.Client.clients || []);
    //const [datewise, setdatewise]=useState([]);
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    let records = useSelector((state) => state.Report.datewsiereport|| []);
    //var getUsername = loginDetails.Username;
    const [selectedClient, setClient] = useState('')
    const [startdate, setstartdate]=useState('');
    const [enddate, setenddate]=useState('');
     // dispatch(getDatewiseReportList(getUsername,startdate,enddate));
       
         useEffect(() => {
            dispatch(getClientList());
       // eslint-disable-next-line 
     }, []);
    const handleDatewiseForm = (e) => {
    var getUsername = loginDetails.Username;
    e.preventDefault();
    if(selectedClient !== ''){
        dispatch(getDatewiseReportList(getUsername,startdate,enddate, JSON.parse(selectedClient).cid ));
    }else{
        dispatch(getDatewiseReportList(getUsername,startdate,enddate, '' ));
    }
};
//let records = datewise || [];

    const columns = [
        {
            dataField:'id',
            text:'ID',
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Name',
            //sort: true,
        },
        {
            dataField: 'submission',
            text: 'Submission',
            sort: true,
        },
        {
            dataField: 'interview',
            text: 'Interview',
        },
        {
            dataField: 'offer',
            text: 'Offer',
        },
        {
            dataField: 'start',
            text: 'Start',
        }
    ]
    const downloadReport = (row) => {
       if(selectedClient !== ''){
            const link = document.createElement('a');
            link.href = urlpattern + `DateWiseCountReportMaster?username=${loginDetails.Username}&ssd=${startdate}&eed=${enddate}&clientId=${JSON.parse(selectedClient).cid }&filetype=${'pdf'}`;
            link.setAttribute('download', 'DatewiseReport.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
            // window.open(urlpattern + `DateWiseCountReportMaster?username=${loginDetails.Username}&ssd=${startdate}&eed=${enddate}&clientId=${JSON.parse(selectedClient).cid }&filetype=${'pdf'}`, '_blank')
       }else{
            const link = document.createElement('a');
            link.href = urlpattern + `DateWiseCountReportMaster?username=${loginDetails.Username}&ssd=${startdate}&eed=${enddate}&clientId=${selectedClient}&filetype=${'pdf'}`;
            link.setAttribute('download', 'DatewiseReport.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
            // window.open(urlpattern + `DateWiseCountReportMaster?username=${loginDetails.Username}&ssd=${startdate}&eed=${enddate}&clientId=${selectedClient}&filetype=${'pdf'}`, '_blank')
       }
    }
    return (
        <React.Fragment>
            <form onSubmit={handleDatewiseForm}>
                <Row className="mt-3">
                    <Col md={2}>
                        <select className="form-control style-input"
                            onChange={(event) => setClient(event.target.value)}>
                                <option selected desabled value={''}>Select</option>
                            {clients.map((client,i) => (
                                <option key={i++} value={JSON.stringify(client)}>
                                    {client.cname}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col md={2} className="">
                        <input type="date" className="form-control style-input"
                        onChange={(event) => setstartdate(event.target.value)}/>
                    </Col>   
                    <Col md={2} className="">
                        <input type="date" className="form-control style-input"
                        onChange={(event) => setenddate(event.target.value)}/>
                    </Col>   
                    <Col md={2} className="">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </Col>         
                    <Col md={4} className="text-right">
                        <UncontrolledDropdown className=" profile-dropdown-menu">
                            <DropdownToggle
                                data-toggle="dropdown"
                                tag="button"
                                className="btn btn-secondary dropdown-toggle bg-secondary  mr-0">
                                Download <FeatherIcon.ChevronDown />
                            </DropdownToggle>
                            <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                                <div className="dropdown-item notify-item p1">
                                <div className="btn-link cursor-pointer" onClick={() => downloadReport()}>Export PDF</div>
                                </div>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Col>            
                </Row>
            </form> 
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Datewise;


