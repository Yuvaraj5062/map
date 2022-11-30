import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
import UploadSalryArche from './uploadsalaryarche/UploadSalryArche';
import UploadSalryReyna from './uploadsalaryreyna/UploadSalryReyna';
import ViewSalrySlip from './viewsalaryslip/ViewSalrySlip';
import { useSelector } from 'react-redux';
import { GenerateSalarySlip } from './generatesalaryslip/GenerateSalarySlip';
import { DownloadSalaryArche } from './downloadsalaryarche/DownloadSalaryArche';
import { DownloadSalaryRenya } from './downloadsalaryrenya/DownloadSalaryRenya';
const SalrySlip = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  let loginDetails = useSelector((state)=> state.Auth.user || [])

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  useState(() => {
    if(loginDetails.Role !== 'Admin' || loginDetails.Role !== 'Manager' || loginDetails.Role !== 'HR' || loginDetails.Role==="HR Manager" ){
      setActiveTab('3')
    }
  },[])

  return (
    <React.Fragment>
      <Row className="page-title">
                <Col md={6}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Salary Slip', path: '/salaryslip', active: true },
                        ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
      <Nav tabs className="requirement-tab pt-3 pb-3 nav nav-tabs row bg-white">
        {
          loginDetails.Role === 'Admin' || loginDetails.Role === 'HR'|| loginDetails.Role==="HR Manager" ? 
          <>
            <NavItem className="col-md-4 mt-2">
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { toggle('1'); }}
              >
                Upload Salary Sheet Arche Softronix
              </NavLink>
            </NavItem>
            <NavItem className="col-md-4 mt-2">
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { toggle('2'); }}
              >
                Upload Salary Sheet Reyna
              </NavLink>
            </NavItem>
          </>
          :null
        }

        <NavItem className="col-md-4 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            View Salary Slip
          </NavLink>
        </NavItem>


        {
         loginDetails.Role === 'HR'|| loginDetails.Role==="HR Manager" ? 
         <>
       

        <NavItem className="col-md-4 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Generate Salary Slip
          </NavLink>
        </NavItem>

        <NavItem className="col-md-4 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Download Salary Sheet Arche Softronix
          </NavLink>
        </NavItem>
        
        <NavItem className="col-md-4 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
          >
             Download Salary Sheet Reyna
          </NavLink>
        </NavItem>
        </>
        :null}


      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        {
          loginDetails.Role === 'Admin' || loginDetails.Role === 'HR' || loginDetails.Role==="HR Manager"? 
          <>
            <TabPane tabId="1">
                <UploadSalryArche/>
            </TabPane>
            <TabPane tabId="2">
            <UploadSalryReyna/>
            </TabPane>
          </>
          :null
        }
        <TabPane tabId="3">
         <ViewSalrySlip/>
        </TabPane >
        {
         loginDetails.Role === 'HR'|| loginDetails.Role==="HR Manager" ? 
          <>
            <TabPane tabId="4">
            <GenerateSalarySlip/>
            </TabPane>

            <TabPane tabId="5">
            <DownloadSalaryArche/>
            </TabPane>

            <TabPane tabId="6">
            <DownloadSalaryRenya/>
            </TabPane>
          </>
          :null
        }
      </TabContent>

 
       
      
    </React.Fragment>
  );
}

export default SalrySlip;