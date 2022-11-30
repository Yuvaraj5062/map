import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';
import { getRoleList } from '../../../redux/role/actions';
import axios from 'axios';
import config from '../../../helpers/baseurl';
import swal from 'sweetalert';
var urlpattern = config.baseUrl;



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

const ViewUserRole = () => {

    const dispatch = useDispatch(); 
   let records = useSelector((state) => state.Role.role|| []);
  // //console.log(records, 'join list');
    useEffect(() => {
        dispatch(getRoleList());
  // eslint-disable-next-line 
    }, []);

    const columns = [
      
        {
            dataField: 'username',
            text: 'Employee Name',
            sort: true,
        },
        {
            dataField: 'role',
            text: 'Role',
        },
        {
            dataField: 'email',
            text: 'Delete',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                  <button
                  className="btn btn-link text-secondary"
                    onClick={() => onDeleteRecord(row)}
                    title="Edit"
                  >
                   <FeatherIcon.Trash2 />
                  </button>
                );
              },
        },
    ];
    
    function onDeleteRecord(row , id) {    
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this record?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                var config = {
                    method: 'DELETE',
                    url: `${urlpattern}UserRole_Master/${row.id}`,   
                  };
                  axios(config)
                  .then(function (response) {
                    swal(response.data.Status===true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
                  // alert(response.data.Message)
                    //swal("Status Updated Successful", "success");
                    //toggle2();
                    dispatch(getRoleList());
                  })
                  .catch(function (error) {
                    swal('Failed',error.response.data.Message,"error")
                  });
            //   swal("Your Record has been deleted!", {
            //     icon: "success",
            //   });
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

export default ViewUserRole;


