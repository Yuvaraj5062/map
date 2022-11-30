import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search,CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import { getReqReportList } from '../../redux/allreport/actions';
import { formatDate } from '../../constants/dateFormat';
import config from '../../helpers/baseurl'
var urlpattern =config.baseUrl;

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
   
   const NoDataIndication = () => (
        <div className="spinner">No records found        </div>
    );
    
      const downloadReport = (row) => {
        
        const link = document.createElement('a');
        link.target="_blank"
        link.href = urlpattern + `RequirementProgressReport?filetype=${'pdf'}`;
        link.setAttribute('download', 'Report.pdf'); //or any other extension
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
                            {/* <EditRequirementmodal modalToggle={toggle}/> */}
                            <div className="table-responsive">
                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                defaultSorted={defaultSorted}
                                //rowEvents={rowEvent}
                                id="table-to-xls"
                                classes="table-to-xls"
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
                                
                            /></div>
                        </React.Fragment>
                    )}
                  
                </ToolkitProvider>
    );
};

const ViewRequirement = (props) => {
    
    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.Report.reqreport|| []);
   ////console.log(records, 'requirement')
    useEffect(() => {
        dispatch(getReqReportList());

        // eslint-disable-next-line 
    }, []);
   
    const columns = [
        {
            dataField: 'jobcode',
            text: 'Job Code.',
        },
        {
            dataField:'client',
            text:"Client Name"
        },
        {
            dataField: 'skill',
            text: 'Skill',
        },
        {
            dataField: 'position',
            text: 'Position',
        },
        {
            dataField: 'location',
            text: 'Location',
        },
        {
            dataField: 'type',
            text: 'Type',
        },
        {
            dataField: 'status',
            text: 'Status',
        },
        {
            dataField: 'createdon',
            text: 'Created On',
            formatter: (cellContent, row) => {
                var startdate = row.createdon;
               
                return (
                 <label>{formatDate(startdate)}</label>
                );
              },
        },
        {
            dataField: 'submission',
            text: 'Submission',
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
            dataField: 'hire',
            text: 'Hire',
        },
        {
            dataField: 'bd',
            text: 'BD',
        },
    ]
    //let loginDetails = useSelector((state)=> state.Auth.user || []);
   
        return (
        <React.Fragment>
            <Row>    
                <Col>
                {/* <EditRequirementmodal/> */}
               
                    <TableWithSearch id="table-to-xls"
                                classes="table-to-xls" records={records} columns={columns} />
                </Col>
            </Row>
            
        </React.Fragment>
    );
};

export default ViewRequirement;


