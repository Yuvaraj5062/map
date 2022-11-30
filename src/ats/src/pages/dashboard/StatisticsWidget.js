import React from 'react';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

const StatisticsWidget = (props) => {

    //const Icon = props.icon;

    return (
        <Card inverse style={{ backgroundColor: props.bgColor}} className="card-border-radius">
            <CardBody className="pt-1 ">
                    {/* <div className="row">
                    <div className="col-12"> */}
                        <h2 className="mb-0 font-weight-normal" style={{color:'white'}}>{props.title}</h2>
                        <span className="font-size-14" style={{color:'white'}}>{props.description}</span>
                    {/* </div>
                    </div> */}
                    {/* <div>
                        <h2 className="mb-0 text-primary">{props.footerPara}</h2>
                        <span className="text-muted font-size-14">{props.footdesc}</span>
                    </div> */}
            </CardBody>
        </Card>
    );
};

export default StatisticsWidget;
