import { connect } from "react-redux";
import * as auth from "../../module/Auth/_redux/authRedux";
import React from 'react'
import { useHistory } from "react-router-dom";

 const Logout = (props:any) => {
   /**
 * @type {unkonwn}
 * for changing path
 
 */  
  let history = useHistory();
    React.useEffect(() => {
        props.logout();
        history.push('/')
      }, []);
    return (<></>
    )
}

export default connect(null, auth.actions)(Logout);