import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import profilePic from '../../assets/images/users/DP.png';
import { formatDate } from '../../constants/dateFormat';
//import { getProfileList, setProfileImage } from '../../redux/actions';
import {  FormGroup, Input } from 'reactstrap';

import profilePic from '../../assets/images/users/profile-pic.jpg';
import { getProfileList, setProfileImage } from '../../redux/profile/actions';
import moment from 'moment';

const Profile = (props) => {
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let userDetails = useSelector((state) => state.Profile.profile || []);
    
    const [imageFile, setImageFile] = useState({
        isError: false,
        value: "",
        msg: "",
    });
    const [imgBase64, setImgBase64] = useState({
        isError: false,
        value: "",
        msg: "",
    });
    const dispatch = useDispatch();

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();

            // Convert the file to base64 text
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    useEffect(() => {
        if (imgBase64.value) {
            dispatch(setProfileImage( { "userid":loginDetails.EmployeeCode,"userimage": imgBase64.value }));
            
        }

    }, [imgBase64.value])


    useEffect(() => {
        dispatch(getProfileList(loginDetails.EmployeeCode))
    }, []);

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        <div className="text-center">
                            <img src={userDetails.Ephoto?userDetails.Ephoto:profilePic} className="avatar-sm-2 rounded-circle mr-2" alt="" />
                            {/* {imgBase64.value?imgBase64.value:userDetails.Ephoto} */}
                            <FormGroup>
                                
                                <input
                                    style={{ borderRadius: 50 }}
                                    type="file"
                                    accept='image/*'
                                    className="custom-file-input "
                                    placeholder='Upload Profile Picture'
                                    id="customFile"
                                    onChange={async (e) => {
                                        if (e.target.files[0]) {
                                            setImageFile({
                                                isError: false,
                                                value: e.target.files[0].name,
                                                msg: "",
                                            })
                                            let base64 = await getBase64(e.target.files[0]);
                                            setImgBase64({
                                                isError: false,
                                                value: base64,
                                                msg: "",
                                            })
                                        }
                                    }}
                                />
                            </FormGroup>



                        </div>
                        <div className="text-center mt-2 mb-5">
                            <h5 className="pro-user-name mt-0 mb-0"><b>{userDetails.EFullname}</b></h5>
                        </div>
                        <div className="col-md-8 offset-md-2">
                            <div className="row mt-2">
                                <div className="col-md-5">Employee Code</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.ECode}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Date Of Birth</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5"> {moment(userDetails.EDOB).format('DD-MM-yyyy')}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Designation</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.EDesignation}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Email</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.EEmail}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Address</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.EAddress}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Contact Number</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.EContNo}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Blood Group</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5">{userDetails.EBloodGroup}</div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-5">Joining Date</div>
                                <div className="col-md-2 text-center">:</div>
                                <div className="col-md-5"> {moment(userDetails.EJoinDate).format('DD-MM-yyyy')}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;
