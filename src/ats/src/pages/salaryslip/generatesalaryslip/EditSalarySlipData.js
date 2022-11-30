import React, { useEffect, useState } from 'react'
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
import swal from 'sweetalert';
import * as api from './../../../helpers/restApi'

export const EditSalarySlipData =
    ({ editModel, setEditModelOpen, data }) => {

        const [empName, setEmpName] = useState(" ")
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

        useEffect(() => {
            if (data !== undefined) {
                setEmpName(data.Employee_Name)
                setECode(data.Employee_Code)
                setEmpPan(data.Employee_Pan)
                setEmpCtc(data.CTC)
                setBasicSalary(data.Basic_Salary)
                setFixedHRA(data.Fixed_HRA)
                setFixConveyanceAllowance(data.Fixed_Conveyance_Allowance)
                setFixMedicalAllowance(data.Fixed_Medical_Allowance)
                setMedicalAllowance(data.Medical_Allowance)
                setAdditionalHRAAllowance(data.Additional_HRA_Allowance)
                setTotalPayableDays(data.Total_Payable_Days)
                setLopLeves(data.LWP_Days)
                setPaidLeaves(data.Paid_Leave)
                setTotalDays(data.Total_Days)
                setGrossSalary(data.Gross_Salary_Payable)
                setBasic(data.Basic)
                setHouseRent(data.House_Rent)
                setEmployerContributionToPF(data.Employer_Cont_To_PF)
                setConveyanceAllowance(data.Conveyance_Allowance)
                setAddHraAllowance(data.Add_HRA_Allowance)
                setFlexibleAllowance(data.Flexible_Allowance)
                setIncentiveAllowance(data.Incentive_Allowance)
                setTotalEarning(data.Total_Earning)
                setEmployerPF(data.PF_Employer)
                setEmployeePF(data.PF_Employee)
                setEmployerEsic(data.Esic_Employer)
                setEmployeeEsic(data.Esic_Employee)
                setProfessionalTax(data.PT)
                setAdvances(data.Advances)
                setIncomeTax(data.Income_Tax)
                setTotalDeduction(data.Total_Deduction)
                setNetPayable(data.Net_Payable)
                setSalaryMonth(data.Salary_Month)
                setSalaryYear(data.Salary_Year)
            }
        }, [data])


        const handelEdit=()=>{
            let reqBody={
                SalaryId:data.Salary_Id,
                Ecode: data.Employee_Code,
                PaidLeaves: paidLeaves,
                LWPleaves:lopLeves,
                TotalPayabledays: totalPayableDays
              }
            
            api.editSalarySlip(reqBody).then((res) => {
                if(res.data.Status===true)
                {
                    setEditModelOpen(false)  
                }
                swal(res.data.Status==true?'Success':'Failed', res.data.Message, res.data.Status==true?'success':'error');
            })
            .catch((err) => {
               // //console.log(err)
                swal('Failed', err.response.data.Message, "error");
            })
     
    
    }

        return (
            <Row>
                <Modal isOpen={editModel} toggle={setEditModelOpen(editModel)} className='modal-lg'>
                    <ModalHeader toggle={() => setEditModelOpen(false)} >Update Salary Slip Details </ModalHeader>
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
                                    onClick={()=>{handelEdit()}}
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
        )
    }
