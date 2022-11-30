import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getTodaysInterviewList } from '../../../redux/activity/actions';
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
    // const dispatch = useDispatch();

    // const rowEvent = {
    //     onDoubleClick: ( e, row, index ) => {

    //         //dispatch( setList( row ) );

    //        // dispatch( getTodaysInterViewModal() );
    //         ////console.log(props.result)
    //     }
    // }
    
    const NoDataIndication = () => (
        <div className="spinner">
          {/* <div className="rect1" />
          <div className="rect2" />
          <div className="rect3" />
          <div className="rect4" />
          <div className="rect5" /> */}
          No Records Found
        </div>
      );
    return (
            
                <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                    {(props) => (
                        <React.Fragment>
                             <Row>
                                <Col md={12} className="text-uppercase text-center">
                                    <h5>Today's Interview</h5>
                                </Col>                          
                            </Row>
                            <Row>
                                <Col md={6} className="">
                                    <SearchBar {...props.searchProps} />
                                </Col>    
                                <Col md={6} className="text-right">
                               </Col>                            
                            </Row>
                           
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

const TodaysInterView = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.Activity.todaysinterview|| []);
    useEffect(() => {
        dispatch(getTodaysInterviewList());

        // eslint-disable-next-line 
    }, []);

    const columns = [
        {
            dataField: 'Candidatename',
            text: 'Name',
        },
        {
            dataField:'InterviewBy',
            text:"Interview By"
        },
        {
            dataField: 'Location',
            text: 'Location',
        },
        {
            dataField: 'Time',
            text: 'Time',
        },
        {
            dataField: 'ContactNo',
            text: 'Contact',
            
        }
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

export default TodaysInterView;


