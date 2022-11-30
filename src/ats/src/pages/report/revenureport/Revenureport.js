import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getRevenuReportList } from '../../../redux/allreport/actions';
import {UncontrolledDropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import * as FeatherIcon from 'react-feather';
import config from '../../../helpers/baseurl'
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
    //const { SearchBar } = Search;
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

const Revenureport = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.Report.revenureport|| []);
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    const [startdate, setstartdate]=useState('');
    const [enddate, setenddate]=useState('');
    // useEffect(() => {
    //     //dispatch(getTeamLeadList());
    //      // eslint-disable-next-line 
    //  }, []);
    const handleDatewiseForm = (e) => {
        var getUsername = loginDetails.Username;
    e.preventDefault();
    dispatch(getRevenuReportList(getUsername,startdate,enddate))
    // axios
    //     .get(`${urlpattern}RevenueReportDateWise?username=${getUsername}&ssd=${startdate}&eed=${enddate}`)

    //     .then((response) => {
    //        var setdatelist=response.data.Data;
    //        setdatewise(setdatelist);
    //     });
};
//let records = datewise || [];

    const columns = [
        {
            dataField:'id',
            text:'ID',
            hidden: true
        },
        {
            dataField: 'Name',
            text: 'Name',
            //sort: true,
        },
        {
            dataField: 'Client',
            text: 'Client',
            sort: true,
        },
        {
            dataField: 'Location',
            text: 'Location',
        },
        {
            dataField: 'Skill',
            text: 'Skill',
        },
        {
            dataField: 'Type',
            text: 'Type',
        },
        {
            dataField: 'CTC',
            text: 'CTC',
        },
        // {
        //     dataField: 'DR',
        //     text: 'DR',
        // },
        {
            dataField: 'PR',
            text: 'PR',
        },
        {
            dataField: 'GP',
            text: 'GP',
        },
        {
            dataField: 'GPM',
            text: 'GPM',
        },
        {
            dataField: 'Recruiter',
            text: 'Recruiter',
        }
    ]
    const downloadReport = (row) => {
             const link = document.createElement('a');
             link.href = urlpattern + `RevenueReportDateWise?username=${loginDetails.Username}&ssd=${startdate}&eed=${enddate}&filetype=${'pdf'}`;
             link.setAttribute('download', 'RevenureportReport.pdf'); //or any other extension
             document.body.appendChild(link);
             link.click();
     }
    return (
        <React.Fragment>
            <form onSubmit={handleDatewiseForm}>
            <Row className="mt-3">
                            <Col md={3} className="">
                                    <input type="date" className="form-control style-input"
                                     onChange={(event) => setstartdate(event.target.value)}/>
                                </Col>   
                                <Col md={3} className="">
                                    <input type="date" className="form-control style-input"
                                     onChange={(event) => setenddate(event.target.value)}/>
                                </Col>   
                                <Col md={3} className="">
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </Col> 
                                <Col md={3} className="text-right">
                        <UncontrolledDropdown className=" profile-dropdown-menu">
                            <DropdownToggle
                                data-toggle="dropdown"
                                tag="button"
                                disabled={records.length===0}
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

export default Revenureport;


