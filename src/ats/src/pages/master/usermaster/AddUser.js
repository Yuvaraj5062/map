import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, FormGroup, Form, Label, Input } from 'reactstrap';
import {

    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { getRoleList } from '../../../redux/role/actions';
import { setUser } from '../../../redux/user/actions';
import * as api from '../../../helpers/restApi';
import swal from 'sweetalert';
import Loader from '../../../components/Loader';
import moment from 'moment';
import * as FeatherIcon from 'react-feather';

const AddUser = () => {
    var currentTime = moment().format('YYYY-MM-DD');
    let loginDetails = useSelector((state) => state.Auth.user || []);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setConfShowPassword] = useState(false)
    const [ECode, setECode] = useState('');
    const [EEtype, setEEtype] = useState('');
    const [EBankName, setEBankName] = useState('');
    const [EFullname, setEFullname] = useState('');
    const [ECompany_Name, setECompany_Name] = useState('');
    const [EAccountNo, setEAccountNo] = useState('');
    const [EGender, setEGender] = useState('');
    const [EDepartment, setEDepartment] = useState('');
    const [EBranch, setEBranch] = useState('');
    const [EEmail, setEEmail] = useState('');
    const [EDesignation, setEDesignation] = useState('');
    const [EIFC_Code, setEIFC_Code] = useState('');
    const [EDOB, setEDOB] = useState('');
    const [ELocation, setELocation] = useState('');
    const [EPFAccount, setEPFAccount] = useState('');
    const [EAddress, setEAddress] = useState('');
    const [ECAddress, setECAddress] = useState('');
    const [EOfferDate, setEOfferDate] = useState('');
    const [EPAN_No, setEPAN_No] = useState('');
    const [EJoinDate, setEJoinDate] = useState('');
    const [EAadhar_no, setEAadhar_no] = useState('');
    const [ERole, setERole] = useState('');
    const [ESalary, setESalary] = useState('');
    const [EPostal, setEPostal] = useState('');
    const [EUserName, setEUserName] = useState('');
    const [EPF, setEPF] = useState('');
    const [EContNo, setEContNo] = useState('');
    const [EPassword, setEPassword] = useState('');
    const [ERetype, setERetype] = useState('');
    const [EPT, setEPT] = useState('');
    const [EEmergencyContNo, setEEmergencyContNo] = useState('');
    const [EBloodGroup, setEBloodGroup] = useState('');
    const [EESI, setEESI] = useState('');
    const [EPFApply, setEPFApply] = useState(false);
    const [EPTApply, setEPTApply] = useState(null);
    const [EESIApply, setEESIApply] = useState(null);
    const [Ephoto, setEphoto] = useState('');
    const [loader, setLoader] = useState(false);
    const [E_ProbationPeriod, setE_ProbationPeriod] = useState()
    const [E_Region, setE_Region] = useState('')
    const [E_Reason, setE_Reason] = useState('')
    const [E_FullAndFinal_Date, setE_FullAndFinal_Date] = useState('')
    const [E_Updated_By, setE_Updated_By] = useState(loginDetails.Username)
    const [E_Updated_On, setE_Updated_On] = useState(currentTime)
    const [EExitDate, setEExitDate] = useState('')
    const [reportingManager, setReportingManager] = useState('')
    const [attritionType, setAttritionType] = useState('');
    const [EPersonalEmail, setEPersonalEmail] = useState('');
    const [pfAmount, setPfAmount] = useState('')

    const handleSubmit = e => {
        let isOk = true
        if (EPassword !== ERetype) {
            isOk = false
            swal('Failed', "Password and confirm password must be same", "error")
        }
        e.preventDefault();
        const reqBody = {
            ECode: ECode,
            EEtype: EEtype,
            EBankName: EBankName,
            EFullname: EFullname,
            ECompany_Name: ECompany_Name,
            EAccountNo: EAccountNo,
            EGender: EGender,
            EDepartment: EDepartment,
            EBranch: EBranch,
            EEmail: EEmail,
            EDesignation,
            EIFC_Code: EIFC_Code,
            EDOB: EDOB,
            ELocation: ELocation,
            EPFAccount: EPFAccount,
            EAddress: EAddress,
            ECAddress: ECAddress,
            EOfferDate: EOfferDate,
            EPAN_No: EPAN_No,
            EJoinDate: EJoinDate,
            EAadhar_no: EAadhar_no,
            ERole: ERole,
            ESalary: ESalary,
            EPostal: EPostal,
            EUserName: EUserName,
            //if pf applied then pf amount will send  to backend otherwise value wil be 0
            EPF: EPFApply ? EPF : 0,
            EContNo: EContNo,
            EPassword: EPassword,
            EPT: EPT,
            EEmergencyContNo: EEmergencyContNo,
            EBloodGroup: EBloodGroup,
            EESI: EESI,
            EPFApply: Boolean(EPFApply),
            EPTApply: Boolean(EPTApply),
            EESIApply: Boolean(EESIApply),
            Ephoto: Ephoto,
            E_ProbationPeriod: E_ProbationPeriod,
            E_Region: E_Region,
            E_Reason: E_Reason,
            E_FullAndFinal_Date: E_FullAndFinal_Date,
            E_Updated_By: E_Updated_By,
            E_Updated_On: E_Updated_On,
            EExitDate: EExitDate,
            reportingmanager: reportingManager,
            attritiontype: attritionType,
            E_PersonalMailId: EPersonalEmail,
            ERetype: ERetype
        };
        //dispatch(setUser(reqBody));
        //cleanForm();
        if (isOk) {
            setLoader(true)
            api.setUser(reqBody).then((res) => {
                // //console.log(res)
                dispatch(setUser(reqBody, res));
                swal(res.data.Status == true ? 'Success' : 'Failed', res.data.Message, res.data.Status == true ? 'success' : 'error');
                cleanForm();
                setLoader(false)
            }).catch((err) => {
                //console.log(err)
                setLoader(false)
                swal('Failed', err.response.data.Message, "error");
            })
        }
    }
    const [selectEmpType] = React.useState([
        {
            label: 'CONTRACTUAL',
            value: 'CONTRACTUAL',
        },
        { label: 'PERMANENT', value: 'PERMANENT' },
        { label: 'C2H', value: 'C2H' },
    ]);
    const [selectGender] = React.useState([
        { label: 'Male', value: 'Male', },
        { label: 'Female', value: 'Female' }
    ]);
    // let roleList = useSelector((state) => state.Role.role || []);
    let roleList =[
        {"role":"IT"},
        {"role":"Recruiter"},
        {"role":"Project manager"},
        {"role":"HR"},
        {"role":"HR Manager"},
        {"role":"Sales"},
        {"role":"Teamlead"},
        {"role":"Admin"},
         {"role":"Edit "},
        {"role":"Delete"},

    ]

    useEffect(() => {
        dispatch(getRoleList());

        // eslint-disable-next-line
    }, []);
    const cleanForm = () => {
        setECode('');
        setEEtype([]);
        setEBankName('');
        setEFullname('');
        setECompany_Name('');
        setEAccountNo('');
        setEGender([]);
        setEDepartment('');
        setEBranch('');
        setEEmail('');
        setEDesignation('');
        setEIFC_Code('');
        setEDOB('');
        setELocation('');
        setEPFAccount('');
        setEAddress('');
        setECAddress('');
        setEOfferDate('');
        setEPAN_No('');
        setEJoinDate('');
        setEAadhar_no('');
        setERole([]);
        setESalary('');
        setEPostal('');
        setEUserName('');
        setEPF('');
        setEContNo('');
        setEPassword('');
        setEPT('');
        setEEmergencyContNo('');
        setEBloodGroup('');
        setEESI('');
        setEPFApply(false);
        setEPTApply(false);
        setEESIApply(false);
        setEphoto('');
        setERetype("");
        setReportingManager(' ');
        setEPersonalEmail('');
    }

    const handelOfferDate = (e) => {
        setEOfferDate(e.target.value);
        setEJoinDate(' ')
    }


    // const handelPassShow=()=>{
    //     setShowPassword(!showPassword)
    //    //console.log("LLLLLLLLLLLLLKKK")
    // }


    return (
        <React.Fragment>
            {loader !== true ?
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoApellidos">Employee Code <span className="redspan">*</span></Label>
                                <Input
                                    type="number" required
                                    className="style-input"
                                    name="ECode "
                                    id="ECode "
                                    value={ECode}
                                    onChange={(e) => {
                                        setECode(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Full Name <span className="redspan">*</span></Label>
                                <input required
                                    type="text"
                                    className="form-control style-input"
                                    id="EFullname"
                                    value={EFullname}
                                    name="EFullname" onChange={(e) => {
                                        setEFullname(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre"> Gender <span className="redspan">*</span></Label>
                                <select className="form-control style-input" value={EGender} required name="EGender" id="EGender" onChange={(e) => {
                                    setEGender(e.target.value);
                                }}>
                                    <option value="">Select Gender</option>
                                    {selectGender.map((gender) => (
                                        <option key={gender.value} value={gender.value}>
                                            {gender.label}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Email <span className="redspan">*</span></Label>
                                <Input
                                    type="email" required
                                    className="style-input"
                                    value={EEmail}
                                    id="EEmail"
                                    name="EEmail" onChange={(e) => {
                                        setEEmail(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={EContNo}
                                    id="EContNo"
                                    className="style-input"
                                    name="EContNo" onChange={(e) => {
                                        setEContNo(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Emergency Contact Number</Label>
                                <Input
                                    type="text"
                                    value={EEmergencyContNo}
                                    id="EEmergencyContNo"
                                    className="style-input"
                                    name="EEmergencyContNo" onChange={(e) => {
                                        setEEmergencyContNo(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Date Of Birth <span className="redspan">*</span></Label>
                                <Input
                                    type="date" required
                                    className="style-input"
                                    value={EDOB}

                                    onKeyDown={(e) => e.preventDefault()}
                                    max={new Date().toISOString().split("T")[0]}
                                    id="EDOB"
                                    name="EDOB" onChange={(e) => {
                                        setEDOB(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Username <span className="redspan">*</span></Label>
                                <Input
                                    type="text" required
                                    value={EUserName}
                                    id="EUserName"
                                    className="style-input"
                                    name="EUserName" onChange={(e) => {
                                        setEUserName(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup className='relative-class'>
                                <Label htmlFor="empleadoNombre">Password <span className="redspan">*</span></Label>
                                <InputGroup>

                                    <Input

                                        type={showPassword ? "text" : "password"} required
                                        value={EPassword}
                                        id="EPassword"
                                        className="style-input input"
                                        name="EPassword" onChange={(e) => {
                                            setEPassword(e.target.value);
                                        }} />

                                    <InputGroupAddon addonType="prepend">
                                        <span className="absolute-class ">
                                            {showPassword ? <FeatherIcon.EyeOff onClick={() => { setShowPassword(!showPassword) }} />
                                                : <FeatherIcon.Eye onClick={() => { setShowPassword(!showPassword) }} />
                                            }

                                        </span>
                                    </InputGroupAddon>
                                </InputGroup>
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup className='relative-class'>
                                <Label htmlFor="password">Confirm Password<span className="redspan">*</span></Label>
                                <InputGroup>

                                    <Input
                                         type={showConfPassword ? "text" : "password"} required
                                        value={ERetype}
                                        id="ERetype"
                                        className="style-input input"
                                        name="ERetype" onChange={(e) => {
                                            setERetype(e.target.value);
                                        }} />

                                    <InputGroupAddon addonType="prepend">
                                        <span className="absolute-class ">
                                            {showConfPassword ? <FeatherIcon.EyeOff onClick={() => { setConfShowPassword(!showConfPassword) }} />
                                                : <FeatherIcon.Eye onClick={() => { setConfShowPassword(!showConfPassword) }} />
                                            }

                                        </span>
                                    </InputGroupAddon>
                                </InputGroup>

                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <Label>Permanent Address <span className="redspan">*</span></Label>

                            <Input
                                type="text" required
                                value={EAddress}
                                id="EAddress"
                                className="style-input"
                                name="EAddress" onChange={(e) => {
                                    setEAddress(e.target.value);
                                }} />

                            {/* <textarea
                                className="form-control style-input"
                                rows="3"
                                value={EAddress}
                                name="EAddress" id="EAddress" onChange={(e) => {
                                    setEAddress (e.target.value);
                                }}></textarea> */}
                        </Col>



                        <Col lg={4}>
                            <Label>Current Address</Label>

                            <Input
                                type="text"
                                value={ECAddress}
                                id="ECAddress"
                                className="style-input"
                                name="ECAddress" onChange={(e) => {
                                    setECAddress(e.target.value);
                                }} />
                            {/* <textarea
                                className="form-control style-input"
                                rows="3"
                                value={ECAddress}
                                name="ECAddress" id="ECAddress" onChange={(e) => {
                                    setECAddress (e.target.value);
                                }}></textarea> */}
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">PostCode</Label>
                                <Input
                                    type="text"
                                    value={EPostal}
                                    id="EPostal"
                                    className="style-input"
                                    name="EPostal" onChange={(e) => {
                                        setEPostal(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre"> Employee Type <span className="redspan">*</span></Label>
                                <select className="form-control style-input" required
                                    name="EEtype" id="EEtype" onChange={(e) => {
                                        setEEtype(e.target.value);
                                    }}>
                                    <option value="">Select Employee Type</option>
                                    {selectEmpType.map((emptype) => (
                                        <option key={emptype.value} value={emptype.value}>
                                            {emptype.label}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Company Name<span className="redspan">*</span></Label>

                                <select required
                                    className="form-control style-input"
                                    id="ECompany_Name"
                                    value={ECompany_Name}
                                    name="ECompany_Name" onChange={(e) => {
                                        setECompany_Name(e.target.value);
                                    }}>
                                    <option value="">Select Company</option>
                                    <option value="Arche Softronix Pvt Ltd">Arche Softronix Pvt Ltd</option>
                                    <option value="Reyna Solutions LLP">Reyna Solutions LLP</option>
                                </select>
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Department <span className="redspan">*</span></Label>
                                <Input
                                    type="text" required
                                    value={EDepartment}
                                    className="style-input"
                                    id="EDepartment"
                                    name="EDepartment" onChange={(e) => {
                                        setEDepartment(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Designation <span className="redspan">*</span></Label>
                                <Input
                                    type="text" required
                                    className="style-input"
                                    value={EDesignation}
                                    id="EDesignation"
                                    name="EDesignation" onChange={(e) => {
                                        setEDesignation(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>



                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Location <span className="redspan">*</span></Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={ELocation}
                                    id="ELocation"
                                    required
                                    name="ELocation" onChange={(e) => {
                                        setELocation(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Blood Group</Label>
                                <Input
                                    type="text"
                                    value={EBloodGroup}
                                    id="EBloodGroup"
                                    className="style-input"
                                    name="EBloodGroup" onChange={(e) => {
                                        setEBloodGroup(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Offer Date <span className="redspan">*</span></Label>
                                <Input
                                    type="date"
                                    id="EOfferDate"
                                    value={EOfferDate}
                                    required
                                    className="style-input"
                                    onKeyDown={(e) => e.preventDefault()}
                                    name="EOfferDate" onChange={(e) => {
                                        handelOfferDate(e)
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Join Date<span className="redspan">*</span></Label>
                                <Input
                                    type="date" required
                                    className="style-input"
                                    value={EJoinDate}
                                    id="EJoinDate"
                                    disabled={!EOfferDate}
                                    min={EOfferDate}
                                    onKeyDown={(e) => e.preventDefault()}
                                    name="EJoinDate" onChange={(e) => {
                                        setEJoinDate(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        {/* <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="EExitDate">Exit Date<span className="redspan"></span></Label>
                                <Input
                                    type="date" 
                                    className="style-input"
                                    value={EExitDate}
                                    id="EExitDate"
                                    name="EExitDate" onChange={(e) => {
                                        setEExitDate(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col> */}

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Role <span className="redspan">*</span></Label>
                                <select
                                    type="text" required
                                    className="style-input form-control"
                                    id="ERole"
                                    value={ERole}
                                    name="ERole" onChange={(e) => {
                                        setERole(e.target.value);
                                    }}>
                                    <option value="">Select</option>
                                    {roleList.map((roles, i) => (
                                        <option key={i++} value={roles.role}>
                                            {roles.role}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Bank Name</Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={EBankName}
                                    id="EBankName"
                                    name="EBankName" onChange={(e) => {
                                        setEBankName(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Account Number</Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={EAccountNo}
                                    id="EAccountNo"
                                    name="EAccountNo" onChange={(e) => {
                                        setEAccountNo(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Branch</Label>
                                <Input
                                    type="text"
                                    value={EBranch}
                                    className="style-input"
                                    id="EBranch"
                                    name="EBranch" onChange={(e) => {
                                        setEBranch(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">IFSC Code</Label>
                                <Input
                                    type="text"
                                    value={EIFC_Code}
                                    className="style-input"
                                    id="EIFC_Code"
                                    name="EIFC_Code" onChange={(e) => {
                                        setEIFC_Code(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">PF Account No</Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={EPFAccount}
                                    id="EPFAccount"
                                    name="EPFAccount" onChange={(e) => {
                                        setEPFAccount(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">PAN Card Number</Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={EPAN_No}
                                    id="EPAN_No"
                                    name="EPAN_No" onChange={(e) => {
                                        setEPAN_No(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Aadhar Card Number</Label>
                                <Input
                                    type="text"
                                    value={EAadhar_no}
                                    id="EAadhar_no"
                                    className="style-input"
                                    name="EAadhar_no" onChange={(e) => {
                                        setEAadhar_no(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Salary  <span className="redspan">*</span></Label>
                                <Input
                                    type="text"
                                    required
                                    className="style-input"
                                    value={ESalary}
                                    id="ESalary"
                                    name="ESalary" onChange={(e) => {
                                        setESalary(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Provident Fund</Label>
                                <Input
                                    type="text"
                                    className="style-input"
                                    value={EPF}
                                    id="EPF"
                                    name="EPF" onChange={(e) => {
                                        setEPF(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Professional Tax (%)</Label>
                                <Input
                                    type="text"
                                    value={EPT}
                                    className="style-input"
                                    id="EPT"
                                    name="EPT" onChange={(e) => {
                                        setEPT(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">ESI</Label>
                                <Input
                                    type="text"
                                    value={EESI}
                                    className="style-input"
                                    id="EESI"
                                    name="EESI" onChange={(e) => {
                                        setEESI(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="reportingManager">Reporting Manager  <span className="redspan">*</span></Label>
                                <Input
                                    type="email" required
                                    value={reportingManager}
                                    className="style-input"
                                    id="reportingManager"
                                    name="reportingManager" onChange={(e) => {
                                        setReportingManager(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        {/* <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Attrition Type<span className="redspan">*</span></Label>

                                <select required
                                    className="form-control style-input"
                                    id="Attrition"
                                    value={attritionType}
                                    name="Attrition" onChange={(e) => {
                                        setAttritionType(e.target.value);
                                    }}>
                                    <option value="">Select Attrition Type</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Contractual">Contractual</option>
                                </select>
                            </FormGroup>
                        </Col> */}

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Reason</Label>
                                <Input
                                    type="text"
                                    value={E_Reason}
                                    className="style-input"
                                    id="E_Reason"
                                    name="E_Reason" onChange={(e) => {
                                        setE_Reason(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="EPersonalEmail">Employee Personal Email</Label>
                                <Input
                                    type="text"
                                    value={EPersonalEmail}
                                    className="style-input"
                                    id="EPersonalEmail"
                                    name="EPersonalEmail" onChange={(e) => {
                                        setEPersonalEmail(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Probation Period <span className="redspan">*</span></Label>
                                <Input
                                    type="number" required
                                    value={E_ProbationPeriod}
                                    className="style-input"
                                    id="E_ProbationPeriod"
                                    name="E_ProbationPeriod" onChange={(e) => {
                                        setE_ProbationPeriod(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>

                        {/* 
                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre">Region</Label>
                                <Input
                                    type="text"
                                    value={E_Region}
                                    className="style-input"
                                    id="E_Region"
                                    name="E_Region" onChange={(e) => {
                                        setE_Region(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col> */}
                    </Row>

                    <Row>
                        <Col lg={6}>
                            <Row>
                                <label className="col-sm-12 m-0">What Applied</label>
                                <Col lg={4}>
                                    <div className="form-group form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" id="EPFApply"
                                                name="EPFApply" value={EPFApply}
                                                defaultChecked={EPFApply} onClick={(e) => {
                                                    setEPFApply(!EPFApply);
                                                }} /> PF Apply
                                        </label>
                                    </div>
                                </Col>
                                {/* <Col lg={4}>
                                    <div className="form-group form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" id="EPTApply"
                                                name="EPTApply" value={EPTApply || true}
                                                defaultChecked={EPTApply} onClick={(e) => {
                                                    setEPTApply(e.target.value);
                                                }} /> PT Apply
                                        </label>
                                    </div>
                                </Col> */}
                                <Col lg={4}>
                                    <div className="form-group form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" id="EESIApply"
                                                name="EESIApply" value={EESIApply || true}
                                                defaultChecked={EESIApply} onClick={(e) => {
                                                    setEESIApply(e.target.value);
                                                }} /> ESI Apply
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={4}>
                            <FormGroup>
                                <Label htmlFor="empleadoNombre"> Upload Photo</Label>
                                <Input
                                    type="file"
                                    className="style-input"
                                    id="Ephoto"
                                    name="Ephoto" onChange={(e) => {
                                        setEphoto(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" onClick={cleanForm} className="btn btn-secondary ml-3">Cancel</button>
                        </Col>
                    </Row>
                </Form> :
                <Loader />
            }
        </React.Fragment>
    );
};

export default AddUser;


