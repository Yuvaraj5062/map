import React, { useState } from 'react'

import { Row, Col, FormGroup, Form, Label, Input } from 'reactstrap';
import * as api from './../../helpers/restApi'
import swal from 'sweetalert';
import config from './../../helpers/baseurl';

//import classNames from 'classNames';
export const CtcCalculation = (props) => {
  const [ctc, setCtc] = useState(false)
  const [withPf, setWithPf] = useState(false)
 // const [withoutPf, setWithoutPf] = useState(false)
  const [withEsic, setWithEsic] = useState(false)
 // const [withoutEsic, setWithoutEsic] = useState(false)
  const [ctcData, setCtcData] = useState()
  const [pfAmount, setPfAmount] = useState(false)

  var urlpattern = config.baseUrl;
  // const handelWithPf = () => {
  //   setWithPf(!withPf)

  // }

  // // const handelWithoutPf = () => {
  // //   setWithoutPf(!withoutPf)
  // //   setWithPf(false)
  // // }

  // const handelWithEsic = () => {
  //   setWithEsic(!withEsic)

  // }

  // const handelWithoutEsic = () => {
  //   setWithoutEsic(!withoutEsic)
  //   setWithEsic(false)
  // }


  const handleCalculateCtc = () => {
    let isOk=true;
    if(!ctc)
    {
      isOk=false
      swal("Please enter ctc")
    }

    if(isOk)
    {
    let body = {
      ctc: ctc,
      with_Pf: withPf,
      // without_Pf: withoutPf,
      // without_Esic: withoutEsic,
      with_Esic: withEsic

    }


    api.getCalculatedCtc(body).then((res) => {
      setCtcData(res.data.Data)
      if(res.data.Message)
      swal(res.data.Message);
     // //console.log("response", res.data)
    })

  }
  }

  const downloadCtcPdf=()=>{
    let isOk=true
    if(!ctc){
      isOk=false
      swal("enter ctc amount")
    }

    if(isOk){
      window.open(urlpattern +`DownloadSalaryCTCPDF?ctc=${ctc}&with_Pf=${withPf?1:0}&with_Esic=${withEsic?1:0}`) 
    }
  }

  return (
    <React.Fragment>
      {/* <form onSubmit={() => handleSearch}> */}
      <Row className="">
        <span className="m-2"> Offer CTC</span>
        <Col md={3.5} className="d-flex">
          <FormGroup>
            {/* <Label for="exampleEmail">Email</Label> */}

            <Input type="number" min={1} value={ctc} id="ctc" placeholder="Enter ctc"
              onChange={
                (e) => setCtc(e.target.value)
              } />
          </FormGroup>
        </Col>
        {/* {withPf?
       
         <Col md={3.5} className="d-flex">
           <FormGroup>
            
             <Input type="number" min={1} value={pfAmount} id="pf" 
             style={{marginLeft:"2%"}}
              placeholder="Enter pf amount"
               onChange={
                 (e) => setPfAmount(e.target.value)
               } />
           </FormGroup>
         </Col>
         :null
        } 
      */}
        <Col md={2} className="mt-2">
          <FormGroup check>
            <Label >
              <Input type="checkbox" style={{width: "25px", height: "15px",}} value={withPf} name='pf'
                onClick={() => setWithPf(!withPf)} />{' '}
               <span className='m-2'>  With PF </span>
            </Label>
          </FormGroup>
        </Col>

        {/* <Col md={2} className="mt-2">
          <FormGroup check>
            <Label >
              <Input type="radio" value={withoutPf} name='pf'
                onChange={() => handelWithoutPf() } />{' '}
              Without PF
            </Label>
          </FormGroup>
        </Col> */}

        <Col md={2} className="mt-2">
          <FormGroup check>
            <Label >
              <Input type="checkbox" style={{width: "25px", height: "15px",}} value={withEsic} name='esic'
                onClick={() => setWithEsic(!withEsic) } />
            <span className='m-2'>  With ESIC</span>
            </Label>
          </FormGroup>
        </Col>
        {/* <Col md={2} className="mt-2">
          <FormGroup check>
            <Label >
              <Input type="radio" value={withoutEsic} name='esic'
                onChange={() => handelWithoutEsic() } />{' '}
              Without ESIC
            </Label>
          </FormGroup>
        </Col> */}
      </Row>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button type="button"
            className="btn btn-primary pl-5 pr-5" onClick={handleCalculateCtc}>Submit</button>
              <button type="button"
              onClick={()=>downloadCtcPdf()}
            className="btn btn-primary pl-5 pr-5"  style={{marginLeft:"2%"}} >Download</button>
            
        </div>
      </div>

      {/* <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button type="button"
            className="btn btn-primary pl-5 pr-5" onClick={handleCalculateCtc}>Download</button>
        </div>
      </div> */}

      <div className='row  gy-5 text-white' style={{ background: "black", height: "9vh" }}>
        <div className="col-4">
          <div className="p-3  ">Salary Components</div>
        </div>
        <div className="col-4">
          <div className="p-3 ">Per Month</div>
        </div>
        <div className="col-4">
          <div className="p-3  ">Annualized</div>
        </div>
      </div>
      {ctcData ?
        <div>
          <div className="container overflow-hidden">
            <div className="row gy-5 pt-2">

              <div className="col-4 pt-2">
                <div className="p-1 ">Basic</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.BasicSalary_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.BasicSalary_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">House Rent Allowance</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.HouseRentAllowance_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.HouseRentAllowance_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Conveyance</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.Conveyance_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.Conveyance_Annual.toFixed(2)}</div>
              </div>


              <div className="col-4 pt-2">
                <div className="p-1 ">Medical</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.Medical_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.Medical_Annual.toFixed(2)}</div>
              </div>


              <div className="col-4 pt-2">
                <div className="p-1 ">Company Contribution To ESIC</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.CompanyContributiontoESIC_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.CompanyContributiontoESIC_Annual.toFixed(2)}</div>
              </div>


              <div className="col-4 pt-2">
                <div className="p-1 ">Gross Salary Per Month</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.GrossSalary_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.GrossSalary_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Employee Contribution To Pf</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.EmployeeContributiontoPF_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.EmployeeContributiontoPF_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Net Take Home</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.NetTakeHome_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.NetTakeHome_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Fixed Salary</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.FixedSalary_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.FixedSalary_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Professional Tax</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.ProfessionalTax_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.ProfessionalTax_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Flexible Allowances</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.FlexibleAllowances_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4 ">
                <div className="p-1 border border-dark">{ctcData.FlexibleAllowances_Annual.toFixed(2)}</div>
              </div>

              <div className="col-4 pt-2">
                <div className="p-1 ">Employee Contribution To Pf</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.EmployeeContributiontoPF_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-1 border border-dark">{ctcData.EmployeeContributiontoPF_Annual.toFixed(2)}</div>
              </div>

            </div>
            <div className='row  gy-5 text-white' style={{ background: "black", height: "9vh" }}>
              <div className="col-4">
                <div className="p-3  ">Cost To Company (CTC)</div>
              </div>
              <div className="col-4">
                <div className="p-3 ">{ctcData.CosttoCompany_PerMonth.toFixed(2)}</div>
              </div>
              <div className="col-4">
                <div className="p-3  ">{ctcData.CosttoCompany_Annual.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
        : null}

    </React.Fragment>

  )
}
