import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input, ModalHeader, Modal, ModalBody, ModalFooter, Button, FormGroup, Label, Form } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as FeatherIcon from 'react-feather';
import {
    getUserDeleteModal, getUserList, getUserModal,
    setUserRquest, getCertficates, getInternShipLetter,
    getConfirmationCertficates
}
    from '../../../redux/user/actions';
import EditUserModal from './EditUserModal';
import swal from 'sweetalert';
import DeleteUserModal from './DeleteUserModal';
import config from '../../../helpers/baseurl';
import * as actions from '../../../redux/user/actions';
import axios from 'axios';
import userFile from '../../../assets/sampledata/User.xlsx'
import * as api from './../../../helpers/restApi'



//import PageTitle from '../../components/PageTitle';
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
        <div className="spinner">No records found   </div>
    );

    let loginDetails = useSelector((state) => state.Auth.user || []);
    const dispatch = useDispatch();
    var username = loginDetails.Username;
    const [uploadReq, setuploadReq] = useState(false);
    const [uploadButton, SetUploadButton] = useState(true);
    const [uloadResData, setuloadResData] = useState('');

    const UPLOAD_ENDPOINT = `${urlpattern}UserUpload?username=${username}`;
    const [file, setFile] = useState(null);

    const uploadFile = file => {
        const formData = new FormData();
        formData.append("avatar", file);

    //     return axios.post(UPLOAD_ENDPOINT, formData, {
    //         headers: {
    //             "content-type": "multipart/form-data"
    //         }
    //     });

    axios.post(UPLOAD_ENDPOINT, formData, {
        headers: {
            "content-type": "multipart/form-data"
        }
    }).then((res)=>{
        if (res.data.Status===true) {
            
                dispatch(getUserList());
               
                SetUploadButton(false)
                setuploadReq(false)
                setFile('')
            }
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
    })  .catch(function (error) {
        // swal(error, "error");
         swal('Failed', error.response.data.Message,  "error");
       });
};
     


    const handleExcelUploadSubmit = async e => {
        e.preventDefault();
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
         uploadFile(file);
        //setuloadResData(res.data.Message)
       // SetUploadButton(true)
        // swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        // if (res.data.Message !== "0-Records Added") {
        //   //  swal("Success", res.data.Message);
        //     dispatch(getUserList());
        //     //uploadToogle();
        //     SetUploadButton(false)
        //     setuploadReq(false)
        //     setFile('')
        // } else {
        //   //  swal("Somthing went wrong !", "error");
        //     SetUploadButton(false)
        // }
    };

    const uploadToogle = () => {
        setuploadReq(!uploadReq)
        setuloadResData('')
        SetUploadButton(true)
    };
    const handleOnChange = e => {
        setFile(e.target.files[0]);
        if (e.target.files[0]) {
            SetUploadButton(false)
        }
    };

    return (
        <>
            <Modal isOpen={uploadReq} toggle={uploadToogle} className={className}>
                <form >
                    <ModalHeader toggle={uploadToogle}>Upload Users</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <form onSubmit={handleExcelUploadSubmit}>
                                    <Row>
                                        <Col lg={12} className="mb-5">  <h5><a href={userFile} download="User.xlsx">Download Users sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                                        <Col lg={8}> <input type="file" accept='.xlsx, .xls, .csv' className="form-control" onChange={handleOnChange} /></Col>
                                        <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">Upload File</button></Col>

                                        <Col lg={12}>  <h4>{uloadResData}</h4></Col>
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
                            wrapperClasses="table-responsive"
                            bordered={false}
                            defaultSorted={defaultSorted}
                            rowEvents={rowEvent}
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
        </>

    );
};

