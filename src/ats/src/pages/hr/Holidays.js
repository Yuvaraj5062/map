import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Input, Button } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Modal from 'reactstrap/lib/Modal';
import ModalHeader from 'reactstrap/lib/ModalHeader';
import ModalBody from 'reactstrap/lib/ModalBody';
import ModalFooter from 'reactstrap/lib/ModalFooter';
import { getHolidayList, setHoliday } from '../../redux/holiday/actions';
import { updateClient } from '../../helpers/restApi';
import config from '../../helpers/baseurl';
import moment from 'moment'
import axios from 'axios';
import swal from 'sweetalert';
//import PageTitle from '../../components/PageTitle';
import * as FeatherIcon from 'react-feather';
import holidayListFile from '../../assets/sampledata/HolidayList Master.xlsx'//upload
import { formatDate } from '../../constants/dateFormat';
var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
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
    const [uploadReq, setuploadReq] = useState(false);//update model
    const [uploadButton, SetUploadButton] = useState(true);
    const [uloadResData, setuloadResData] = useState('');
    let loginDetails = useSelector((state) => state.Auth.user || []);
    const dispatch = useDispatch();
    var username = loginDetails.Username;
    const UPLOAD_ENDPOINT = `${urlpattern}UploadHolidayMaster?username=${username}`;

    const [file, setFile] = useState(null);
    const uploadFile = file => {
        const formData = new FormData();
        formData.append("avatar", file);

         axios.post(UPLOAD_ENDPOINT, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then((res)=>{
            if(res.data.Status==true){
                dispatch(getHolidayList());
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
      //  //console.log(res,">>><<<")
      //  setuloadResData(res.data.Message)
        SetUploadButton(true)
        // swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
        // if (res.data.Message !== "0-Records Added") {
        //   //  swal("Success", res.data.Message);
        //     dispatch(getHolidayList());
        //     //uploadToogle();
        //     SetUploadButton(false)
        //     setuploadReq(false)
        //     setFile('')
        // } else {
        //     swal("Failed","Something went wrong !", "error");
        //     SetUploadButton(false)
        // }
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

  const NoDataIndication = () => (
        <div className="spinner">No records found   </div>
    );
    return (

        <ToolkitProvider bootstrap4 keyField="ROW_NUMBER" data={props.records} columns={props.columns} search>
            {(props) => (
                <React.Fragment>
                    <Modal isOpen={uploadReq} toggle={uploadToogle} >
                        <form >
                            <ModalHeader toggle={uploadToogle}>Upload Holiday List</ModalHeader>
                            <ModalBody>
                                <Row>
                                    <Col lg={12}>
                                        <form onSubmit={handleExcelUploadSubmit}>
                                            <Row>
                                                <Col lg={12} className="mb-5">  <h5><a href={holidayListFile} download="HolidayList Master.xlsx">Download Holiday List sample data file <FeatherIcon.Download></FeatherIcon.Download></a></h5></Col>
                                                <Col lg={8}> <input type="file" className="form-control" accept=".xlsx, .xls, .csv" onChange={handleOnChange} /></Col>
                                                <Col lg={4}><button disabled={uploadButton} className="btn btn-primary" type="submit">Upload File</button></Col>

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
                    {(loginDetails.Role === "HR" || loginDetails.Role === "Admin") &&
                    <Row>
                        <Col md={6} className="">

                        </Col>
                        <Col md={6} className="text-right">
                            <button onClick={() => uploadToogle()} className="btn btn-secondary bg-secondary upbtn  mr-0">Upload</button>
                        </Col>
                    </Row>
                    }
                    <BootstrapTable
                        {...props.baseProps}
                        bordered={false}
                        defaultSorted={defaultSorted}
                        // rowEvents={rowEvents}

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

const Holidays = () => {
    const dispatch = useDispatch();
    let records = useSelector((state) => state.Holiday.holidays || []);
    let loginDetails = useSelector((state) => state.Auth.user || []);
    const minDate = new Date().getFullYear() + "-01-01"
    let maxDate = new Date().getFullYear() + "-12-31"

    
    useEffect(() => {
        dispatch(getHolidayList());
        // eslint-disable-next-line 
    }, []);

    ////console.log(typeof new Date(date),"fsdghfgdfg",new Date(date).toString())
    let updatedArray = []
    if (records.length > 0) {
        for (let i = 0; i < records.length; i++) {
            updatedArray.push({
                "id": records[i].id, "name": records[i].name,
               // "date": moment(records[i].date).format("DD-MM-YYYY")==='Invalid date'?records[i].date:moment(records[i].date).format("DD-MM-YYYY"),
               "date": records[i].date,  
               "day": records[i].day
            })
        }
    }
 
    let columns = [
        {
            dataField: 'name',
            text: 'Holiday Name',
        },
        {
            dataField: 'date',
            text: "Date",
            formatter: (cellContent, row) => {
            //    const dates = moment(row.date);
            //    //console.log(row,"vhfvhbghvhgbvh")
                return (
                   //
                   <label>  { moment(row.date).format('DD-MM-yyyy')}   </label> 
                );
           },
        },
        {
            dataField: 'day',
            text: 'Day',
            
        },   

        
    ];
    if(loginDetails.Role === "HR" || loginDetails.Role === "Admin" ){
        columns.push({ 
            dataField: 'action',
            text: 'Action',
            //  hidden:changeRle,
            formatter: (cellContent, row) => {
                //const id = row.id;
                return (
                    <>
                     <Link
                            onClick={() => {
                                onDelete(row)
                            }
                            }
                            title="Delete Holiday"
                        >
                            <span className='mr-40'>   <FeatherIcon.Trash2 disabled={false} /></span>
                        </Link>
                        <Link
                            onClick={() => {
                                
                                onUpdate(row)
                            }
                            }
                            title="Update Holiday">
                            <span className='ml-40'>  <FeatherIcon.Edit /></span>
                        </Link>
                    </>
                );
            },
        })
    }
   
    var getUsername = loginDetails.Username;
    // For Create Holiday 
    const [holidayDate, setHolidayDate] = useState('');
    const [holidayName, setHolidayName] = useState('');
    const [holidayDay, setHolidayDay] = useState('');

    // For Edit Holiday 
    const [date, setdate] = useState();
    const [name, setname] = useState('');
    const [day, setday] = useState('');
    const [id, sId] = useState();
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);
    const [delmodal, setDelModal] = useState(false); //delet model
    const toggle = () => setDelModal(!delmodal);
   
    const onDelete = (row) => {
        sId(row.id)
        setDelModal(true)
    }
    const onDeleteConfirm = () => {
        setDelModal(false)
        var config = {
            method: 'DELETE',
            url: `${urlpattern}/HolidayMaster/${id}`,
        };
        axios(config)
            .then(function (response) {
                //  //console.log(JSON.stringify(response.data));
                dispatch(getHolidayList());
                swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');

            })
            .catch(function (error) {
                swal("Something went wrong !", "error");
            });

    }
    const onUpdate = (row) => {
       // swal(row.date)
        setModal2(true)
        setname(row.name)
        setdate(row.date)
        //setdate(row.date)
        setday(row.day)
        sId(row.id)
    }
    const handleSubmitAction = (e) => {
        e.preventDefault();
        const data = {
            id: id,
            date: date,
            //moment(date).format("DD-MM-YYYY"),
            name: name,
            day: day,
            type: "",
            username: getUsername
        }
        var config = {
            method: 'PUT',
            url: `${urlpattern}/HolidayMaster`,
            data: data
        };
        axios(config)
            .then(function (response) {
                dispatch(getHolidayList());
                swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
                toggle2();

            })
            .catch(function (error) {
                swal("Failed",error.response.data.Message, "error");
            });
        cleanForm()
    };

  
    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            date: holidayDate,

            name: holidayName,
            day: holidayDay,
            type: "",
            username: getUsername
        }

        dispatch(setHoliday(data));
        cleanForm();
    }
    const onUpdateCancel = () => {
        toggle2()
        cleanForm()
    }
    const cleanForm = () => {
        setname('')
        setdate('')
        setday('')
        setHolidayDate('')
        setHolidayDay('')
        setHolidayName('')
    }

    // const formatDate = (date) => {
    //     var d = new Date(date),
    //         month = '' + (d.getMonth() + 1),
    //         day = '' + d.getDate(),
    //         year = d.getFullYear();
    
    //     if (month.length < 2) 
    //         month = '0' + month;
    //     if (day.length < 2) 
    //         day = '0' + day;
    
    //     return [year, month, day].join('-');
    // }



    return (
        <React.Fragment>
            {loginDetails.Role === "HR" || loginDetails.Role === "Admin" ?
                <form onSubmit={handleSubmit}>
                    <Row>

                        <Col md={12} className="">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <button type="submit" className="btn btn-primary pl-5 pr-5">Create</button>
                                </div>
                                <input type="text" required className="form-control search-style" value={holidayName} placeholder="Holiday Name :"
                                    onChange={(e) => {
                                        const re = /^[A-Za-z\-_ ]+$/;
                                        if (e.target.value === "" || re.test(e.target.value)) {
                                            setHolidayName(e.target.value.trimLeft());
                                        }
                                      //  setname(e.target.value);
                                    }} />
                                <input type="date"  
                                 min={moment(new Date).format('YYYY-MM-DD')}  required 
                                 onKeyDown={(e) => e.preventDefault()}
                                className="form-control search-style" placeholder="Date :" value={holidayDate}
                                    onChange={(e) => {
                                        setHolidayDate(e.target.value);
                                    }} />
                                {/* <input type="text" className="form-control search-style" placeholder="Day" 
                                required value={holidayDay}
                                    onChange={(e) => {
                                        const re = /^[A-Za-z]+$/;
                                        if (e.target.value === "" || re.test(e.target.value)) {
                                            setHolidayDay(e.target.value);
                                        }
                                       // setday(e.target.value);
                                    }} /> */}

                            </div>
                        </Col>
                    </Row>
                </form> : <></>}
            <Modal isOpen={modal2} toggle={toggle2}>
                <form onSubmit={handleSubmitAction}>
                    <ModalHeader toggle={onUpdateCancel}>Update Holiday</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col lg={12}>
                                <input type="text" required className="form-control search-style mt-2"
                                 value={name} placeholder="Holiday Name :" 
                                    onChange={(e) => {
                                        setname(e.target.value);
                                    }} />
                            </Col>
                        </Row>
                        <Row>
                       
            
      
                            <Col lg={12}>
                                <Input type="date"   min={moment(new Date).format('YYYY-MM-DD')}
                                 //max={maxDate} 
                                required 
                                onKeyDown={(e) => e.preventDefault()}
                                 className="mt-2 form-control search-style"
                                 placeholder="Date :"
                                  value= { moment(date).format('YYYY-MM-DD')}
                                 
                                    onChange={(e) => {
                                        setdate(e.target.value);
                                    }} />
                            </Col>
                        </Row>
                        <Row>
                         
                            <Col lg={12}>
                                <input type="text" className="form-control search-style mt-2"
                                 placeholder="Day" value={day} 
                                 disabled
                                    onChange={(e) => {
                                       // setday(e.target.value);

                                        const re = /^[A-Za-z]+$/;
                                        if (e.target.value === "" || re.test(e.target.value)) {
                                            setday(e.target.value);
                                        }

                                    }} />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">Save</Button>
                        <Button color="primary" onClick={onUpdateCancel}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
            <Modal isOpen={delmodal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
                <ModalBody>
                Are you sure you want to delete this record?
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onDeleteConfirm}>Confirm</Button>
                    <Button color="primary" onClick={() => { setDelModal(false) }}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Row>
                <Col>
                    <TableWithSearch records={updatedArray} columns={columns} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Holidays;


