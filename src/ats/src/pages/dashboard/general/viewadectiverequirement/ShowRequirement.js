import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import config from '../../../../helpers/baseurl';


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
    const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    
      const rowEvent = {
        onDoubleClick: (row) => {
            
                setrowData((rowData) => [...rowData, row]);
               // //console.log("rowdata", rowData)
              
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

const ShowRequirementCritical = (props) => {

    //const dispatch = useDispatch(); 
    //let records =  [];
  ////console.log(records, 'join list');
    useEffect(() => {
      getAllRequirementMaster();

        // eslint-disable-next-line 
    }, []);
    const [requireData, setrequireData]=useState([]);
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    var showrdt =props.viewSingleRequirement;
    const getAllRequirementMaster=()=>{
      var axios = require('axios');
      var getUsername = loginDetails.Username;
      var setjid = showrdt.c.J_Id;
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
  ////console.log(JSON.stringify(response.data));
  var newrequireData =response.data.Data;
  setrequireData(newrequireData);
})
.catch(function (error) {
  //console.log(error);
});

    }
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
            text: 'Total Experince',
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
        dataField: 'c.R_updateby',
        text: 'Upload By',
    },
    {
      dataField: 'c.R_updateon',
      text: 'Upload On',
  },
  {
    dataField: 'c.R_Status',
    text: 'Status',
},
        {
            dataField: 'Action',
            text: 'Action',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button type="button" 
                    id="actionButton" title="Action"
                onClick={() => {_validateFunction(row=[])}} 
                className="btn btn-link text-secondary">
                 <FeatherIcon.Target />
                 {/* <i className="uil uil-file-exclamation-alt"></i> */}
                </button>
                );
              },
        },
    ];
    function _validateFunction(row , id) {    
        // //console.log("activity id :",(id));
         // dispatch(getRequirementModal((row)));
 
         //dispatch( setSaveRequirement( row) );
 
          //   dispatch( getRequirementModal() );
     }
    return (
        <React.Fragment>
           <Row>
           <Col className="text-right" lg={12}><button className="btn btn-secondary bg-secondary upbtn  mr-0" onClick={props.goBackToRequirement}>Go Back To Requirement</button></Col>
                <Col lg={6} className="mt-2">
                  <label className="col-sm-12"><b>Job Code :</b> {showrdt.c.J_Code} </label>
                  <label className="col-sm-12"><b>Client Name :</b> {showrdt.d.C_Name}</label>
                  <label className="col-sm-12"><b>Skill :</b> {showrdt.c.J_Skill}</label>
                  <label className="col-sm-12"><b>Position :</b> {showrdt.c.J_Position}</label>
                  <label className="col-sm-12"><b>Location :</b> {showrdt.c.J_Position}</label>
                  <label className="col-sm-12"><b>End Client :</b> {showrdt.c.J_Location}</label>
                  <label className="col-sm-12"><b>Total Experience :</b> {showrdt.c.J_Tot_Max_Exp} Years &nbsp;To &nbsp;{showrdt.jtotmin} Years</label>
                  <label className="col-sm-12"><b>Relevent Experience :</b> {showrdt.c.J_Rel_Max_Exp} Years&nbsp; To &nbsp;{showrdt.jrelmin} Years</label>
                </Col>
                <Col lg={6}>
                  <label className="col-sm-12"><b>Category :</b> {showrdt.c.J_Category}</label>
                  <label className="col-sm-12"><b>Type :</b> {showrdt.c.J_Type}</label>
                  <label className="col-sm-12"><b>Employement Type :</b> {showrdt.c.J_Employment_Type}</label>
                  <label className="col-sm-12"><b>POC Name :</b> {showrdt.c.J_POC}</label>
                  <label className="col-sm-12"><b>Assign User : </b>{showrdt.c.J_AssignUser}</label>
                  <label className="col-sm-12"><b>Mandatory Skill :</b> {showrdt.c.J_MandatorySkill}</label>
                  <label className="col-sm-12"><b>Job Description : </b>{showrdt.c.J_JD}</label>
                  <label className="col-sm-12"><b>Test Requirement :</b> {showrdt.c.J_Skill}</label>
                </Col>
           </Row>     
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ShowRequirementCritical;


