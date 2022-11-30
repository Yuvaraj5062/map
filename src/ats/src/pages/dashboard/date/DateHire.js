import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import { getDateHireList } from '../../../redux/dashboardTables/date/actions';
import PageTitle from '../../../components/PageTitle';
import { formatDate } from '../../../constants/dateFormat';
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
    //const dispatch = useDispatch();

    // const rowEvent = {
    //     onClick: (e, row, rowIndex) => {
    //       //console.log(`clicked on row with index: ${rowIndex} ${row.jobcode}`);
    //     }
    //   };
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
                                {/* <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={toggle}>Upload New</button> */}
                                <DropdownToggle
                                    data-toggle="dropdown"
                                    tag="button"
                                    className="btn btn-secondary dropdown-toggle bg-secondary  mr-0">
                                    Download <FeatherIcon.ChevronDown />
                                </DropdownToggle>
                                <DropdownMenu right className="topbar-dropdown-menu profile-dropdown-items">
                                    <div className="dropdown-item notify-item p1">
                                        <ExportCSVButton className="btn-link" {...props.csvProps}>
                                            Export CSV
                                        </ExportCSVButton>
                                    </div>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Col>
                    </Row>
                    {/* <EditRequirementmodal modalToggle={toggle}/> */}
                    {/* <div className="table-responsive"> */}
                        <BootstrapTable
                            {...props.baseProps}
                            bordered={false}
                            defaultSorted={defaultSorted}
                            //rowEvents={rowEvent}
                            id="table-to-xls"
                            classes="table-to-xls"
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
                    {/* </div> */}
                </React.Fragment>
            )}
        </ToolkitProvider>
    );
};

const DateHire = (props) => {
    const dispatch = useDispatch();
    let records = useSelector((state) => state.dateList.datehire || []);
    let userDeatails = useSelector((state) => state.Auth.user || []);
    ////console.log(records, 'requirement');
    useEffect(() => {
       // alert('call')
        dispatch(getDateHireList(userDeatails.Username));

        // eslint-disable-next-line
    }, []);

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
        },
        {
            dataField: 'client',
            text: 'Client',
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
            dataField: 'type',
            text: 'Employment Type',
        },
       
        {
            dataField: 'seldate',
            text: 'Select Date',
            formatter: (cellContent, row) => {
                var startdate = row.seldate;
               
                return (
                 <label>{formatDate(startdate)}</label>
                );
              },    
        },
        {
            dataField: 'offdate',
            text: 'Offer Date',
            formatter: (cellContent, row) => {
                var startdate = row.offdate;
               
                return (
                 <label>{formatDate(startdate)}</label>
                );
              },
        },
        {
            dataField: 'joindate',
            text: 'Start Date',
            formatter: (cellContent, row) => {
                var startdate = row.joindate;
               
                return (
                 <label>{formatDate(startdate)}</label>
                );
              },
        },        
        {
            dataField: 'recruiter',
            text: 'Recruiter',
        },
        {
            dataField: 'status',
            text: 'Status',
        },
        
    ];
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={6}>
                    <PageTitle
                      breadCrumbItems={[
                          { label: 'Dashboard/TillDateHire', path: '/', active: false },
                      ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <TableWithSearch id="table-to-xls" classes="table-to-xls" records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DateHire;
