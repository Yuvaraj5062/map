import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import config from '../../helpers/baseurl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import swal from 'sweetalert';
import resumeFile from '../../../src/assets/sampledata/testResumeFile.docx'
import { formatDate } from '../../constants/dateFormat';
//import axios from 'axios';
import moment from 'moment';

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
    const { SearchBar } = Search;
    //const dispatch = useDispatch();
   // const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    
      const rowEvent = {
        onDoubleClick: (row) => {
            
               // setrowData((rowData) => [...rowData, row]);
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

const ResumeUpload = (props) => {
  
  let loginDetails = useSelector((state)=> state.Auth.user || []);
    

  //console.log(loginDetails,"loginDetails")

    //const dispatch = useDispatch(); 
    //let records =  [];
  ////console.log(records, 'join list');


  useEffect(() => {
    getAllRequirementMaster();

      // eslint-disable-next-line 
  }, []);
    const [requireData, setrequireData]=useState([]);
   
    var showrdt =props.viewSingleRequirement;
    var getUsername = loginDetails.Username;
    var setjid = showrdt.jid;
    const getAllRequirementMaster=()=>{
      var axios = require('axios');
     
     
var data = '';

var config = {
  method: 'get',
  url: `${urlpattern}ResumeMaster?jid=${setjid}&username=${getUsername}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
 // //console.log(response.data.Data, "<<<<<<<<<<<<<<");
  var newrequireData =response.data.Data;
  //alert(response.data.Data)
  setrequireData(newrequireData);
})
.catch(function (error) {
  //alert(error)
 // //console.log(error,'<<<<<<<<<<<<<<<');
});

    }
  
    //const[rid ,setrid]=useState('');
let records = requireData ||[];
////console.log(records,"viewSingleRequirement records");

    const columns = [
        {
            dataField: 'c.R_Name',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'c.R_Cnt',
            text: 'Number',
        },
        {
            dataField: 'c.R_Email',
            text: 'Email',
        },
        {
            dataField: 'c.R_Tot_Exp',
            text: 'Total Experience',
        },
        {
            dataField: 'c.R_NP',
            text: 'Notice Period',
        },
        {
          dataField: 'c.R_Cur_CTC',
          text: 'CTC',
      },
      {
        dataField: 'd.E_Fullname',
        text: 'Upload By',
    },
  {
    dataField: 'c.R_CreateOn',
    text: 'Upload On',
    formatter: (cellContent, row) => {

      const joindate = moment(row.c.R_CreateOn);
      return (
        <label>  {joindate.format('DD-MM-yyyy')}</label>
      );
        // var joindate = row.c.R_CreateOn;
        // return (
        //  <label>{formatDate(joindate)}</label>
        // );
      },
},
  {
    dataField: 'c.R_Status',
    text: 'Status',
    formatter: (cellContent, row) => {
        //const id = row.jid;
        return (
            <React.Fragment>
                {
                    row.c.R_Status==="Accept" ?
                    <button
                    type="button"
                    id="actionButton"
                    title="Action"
                    onClick={() => changeResumeUploadStatus(row)}
                    className="btn btn-link text-secondary p-0">
                    {row.c.R_Status}
                    {/* <i className="uil uil-file-exclamation-alt"></i> */}
                </button>:      
                <p> {row.c.R_Status}</p>
                }
           
            </React.Fragment>
        );
    },
},

   loginDetails.Role!=="Recruiter"&&(
        {
            dataField: 'accept',
            text: 'Accept',
            formatter: (cellContent, row) => {
              ////console.log(row, '1resume action data');
              //setrid(row.iid);
                return (
                    <button type="button" 
                    id="actionButton" title="Accept"
                onClick={() => {acceptresume(row)}} 
                className="btn btn-link text-secondary">
                 <FeatherIcon.CheckSquare />
                 {/* <i className="uil uil-file-exclamation-alt"></i> */}
                </button>
                );
              },
        }),
   
   loginDetails.Role!=="Recruiter"&&(
        {
          dataField: 'reject',
          text: 'Reject',
          formatter: (cellContent, row) => {
           // //console.log(row, '1resume action data');
           // setrid(row.iid);
              return (
                  <button type="button" 
                  id="actionButton" title="Reject"
              onClick={() => {rejectresume(row)}} 
              className="btn btn-link text-secondary">
               <FeatherIcon.Delete />
               {/* <i className="uil uil-file-exclamation-alt"></i> */}
              </button>
              );
            },
      }
      ),
    ];
    function acceptresume(row , id) {    
      var resid= row.c.R_Id;
      ////console.log(row, 'acceptresume');
      var config = {
        method: 'PUT',
        url: `${urlpattern}ResumeStatus?resid=${resid}&resumestatus=Accept`, 
      };
      ////console.log(data);
      axios(config)
      .then(function (response) {
        ////console.log(JSON.stringify(response.data));
        getAllRequirementMaster();
        swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
        //toggle2();
      })
      .catch(function (error) {
        swal('Failed', error.response.data.Message,  "error");
      });
     }
     function rejectresume(row , id) {    
      var resid= row.c.R_Id;
      var config = {
        method: 'PUT',
        url: `${urlpattern}ResumeStatus?resid=${resid}&resumestatus=Reject`, 
      };
      ////console.log(data);
      axios(config)
      .then(function (response) {
       // //console.log(JSON.stringify(response.data));
        getAllRequirementMaster();
        swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
      
        //toggle2();
      })
      .catch(function (error) {
        swal('Failed', error.response.data.Message,  "error");
      });
     }
     const [modal, setModal] = useState(false);
     const  [status, setstatus] = useState('');
     const  [interviewid, setinterviewid]=useState('');
     const  [interviewname, setinterviewname]=useState('');
     const  [interviewdate, setinterviewdate] = useState('');
     const  [interviewtime, setinterviewtime] = useState('');
     const  [interviewby, setinterviewby] = useState('');
     const  [interviewlocation, setinterviewlocation] = useState('');
     const  [interviewnote, setinterviewnote] = useState('');

     const toggle = () => setModal(!modal);
     function changeResumeUploadStatus(row, id) {
         var interviewid =row.c.R_Id;
         var candidatename =row.c.R_Name;
         setinterviewid(interviewid);
         setinterviewname(candidatename);
         toggle();
     }
     const {
         // buttonLabel,
          className
        } = props;
     const handleSubmitUpload = (e) => {
         e.preventDefault();
       //var getcfid=formtDetails.cfid;
        var data = {
         status: status,
         resumeid:interviewid,
         requirementid:setjid,
         interviewdate:interviewdate,
         interviewtime:interviewtime,
         interviewby:interviewby,
         interviewlocation:interviewlocation,
         interviewnote:interviewnote,
         username:getUsername

       };
         
         var config = {
           method: 'POST',
           url: `${urlpattern}InterviewMaster`,          
           data : data
         };
        // //console.log(data);
         axios(config)
         .then(function (response) {
           ////console.log(JSON.stringify(response.data));
           getAllRequirementMaster();
           //swal("Status Updated Successful", "success");
           swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
           toggle();
         })
         .catch(function (error) {
          swal('Failed', error.response.data.Message,  "error");
         });
       };
    const [file, setFile] = useState(null);
    const [uploadRes, setuploadRes] = useState(false);
    const [uploadResData, setuploadResData]=useState('');
    const[uploadButton,SetUploadButton]=useState(true);
    const uploadToogle=()=>{
      setuploadRes(!uploadRes);
      setuploadResData('')
    }
  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    SetUploadButton(true)
    formData.append('File', file);

    fetch(
     `${urlpattern}ResumeMaster?jid=${setjid}&username=${getUsername}`,
        {
            method: 'POST',
            body: formData,
        }
    )
        .then((response) => response.json())
        .then((result) => {
            //console.log('Success:', result);
            setuploadResData(result.Message)
            if(result.Status)
            {
              swal(result.Status==true?'Success':'Failed', result.Message, result.Status==true?'success':'error');
            getAllRequirementMaster();
            SetUploadButton(false)
            }
            else{
              swal(result.Status==true?'Success':'Failed', result.Message, result.Status==true?'success':'error');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            swal('Failed', error.response.data.Message,  "error");
            SetUploadButton(false)
        });
};
  
  

  const handleOnChange = e => {
    ////console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    if(e.target.files[0]){
      SetUploadButton(false)
    }
  };

  //console.log(loginDetails,"loginDetails")
    return (
        <React.Fragment>
           <Modal isOpen={uploadRes} toggle={uploadToogle} className={className}>
            <form >
        <ModalHeader toggle={uploadToogle}>Upload Resume</ModalHeader>
        <ModalBody>
        <Row>
        <Col lg={12} className='mt-2'>
        <form onSubmit={handleSubmit}>
                <Row>
                <Col lg={12}  className="mb-5">  <h5><a href={resumeFile} download="Resume.docx">Download Resume sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                    <Col lg={8}> <input type="file" className="form-control" onChange={handleOnChange} /></Col>
                    <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">Upload File</button></Col>
                
                    {/* <Col lg={12} className='mt-2'>  <h4>{uploadResData}</h4></Col> */}
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
      <Col lg={12}  className="text-right mr-0 pr-0">
      <button onClick={() => uploadToogle()} className="btn btn-secondary bg-secondary upbtn  mr-0">Upload</button>
      <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={props.goBackToRequirement}>Go Back To Requirement</button>
      </Col>
           {/* <form onSubmit={handleSubmit}>
           <Row>
                    <Col lg={3}> <input type="file" className="form-control" onChange={handleOnChange} /></Col>
                    <Col lg={3}><button className="btn btn-primary" type="submit">Upload File</button></Col>
                    <Col className="text-right" lg={6}><button className="btn btn-primary" onClick={props.goBackToRequirement}>Go Back To Requirement</button></Col>
                 </Row>
    </form> */}
           
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmitUpload}>
        <ModalHeader toggle={toggle}>Schedule Interview</ModalHeader>
        <ModalBody>
        <Row>
        <Col lg={12} className='mt-2'>
                     <label>Interview Date</label>
                           <input type="date" className="form-control"
                              onKeyDown={(e) => e.preventDefault()}
                              min={moment(new Date).format('YYYY-MM-DD')}
                            onChange={(e) => {
                                setinterviewdate(e.target.value);
                              }}
                              name="interviewdate"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Interview Time</label>
                           <input type="time" className="form-control"
                            onChange={(e) => {
                                setinterviewtime(e.target.value);
                              }}
                              name="interviewtime"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Candidate Name</label>
                           <input type="text" className="form-control"
                           value={interviewname}
                              name="status"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Interview By</label>
                           <input type="text" className="form-control"
                            onChange={(e) => {
                                setinterviewby(e.target.value);
                              }}
                              name="interviewby"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Interview Location</label>
                           <input type="text" className="form-control"
                            onChange={(e) => {
                                setinterviewlocation(e.target.value);
                              }}
                              name="interviewlocation"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Note</label>
                           <input type="text" className="form-control"
                            onChange={(e) => {
                                setinterviewnote(e.target.value);
                              }}
                              name="interviewnote"/>
                       </Col>
                       <Col lg={12} className='mt-2'>
                     <label>Status</label>
                           <select className="form-control"
                            onChange={(e) => {
                                setstatus(e.target.value);
                              }}
                              name="status">
                               <option value="">Select</option>
                               <option value="Set">Set</option>
                               <option value="Hold">Hold</option>
                               <option value="Interview">Interview</option>
                               <option value="Reject">Reject</option>
                               <option value="Re Schedule">Re Schedule</option>
                               <option value="No show">No show</option>
                               <option value="Offer">Offer</option>
                           </select>
                       </Col>
                       
                       </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="primary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
        </form>
      </Modal>
        </React.Fragment>
    );
};

export default ResumeUpload;


