
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import * as api from './../../../helpers/restApi'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import config from '../../../helpers/baseurl';
import * as FeatherIcon from 'react-feather';
import { EditSalarySlipData } from './EditSalarySlipData';
import { monthsList, yearsList } from '../../../constants/dateFormat';
import swal from 'sweetalert';
import {
    Row,
    Col,
    Input,
    ModalHeader,
    Modal,
    ModalBody,
    Button,
    FormGroup,
    Label
} from 'reactstrap';

var urlpattern = config.baseUrl;
const defaultSorted = [
    {
        dataField: 'id',
        order: 'asc',
    },
];

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
    const [rowData, setrowData] = useState([]);
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
                        <Col lg={3}  >
                            <SearchBar {...props.searchProps} placeholder="Search by name/Ecode" />
                        </Col>
                    </Row>

                    <BootstrapTable
                        wrapperClasses="table-responsive"
                        {...props.baseProps}
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
    );
};

export const GenerateSalarySlip = () => {
    const [records, setRecords] = useState([])
    const [year, setYear] = useState('')
    const [month, setMonth] = useState('')

    // useEffect(() => {
    //     api.getInActiveEmp()
    //         .then((res) => {
    //             setRecords(res.data.Data)
    //         })
    // },[])



    const [editModel, setEditModelOpen] = useState(false);
    const [row, setrow] = useState();
    //const [companyList] = useState(["ARCHE SOFTRONIX PVT LTD", "Reyna Techonologies"])
    const [companyName, setCompanyName] = useState('')
    const [loader, setLoader] = useState(false)

    //Edit salary data 


    const [empName, setEmpName] = useState('')
    const [eCode, setECode] = useState("")
    const [empPan, setEmpPan] = useState("")
    const [empCtc, setEmpCtc] = useState("")
    const [basicSalary, setBasicSalary] = useState("")
    const [fixedHRA, setFixedHRA] = useState()
    const [fixeConveyanceAllowance, setFixConveyanceAllowance] = useState()
    const [fixMedicalAllowance, setFixMedicalAllowance] = useState()
    const [AdditionalHRAAllowance, setAdditionalHRAAllowance] = useState()
    const [paidLeaves, setPaidLeaves] = useState()
    const [lopLeves, setLopLeves] = useState()
    const [totalPayableDays, setTotalPayableDays] = useState()
    const [totalDays, setTotalDays] = useState()
    const [grossSalary, setGrossSalary] = useState()
    const [basic, setBasic] = useState()
    const [houseRent, setHouseRent] = useState()
    const [EmployerContributionToPF, setEmployerContributionToPF] = useState()
    const [conveyanceAllowance, setConveyanceAllowance] = useState()
    const [medicalAllowance, setMedicalAllowance] = useState()
    const [incentiveAllowance, setIncentiveAllowance] = useState()
    const [totalEarning, setTotalEarning] = useState()
    const [employerPF, setEmployerPF] = useState()
    const [employeePF, setEmployeePF] = useState()
    const [employerEsic, setEmployerEsic] = useState()
    const [professionalTax, setProfessionalTax] = useState()
    const [advances, setAdvances] = useState()
    const [incomeTax, setIncomeTax] = useState()
    const [totalDeduction, setTotalDeduction] = useState()
    const [netPayable, setNetPayable] = useState()
    const [salaryMonth, setSalaryMonth] = useState("")
    const [salaryYear, setSalaryYear] = useState("")
    const [employeeEsic, setEmployeeEsic] = useState()
    const [flexibleAllowance, setFlexibleAllowance] = useState()
    const [addHraAllowance, setAddHraAllowance] = useState()


    const handelEdit = (row) => {
        setrow(row)
        setEditModelOpen(true)

        // con
        if (row) {
            setEmpName(row.Employee_Name)
            setECode(row.Employee_Code)
            setEmpPan(row.Employee_Pan)
            setEmpCtc(row.CTC)
            setBasicSalary(row.Basic_Salary)
            setFixedHRA(row.Fixed_HRA)
            setFixConveyanceAllowance(row.Fixed_Conveyance_Allowance)
            setFixMedicalAllowance(row.Fixed_Medical_Allowance)
            setMedicalAllowance(row.Medical_Allowance)
            setAdditionalHRAAllowance(row.Additional_HRA_Allowance)
            setTotalPayableDays(row.Total_Payable_Days)
            setLopLeves(row.LWP_Days)
            setPaidLeaves(row.Paid_Leave)
            setTotalDays(row.Total_Days)
            setGrossSalary(row.Gross_Salary_Payable)
            setBasic(row.Basic)
            setHouseRent(row.House_Rent)
            setEmployerContributionToPF(row.Employer_Cont_To_PF)
            setConveyanceAllowance(row.Conveyance_Allowance)
            setAddHraAllowance(row.Add_HRA_Allowance)
            setFlexibleAllowance(row.Flexible_Allowance)
            setIncentiveAllowance(row.Incentive_Allowance)
            setTotalEarning(row.Total_Earning)
            setEmployerPF(row.PF_Employer)
            setEmployeePF(row.PF_Employee)
            setEmployerEsic(row.Esic_Employer)
            setEmployeeEsic(row.Esic_Employee)
            setProfessionalTax(row.PT)
            setAdvances(row.Advances)
            setIncomeTax(row.Income_Tax)
            setTotalDeduction(row.Total_Deduction)
            setNetPayable(row.Net_Payable)
            setSalaryMonth(row.Salary_Month)
            setSalaryYear(row.Salary_Year)
        }
    }

    const handelSalaryGenerate = () => {
        setLoader(true)
        //  e.preventDefault()

        let data = {
            month: month,
            year: year,
            companyname: companyName


        }


        api.generateSalarySlip(data)
            .then((res) => {
                //setRecords(res.data.Data)
                swal(res.data.Status == true ? 'Success' : 'Failed', res.data.Message, res.data.Status == true ? 'success' : 'error');
                setLoader(false)
                setRecords(res.data.Data)
            })
    }


    const handelCompanyChange = (compnayName) => {
        setCompanyName(compnayName)
        if (compnayName.length === 0) {
            setCompanyName('')
            setYear('')
            setMonth('')
        }
    }

    const onHandelEdit = () => {
        let reqBody = {
            SalaryId: row.Salary_Id,
            Ecode: row.Employee_Code,
            PaidLeaves: paidLeaves,
            LWPleaves: lopLeves,
            TotalPayabledays: totalPayableDays
        }


        api.editSalarySlip(reqBody).then((res) => {
            if (res.data.Status === true) {
                setEditModelOpen(false)
                let data = {
                    month: month,
                    year: year,
                    companyname: companyName


                }

                api.getEditedSalaryData(data).then((res) => {
                    if (res.data.Status === true) {
                        // //console.log(res,"??????")
                        setRecords(res.data.Data)
                    }
                })
            }
            swal(res.data.Status == true ? 'Success' : 'Failed', res.data.Message, res.data.Status == true ? 'success' : 'error');
        })
            .catch((err) => {
                // //console.log(err)
                swal('Failed', err.response.data.Message, "error");
            })


    }

    //end edit functionality
    const columns = [

        {
            dataField: 'action',
            text: 'Action',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            },
            formatter: (cellContent, row) => {
                return (
                    <button
                        className="btn btn-link text-secondary"
                        onClick={() => handelEdit(row)}
                        title="Edit"
                    >
                        <FeatherIcon.Edit />
                    </button>
                );
            },
        },

        {
            dataField: 'Salary_Id',
            text: 'SR NO',
            sort: true,
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Employee_Code',
            text: 'Employee Code',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'Employee_Name',
            text: 'Employee Name',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }


        },
        {
            dataField: 'Employee_Pan',
            text: 'Employee Pan',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'CTC',
            text: 'CTC',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Basic_Salary',
            text: 'Basic Salary',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Fixed_HRA',
            text: 'Fixed HRA',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Fixed_Conveyance_Allowance',
            text: 'Fixed Conveyance Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Fixed_Medical_Allowance',
            text: 'Fixed Medical Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Additional_HRA_Allowance',
            text: 'Additional HRA Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Total_Days',
            text: 'Total Days',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Paid_Leave',
            text: 'Paid Leave',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'LWP_Days',
            text: 'LWP Days',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Total_Payable_Days',
            text: 'Total Payable Days',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Gross_Salary_Payable',
            text: 'Gross Salary Payable',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Basic',
            text: 'Basic',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'House_Rent',
            text: 'House Rent',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Employer_Cont_To_PF',
            text: 'Employer Contribution To PF',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Conveyance_Allowance',
            text: 'Conveyance Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Medical_Allowance',
            text: 'Medical Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Add_HRA_Allowance',
            text: 'Add HRA Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Flexible_Allowance',
            text: 'Flexible Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Incentive_Allowance',
            text: 'Incentive Allowance',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Total_Earning',
            text: 'Total Earning',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'PF_Employer',
            text: ' Employer PF',
            headerStyle: (colum, colIndex) => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'PF_Employee',
            text: 'Employee PF',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Esic_Employer',
            text: 'Employer Esic',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Esic_Employee',
            text: ' Employee Esic',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'PT',
            text: 'Professional Tax ',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Advances',
            text: 'Advances',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Income_Tax',
            text: 'Income Tax',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Total_Deduction',
            text: 'Total Deduction',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

        {
            dataField: 'Net_Payable',
            text: 'Net Payable',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }

        },
        {
            dataField: 'Salary_Month',
            text: 'Salary Month',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },
        {
            dataField: 'Salary_Year',
            text: 'Salary Year',
            headerStyle: () => {
                return { 'white-space': 'nowrap', width: '100px' };
            }
        },

    ];

    //edit salary data
    return (
        <React.Fragment>
            {/* <EditSalarySlipData editModel={editModel} setEditModelOpen={setEditModelOpen} data={row} /> */}
            {/* <Form onSubmit={handelSalaryGenerate}> */}
            <Row>

                <Col lg={3}  >
                    <FormGroup>
                        <Label for="empleadoNombre"> Company <span className="redspan">*</span></Label>
                        <select className="form-control style-input" value={companyName} required
                            onChange={(e) => handelCompanyChange(e.target.value)}>
                            <option value={""}>Select Company</option>
                            <option value={"Arche Softronix Pvt Ltd"} >{"ARCHE SOFTRONIX PVT LTD"}</option>
                            <option value={"Reyna Solutions LLP"} >{"Reyna Solutions LLP"}</option>

                        </select>
                    </FormGroup>
                </Col>

                <Col lg={3}  >
                    <FormGroup>
                        <Label for="year"> Year <span className="redspan">*</span></Label>
                        <select className="form-control style-input" value={year} required
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
                <Col lg={3}  >
                    <FormGroup>
                        <Label for="month"> Month <span className="redspan">*</span></Label>
                        <select className="form-control style-input" value={month} required
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
                <Col lg={2} className="mt-3">
                    <button className="btn btn-primary mt-3"
                        disabled={!month || !year || !companyName}
                        onClick={() => {
                            handelSalaryGenerate()

                        }
                        }>
                        {loader ? <span className="spinner-border text-secondary" role="status">

                        </span> : "Generate Salary Slip"}</button>
                </Col>

            </Row>
            {/* </Form> */}


            <Row>
                <Col >

                    <TableWithSearch records={records} columns={columns} />

                </Col>
            </Row>

            {/* edit salary data popup */}

            <Row>
                <Modal isOpen={editModel} toggle={() => setEditModelOpen(true)} className='modal-lg'>
                    <ModalHeader toggle={() => setEditModelOpen(false)} >Update Salary Slip Details  </ModalHeader>
                    <ModalBody style={{
                        maxHeight: 'calc(100vh - 210px)',
                        overflowY: 'auto'
                    }}>

                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="ecode">Employee Code </Label>
                                    <Input
                                        type="text"
                                        name="ECode"
                                        value={eCode}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="name">Employee Name </Label>
                                    <Input
                                        type="text"
                                        name="NAME"
                                        value={empName}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="empleadoApellidos">Employee Pan</Label>
                                    <Input
                                        type="text"
                                        name="PAN"
                                        value={empPan}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="CTC">CTC </Label>
                                    <Input
                                        type="text"
                                        name="CTC"
                                        value={empCtc}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="BasicSalary">Basic Salary </Label>
                                    <Input
                                        type="text"
                                        name="BasicSalary"
                                        value={basicSalary}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="FixedHRA">Fixed HRA</Label>
                                    <Input
                                        type="text"
                                        name="FixedHRA"
                                        value={fixedHRA}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="Conveyance">Fixed Conveyance Allowance </Label>
                                    <Input
                                        type="text"
                                        name="Conveyance"
                                        value={fixeConveyanceAllowance}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="Medical">Fixed Medical Allowance </Label>
                                    <Input
                                        type="text"
                                        name="Medical"
                                        value={fixMedicalAllowance}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="HRAAllowance">Additional HRA Allowance</Label>
                                    <Input
                                        type="text"
                                        name="HRAAllowance"
                                        value={AdditionalHRAAllowance}
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="paidLeaves">Paid Leaves</Label>
                                    <Input
                                        type="number" required
                                        value={paidLeaves}
                                        min={0}
                                        id="paidLeaves"
                                        name="paidLeaves" onChange={(e) => {
                                            setPaidLeaves(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="lopLeves">Loss Or Pay Leaves</Label>
                                    <Input
                                        type="number"
                                        value={lopLeves}
                                        required
                                        min={0}
                                        id="lopLeves"
                                        name="lopLeves" onChange={(e) => {
                                            setLopLeves(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="totalPayableDays">Total Payable Days</Label>
                                    <Input
                                        type="number"
                                        value={totalPayableDays}
                                        required
                                        min={0}
                                        id="totalPayableDays"
                                        name="totalPayableDays" onChange={(e) => {
                                            setTotalPayableDays(e.target.value);
                                        }} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="TotalDays">Total Days</Label>
                                    <Input
                                        value={totalDays}
                                        name="TotalDays"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="grossSalary">Gross Salary Payable</Label>
                                    <Input
                                        value={grossSalary}
                                        name="grossSalary"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="basic">Basic</Label>
                                    <Input
                                        value={basic}
                                        disabled
                                        name="basic" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="houseRent">House Rent</Label>
                                    <Input
                                        value={houseRent}
                                        name="houseRent"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="EmployerContributionToPF">Employer Contribution To PF</Label>
                                    <Input
                                        value={EmployerContributionToPF}
                                        name="EmployerContributionToPF"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="conveyanceAllowance">Conveyance Allowance</Label>
                                    <Input
                                        value={conveyanceAllowance}
                                        disabled
                                        name="conveyanceAllowance" />
                                </FormGroup>
                            </Col>
                        </Row>



                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="medicalAllowance">Medical Allowance</Label>
                                    <Input
                                        value={medicalAllowance}
                                        name="medicalAllowance"
                                        disabled />
                                </FormGroup>
                            </Col>


                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="Add HRA Allowance">Add HRA Allowance</Label>
                                    <Input
                                        value={addHraAllowance}
                                        name="addHraAllowance"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="FlexibleAllowance">Flexible Allowance</Label>
                                    <Input
                                        value={flexibleAllowance}
                                        name="FlexibleAllowance"
                                        disabled />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="IncentiveAllowance">Incentive Allowance</Label>
                                    <Input
                                        value={incentiveAllowance}
                                        name="IncentiveAllowance"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="TotalEarning">Total Earning</Label>
                                    <Input
                                        value={totalEarning}
                                        disabled
                                        name="TotalEarning" />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="EmployerPF">Employer PF</Label>
                                    <Input
                                        value={employerPF}
                                        name="EmployerPF"
                                        disabled />
                                </FormGroup>
                            </Col>


                        </Row>



                        <Row>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="EmployeePF">Employee PF</Label>
                                    <Input
                                        value={employeePF}
                                        name="EmployeePF"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="EmployerEsic">Employer Esic</Label>
                                    <Input
                                        value={employerEsic}
                                        disabled
                                        name="EmployerEsic" />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="EmployeeEsic">Employee Esic</Label>
                                    <Input
                                        value={employeeEsic}
                                        name="EmployeeEsic"
                                        disabled />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="ProfessionalTax">Professional Tax</Label>
                                    <Input
                                        value={professionalTax}
                                        name="ProfessionalTax"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="Advances">Advances</Label>
                                    <Input
                                        value={advances}
                                        name="Advances"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={4}>
                                <FormGroup>
                                    <Label htmlFor="IncomeTax">Income Tax</Label>
                                    <Input
                                        value={incomeTax}
                                        disabled
                                        name="IncomeTax" />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label htmlFor="TotalDeduction">Total Deduction</Label>
                                    <Input
                                        value={totalDeduction}
                                        name="TotalDeduction"
                                        disabled />
                                </FormGroup>
                            </Col>

                            <Col lg={6}>
                                <FormGroup>
                                    <Label htmlFor="NetPayable">Net Payable</Label>
                                    <Input
                                        value={netPayable}
                                        name="NetPayable"
                                        disabled />
                                </FormGroup>
                            </Col>

                        </Row>

                        <Row>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label htmlFor="SalaryMonth">Salary Month</Label>
                                    <Input
                                        value={salaryMonth}
                                        disabled
                                        name="SalaryMonth" />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label htmlFor="SalaryYear">Salary Year</Label>
                                    <Input
                                        value={salaryYear}
                                        disabled
                                        name="SalaryYear" />
                                </FormGroup>
                            </Col>
                        </Row>


                        <Row >
                            <Col lg={3}>
                                <Button color="primary"
                                    onClick={() => { onHandelEdit() }}
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

            {/* end  */}
        </React.Fragment>
    );
};


