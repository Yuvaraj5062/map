import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Form from "reactstrap/lib/Form";
import * as actions from '../../../redux/user/actions'; 
import { getRecruiterList } from '../../../redux/recruiter/actions';
import { getTeamLeadList } from '../../../redux/teamLead/actions';

const EditUserModal = (props, row) => {
  const {
    //buttonLabel,
    className,
} = props;
  
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Users.modal);
  const userStore = useSelector((state) => state.Users.user|| []);
  const [ECode , setECode]=useState('');
    const [EEtype, setEEtype]=useState([]);
    const [EBankName, setEBankName]=useState('');
    const [EFullname, setEFullname]=useState('');
    const [ECompany_Name, setECompany_Name]=useState('');
    const [EAccountNo, setEAccountNo]=useState('');
    const [EGender, setEGender]=useState([]);
    const [EDepartment, setEDepartment]=useState('');
    const [EBranch, setEBranch]=useState('');
    const [EEmail, setEEmail]=useState('');
    const [EDesignation, setEDesignation]=useState('');
    const [EIFC_Code, setEIFC_Code]=useState('');
    const [EDOB, setEDOB]=useState('');
    const [ELocation, setELocation]=useState('');
    const [EPFAccount, setEPFAccount]=useState('');
    const [EAddress, setEAddress]=useState('');
    const [ECAddress, setECAddress]=useState('');
    const [EOfferDate, setEOfferDate]=useState('');
    const [EPAN_No, setEPAN_No]=useState('');
    const [EJoinDate, setEJoinDate]=useState('');
    const [EAadhar_no, setEAadhar_no]=useState('');
    const [ERole, setERole]=useState([]);
    const [ESalary, setESalary]=useState('');
    const [EPostal, setEPostal]=useState('');
    const [EUserName, setEUserName]=useState('');
    const [EPF, setEPF]=useState('');
    const [EContNo, setEContNo]=useState('');
    const [EPassword, setEPassword]=useState('');
    const [EPT, setEPT]=useState('');
    const [EEmergencyContNo, setEEmergencyContNo]=useState('');
    const [EBloodGroup, setEBloodGroup]=useState('');
    const [EESI, setEESI]=useState('');
    const [EPFApply, setEPFApply]=useState(null);
    const [EPTApply, setEPTApply]=useState(null);
    const [EESIApply, setEESIApply]=useState(null);
    const [Ephoto, setEphoto] = useState('');
    const [E_ProbationPeriod,setE_ProbationPeriod]=useState()
    const [E_Region, setE_Region]=useState('')
    const [E_Reason,setE_Reason]=useState('')
    const [reportingManager, setReportingManager] = useState('')
    const [EPersonalEmail, setEPersonalEmail] = useState('');
    const [E_FullAndFinal_Date,setE_FullAndFinal_Date]=useState('')
    const [selectEmpType] = React.useState([
      {
          label: 'CONTRACTUAL',
          value: 'CONTRACTUAL',
      },
      { label: 'PERMANENT', value: 'PERMANENT' },
      { label: 'C2H', value: 'C2H' },
  ]);
  const [selectGender] = React.useState([
      { label: 'Male', value: 'Male',  },
      { label: 'Female', value: 'Female' }
  ]);
  //let roleList = useSelector((state) => state.Role.role || []);
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

  const toggle = () => {
    if (!modal) {
      dispatch(actions.getUserModal()); 
    } else {
      dispatch(actions.hideUserModal());
    }
  }

  
  useEffect(() => {
      if(userStore !== null){
       // //console.log(">>>>>>????????",userStore)
        setECode(userStore.ECode||'')
        setReportingManager(userStore.Reporting_Manager||'')
        setEPersonalEmail(userStore.E_PersonalMailId||'')
        setEEtype(userStore.EEtype)
        setEBankName(userStore.EBankName||'')
        setEFullname(userStore.EFullname||'')
        setECompany_Name(userStore.ECompany_Name||'')
        setEAccountNo(userStore.EAccountNo||'')
        setEGender(userStore.EGender||'')
        setEDepartment(userStore.EDepartment||'')
        setEBranch(userStore.EBranch||'')
        setEEmail(userStore.EEmail||'')
        setEDesignation(userStore.EDesignation||'')
        setEIFC_Code(userStore.EIFC_Code||'')
        setEDOB(userStore.EDOB||'')
        setELocation(userStore.ELocation||'')
        setEPFAccount(userStore.EPFAccount||'')
        setEAddress(userStore.EAddress||'')
        setECAddress(userStore.ECAddress||'')
        setEOfferDate(userStore.EOfferDate||'')
        setEPAN_No(userStore.EPAN_No||'')
        setEJoinDate(userStore.EJoinDate||'')
        setEAadhar_no(userStore.EAadhar_no||'')
        setERole(userStore.ERole||'')
        setESalary(userStore.ESalary||'')
        setEPostal(userStore.EPostal||'')
        setEUserName(userStore.EUserName||'')
        setEPF(userStore.EPF||'')
        setEContNo(userStore.EContNo||'')
        setEPassword(userStore.EPassword||'')
        setEPT(userStore.EPT||'')
        setEEmergencyContNo(userStore.EEmergencyContNo||'')
        setEBloodGroup(userStore.EBloodGroup||'')
        setEESI(userStore.EESI||'')
        setEPFApply(userStore.EPFApply)
        setEPTApply(userStore.EPTApply)
        setEESIApply(userStore.EESIApply)
        setE_ProbationPeriod(userStore.E_ProbationPeriod)
        setE_Region(userStore.E_Region)
        setE_Reason(userStore.E_Reason)
        setE_FullAndFinal_Date(userStore.E_FullAndFinal_Date)
        setEphoto(userStore.Ephoto||'')

    }
  },[userStore])

  const handleSubmit = e => {
    e.preventDefault();
    const reqBody ={
        ECode:ECode ,
        EEtype:EEtype,
        EBankName:EBankName,
        EFullname:EFullname,
        ECompany_Name:ECompany_Name,
        EAccountNo:EAccountNo,
        EGender:EGender,
        EDepartment:EDepartment,
        EBranch:EBranch,
        EEmail:EEmail,
        EDesignation,
        EIFC_Code:EIFC_Code,
        EDOB:EDOB,
        ELocation:ELocation,
        EPFAccount:EPFAccount,
        EAddress:EAddress,
        ECAddress:ECAddress,
        EOfferDate:EOfferDate,
        EPAN_No:EPAN_No,
        EJoinDate:EJoinDate,
        EAadhar_no:EAadhar_no,
        ERole:ERole,
        ESalary:ESalary,
        EPostal:EPostal,
        EUserName:EUserName,
        EPF:EPF,
        EContNo:EContNo,
        EPassword:EPassword,
        EPT:EPT,
        EEmergencyContNo:EEmergencyContNo,
        EBloodGroup:EBloodGroup,
        EESI:EESI,
        EPFApply:Boolean(EPFApply),
        EPTApply:Boolean(EPTApply),
        EESIApply:Boolean(EESIApply),
        Ephoto:Ephoto,
        E_ProbationPeriod:E_ProbationPeriod,
        E_Region:E_Region,
        E_Reason:E_Reason,
        E_FullAndFinal_Date:E_FullAndFinal_Date,
        E_Updated_By:userStore.E_Updated_By,
        E_Updated_On:userStore.E_Updated_On,
        E_PersonalMailId:EPersonalEmail,
        Reporting_Manager:reportingManager


    };
    dispatch(actions.updateUser(reqBody));
        dispatch(getRecruiterList());
        dispatch(getTeamLeadList());
    
}

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  return(
    <div>
      <Modal isOpen={modal} size={"lg"} toggle={toggle} className={` ${className} 'modal-lg' `}>
        <ModalHeader toggle={toggle}>Update User</ModalHeader>
        <ModalBody style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={4} className="mt-2">
              <FormGroup>
                <Label for="empleadoApellidos">Employee Code <span className="redspan">*</span></Label>
                <Input
                  type="text" required
                  className=""
                  name="ECode"
                  id="ECode"
                  disabled
                  value={ECode}
                  onChange={(e) => {
                      setECode(e.target.value);
                  }}/>
              </FormGroup>
            </Col>
     
                      
                        <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Full Name <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        className=""
                                        id="EFullname"
                                        value={EFullname}
                                        name="EFullname" onChange={(e) => {
                                            setEFullname (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Gender <span className="redspan">*</span></Label>
                                <select className="form-control " required name="EGender" id="EGender" value={EGender} onChange={(e) => {
                                    setEGender (e.target.value);
                                }}>
                                     <option value="">Select</option>
                                    {selectGender.map((gender) => (
                                    <option key={gender.value} value={gender.value}>
                                        {gender.label}
                                    </option>
                                ))}
                                </select>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Email <span className="redspan">*</span></Label>
                                    <Input
                                        type="email" required
                                        className=""
                                        id="EEmail"
                                        value={EEmail}
                                        name="EEmail" onChange={(e) => {
                                            setEEmail (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Phone Number</Label>
                                    <Input
                                        type="text"
                                        id="EContNo"
                                        className=""
                                        value={EContNo}
                                        name="EContNo" onChange={(e) => {
                                            setEContNo (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Emergency Contact Number</Label>
                                    <Input
                                        type="text"
                                        id="EEmergencyContNo"
                                        className=""
                                        value={EEmergencyContNo}
                                        name="EEmergencyContNo" onChange={(e) => {
                                            setEEmergencyContNo (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Date Of Birth <span className="redspan">*</span></Label>
                                    <Input
                                        type="date" required
                                        className=""
                                        id="EDOB"
                                        value={formatDate(EDOB)}
                                        name="EDOB" onChange={(e) => {
                                            // //console.log(">>>>>>>>>>", e.target.value)
                                            setEDOB(e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Username <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        id="EUserName"
                                        className=""
                                        value={EUserName}
                                        name="EUserName" onChange={(e) => {
                                            setEUserName (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={6}>
                            <Label>Permanent Address <span className="redspan">*</span></Label>
                            <Input
                            required
                                className="form-control "

                                
                                name="EAddress" id="EAddress" value={EAddress} onChange={(e) => {
                                    setEAddress (e.target.value);
                                }}></Input>
                        </Col>


                        <Col lg={6}>
                            <Label>Current Address  </Label>
                            <Input
                                className="form-control "
                                
                                name="ECAddress" id="ECAddress" value={ECAddress} onChange={(e) => {
                                    setECAddress (e.target.value);
                                }}></Input>
                        </Col>


                        <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">PostCode</Label>
                                    <Input
                                        type="text"
                                        id="EPostal"
                                        className=""
                                        value={EPostal}
                                        name="EPostal" onChange={(e) => {
                                            setEPostal (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
              <FormGroup>
                <Label for="empleadoNombre">Employee Type <span className="redspan">*</span></Label>
                <select className="form-control " required
                  name="EEtype" id="EEtype" value={EEtype} onChange={(e) => {
                  setEEtype(e.target.value);
                }}> 
                <option value="">Select</option>
                {selectEmpType.map((emptype) => (
                  <option key={emptype.value} value={emptype.value}>
                      {emptype.label}
                  </option>
              ))}
                  </select>
              </FormGroup>
            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Company Name<span className="redspan">*</span></Label>
                                    {/* <Input
                                        type="text" required
                                        className=""
                                        id="ECompany_Name"
                                        value={ECompany_Name}
                                        name="ECompany_Name" onChange={(e) => {
                                            setECompany_Name (e.target.value);
                                        }}/> */}
                                           <select required
                                    className="form-control"
                                    id="ECompany_Name"
                                    value={ECompany_Name}
                                    name="ECompany_Name" onChange={(e) => {
                                        setECompany_Name(e.target.value);
                                    }}>
                                    <option value="">Select</option>
                                    <option value="Arche Softronix Pvt Ltd">Arche Softronix Pvt Ltd</option>
                                    <option value="Reyna Solutions LLP">Reyna Solutions LLP</option>
                                </select>
                                </FormGroup>
                            </Col>

 
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Department <span className="redspan">*</span></Label>
                                    <Input
                                        type="text"  required
                                        className=""
                                        id="EDepartment"
                                        value={EDepartment}
                                        name="EDepartment" onChange={(e) => {
                                            setEDepartment (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Designation <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        className=""
                                        id="EDesignation"
                                        value={EDesignation}
                                        name="EDesignation" onChange={(e) => {
                                            setEDesignation (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>


                               
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Location <span className="redspan">*</span></Label>
                                    <Input required
                                        type="text"
                                        className=""
                                        id="ELocation"
                                        value={ELocation}
                                        name="ELocation" onChange={(e) => {
                                            setELocation (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Blood Group</Label>
                                    <Input
                                        type="text"
                                        id="EBloodGroup"
                                        className=""
                                        value={EBloodGroup}
                                        name="EBloodGroup" onChange={(e) => {
                                            setEBloodGroup (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Offer Date <span className="redspan">*</span></Label>
                                    <Input required
                                        type="date"
                                        id="EOfferDate"
                                        className=""
                                        value={formatDate(EOfferDate)}
                                        name="EOfferDate" onChange={(e) => {
                                            setEOfferDate (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Join Date<span className="redspan">*</span></Label>
                                    <Input
                                        type="date" required
                                        className=""
                                        id="EJoinDate"
                                        value={formatDate(EJoinDate)}
                                        name="EJoinDate" onChange={(e) => {
                                            setEJoinDate (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Role <span className="redspan">*</span></Label>
                                    <select
                                        type="text" required
                                        className=" form-control"
                                        id="ERole"
                                        value={ERole}
                                        name="ERole" onChange={(e) => {
                                            setERole (e.target.value);
                                        }}>
                                             <option value={ERole}>{ERole}</option>
                                            {roleList.map((roles, i) => (
                                                <option key={i ++}  value={roles.role}>
                                                    {roles.role}
                                                </option>
                                            ))}
                                        </select>
                                </FormGroup>
                            </Col>

                            
            <Col lg={4} className="mt-2">
                <FormGroup>
                <Label for="empleadoNombre">Bank Name</Label>
                    <Input
                        type="text"
                        className=""
                        id="EBankName"
                        value={EBankName}
                        name="EBankName" onChange={(e) => {
                            setEBankName (e.target.value);
                        }}/>
                </FormGroup>
            </Col>


                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Account Number</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EAccountNo"
                                        value={EAccountNo}
                                        name="EAccountNo" onChange={(e) => {
                                            setEAccountNo (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                     
                        
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Branch</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EBranch"
                                        value={EBranch}
                                        name="EBranch" onChange={(e) => {
                                            setEBranch (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                    
                   
                       
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">IFSC Code</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EIFC_Code"
                                        value={EIFC_Code}
                                        name="EIFC_Code" onChange={(e) => {
                                            setEIFC_Code (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                 
                       
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">PF Account No</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EPFAccount"
                                        value={EPFAccount}
                                        name="EPFAccount" onChange={(e) => {
                                            setEPFAccount (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                     
                        
                     
                       
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">PAN Card Number</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EPAN_No"
                                        value={EPAN_No}
                                        name="EPAN_No" onChange={(e) => {
                                            setEPAN_No (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                        
                       
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                <Label for="empleadoNombre">Aadhar Card Number</Label>
                                    <Input
                                        type="text"
                                        id="EAadhar_no"
                                        value={EAadhar_no}
                                        className=""
                                        name="EAadhar_no" onChange={(e) => {
                                            setEAadhar_no (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                         
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Salary <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        className=""
                                        id="ESalary"
                                        value={ESalary}
                                        name="ESalary" onChange={(e) => {
                                            setESalary (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                     
                        
                          
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Provident Fund</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EPF"
                                        value={EPF}
                                        name="EPF" onChange={(e) => {
                                            setEPF (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                    
                        
                            {/* <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Password <span className="redspan">*</span></Label>
                                    <Input
                                        type="text" required
                                        id="EPassword"
                                        className=""
                                        value={EPassword}
                                        name="EPassword" onChange={(e) => {
                                            setEPassword (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col> */}
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">Professional Tax (%)</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EPT"
                                        value={EPT}
                                        name="EPT" onChange={(e) => {
                                            setEPT (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                       
                    
                      
                       
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label for="empleadoNombre">ESI</Label>
                                    <Input
                                        type="text"
                                        className=""
                                        id="EESI"
                                        value={EESI}
                                        name="EESI" onChange={(e) => {
                                            setEESI (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            <Col lg={4} className="mt-2">
                            <FormGroup>
                                <Label htmlFor="reportingManager">Reporting Manager<span className="redspan">*</span></Label>
                                <Input
                                    type="email" required
                                    value={reportingManager}
                                
                                    id="reportingManager"
                                    name="reportingManager" onChange={(e) => {
                                        setReportingManager(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>


                        <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Reason</Label>
                                    <Input
                                        type="text"
                                        value={E_Reason}
                                        className=""
                                        id="E_Reason"
                                        name="E_Reason" onChange={(e) => {
                                            setE_Reason (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                        <Col lg={4} className="mt-2">
                            <FormGroup>
                                <Label htmlFor="EPersonalEmail">Employee Personal Email</Label>
                                <Input
                                    type="text"
                                    value={EPersonalEmail}
                                    id="EPersonalEmail"
                                    name="EPersonalEmail" onChange={(e) => {
                                        setEPersonalEmail(e.target.value);
                                    }} />
                            </FormGroup>
                        </Col>



                            {/* <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Region</Label>
                                    <Input
                                        type="text"
                                        value={E_Region}
                                        className=""
                                        id="E_Region"
                                        name="E_Region" onChange={(e) => {
                                            setE_Region (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col> */}
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">Probation Period <span className="redspan">*</span></Label>
                                    <Input
                                        type="number" required
                                        value={E_ProbationPeriod}
                                        className=""
                                        id="E_ProbationPeriod"
                                        name="E_ProbationPeriod" onChange={(e) => {
                                            setE_ProbationPeriod (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>
                            <Col lg={4} className="mt-2">
                                <FormGroup>
                                    <Label htmlFor="empleadoNombre">F&F Date</Label>
                                    <Input
                                        type="date"
                                        value={E_FullAndFinal_Date}
                                        className=""
                                        id="E_FullAndFinal_Date"
                                        name="E_FullAndFinal_Date" onChange={(e) => {
                                            setE_FullAndFinal_Date (e.target.value);
                                        }}/>
                                </FormGroup>
                            </Col>

                            
                        <Col lg={4} className="mt-2">
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
                        
                        <Col lg={6}>
                        <Row>
                        <label className="col-sm-12 m-0">What Applied</label>
                            <Col lg={4} className="mt-2">
                        <div className="form-group form-check">                            
                            <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"  id="EPFApply"
                                        name="EPFApply" value={EPFApply || true} 
                                        defaultChecked={EPFApply} onClick={(e) => {
                                            setEPFApply (e.target.value);
                                        }}/> PF Apply 
                            </label>
                        </div>
                        </Col>
                        {/* <Col lg={4} className="mt-2">
                        <div className="form-group form-check">                            
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox"  id="EPTApply"
                                        name="EPTApply" value={EPTApply || true}  
                                        defaultChecked={EPTApply} onClick={(e) => {
                                            setEPTApply (e.target.value);
                                        }}/> PT Apply
                            </label>
                        </div>
                        </Col> */}
                        <Col lg={4} className="mt-2">
                        <div className="form-group form-check">                            
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" id="EESIApply"
                                        name="EESIApply"  value={EESIApply || true} 
                                        defaultChecked={EESIApply} onClick={(e) => {
                                            setEESIApply (e.target.value);
                                        }}/> ESI Apply
                            </label>
                        </div>
                        </Col>
                        </Row>
                    </Col>
                        <Row>
                        <Col lg={12}>
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button onClick={toggle} type="button" className="btn btn-secondary ml-3">Cancel</button>
                            </Col>
                        </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
                          
  )
}

export default EditUserModal;