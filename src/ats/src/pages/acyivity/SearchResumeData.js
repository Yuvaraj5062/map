import React from 'react';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as FeatherIcon from 'react-feather';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import config from '../../helpers/baseurl';
import { formatDate } from '../../constants/dateFormat';
import moment from 'moment'
var urlpattern = config.baseUrl;
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
        return (
            
                <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                    {(props) => (
                        <React.Fragment>
                           

                            <BootstrapTable
                                {...props.baseProps}
                                bordered={false}
                                // defaultSorted={defaultSorted}
                                //rowEvents={rowEvent}
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
                                
                                wrapperClasses="table-responsive"
                            />
                        </React.Fragment>
                    )}
                </ToolkitProvider>
    );
};

const SearchResumeData = (props) => {

    ////console.log( props.serchresume);
     
let records = props.serchresume|| [];
    const columns = [
        {
            dataField: 'R_Name',
            text: 'Name',
        },
        {
            dataField: 'R_DOB',
            text: 'DOB',
            formatter: (cellContent, row) => {
              //  var startdate = row.R_DOB;
               
                const startdate = moment(row.R_DOB);
                return (
                  <label>  {startdate.format('DD-MM-yyyy')}</label>
                );
                // return (
                //  <label>{formatDate(startdate)}</label>
                // );
              },
        },
        {
            dataField: 'R_Address',
            text: 'Address',
        }, 
        {
            dataField: 'R_Cnt',
            text: 'Phone No',
        }, 
        {
            dataField: 'R_Email',
            text: 'Email',
        },
        {
            dataField: 'download',
            text: 'Download Resume',
            formatter: (cellContent, row) => {
               // //console.log(row)
                return (
                  <button
                  className="btn btn-link text-secondary"
                    onClick={() => downloadSalarySlip(row)}
                    title="Edit"
                  >
                   <FeatherIcon.Download />
                  </button>
                );
              },
        }
    ];
    const downloadSalarySlip = (row) => {    
        ////console.log(row)   
           window.open(urlpattern + 'DownloadResume?resumeName='+ row.R_Resumename)
    }
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

export default SearchResumeData;


