import React, { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { deleteClient, getClientList, getClientModal, setClient } from '../../../redux/client/actions';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import EditClientModal from './EditClientModal';
import swal from 'sweetalert';
import config from '../../../helpers/baseurl';
import axios from 'axios';
import clientFile from '../../../assets/sampledata/Client.xlsx'
import { formatDate } from '../../../constants/dateFormat';
import moment from 'moment'

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
               // //console.log("rowdata", rowData)
              
        }
    }
   const NoDataIndication = () => (
        <div className="spinner">No records found        </div>
    );

    // let loginDetails = useSelector((state)=> state.Auth.user || []);
    const dispatch = useDispatch(); 
    // var username = loginDetails.Username;
    const [uploadReq, setuploadReq] = useState(false);
    const[uploadButton,SetUploadButton]=useState(true);
    const [uloadResData, setuloadResData]=useState('');

    const UPLOAD_ENDPOINT = `${urlpattern}UploadFile`;
    const [file, setFile] = useState(null);

    const uploadFile = file => {
        const formData = new FormData();
        formData.append("avatar", file);
    
        return axios.post(UPLOAD_ENDPOINT, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
        });
    };

    const handleExcelUploadSubmit = async e => {
        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        let res = await uploadFile(file);
       // //console.log(res.data);
        setuloadResData(res.data.Message)
        SetUploadButton(true)
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        if(res.data.Message!=="0-Records Added"){
          //  swal( "Success",res.data.Message);
            dispatch(getClientList());
            //uploadToogle();
            SetUploadButton(false)
            setuploadReq(false)
            setFile('')
        }else{
            swal('Failed',res.data.Message,"error")
           // swal("Somthing went wrong !", "error");
            SetUploadButton(false)
        }
    };
  
      const uploadToogle=()=>{
          setuploadReq(!uploadReq) 
          setuloadResData('')
      };  
      const handleOnChange = e => {
          ////console.log(e.target.files[0]);
          setFile(e.target.files[0]);
          if(e.target.files[0]){
            SetUploadButton(false)
          }
        };
  
    return (
        <>
            <Modal isOpen={uploadReq} toggle={uploadToogle} className={className}>
                <form >
                    <ModalHeader toggle={uploadToogle}>Upload Clients</ModalHeader>
                    <ModalBody>
                        <Row>
                        <Col lg={12}>
                        <form onSubmit={handleExcelUploadSubmit}>
                            <Row>
                            <Col lg={12} className="mb-5">  <h5><a href={clientFile} download="Client.xlsx">Download the clients sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                                <Col lg={8}> <input type="file" className="form-control" onChange={handleOnChange} /></Col>
                                <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">Upload File</button></Col>
                            
                                {/* <Col lg={12}><h4>{uloadResData}</h4></Col> */}
                            </Row>
                        </form>
                        </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                    {/* <Button color="primary" type="submit">Save</Button>{' '} */}
                    <Button color="primary" onClick={uploadToogle}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
            <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                {(props) => (
                    <React.Fragment>
                        <Row>
                            <Col md={6} className="">
                                <SearchBar {...props.searchProps} />
                            </Col>           
                            <Col md={6} className="text-right">
                                <button onClick={() => uploadToogle()} className="btn btn-secondary bg-secondary upbtn  mr-0">Upload</button>
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
        </>
            
    );
};

const ViewClient = () => {

    const dispatch = useDispatch(); 
    let records = useSelector((state) => state.Client.clients || []);
  // //console.log(records, 'join list');
    useEffect(() => {
        dispatch(getClientList());

        // eslint-disable-next-line 
    }, []);

    const columns = [
        {
            dataField: 'cname',
            text: 'Client Name',
            sort: true,
        },
        {
            dataField: 'cperson1',
            text: 'Contact Person Name',
        },
        {
            dataField: 'cemail1',
            text: 'Contact Email',
        },
        {
            dataField: 'ccnt1',
            text: 'Contact Number',
        },
        {
            dataField: 'cdate',
            text: 'Date Of Creation',
            formatter: (cellContent, row) => {
                var startdate = row.cdate;
               
                return (
                 <label>{moment(row.dates).format('DD-MM-yyyy')}</label>
                );
              },
        },
        {
            dataField: 'edit',
            text: 'Edit',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                  <button
                  className="btn btn-link text-secondary"
                    onClick={() => editClient(row)}
                    title="Edit"
                  >
                   <FeatherIcon.Edit />
                  </button>
                );
              },
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
    function editClient(row , id) {    
        // //console.log("activity id :",(id));
         // dispatch(getRequirementModal((row)));
 
        dispatch( setClient( row) );
        dispatch( getClientModal() );
     }

     function onDeleteRecord(row) {    
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this record?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteClient(row.cid));
            } else {
             //  //swal("Your Record is safe!");
            }
          });
        
        
     }
    return (
        <React.Fragment>
            <Row>
                <EditClientModal></EditClientModal>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ViewClient;


