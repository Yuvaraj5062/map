import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Calendar } from 'react-feather';
import config from '../../../helpers/baseurl';
import axios from 'axios';
import { getUserList } from '../../../redux/user/actions';
import { getReportingManList } from '../../../redux/reportingmanager/actions';
import swal from 'sweetalert';

var urlpattern =config.baseUrl;
const AddHumanR =()=> {
    //let loginDetails = useSelector((state)=> state.Auth.user || []);
    let userList = useSelector((state) => state.Users.users || []);
    let reportingManList = useSelector((state) => state.ReportingManager.reportingmanager || []);
    const dispatch = useDispatch();
    useEffect(() => {
        // other code
        dispatch(getUserList());
        dispatch(getReportingManList());
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []) ;
   // var getUsername = loginDetails.Username;
    const [empcode, setempcode]=useState('');
    const [rmempcode, setrmempcode]=useState('');
    const [period, setperiod]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
       const data ={
        empcode:empcode,
        rmempcode:rmempcode,
        period:period,
       }
       var config = {
        method: 'post',
        url: `${urlpattern}AppraisalMaster`,
        data : data
      };
      
      axios(config)
      .then(function (response) {
       // //console.log(JSON.stringify(response.data));
       swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
        cleanform();
      })
      .catch(function (error) {
       // swal(error, "error");
        swal('Failed', error.response.data.Message,  "error");
      });
     }
    const cleanform=()=>{
        //alert('calling')
        setempcode([]); 
        setrmempcode([]);
        setperiod('')
    }
    
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <form onSubmit={handleSubmit}  className="authentication-form card p-5">
                                
                            <h5 className="text-uppercase  text-center">Appraisal</h5>
                            <div className="form-group">
                            <label htmlFor="fullname">Employee Name</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><User className="icon-dual" /></span>
                                </div>
                                <select className="form-control"
                                    name="empcode "
                                    required
                                    id="empcode "
                                    value={empcode}
                                    onChange={(e) => {
                                        setempcode (e.target.value);
                                    }}>
                                    <option value="">Select</option>
                                    {userList.map((user,i) => (
                                    <option key={i++} value={user.ECode}>
                                        {user.EFullname}
                                    </option>
                                ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="fullname">Reporting Manager</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><User className="icon-dual" /></span>
                                </div>
                                <select className="form-control"
                                required
                                    name="rmempcode "
                                    id="rmempcode "
                                    value={rmempcode}
                                    onChange={(e) => {
                                        setrmempcode (e.target.value);
                                    }}>
                                    <option value="">Select</option>
                                    {reportingManList.map((reportman,i) => (
                                    <option key={i++} value={reportman.ECode}>
                                        {reportman.EFullname}
                                    </option>
                                ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="fullname">Year</label>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1"><Calendar className="icon-dual" /></span>
                                </div>
                                <input
                                            type="text"
                                            name="period"
                                            value={period}
                                            id="period"
                                            className="form-control"
                                            placeholder="eg. 2021-2022"
                                            onChange={(e) => {
                                                setperiod (e.target.value);
                                            }}
                                        />
                                </div>
                            </div>
                            
                               
                                <div className="form-group mb-0 text-center">
                                    <button type="submit" className="btn-block btn btn-secondary">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


export default AddHumanR;
