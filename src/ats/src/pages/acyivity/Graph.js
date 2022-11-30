// @flow
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { getAtsGraphList } from '../../redux/activity/actions';
import { useSelector, useDispatch } from 'react-redux';
import HighChart from '../dashboard/HighChart';
import { generateActivityChartData } from '../../helpers/dashboard';

// simple line chart
const Graph = () => {
    
    const dispatch = useDispatch();
    let loginDetails = useSelector((state)=> state.Auth.user || []);
    let data = useSelector((state) => state.Activity.graphlist|| []);  
    const [graphData, setGraphData] = useState([])
    const [xaxisPlots, setxaxisPlots] = useState([])

    useEffect(() => {
        dispatch(getAtsGraphList(loginDetails.Username));
        // eslint-disable-next-line 
    }, []);

    useEffect(() => {
        //handle api data
        if (data !== undefined && data.length !== 0) {
            let graphData = generateActivityChartData(data)
            setGraphData(graphData.temp)
            setxaxisPlots(graphData.plots)
        }    
    },[data])

    return (
        <React.Fragment>
            <Row>
                <Col xl={12} md={12} className="text-uppercase text-center">
                    <HighChart graphData={graphData} XaxisPlots={xaxisPlots} graphType={'spline'}/>
                </Col>                          
            </Row>
           {/* <Row>
               <Col lg={12} className="text-right">
                    <button className="btn btn-primary">Save As</button>
                    <button className="btn btn-secondary ml-2">Print</button>
               </Col>
          </Row>  */}
                
         </React.Fragment>
    );
};

export default Graph;
