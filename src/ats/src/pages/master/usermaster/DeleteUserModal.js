import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Form from "reactstrap/lib/Form";
import * as actions from '../../../redux/user/actions'; 

const DeleteUserModal = (props, row) => {
  const {
    //buttonLabel,
    className,
} = props;
  
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.Users.deletemodal);
  const userStore = useSelector((state) => state.Users.user|| []);

  const toggle = () => {
    if (!modal) {
      dispatch(actions.getUserDeleteModal()); 
    } else {
      dispatch(actions.hideUserDeleteModal());
    }
  }

  useEffect(() => {
     
  },[])

  const [selectAttrition] = React.useState([
    { label: 'Termination-Poor Performance', value: 'Termination-Poor Performance'},
    { label: 'Termination-Behavioral Issue', value: 'Termination-Behavioral Issue' },
    { label: 'Termination-Misconduct of policies', value: 'Termination-Misconduct of policies' },
    { label: 'Termination-Unethical Code of Conduct', value: 'Termination-Unethical Code of Conduct' },
    { label: 'Termination-Behavioral Issue', value: 'Termination-Behavioral Issue' },
    { label: 'Project/Contract-End', value: 'Project/Contract-End' },
    { label: 'Laid off-Due to budget cut', value: 'Laid off-Due to budget cut' },
    { label: 'Laid off-Due to Organizational restructure', value: 'Laid off-Due to Organizational restructure' },
    { label: 'Converted to Client payroll-(FTE)', value: 'Converted to Client payroll-(FTE)' },
    { label: 'Laid off-For not meeting BGV Requirements', value: 'Laid off-For not meeting BGV Requirements' },
    { label: 'Resignation-Better opportunity', value: 'Resignation-Better opportunity' },
    { label: 'Resignation-Relocated', value: 'Resignation-Relocated' },
    { label: 'Resignation-Family Reasons', value: 'Resignation-Family Reasons' },
    { label: 'Resignation-Family Emergency', value: 'Resignation-Family Emergency' },
    { label: 'Resignation-Medical Reason', value: 'Resignation-Medical Reason' },
    { label: 'Resignation-Marriage', value: 'Resignation-Marriage' },
    { label: 'Resignation-Other', value: 'Resignation-Other' },


  ]);
  const [exitDate, setExitDate] = useState('')
  const [attritionType, setAttritionType] = useState('')
  const [reason, setReason] = useState('')


  const handleDelete = e => {
    e.preventDefault();
    // let date = new Date(exitDate)
    const reqBody ={
      "ecode":userStore.ECode + '',
      "exitdt": exitDate,
      "attritiontype": attritionType,
      "reason": reason
    };
    dispatch(actions.deleteUser(reqBody));
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

  return(
    <div>
      <Modal isOpen={modal} size={"md"} toggle={toggle} className={` ${className} 'modal-lg' `}>
        <ModalHeader toggle={toggle}>Delete User</ModalHeader>
        <ModalBody style={{
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto'
        }}>
        <Form onSubmit={handleDelete}>
          <Row>
            <Col lg={12}>
              <FormGroup>
              <Label htmlFor="empleadoNombre">Exit Date<span className="redspan">*</span></Label>
                <Input
                    type="date" required
                    className=""
                    id="ExitDate"
                    // value={formatDate(ExitDate)}
                    name="ExitDate" onChange={(e) => {
                        setExitDate(e.target.value);
                    }}/>
              </FormGroup>
            </Col>
            <Col lg={12}>
                <FormGroup>
                <Label htmlFor="empleadoNombre">Attrition Type<span className="redspan">*</span></Label>
                <select className="form-control " required name="AttritionType" id="AttritionType" onChange={(e) => {
                    setAttritionType (e.target.value);
                }}>
                      <option value="">Select</option>
                    {selectAttrition.map((attrition) => (
                    <option key={attrition.value} value={attrition.value}>
                        {attrition.label}
                    </option>
                ))}
                </select>
                </FormGroup>
            </Col>
            <Col lg={12}>
                <Label>Reason</Label>
                <textarea
                    className="form-control "
                    rows="3"
                    name="Reason" id="Reason" onChange={(e) => {
                        setReason(e.target.value);
                    }}></textarea>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12}>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" onClick={toggle} className="btn btn-secondary ml-3">Cancel</button>
            </Col>
          </Row>
        </Form>
        </ModalBody>
      </Modal>
    </div>
                          
  )
}

export default DeleteUserModal;