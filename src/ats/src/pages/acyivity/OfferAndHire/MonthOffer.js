import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getMonthOfferList} from '../../../redux/activity/actions';
import { formatDate } from '../../../constants/dateFormat';
import moment from 'moment'
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

    //        // dispatch( setList( row ) );

    //        // dispatch( getMonthOfferModal() );
    //         ////console.log(props.result)
    //     }
    // }
    const NoDataIndication = () => (
        <div className="spinner">
         No records found
        </div>
      );
    return (
            
                <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                    {(props) => (
                        <React.Fragment>
                             <Row className="mt-3">
                                <Col md={12} className="text-uppercase text-center">
                                    <h5>Month Offer</h5>
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

const MonthOffer = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.Activity.monthoffer|| []);
    useEffect(() => {
        dispatch(getMonthOfferList());

        // eslint-disable-next-line 
    }, []);

    const columns = [
        {
            dataField: 'candidatename',
            text: 'Name',
        },
        {
            dataField:'clientname',
            text:"Client"
        },
        {
            dataField: 'dates',
            text: 'Offer Date',
            formatter: (cellContent, row) => {
               // var startdate = row.dates;
               
                return (
                 <label>{moment(row.dates).format('DD-MM-yyyy')}</label>
                );
              },
        },
        {
            dataField: 'recruitername',
            text: 'Recruiter',
        }
    ];
 
 
    return (
        <React.Fragment>
            <Row className="bg-white">
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default MonthOffer;


