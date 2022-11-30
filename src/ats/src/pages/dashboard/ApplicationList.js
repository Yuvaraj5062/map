import React from 'react';
import {Card, CardBody, Table } from 'reactstrap';



const ApplicationList = () => {
    return (
        <Card className="gray-brd">
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Sales By Category</h4>
                <br/>
                <Table className="mb-0">                   
                    <tbody style={{fontWeight:"bold"}}>
                        <tr>
                            <td><i className="uil uil-smile font-size-24 icon-dual-success"></i></td>
                            <td>Actividades de transtarno servero riesgo psicocial</td>
                            <td>01/01/2020</td>
                            <td style={{width:'70px'}}>30 pts</td>
                        </tr>
                        <tr>
                            <td><i className="uil uil-meh-closed-eye font-size-24 icon-dual-warning"></i></td>
                            <td>Actividades de transtarno servero riesgo psicocial</td>
                            <td>01/03/2020</td>
                            <td style={{width:'70px'}}>80 pts</td>
                        </tr>    
                        <tr>
                            <td><i className="uil uil-meh-closed-eye font-size-24 icon-dual-warning"></i></td>
                            <td>Actividades de transtarno servero riesgo psicocial</td>
                            <td>01/05/2020</td>
                            <td style={{width:'70px'}}>85 pts</td>
                        </tr>  
                        <tr>
                            <td><i className="uil uil-meh-closed-eye font-size-24 icon-dual-danger"></i></td>
                            <td>Actividades de transtarno servero riesgo psicocial</td>
                            <td>01/07/2020</td>
                            <td style={{width:'70px'}}>120 pts</td>
                        </tr>
                        <tr>
                            <td><i className="uil uil-meh-closed-eye font-size-24 icon-dual-danger"></i></td>
                            <td>Actividades de transtarno servero riesgo psicocial</td>
                            <td>01/09/2020</td>
                            <td style={{width:'70px'}}>190 pts</td>
                        </tr>                              
                    </tbody> 
                </Table>
            </CardBody>
        </Card>
    );
};
export default ApplicationList;