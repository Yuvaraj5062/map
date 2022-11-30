import React, { useState ,useEffect} from 'react';

import {
    Label,
    FormGroup,
    Button,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback } from 'availity-reactstrap-validation';
import { Mail, User, Phone, Slack } from 'react-feather';
import config from '../../helpers/baseurl';
import axios from 'axios';
import SearchResumeData from './SearchResumeData';
//import $ from "jquery";
import swal from 'sweetalert';

var urlpattern =config.baseUrl;

const SearchResume =()=> {
    const [byname, setbyname]=useState('');
    const [byemail, setbyemail]=useState('');
    const [bynumber, setbynumber]=useState('');
    const [byskill, setbyskill]=useState('');
    const [serchresume, setserchresume]=useState([]);
  


    const handlesubmit=()=>{
        var data = JSON.stringify({
            byname: byname,
            byemail: byemail,
            bynumber: bynumber,
            byskill: byskill
        });
        
        var config = {
          method: 'post',
          url: `${urlpattern}SearchResume`,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
            swal(response.data.Status==true?'Success':'Failed', response.data.Message, response.data.Status==true?'success':'error');
            var resumedata =response.data.Data;
            setserchresume(resumedata);
            ////console.log(response.data.Message)
           // swal(response.data.Message)
          ////console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          //console.log(error);
        });
            }

            const [searchBtnShow,setSearchBtnShow]=useState(true)
            useEffect(() => {    
                if(byname ||byemail||bynumber||byskill ){
                    setSearchBtnShow(false)
                }
            },[byname ,byemail,bynumber,byskill])
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <AvForm onSubmit={handlesubmit} className="authentication-form card p-5">
                                
                            <h5 className="text-uppercase  text-center">Search By Resume</h5>
                                <AvGroup className="">
                                    <Label htmlFor="fullname">Search By Name</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <span className="input-group-text">
                                                <User className="icon-dual" />
                                            </span>
                                        </InputGroupAddon>
                                        <AvInput
                                            type="text"
                                            name="byname"
                                            id="byname"
                                            onChange={(e,i) => {
                                                setbyname(e.target.value);
                                            }}
                                            
                                        />
                                    </InputGroup>

                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>
                                <AvGroup className="">
                                    <Label htmlFor="email">Search By Email</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <span className="input-group-text">
                                                <Mail className="icon-dual" />
                                            </span>
                                        </InputGroupAddon>
                                        <AvInput
                                            type="email"
                                            name="byemail"
                                            id="byemail"
                                            onChange={(e,i) => {
                                                setbyemail(e.target.value);
                                            }}
                                            
                                        />
                                    </InputGroup>

                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>

                                <AvGroup className="mb-3">
                                    <Label htmlFor="password">Search By Number</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <span className="input-group-text">
                                                <Phone className="icon-dual" />
                                            </span>
                                        </InputGroupAddon>
                                        <AvInput
                                            type="text"
                                            name="bynumber"
                                            id="bynumber"
                                            onChange={(e,i) => {
                                                setbynumber(e.target.value);
                                            }}
                                            
                                        />
                                    </InputGroup>
                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>
                                <AvGroup className="mb-3">
                                    <Label htmlFor="password">Search By Skill</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">
                                            <span className="input-group-text">
                                                <Slack className="icon-dual" />
                                            </span>
                                        </InputGroupAddon>
                                        <AvInput
                                            type="text"
                                            name="byskill"
                                            onChange={(e,i) => {
                                                setbyskill(e.target.value);
                                            }}
                                            id="byskill"
                                            
                                        />
                                    </InputGroup>
                                    <AvFeedback>This field is invalid</AvFeedback>
                                </AvGroup>
                                <FormGroup className="form-group mb-0 text-center">
                                    <Button className="btn-block btn btn-secondary"
                                    disabled={searchBtnShow}>
                                        Search
                                    </Button>
                                </FormGroup>
                            </AvForm>
                            
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                        <SearchResumeData serchresume={serchresume}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }


export default SearchResume;
