import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import config from '../../../../helpers/baseurl';
import axios from 'axios';
import swal from 'sweetalert';
//import axios from 'axios';

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
           // //console.log('rowdata', rowData);
        },
    };
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
                </React.Fragment>
            )}
        </ToolkitProvider>
    );
};

const SetOffer = (props) => {
    //const dispatch = useDispatch();
    //let records =  [];
    ////console.log(records, 'join list');
    useEffect(() => {
        getAllRequirementMaster();

        // eslint-disable-next-line
    }, []);
    const [requireData, setrequireData] = useState([]);
    //let loginDetails = useSelector((state) => state.Auth.user || []);
    var showrdt = props.viewSingleRequirement;
    //var getUsername = loginDetails.Username;
    var setjid = showrdt.c.J_Id;
    const getAllRequirementMaster = () => {
        var axios = require('axios');

        var data = '';

        var config = {
            method: 'get',
            url: `${urlpattern}OfferMaster?requirementid=${setjid}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: data,
        };

        axios(config)
            .then(function (response) {
               // //console.log(JSON.stringify(response.data));
                var newrequireData = response.data.Data;
                setrequireData(newrequireData);
            })
            .catch(function (error) {
                //console.log(error);
            });
    };
    let records = requireData || [];
   // //console.log(records, 'viewSingleRequirement records');

    const columns = [
        {
            dataField: 'name',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'clientname',
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
            text: 'Type',
        },
        {
            dataField: 'status',
            text: 'Status',
            formatter: (cellContent, row) => {
                //const id = row.J_Id;
               // //console.log(row, 'row data')
                return (
                    <button
                        type="button"
                        id="actionButton"
                        title="Action"
                        onClick={() => addCandidateDetails(row)}
                        className="btn btn-link text-secondary p-0">
                       {row.status}
                    </button>
                );
            },
        },
        {
            dataField: '',
            text: 'Change Status',
            formatter: (cellContent, row) => {
                //const id = row.J_Id;
                return (
                    <button
                        type="button"
                        id="actionButton"
                        title="Action"
                        onClick={() => changeOfferViewStatus(row)}
                        className="btn btn-link text-secondary p-0">
                        Change
                        {/* <i className="uil uil-file-exclamation-alt"></i> */}
                    </button>
                );
            },
        },
    ];
    const [modal, setModal] = useState(false);
    
    const  [status, setstatus] = useState('');
    const[offerId, setofferId]=useState('');
    const toggle = () => setModal(!modal);
   
    function changeOfferViewStatus(row, id) {
        var offerId =row.offerid;
        setofferId(offerId);
        toggle();
    }
    const [candidatemodal, setCandidateModal] = useState(false);
    const toggleCandidateModal = () => setCandidateModal(!candidatemodal);
    const [IdOffer, setIdOffer] = useState()
    const [name, setname] = useState('')
    const [gender, setgender] = useState('')
    const [dob, setdob] = useState('')
    const [maritalstatus, setmaritalstatus] = useState('')
    const [mobileno, setmobileno] = useState('')
    const [alternativno, setalternativno] = useState('')
    const [email, setemail] = useState('')
    const [addarno, setaddarno] = useState('')
    const [panno, setpanno] = useState('')
    const [currentaddress, setcurrentaddress] = useState('')
    const [permanantaddress, setpermanantaddress] = useState('')
    const [country, setcountry] = useState('')
    const [emergencyno, setemergencyno] = useState('')
    const [clientname, setclientname] = useState('')
    const [location, setlocation] = useState('')
    const [currentdesignation, setcurrentdesignation] = useState('')
    const [offerdesignation, setofferdesignation] = useState('')
    const [totalexperience, settotalexperience] = useState('')
    const [relavantexperience, setrelavantexperience] = useState('')
    const [skill, setskill] = useState('')
    const [selectiondate, setselectiondate] = useState('')
    const [offerdate, setofferdate] = useState('')
    const [joindate, setjoindate] = useState('')
    const [ctc, setctc] = useState('')
    const [ectc, setectc] = useState('')
    const [grossprofitmargin, setgrossprofitmargin] = useState('')
    const [grossprofit, setgrossprofit] = useState('')
    const [type, settype] = useState('')
    const [offstatus, setoffstatus] = useState('')
    const [note, setnote] = useState('')
    const [billrate, setbillrate] = useState('')
    const [payrate, setpayrate] = useState('')
    const [bankaccountno, setbankaccountno] = useState('')
    const [bankname, setbankname] = useState('')
    const [branch, setbranch] = useState('')
    const [ifci, setifci] = useState('')
    function addCandidateDetails(row, id) {
       // //console.log(row, 'rowdataoffer')
        setIdOffer(row.offerid)
        setname(row.name)
        setclientname(row.clientname)
        settype(row.type)
        toggleCandidateModal();
    }
    const handleCandidateSubmit=(e)=>{
        e.preventDefault();
        var data = {
            offerid: IdOffer,
            // interviewid: interviewid,
            // resumeid: resumeid,
            // requirementid: requirementid,
            name: name,
            dob: dob,
            gender: gender,
            maritalstatus: maritalstatus,
            currentaddress: currentaddress,
            permanantaddress: permanantaddress,
            country: country,
            email: email,
            currentdesignation: currentdesignation,
            offerdesignation: offerdesignation,
            skill: skill,
            totalexperience: totalexperience,
            relavantexperience: relavantexperience,
            mobileno: mobileno,
            alternativno: alternativno,
            panno: panno,
            clientname: clientname,
            location: location,
            ctc: ctc,
            ectc: ectc,
            billrate: billrate,
            payrate: payrate,
            grossprofit: grossprofit,
            grossprofitmargin: grossprofitmargin,
            selectiondate: selectiondate,
            offerdate:offerdate,
            joindate: joindate,
            exitdate: "",
            emergencyno: emergencyno,
            bankaccountno: bankaccountno,
            bankname: bankname,
            branch: branch,
            ifci: ifci,
            addarno: addarno,
            status:offstatus,
            note: note,
            type: type,
          };
            
            var config = {
              method: 'PUT',
              url: `${urlpattern}OfferMaster`,          
              data : data
            };
            //(data);
            axios(config)
            .then(function (response) {
              ////console.log(JSON.stringify(response.data));
              getAllRequirementMaster();
              swal("Offer Updated Successful", "success");
              //swal("Status Updated Successful", "success");
              toggleCandidateModal();
              cleanForm();
            })
            .catch(function (error) {
                swal("Somthing went wrong !", "error");
            });
    }
    const cleanForm=()=>{
        setIdOffer('')
        setname('')
        setgender('')
        setdob('')
        setmaritalstatus('')
        setmobileno('')
        setalternativno('')
        setemail('')
        setaddarno('')
        setpanno('')
        setcurrentaddress('')
        setpermanantaddress('')
        setcountry('')
        setemergencyno('')
        setclientname('')
        setlocation('')
        setcurrentdesignation('')
        setofferdesignation('')
        settotalexperience('')
        setrelavantexperience('')
        setskill('')
        setselectiondate('')
        setofferdate('')
        setjoindate('')
        setctc('')
        setectc('')
        setgrossprofitmargin('')
        setgrossprofit('')
        settype('')
        setoffstatus('')
        setnote('')
        setbillrate('')
        setpayrate('')
        setbankaccountno('')
        setbankname('')
        setbranch('')
        setifci('')
    }
    const {
        // buttonLabel,
         className
       } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
      //var getcfid=formtDetails.cfid;
       var data = {
        status: status,
        cfid:offerId
      };
        
        var config = {
          method: 'PUT',
          url: `${urlpattern}OfferMaster?offerid=${offerId}&status=${status}`,          
          data : data
        };
       // //console.log(data);
        axios(config)
        .then(function (response) {
         // //console.log(JSON.stringify(response.data));
          getAllRequirementMaster();
          swal("Status Updated Successful", "success");
          //swal("Status Updated Successful", "success");
          toggle();
        })
        .catch(function (error) {
            swal("Somthing went wrong !", "error");
        });
      };
    return (
        <React.Fragment>
            <Row>
            <Col className="text-right" lg={12}>
                 <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={getAllRequirementMaster}>Refresh</button>
                 <button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={props.goBackToRequirement}>Go Back To Requirement</button>
                 </Col>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggle} className={className}>
            <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Change Status</ModalHeader>
        <ModalBody>
        <Row>
                       <Col lg={12}>
                     <label>Status</label>
                           <select className="form-control"
                            onChange={(e) => {
                                setstatus(e.target.value);
                              }}
                              name="status">
                               <option value="">Select</option>
                               <option value="To Be Join">To Be Join</option>
                               <option value="Hold">Hold</option>
                               <option value="BD">BD</option>
                               <option value="Join">Join</option>
                               <option value="Reject">Reject</option>
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

      <Modal size={"lg"} isOpen={candidatemodal} toggle={toggleCandidateModal} className={className}>
            <form onSubmit={handleCandidateSubmit}>
        <ModalHeader toggle={toggleCandidateModal}>Add Candidate Details</ModalHeader>
        <ModalBody style={{
      maxHeight: 'calc(100vh - 210px)',
      overflowY: 'auto'
     }}>
           <Row>
                       <Col lg={4}>
                     <label>Full Name</label>
                     <Input
                        type="text"
                        name="name"
                        disabled
                        id="name"                                         
                        value={name}
                        onChange={(e) => {
                            setname(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Gender</label>
                           <select className="form-control"
                           value={gender}
                            onChange={(e) => {
                                setgender(e.target.value);
                              }}
                              name="gender"
                              id="gender">
                               <option value="">Select</option>
                               <option value="Male">Male</option>
                               <option value="Female">Female</option>
                           </select>
                       </Col>
                       <Col lg={4}>
                     <label>Date Of Birth</label>
                     <Input
                        type="date"
                        name="dob"
                        id="dob"                                         
                        value={dob}
                        onChange={(e) => {
                            setdob(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>Marital Status</label>
                     <Input
                        type="text"
                        name="maritalstatus"
                        id="maritalstatus"                                         
                        value={maritalstatus}
                        onChange={(e) => {
                            setmaritalstatus(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Contact Number</label>
                     <Input
                        type="number"
                        name="mobileno"
                        id="mobileno"                                         
                        value={mobileno}
                        onChange={(e) => {
                            setmobileno(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Alternate Number</label>
                     <Input
                        type="number"
                        name="alternativno"
                        id="alternativno"                                         
                        value={alternativno}
                        onChange={(e) => {
                            setalternativno(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>Email</label>
                     <Input
                        type="email"
                        name="email"
                        id="email"                                         
                        value={email}
                        onChange={(e) => {
                            setemail(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Aadhar Number</label>
                     <Input
                        type="number"
                        name="addarno"
                        id="addarno"                                         
                        value={addarno}
                        onChange={(e) => {
                            setaddarno(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>PAN Number</label>
                     <Input
                        type="text"
                        name="panno"
                        id="panno"                                         
                        value={panno}
                        onChange={(e) => {
                            setpanno(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={6}>
                     <label>Current Address</label>
                     <Input
                        type="textarea"
                        name="currentaddress"
                        id="currentaddress"                                         
                        value={currentaddress}
                        onChange={(e) => {
                            setcurrentaddress(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={6}>
                     <label>Permanant Address</label>
                     <Input
                        type="textarea"
                        name="permanantaddress"
                        id="permanantaddress"                                         
                        value={permanantaddress}
                        onChange={(e) => {
                            setpermanantaddress(e.target.value);
                        }}/>
                       </Col>
                </Row>
                <Row className="mt-2">
                       <Col lg={4}>
                     <label>Country</label>
                     <Input
                        type="text"
                        name="country"
                        id="country"                                         
                        value={country}
                        onChange={(e) => {
                            setcountry(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Emergency Contact</label>
                     <Input
                        type="text"
                        name="emergencyno"
                        id="emergencyno"                                         
                        value={emergencyno}
                        onChange={(e) => {
                            setemergencyno(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Company Name</label>
                     <Input
                        type="text"
                        disabled
                        name="clientname"
                        id="clientname"                                         
                        value={clientname}
                        onChange={(e) => {
                            setclientname(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>Joining Location</label>
                     <Input
                        type="text"
                        name="location"                        
                        id="location"                                         
                        value={location}
                        onChange={(e) => {
                            setlocation(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Current Designation</label>
                     <Input
                        type="text"
                        name="currentdesignation"
                        id="currentdesignation"                                         
                        value={currentdesignation}
                        onChange={(e) => {
                            setcurrentdesignation(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Offer Designation</label>
                     <Input
                        type="text"
                        name="offerdesignation"
                        id="offerdesignation"                                         
                        value={offerdesignation}
                        onChange={(e) => {
                            setofferdesignation(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>Total Experience</label>
                     <Input
                        type="number"
                        name="totalexperience"
                        id="totalexperience"                                         
                        value={totalexperience}
                        onChange={(e) => {
                            settotalexperience(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Relative Experience</label>
                     <Input
                        type="number"
                        name="relavantexperience"
                        id="relavantexperience"                                         
                        value={relavantexperience}
                        onChange={(e) => {
                            setrelavantexperience(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Skill </label>
                     <Input
                        type="text"
                        name="skill"
                        id="skill"                                         
                        value={skill}
                        onChange={(e) => {
                            setskill(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>Selection Date</label>
                     <Input
                        type="date"
                        name="selectiondate"
                        id="selectiondate"                                         
                        value={selectiondate}
                        onChange={(e) => {
                            setselectiondate(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Offer Date</label>
                     <Input
                        type="date"
                        name="offerdate"
                        id="offerdate"                                         
                        value={offerdate}
                        onChange={(e) => {
                            setofferdate(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Join Date </label>
                     <Input
                        type="date"
                        name="joindate"
                        id="joindate"                                         
                        value={joindate}
                        onChange={(e) => {
                            setjoindate(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>CTC</label>
                     <Input
                        type="number"
                        name="ctc"
                        id="ctc"                                         
                        value={ctc}
                        onChange={(e) => {
                            setctc(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>ECTC</label>
                     <Input
                        type="number"
                        name="ectc"
                        id="ectc"                                         
                        value={ectc}
                        onChange={(e) => {
                            setectc(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Margin(In %)</label>
                     <Input
                        type="number"
                        name="grossprofitmargin"
                        id="grossprofitmargin"                                         
                        value={grossprofitmargin}
                        onChange={(e) => {
                            setgrossprofitmargin(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                       <Col lg={4}>
                     <label>GP </label>
                     <Input
                        type="text"
                        name="grossprofit"
                        id="grossprofit"                                         
                        value={grossprofit}
                        onChange={(e) => {
                            setgrossprofit(e.target.value);
                        }}/>
                       </Col>
                      
                       <Col lg={4}>
                     <label>Type  </label>
                     <Input
                        type="text"
                        name="type"
                        id="type"    
                        disabled                                     
                        value={type}
                        onChange={(e) => {
                            settype(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                       <label>Status</label>
                           <select className="form-control"
                           value={offstatus}
                            onChange={(e) => {
                                setoffstatus(e.target.value);
                              }}
                              name="status">
                               <option value="">Select</option>
                               <option value="To Be Join">To Be Join</option>
                               <option value="Hold">Hold</option>
                               <option value="BD">BD</option>
                               <option value="Join">Join</option>
                               <option value="Reject">Reject</option>
                           </select>
                           </Col>
                           </Row>
                           <Row className="mt-2">
                           <Col lg={4}>
                     <label>Bill Rate</label>
                     <Input
                        type="number"
                        name="billrate"
                        id="billrate"                                         
                        value={billrate}
                        onChange={(e) => {
                            setbillrate(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Pay Rate</label>
                     <Input
                        type="number"
                        name="payrate"
                        id="payrate"                                         
                        value={payrate}
                        onChange={(e) => {
                            setpayrate(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Bank Account No</label>
                     <Input
                        type="text"
                        name="bankaccountno"
                        id="bankaccountno"                                         
                        value={bankaccountno}
                        onChange={(e) => {
                            setbankaccountno(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                       <Row className="mt-2">
                           <Col lg={4}>
                     <label>Bank Name</label>
                     <Input
                        type="text"
                        name="bankname"
                        id="bankname"                                         
                        value={bankname}
                        onChange={(e) => {
                            setbankname(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>Branch</label>
                     <Input
                        type="text"
                        name="branch"
                        id="branch"                                         
                        value={branch}
                        onChange={(e) => {
                            setbranch(e.target.value);
                        }}/>
                       </Col>
                       <Col lg={4}>
                     <label>IFSC Code</label>
                     <Input
                        type="text"
                        name="ifci"
                        id="ifci"                                         
                        value={ifci}
                        onChange={(e) => {
                            setifci(e.target.value);
                        }}/>
                       </Col>
                       </Row>
                           <Row className="mt-2">
                       <Col lg={4}>
                     <label>Note</label>
                     <Input
                        type="text"
                        name="note"
                        id="note"                                         
                        value={note}
                        onChange={(e) => {
                            setnote(e.target.value);
                        }}/>
                       </Col>
                           </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="primary" onClick={toggleCandidateModal}>Cancel</Button>
        </ModalFooter>
        </form>
      </Modal>
        </React.Fragment>
    );
};

export default SetOffer;
