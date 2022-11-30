import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, FormGroup, Form, Label, Input} from 'reactstrap';
import { getClientList } from '../../../redux/client/actions';
import { setCall } from '../../../redux/salescallreport/actions';
import * as FeatherIcon from 'react-feather';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { getSalarySlipList } from '../../../redux/salaryslip/actions';
import { monthsList, yearsList } from '../../../constants/dateFormat';
import axios from 'axios';
import config from '../../../helpers/baseurl';
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
    // const { SearchBar } = Search;
    //const dispatch = useDispatch();
    const [rowData, setrowData] = useState([]);
    //const [rowSelect, setrowSelect] = useState([]);
    // const {
    //     // buttonLabel,
    //      className
    //    } = props;
      const rowEvent = {
        onDoubleClick: (row) => {
            
                setrowData((rowData) => [...rowData, row]);
              
        }
    }
    const NoDataIndication = () => (
        // <div className="spinner">
        //   <div className="rect1" />
        //   <div className="rect2" />
        //   <div className="rect3" />
        //   <div className="rect4" />
        //   <div className="rect5" />
        // </div>
        <div></div>
      );
      
    // let loginDetails = useSelector((state)=> state.Auth.user || []);
    // const dispatch = useDispatch(); 
    // var username = loginDetails.Username;
    // const [uploadReq, setuploadReq] = useState(false);
    // const[uploadButton,SetUploadButton]=useState(true);
    // const [uloadResData, setuloadResData]=useState('');

    // const UPLOAD_ENDPOINT = `${urlpattern}UserUpload?username=${username}`;
    // const [file, setFile] = useState(null);

    // const uploadFile = file => {
    //     const formData = new FormData();
    //     formData.append("avatar", file);
    
    //     return axios.post(UPLOAD_ENDPOINT, formData, {
    //       headers: {
    //         "content-type": "multipart/form-data"
    //       }
    //     });
    //   };

    return (
        <>
            <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
                {(props) => (
                    <React.Fragment>
                        <BootstrapTable
                            {...props.baseProps}
                            bordered={false}
                            // defaultSorted={defaultSorted}
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


const ViewSalrySlip = () => {
    const columns = [
        {
            dataField:'salaryid',
            text:'ID',
            hidden: true
        },
        {
            dataField: 'empcode',
            text: 'Employee Code',
            //sort: true,
        },
        {
            dataField: 'empname',
            text: 'Name',
            // sort: true,
        },
        {
            dataField: 'download',
            text: 'Download PDF',
            formatter: (cellContent, row) => {
                //const id = row.jid;
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

    const dispatch = useDispatch(); 
    let records = useSelector((state) => state.SalarySlip.salarySlips);
    let loginDetails = useSelector((state)=> state.Auth.user || [])
    const [companyList] = useState(["ARCHE SOFTRONIX PVT LTD","Reyna Techonologies"])
    const [companyName, setCompanyName] = useState('')
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')

    const downloadSalarySlip = (row) => {
        if(companyName === "ARCHE SOFTRONIX PVT LTD"){            
            window.open(urlpattern + 'DownloadSalarySlip?salaryid='+ row.salaryid)
        }else if(companyName === "Reyna Techonologies"){
            window.open(urlpattern + 'DownloadReynaSalarySlip?salaryid='+ row.salaryid)
        }
    }
    useEffect(() => {
        // dispatch(getSalarySlipList());
        // eslint-disable-next-line 
    }, []);

    const handleSearch = () => {
        let data = {
            "salarymonth": month,
            "salaryyear": year,
            "companyname": companyName,
            "username":loginDetails.Username 
        }
        dispatch(getSalarySlipList(data));
    }
    
    const handelCompanyChange=(compnayName)=>{
        setCompanyName(compnayName)
        if(compnayName.length === 0){
            setCompanyName('')
            setYear('')
            setMonth('')
        }
    }
    return (
        <React.Fragment>
            {/* <form onSubmit={() => handleSearch}> */}
            <Row className="mt-3">
                <Col md={3} className="">
                    <FormGroup>
                        <Label for="empleadoNombre"> Company <span className="redspan">*</span></Label>
                        <select className="form-control style-input" value={companyName}
                            onChange={(e) => handelCompanyChange(e.target.value)}>
                                <option value="">Select Company</option>
                            
                                   
                                        <option value={"ARCHE SOFTRONIX PVT LTD"} >{"ARCHE SOFTRONIX PVT LTD"}</option>
                                        <option value={"Reyna Techonologies"} >{"Reyna Solutions LLP"}</option>
                                   
                                
                        </select>
                    </FormGroup>
                </Col>   
                <Col md={3} className="">
                    <FormGroup>
                        <Label for="empleadoNombre"> Year <span className="redspan">*</span></Label>
                        {/* <input type="date" className="form-control style-input"
                        onChange={(event) => {}}/> */}
                        <select className="form-control style-input" value={year}
                            onChange={(event) => setYear(event.target.value)}>
                                <option value=''>Select Year</option>
                                {
                                    yearsList().map((year) => (
                                        <option value={year} key={year}>{year}</option>
                                    ))
                                }
                        </select>
                    </FormGroup>
                </Col>   
                <Col md={3} className="">
                    <FormGroup>
                        <Label for="empleadoNombre"> Month <span className="redspan">*</span></Label>
                        {/* <input type="date" className="form-control style-input"
                        onChange={(event) => {}}/> */}
                        <select className="form-control style-input" value={month}
                            onChange={(event) => setMonth(event.target.value)}>
                                <option value=''>Select Month</option>
                                {
                                    monthsList.map((month) => (
                                        <option value={month} key={month}>{month}</option>
                                    ))
                                }
                        </select>
                    </FormGroup>
                </Col>   
                <Col md={3} className="mt-4">
                    <button type="submit" className="btn btn-primary" 
                    disabled={!month || !year || !companyName}
                    onClick={handleSearch}>Search</button>
                </Col>                     
            </Row>
            {/* </form> */}
            <Row>
                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ViewSalrySlip;



