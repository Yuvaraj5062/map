import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';
//import { getRoleList } from '../../../redux/role/actions';
import axios from 'axios';
import config from '../../../helpers/baseurl';
import swal from 'sweetalert';
import { getDocsList } from '../../../redux/uploaddocs/actions';
//import api from '../../../helpers/axios';
import * as api from '../../../helpers/restApi';
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
    const {
        // buttonLabel,
        className
    } = props;
    const rowEvent = {
        onDoubleClick: (row) => {
            
            setrowData((rowData) => [...rowData, row]);

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

const ViewDocument = () => {

    const dispatch = useDispatch(); 
  let records = useSelector((state) => state.Docs.docs|| []);
  ////console.log(records, 'join list');
 // const [documentData, setdocumentData]=useState([]);
    useEffect(() => {
        dispatch(getDocsList());

        // eslint-disable-next-line 
    }, []);
// const getDocsList=()=>{
//     var axios = require('axios');
//     var config = {
//     method: 'get',
//     url: `${urlpattern}FileAPI/GetFiles`,
//     headers: { }
//     };

//     axios(config)
//     .then(function (response) {
//    // //console.log(JSON.stringify(response.data));
//     setdocumentData(response.data)
//     })
//     .catch(function (error) {
//     //console.log(error);
//     });
// }
////console.log(documentData,'documentData')
//let records = documentData || [];


const downloadDocument = (row) => {
      api.downloadDocuments(row).then((res)=>
      
      {
          //console.log(res,"rettttttttttttttttttttttttt")
        if(res.status===200)
        {
            window.open(urlpattern +`FileAPI/GetFile?fileId=${row.id}`)
        }
        else{
            swal("Failed",res.data.Message,"error")
        }
      })
       
    
}

    const columns = [
      
        {
            dataField: 'Name',
            text: 'Document Name',
            sort: true,
        },
        {
            dataField: 'Employee_Code',
            text: 'Employee Code',
        },
        {
            dataField: 'Document_Type',
            text: 'Document Type',
        },
        // {
        //     dataField: 'email',
        //     text: 'Delete',
        //     formatter: (cellContent, row) => {
                
        //         return (
        //           <button
        //           className="btn btn-link text-secondary"
        //             onClick={() => onDeleteRecord(row)}
        //             title="Edit"
        //           >
        //            <FeatherIcon.Trash2 />
        //           </button>
        //         );
        //       },
        // },

        {
            dataField: 'download',
            text: 'Download Document',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                  <button
                  className="btn btn-link text-secondary"
                    onClick={() => downloadDocument(row)}
                    title="Download"
                  >
                   <FeatherIcon.Download />
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
                    url: `${urlpattern}UserRole_Master/${row.id}`,   
                  };
                  axios(config)
                  .then(function (response) {
                  // alert(response.data.Message)
                    //swal("Status Updated Successful", "success");
                    //toggle2();
                   // dispatch(getRoleList());
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

export default ViewDocument;


