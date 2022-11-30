import React from 'react';
import  hrpolicy  from '../../assets/pdf/policiesUpdatesnew.pdf';
const HrPolicy = () => {
  return (
      <React.Fragment>
          <iframe id="fred"  title="PDF in an i-Frame" src={hrpolicy} frameborder="1" scrolling="auto" height="1100" width="100%" ></iframe>
    </React.Fragment>
  );
};

export default HrPolicy;
