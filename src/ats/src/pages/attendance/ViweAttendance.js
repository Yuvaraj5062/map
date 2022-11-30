import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import swal from 'sweetalert';
import axios from 'axios';
import { getUserList } from '../../redux/user/actions';
import config from '../../helpers/baseurl';
import { getAttendanceList } from '../../redux/attendance/actions';
import { formatDate } from '../../constants/dateFormat';
import moment from 'moment'

var uploadurlpattern = config.punchFileUpload;

const { ExportCSVButton } = CSVExport;
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


export const ViweAttendance = () => {
    const dispatch = useDispatch();
    let loginDetails = useSelector((state) => state.Auth.user || []);
    var getUsername = loginDetails;
    var getyear = new Date();
    var newyear = getyear.getFullYear();
    var getmonth = new Date();
    var setmonth = getmonth.getMonth();

    //if login type is hr then need to select which users punch record hr want to see 
    //if login type is not hr then it automatically get push records
    const [ecode, setECode] = useState(loginDetails.Role !== "HR" ? loginDetails.EmployeeCode : undefined)

    //Get all users lists
    useEffect(() => {
        dispatch(getUserList());
    }, []);


    const defaultSorted = [
        {
            dataField: 'id',
            order: 'asc',
        },
    ];

    let employeeList = useSelector((state) => state.Users.users || []);
    let userRole = loginDetails.Role;
    const [punchData, setPunchData] = useState()
    const [officeTab, setOfficeTab] = useState("office401")
    const [searchLoader, setSearchLoader] = useState(false);


    let offic202 = []
    let offic401 = []
    if (punchData) {
        punchData.Office_401.map((row) => {
            offic401.push(row)
        })

        punchData.Office_202.map((row) => {
            offic202.push(row)
        })
    }

    const getPunchingDetails = () => {

        setPunchData("")
        setSearchLoader(true)
        var config = {
            method: 'get',
            url: `${uploadurlpattern}Office-401-and-202/${ecode}/`,
        };

        axios(config)
            .then(function (response) {
                if (response.data.responseCode === 200) {
                    setSearchLoader(false)
                    setPunchData(response.data.responseData)
                    swal("Success", response.data.responseMessage,'success');
                }
                else {
                    setSearchLoader(false)
                    swal("Failed", response.data.responseMessage,"error");
                }
            })
            .catch(function (error) {
                setSearchLoader(false)
                if (error.response.status === 404) {
                    swal("Failed",error.response.data.responseMessage,'error');
                }
                else {
                    setSearchLoader(false)
                    swal("Error", "Something went wrong please try again",'error')
                }
            });
    }



    useEffect(() => {
        //getAttendanceReport();
        dispatch(getAttendanceList(getUsername, setmonth + 1, newyear));
        // eslint-disable-next-line 
    }, []);

    const columns = [

        {
            dataField: 'date',
            text: 'Date',
            sort:true,
            formatter: (cellContent, row) => {
                //var startdate = row.date;

                var startdate =moment(row.date);
                // const dates = moment(row.date);
                 //    //console.log(row,"vhfvhbghvhgbvh")
                 return (
                     <label>{startdate.format('DD-MM-yyyy') }</label>
                 );

               
            },
        },
        {
            dataField: 'weekday',
            text: 'Day',
        },
        {
            dataField: 'in_Time',
            text: 'In Time',
        },
        {
            dataField: 'out_Time',
            text: 'Out Time',
        },
        {
            dataField: 'Total_Time',
            text: 'Total Time',
        },
        {
            dataField: 'Status',
            text: 'Status',
        },
        // {
        //     dataField: 'leavebalance',
        //     text: 'Leave Balance',
        // }, 
    ];

    return (
        <React.Fragment>


            <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={officeTab === "office401" ? offic401 : offic202} columns={columns} search>
                {(props) => (
                    <React.Fragment>
                        <Row>

                            {userRole === "HR" ||userRole==="HR Manager"?
                                <Col lg={4} className="">
                                    <FormGroup>
                                        <Label for="ecode"> Employee Name <span className="redspan">*</span></Label>

                                        <select className="form-control style-input" value={ecode} required
                                            onChange={(event) => setECode(event.target.value)}>
                                            <option value="">Select Employee Name</option>
                                            {
                                                employeeList.map((record) => (
                                                    <option value={record.ECode} key={ecode}>{record.EFullname}</option>
                                                ))
                                            }
                                        </select>
                                    </FormGroup>
                                </Col> : null}

                            <Col lg={2} className="mt-2">
                                <div className="form-group  mt-4 text-center">
                                    <button className="btn-block btn btn-primary"
                                        disabled={!ecode}
                                        onClick={() => { getPunchingDetails() }}
                                    >
                                        {searchLoader ? <span className="spinner-border text-secondary" role="status">
                                        </span> : "Search"}
                                    </button>
                                </div>
                            </Col>
                        </Row>


                        <Row className="mt-4">
                            <Col lg={6}>
                                <button 
                                   className={`btn  w-100 mt-3 text-white ${officeTab === "office401" ?"attendance-btn":"btn-secondary"}`}
                              //  style={officeTab === "office401" ?{backgroundColor:'#F87131'}:{background:'#1E2139'}}
                                    onClick={() => setOfficeTab("office401")}>
                                    Office 401

                                </button>
                            </Col>
                            <Col lg={6}>
                                <button 
                                className={`btn  w-100 mt-3 text-white ${officeTab === "office202" ?"attendance-btn":"btn-secondary"}`}
                                //style={officeTab === "office202" ?{backgroundColor:'#f87131'}:{background:'#1E2139'}}
                                    onClick={() => setOfficeTab("office202")} >
                                    Office 202 
                                </button>
                            </Col>
                        </Row>

                        <BootstrapTable
                            {...props.baseProps}
                            bordered={false}
                            defaultSorted={defaultSorted}
                            //rowEvents={rowEvent}
                            pagination={
                                paginationFactory(
                                    {
                                        sizePerPage: 10,
                                        sizePerPageRenderer: sizePerPageRenderer,
                                        sizePerPageList: [
                                            { text: '10', value: 10, },
                                            { text: '20', value: 20 },
                                            { text: '50', value: 50 },
                                            //{ text: 'Todos', value: (offic401 ? offic401.length : 0) }
                                        ]
                                    }
                                )
                            }

                            wrapperClasses="table-responsive"
                        />
                    </React.Fragment>
                )}

            </ToolkitProvider>
        </React.Fragment>
    );
};




