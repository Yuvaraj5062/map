import React, { useEffect, useState } from 'react';
import * as api from './../../helpers/restApi'
import {
    Row, Col, Input, Table, Button, FormGroup,
    Label
} from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import config from '../../helpers/baseurl';
import { getLeaveBalanceList } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../constants/dateFormat';
import axios from 'axios';
import swal from 'sweetalert';
import './../../assets/scss/app.scss';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import leaveList from '../../assets/sampledata/leave balance Sheet.xlsx'//upload
//import { formatDate } from '../../constants/dateFormat';
import moment from 'moment' 

var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        // dataField: 'id',
        // order: 'asc',
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

                        {/* 
                        <Col md={6} className="text-right">
                            <button onClick={() => uploadToogle()}
                                className="btn btn-secondary bg-secondary upbtn  mr-0 " title="Upload Sheet">Upload Leave Balance Sheet</button>
                        </Col> */}
                    </Row>


                    <BootstrapTable
                        wrapperClasses="table-responsive"
                        {...props.baseProps}
                        bordered={false}
                        defaultSorted={defaultSorted}
                        // rowEvents={rowEvent}
                        noDataIndication={() => <NoDataIndication />}
                        pagination={
                            paginationFactory(
                                {
                                    sizePerPage: 10,
                                    sizePerPageRenderer: sizePerPageRenderer,
                                    sizePerPageList: [
                                        { text: '10', value: 10, },
                                        { text: '20', value: 20 },
                                        { text: '50', value: 50 },
                                        //{ text: 'Todos', value: (props.records ? props.records.length : 0) }
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

const LeaveBalance = (props) => {

    let loginDetails = useSelector((state) => state.Auth.user || []);
    //  let records = useSelector((state)=>state.Leave.leavebalance || []);
    const dispatch = useDispatch();
    let username = loginDetails;

    //  //console.log(loginDetails)
    const [records, setRecords] = useState([])
    const [leavebBlance, setleaveBalanse] = useState([])


    const getLeaveBalance = () => {
        if (loginDetails.Role === "HR") {
            api.getAllLeaveBalance().then((res) => {
                ////console.log("res >>>>>",res)
                setRecords(res.data.Data)
            })
        }
        else {

            api.getEmpLeaveBalance(loginDetails)
                .then((res) => {
                    setRecords([res.data.Data])
                })
        }
    }

   // //console.log([leavebBlance],"dsfsdfgbfgnghm")
    useEffect(() => {
        getLeaveBalance()
        // dispatch(getLeaveBalanceList(username))

    }, []);


    const [uploadReq, setuploadReq] = useState(false);//update model
    const [uploadButton, SetUploadButton] = useState(true);
    const [uloadResData, setuloadResData] = useState('');
    const [loader, setLoader] = useState(false)
    // let loginDetails = useSelector((state) => state.Auth.user || []);
    // var username = loginDetails.Username;
    const UPLOAD_ENDPOINT = `${urlpattern}UploadLeaveBalancebyHR`;

    const [file, setFile] = useState(null);
    const uploadFile = file => {
        const formData = new FormData();
        formData.append("avatar", file);

     axios.post(UPLOAD_ENDPOINT, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then((res)=>{
            swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
            setuloadResData(res.data.Message)
          
            if (res.data.Status===true) {
                        getLeaveBalance()
                        setLoader(false)
                        //uploadToogle();
                        SetUploadButton(false)
                        setuploadReq(false)
                        setFile('')
                    } else {
                        SetUploadButton(false)
                        setLoader(false)
                         swal('Failed',res.data.Message, "error");
                    }
               
           
        })  .catch( (err)=> {
            SetUploadButton(false)
            setLoader(false)
             swal('Failed',err.response.data.Message, "error");
        })
    };


    const handleExcelUploadSubmit = async e => {
        e.preventDefault();
        setLoader(true)
        uploadFile(file);
     //   setuloadResData(res.data.Message)
        SetUploadButton(true)
    //     try{
    //     swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
    //     if (res.data.Status===true) {
    //        // swal("Success", res.data.Message);
    //         getLeaveBalance()
    //         setLoader(false)
    //         //uploadToogle();
    //         SetUploadButton(false)
    //         setuploadReq(false)
    //         setFile('')
    //     } else {
    //       //  swal("Something went wrong !", "error");
    //         SetUploadButton(false)
    //         setLoader(false)
    //          swal('Failed',res.data.Message, "error");
    //     }
    // }
    // catch(err) {
    //     //console.log("::::::::")
    //      swal('Failed', err.response.data.Message, "error");
    //  }

    };

    const uploadToogle = () => {
        setuploadReq(!uploadReq)
        setuloadResData('')
    };
    const handleOnChange = e => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
            SetUploadButton(false)
        }
    };


    //edit leave data
    const [editModel, setEditModelOpen] = useState(false);
    const [closingLeaveBalance, setClosingLeaveBalance] = useState();
    const [rowData, setRowData] = useState([]);

    const handelEdit = (row) => {
        setClosingLeaveBalance(row.ClosingLeaveBalance)
        setEditModelOpen(true)
        setRowData(row)
        ////console.log(row,"row")
    }


    const handelEditLeaves=()=>{
        let reqBody={
            ID:rowData.Id,
            ClosingLeaveBalance: closingLeaveBalance,
         
          }
        
        api.editLeaves(reqBody).then((res) => {
            if(res.data.Status===true)
            {
                getLeaveBalance();
                setEditModelOpen(false)  
            }
            swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        })
        .catch((err) => {
           // //console.log(err)
            swal('Failed', err.response.data.Message, "error");
        })
 

}


    const columns = [
      
        {...loginDetails.Role=="HR"?

        {
            dataField: 'action',
            text: 'Action',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
            formatter: (cellContent, row) => {
                return (
                    <button
                        className="btn btn-link text-primary"
                        onClick={() => handelEdit(row)}
                        title="Edit"
                    >
                        <FeatherIcon.Edit />
                    </button>
                );
            },
        }:null},
       
        {...loginDetails.Role==="HR"?

        {
            dataField: 'EmployeeCode',
            text: 'Employee Code',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
      
        }:null},
      
        {...loginDetails.Role==="HR"?
        {
            dataField: 'E_Fullname',
            text: 'Employee Name',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        }:null},
        {
            dataField: 'OpeningLeaveBalance',
            text: 'Opening Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'SickLeaveBalance',
            text: 'Sick Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },



        {
            dataField: 'SickLeaveTaken',
            text: 'Sick Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },


        {
            dataField: 'CasualLeaveBalance',
            text: 'Casual Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'CasualLeaveTaken',
            text: 'Casual Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },


        {
            dataField: 'EarnedLeaveBalance',
            text: 'Earn Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'EarnedLeaveTaken',
            text: 'Earned Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'MonthlyLeaveBalance',
            text: 'Monthly Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'LeaveTaken',
            text: 'Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'PaidLeaveTaken',
            text: 'Paid Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'LossOfPayLeaveTaken',
            text: 'Loss Of Pay Leave Taken',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },


        {
            dataField: 'ClosingLeaveBalance',
            text: 'Closing Leave Balance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'Detail',
            text: 'Leave Information',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },


        {
            dataField: 'BalanceMonth',
            text: 'Balance Month',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'BalanceYear',
            text: 'Balance Year',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'BalanceDate',
            text: 'Balance Date',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
            
            formatter: (cellContent, row) => {
                var BalanceDate =moment(row.BalanceDate);
               // const dates = moment(row.date);
                //    //console.log(row,"vhfvhbghvhgbvh")
                return (
                    <label>{BalanceDate.format('DD-MM-yyyy') }</label>
                );
            },
        },
        


    ];

    return (
        <React.Fragment>

          
                <Row>
                 {loginDetails.Role === "HR" ? 
                    <Col className="text-right">
                        <button onClick={() => uploadToogle()}
                            className="btn btn-secondary bg-secondary upbtn  mr-0 " title="Upload Sheet">Upload Leave Balance Sheet</button>
                    </Col>:null}
                    <Col>
                        <TableWithSearch records={records} columns={columns} />
                    </Col>
                </Row>
        

                {/* <Table >
                    <thead>
                        <tr>
                            <th>Employee Code</th>
                            <th>Employee Name</th>
                          
                            <th>Sick Leave </th>
                            <th>Casual Leave </th>
                            <th>Earned Leave </th>
                            <th>Balance Month</th>
                            <th>Balance Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Test User</td>
                            <td>3</td>
                           
                            <td>1.5</td>
                            <td>3.5</td>
                            <td>March</td>
                            <td>2022</td>
                        </tr>
                    </tbody>
                </Table> */}

       
            {/* edit leave  modal   */}
            <Row>
                <Modal isOpen={editModel} toggle={() => setEditModelOpen(true)} >
                    <ModalHeader toggle={() => setEditModelOpen(false)} >Update leave balance </ModalHeader>
                    <ModalBody style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'
                    }}>

                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label for="closingLeaveBalance">Closing Leave Balance </Label>
                                    <Input
                                        type="text"
                                        name="closingLeaveBalance"
                                        value={closingLeaveBalance}
                                        maxLength={3}
                                         onChange={(e) => {
                                        //         setClosingLeaveBalance(e.target.value)
                                        // 
                                        const re = /^[0-9\b]+$/;
                                      if (e.target.value === "" || re.test(e.target.value)) {
                                            setClosingLeaveBalance(e.target.value);
                                        }
                                    }}    

                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row >
                            <Col lg={3}>
                                <Button color="primary"
                                     onClick={() => { handelEditLeaves() }}
                                    className='w-100 mt-3'
                                >Save</Button>
                            </Col>
                            <Col lg={3}>
                                <Button color="primary mt-3"
                                    className='w-100'
                                    onClick={() => {
                                        setEditModelOpen(false)
                                    }} >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
            </Row>


            {/* upload leave sheet modal   */}
            <Modal isOpen={uploadReq} toggle={uploadToogle} >
                <form >
                    <ModalHeader toggle={uploadToogle}>Upload Leave List</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <form onSubmit={handleExcelUploadSubmit}>
                                    <Row>
                                        <Col lg={12} className="mb-5">  <h5><a href={leaveList}
                                            download="Leave Master.xlsx">Download Leave List sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                                        <Col lg={8}> <input type="file" className="form-control" onChange={handleOnChange} 
                                        accept=".xlsx, .xls, .csv"/></Col>
                                        <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">
                                            {loader ? <span className="spinner-border text-secondary" role="status">
                                            </span> : "Upload File"}</button></Col>

                                        {/* <Col lg={12}>  <h4>{uloadResData}</h4></Col> */}
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


        </React.Fragment>
    );
};

export default LeaveBalance;


