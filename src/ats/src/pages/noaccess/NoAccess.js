import React from 'react';
import notfound from '../../assets/images/not-found.png';
const NoAccess =(props)=>{
   
    
        return (
            <React.Fragment>
                <div className="container" >
                    <div className="row">
                        <img src={notfound} alt="img" style={{width:'100%'}}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }

export default NoAccess;
