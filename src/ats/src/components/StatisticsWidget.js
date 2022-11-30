import React from 'react';
import { Card, CardBody } from 'reactstrap';
import classNames from 'classnames';

const StatisticsWidget = (props) => {

    const Icon = props.icon;
    const IconSmall = props.icons;

    return (
        <Card className={classNames("gray-brd", props.bgClass)}>
            <CardBody className="p-0">
                <div className="pb0 p-3  border-bottom">
                    <div className="row">
                <div className="col-3">
                        {Icon && <Icon className={classNames("icon-lg", props.iconClass)}></Icon>}
                    </div>
                    <div className="col-9 text-right">
                        <span className="text-muted text-uppercase font-size-12 font-weight-bold">{props.description}</span>
                        <h2 className="mb-0">{props.title}</h2>
                       
                    </div>
                    </div>
                    <div>
                    <hr/>
                        <p className="font-size-13">
                            {IconSmall && <Icon className={classNames("mr-1 font-size-10 footicon", props.iconFootClass)}></Icon>}
                            {props.footerPara}</p>
                </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default StatisticsWidget;
