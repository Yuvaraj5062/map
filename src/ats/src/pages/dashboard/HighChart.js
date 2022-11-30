// @flow
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';

// simple line chart
// const initXaxisData = [0,0,0,0]
const HighChart = ({graphData,XaxisPlots, title, colorAxis, xaxisTitle, graphType}) => {

  const options = {
    chart: {
      type: graphType
    },
    xAxis: {
      title: {
        text: xaxisTitle
      },
      categories: XaxisPlots,
    },
    title: {
      text: title
    },
    colorAxis: colorAxis,
    series: graphData,
    credits:{
      enabled:false
    },
    chart:{
      plotShadow: false,
    }
  }
    
    return (
        <Card className="gray-brd">
            <CardBody>
                {/* <h4 className="header-title mt-0 mb-3">Revenue</h4> */}
                <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
                />
            </CardBody>
        </Card>
    );
};

export default HighChart;
