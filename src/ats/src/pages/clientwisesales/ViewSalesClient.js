import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getCwsList } from '../../redux/clientwisesales/actions';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import axios from 'axios';
import config from '../../helpers/baseurl';
import swal from 'sweetalert';
var urlpattern = config.baseUrl;
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

    //        // dispatch( getJoinListModal() );
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

const ViewSalesClient = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.CWS.cws|| []);
    useEffect(() => {
        dispatch(getCwsList());

        // eslint-disable-next-line 
    }, []);

    const columns = [
        
        {
            dataField:'name',
            text:"Sales Name"
        },
        {
            dataField: 'clientname',
            text: 'Client Name',
        },
        {
            dataField: 'Delete',
            text: 'Delete',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                  <button
                  className="btn btn-link text-secondary"
                    onClick={() => onDeleteRecord(row)}
                    title="Delete"
                  >
                   <FeatherIcon.Trash2 />
                  </button>
                );
              },
        }
    ];
     function onDeleteRecord(row , id) {    
        swal({
            title: "Are you sure?",
            text: "Want to delete this record ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var config = {
                    method: 'DELETE',
                    url: `${urlpattern}SalesClientMaster/${row.id}`,   
                  };
                  axios(config)
                  .then(function (response) {
                    dispatch(getCwsList());
                  })
                  .catch(function (error) {
                    //console.log(error);
                  });
              swal("Your Record has been deleted!", {
                icon: "success",
              });
            } else {
               //swal("Your Record is safe!");
            }
          });
        
        
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

export default ViewSalesClient;


