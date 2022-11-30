import React from 'react';
import LastMonthJoining from './OfferAndHire/LastMonthJoining';
import MonthOffer from './OfferAndHire/MonthOffer';
import TodaysInterView from './OfferAndHire/TodaysInterView';
import { Row, Col } from 'reactstrap';
const OfferAndHire = () => {

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <TodaysInterView/>
                    <MonthOffer/>
                    <LastMonthJoining/>
                </Col>
            </Row>            
        </React.Fragment>
    );
};

export default OfferAndHire;


