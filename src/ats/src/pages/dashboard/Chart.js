// @flow
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody } from 'reactstrap';

// simple line chart
// const initXaxisData = [0,0,0,0]
const LineChart = ({graphData,type}) => {
    const apexLineChartWithLables = {
        chart: {
            height: 380,
            type: type,
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ['#5369f8', '#43d39e', '#f77e53', '#1ce1ac', '#25c2e3', '#ffbe0b'],
        tooltip: {
            theme: 'dark',
            x: { show: false }
        },
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: 'smooth',
        },
        title: {
            text: 'Monthly Revenue',
            align: 'left',
            style: {
                fontSize: '14px',
            },
        },
        grid: {
            row: {
                colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: '#f1f3fa',
        },
        markers: {
            style: 'inverted',
            size: 6,
        },
        xaxis: {
            categories: ['Submissions', 'Interviews', 'Offers','Hires'],
            title: {
                text: 'Ultima actualization hace 15 min',
            },
        },
        yaxis: {
            title: {
                text: 'Temperature',
            },
            min: 0,
            max: 50,
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };
    
    return (
        <Card className="gray-brd">
            <CardBody>
                <h4 className="header-title mt-0 mb-3">Revenue</h4>
                <Chart
                    options={apexLineChartWithLables}
                    series={graphData}
                    type={type}
                    className="apex-charts"
                />
            </CardBody>
        </Card>
    );
};

export default LineChart;
