import React from 'react';
import  empHand  from '../../assets/pdf/Revised_Induction ppt.pdf';
const EmplHandbook = () => {
  return (
      <React.Fragment>
          <iframe id="fred"  title="PDF in an i-Frame" src={empHand} frameborder="1" scrolling="auto" height="1100" width="100%" ></iframe>
    </React.Fragment>
  );
};

export default EmplHandbook;