const ViewUser = () => {
    const dispatch = useDispatch();
    let records = useSelector((state) => state.Users.users || []);
    useEffect(() => {
        dispatch(getUserList());
        // eslint-disable-next-line 
    }, []);

    const [certModel, setCertModel] = useState(false);
    const certficketModel = () => setCertModel(!certModel);
    const [certificate, setCertificate] = useState([]);
    const [emplyeeId, setEmployeeId] = useState();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [employeeCode, setEmployeeCode] = useState();

    const handelShowCertificket = (row) => {
        setEmployeeId(row.ECode)
        setCertModel(true)
        setEmployeeCode(row.ECode)
    }

    //Send confirmation mail ECode
    const handelSendConfirmationMail = () => {
        var config = {
            method: 'post',
            url: `${urlpattern}SendConfirmationEmail?empcode=${employeeCode}`,
        };
        axios(config)
            .then(function (response) {
                dispatch(getUserList());
                swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
               // cleanForm();
            })
            .catch(function (error) {
                swal('Failed',error.response.data.Message,"error")
              
            });
    }




    //download certificates 
    const handleSubmitAction = (e) => {

        e.preventDefault()
        if (emplyeeId !== null || emplyeeId !== undefined) {
            // let data={
            //     employeeid:emplyeeId,
            //     startdate:startDate,
            //     endDate:endDate
            // }

            // InternshipLetter?employeeid=${data.employeeid}&startdate=${data.startdate}&enddate=${data.endDate}
            if (certificate === "InternshipLetter") {
                // dispatch(getInternShipLetter(data))
                window.open(urlpattern + 'InternshipLetter?employeeid=' + emplyeeId + '&startdate=' + startDate + '&enddate=' + endDate)
            }

            if (certificate === "ConfirmationLetterDownload") {
                api.getConfirmationCertficates(emplyeeId).then((res) => {
                    if (res) {
                        window.open(urlpattern + 'ConfirmationLetterDownload?employeeid=' + emplyeeId)
                    }
                    else {
                        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
                    }
                }).catch(function (error) {
                    swal('Failed',error.response.data.Message,"error")
                })





                // window.open(urlpattern +'ConfirmationLetterDownload?employeeid='+emplyeeId) 
            }

            // if (certificate === "ExperienceAndRelievingLetter") {
            //     // dispatch(getCertficates(emplyeeId))
            //     window.open(urlpattern + 'ExperienceAndRelievingLetter?employeeid=' + emplyeeId)
            // }

        }

    }
    const onUpdateCancel = () => {
        certficketModel()
        //cleanForm()
    }

    const [certificateType] = React.useState([
        // {
        //     label: 'Experience And Relieving Letter',
        //     value: 'ExperienceAndRelievingLetter',
        // },
        { label: 'Confirmation Letter Download', value: 'ConfirmationLetterDownload' },
        { label: 'Internship Letter', value: 'InternshipLetter' },
    ]);

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        },
        {
            dataField: 'ECode',
            text: 'Employee Code.',
            //sort: true,
        },
        {
            dataField: 'EFullname',
            text: 'Name',
            sort: true,
        },
        {
            dataField: 'ECompany_Name',
            text: 'Company',
        },
        {
            dataField: 'EDesignation',
            text: 'Designation',
        },
        {
            dataField: 'ELocation',
            text: 'Location',
        },
        {
            dataField: 'ERole',
            text: 'Role',
        },
        {
            dataField: 'EEmail',
            text: 'Email',
        },
        {
            dataField: 'edit',
            text: 'Edit',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button
                        className="btn btn-link text-secondary"
                        onClick={() => _validateFunction(row)}
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
        },


        {
            dataField: 'action',
            text: 'Action',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button className="btn btn-outline-secondary"
                        onClick={() => handelShowCertificket(row)}
                        title="download certificates">
                        View
                    </button>
                );
            }, 
        },


        {
            dataField: 'welcomeMail',
            text: 'Send Welcome Mail',
            formatter: (cellContent, row) => {
                //const id = row.jid;
                return (
                    <button className="btn btn-outline-secondary w-100"
                    onClick={() => sendWelcomeMail(row.ECode)}
                    disabled={row.isWelocomeMailSent ===1}
                    title='Send Welcome Mail' >
                       {row.isWelocomeMailSent===1? "Sent":"Send"}
                    </button>
                );
            },

            
        },
        
    ];

    function _validateFunction(row) {
        // dispatch(getRequirementModal((row)));
        dispatch(setUserRquest(row));
        dispatch(getUserModal());
    }

    function onDeleteRecord(row) {
        dispatch(setUserRquest(row));
        dispatch(getUserDeleteModal());
        
        // swal({
        //     title: "Are you sure?",
        //     text: "Want to delete this record ?",
        //     icon: "warning",
        //     buttons: true,
        //     dangerMode: true,
        //   })
        //   .then((willDelete) => {
        //     if (willDelete) {
        //         var config = {
        //             method: 'DELETE',
        //             url: `${urlpattern}UserRole_Master/${row.id}`,   
        //           };
        //           axios(config)
        //           .then(function (response) {
        //            alert(response.data.Message)
        //             //swal("Status Updated Successful", "success");
        //             //certficketModel();
        //             getRoleList();
        //           })
        //           .catch(function (error) {
        //             //console.log(error);
        //           });
        //       swal("Your Record has been deleted!", {
        //         icon: "success",
        //       });
        //     } else {
        //        //swal("Your Record is safe!");
        //     }
        //   });


    }





const sendWelcomeMail=(ecode)=>{
    api.sendWelcomeEMail(ecode).then((res) => {
        swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
    
       
    })
}




    return (
        <React.Fragment>
            <Row>
                <EditUserModal></EditUserModal>
                <DeleteUserModal></DeleteUserModal>
             
                <Modal isOpen={certModel} toggle={certficketModel}>
                <Form onSubmit={handleSubmitAction}>
                    <ModalHeader toggle={onUpdateCancel}>Download Certificate</ModalHeader>
                    <ModalBody>
               
                        <Row>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label >Certificate Type <span className="redspan">*</span></Label>
                                    <select className="form-control style-input" required
                                        name="certificate" id="certificate" onChange={(e) => {
                                            setCertificate(e.target.value);
                                        }}>
                                        <option value="">Select Certificate Type</option>
                                        {certificateType.map((certificate) => (
                                            <option key={certificate.value} value={certificate.value}>
                                                {certificate.label}
                                            </option>
                                        ))}
                                    </select>
                                    {certificate === "InternshipLetter" ?
                                        <div>
                                            <Label className="mt-4">Start Date </Label>
                                            <input type="date" className="form-control search-style"
                                                placeholder="Date :" value={startDate}
                                                required
                                                onChange={(e) => setStartDate(e.target.value)} />

                                            <Label className="mt-4">End Date</Label>
                                            <input type="date" className="form-control search-style"
                                                // min={}={startDate.toString} 
                                                required
                                                min={startDate.toString().split("T")[0]}
                                                placeholder="Date :" value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div> : null}
                                </FormGroup>
                            </Col>
                        </Row>
                    
                    </ModalBody>
                    
                    <ModalFooter>
                    <Button color="primary" type='button' onClick={()=>handelSendConfirmationMail()}>Send Confirmation Email</Button>
                        <Button color="primary" type="submit"
                            >Download</Button>
                        <Button color="primary" type='button' onClick={onUpdateCancel}>Cancel</Button>
                    </ModalFooter>
                    </Form>
                </Modal>
              

                <Col>
                    <TableWithSearch records={records} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ViewUser;


