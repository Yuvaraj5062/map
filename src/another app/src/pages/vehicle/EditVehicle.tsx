import React, { useState } from 'react';
import {  TextField, Typography } from '@mui/material';
import swal from 'sweetalert';

import * as actions from '../../redux/_redux/vehicleMaster/VehicleMasterActions';
import { useDispatch } from 'react-redux';
import { editVehicleProps } from '../Types';
import '../../assets/css/Navbar.css'
import '../../assets/css/Main.css'
import './AddVehicle/AddVehicle.css'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import api from '../../redux/apis/axios';
/**
 * @type {interface} 
 * for setting props  type
 
 */
interface Props {
  flag: boolean;
  onFlagChange: (newValue: boolean) => void;
  row: editVehicleProps;
}
const EditVehicle: React.FC<Props> = ({
  flag,
  onFlagChange,
  row
}) => {
/**
 * @type {unkonwn}
 * for setting slice data
 
 */
  const dispatch = useDispatch();
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {string}
 * for setting vehicle name
 */
  const [vehicleName, setvehicleName] = useState<string>(row.vehicleName ? row.vehicleName : "")
   /**
 * @type {string}
 * for setting vechicle brand 
 */
  const [vehicleBrand, setvehicleBrand] = useState<string>(row.vehicleBrand ? row.vehicleBrand : "")
   /**
 * @type {string}
 * for setting vechicle model
 */
  const [vehicleModel, setvehicleModel] = useState<string>(row.vehicleModel ? row.vehicleModel : "")
   /**
 * @type {string}
 * for setting vechicle license number
 */
  const [vehicleLicensePlateNo, setvehicleLicensePlateNo] = useState<string>(row.vehicleLicensePlateNo ? row.vehicleLicensePlateNo : "")
   /**
 * @type {string}
 * for setting vehicle unique number
 */
  const [vehicleUniqueNo, setvehicleUniqueNo] = useState<string>(row.vehicleUniqueNo ? row.vehicleUniqueNo : "")
   /**
 * @type {string}
 * for setting beacon unique number
 */
  const [beaconUniqueNo, setbeaconUniqueNo] = useState<string>(row.beaconUniqueNo ? row.beaconUniqueNo : "")
 /**
 * @type {object}
 * for setting header
 */

  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
/**
 * @type {Function}
 * for getting form data and edit vehicle functionality
 */
  const onSubmit = () => {
/**
 * @type {boolean}
 * for handling validation
 */
    let val = true
    if (!vehicleName) {
      val = false
      swal("Vehicle Name is Required")
    } else if (!vehicleBrand) {
      val = false
      swal(" Vehicle Brand is Required")
    }
    else if (!vehicleModel) {
      val = false
      swal("Vehicle Model is Required")
    }else if (!vehicleLicensePlateNo) {
      val = false
      swal("Vehicle License Plate Number is Required")
    }
    else if (!vehicleUniqueNo) {
      val = false
      swal("Vehicle Unique Number is Required")
    } 
    else if (!beaconUniqueNo) {
      val = false
      swal("Beacon Unique Number is  Required")
    } else {
      val = true
    }

    if (val) {
      /**
 * @type {object}
 * for setting payload
 */
      const payload = {
        vehicleName: vehicleName,
        vehicleBrand: vehicleBrand,
        vehicleModel: vehicleModel,
        vehicleLicensePlateNo: vehicleLicensePlateNo,
        vehicleUniqueNo: vehicleUniqueNo,
        beaconUniqueNo: beaconUniqueNo,
      }
         /**
 * @type {string}
 * for setting url
 */
      const URL = `/VehicleMaster/UpdateVehicle?VehicleId=${row.vehicleId}`
      api.post(URL, payload, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "Vehicle updated successfully") {
              swal(response.data.responseMessage);
              dispatch(actions.getAllVehicle());
              onFlagChange(true)

            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("something Went Wrong");
        });
    }
  };
  
  return <div className="m-2">

    <div className="vehicle-info-header">
      <div className='vehicle-info-text'>
        Edit Vehicle Information
      </div>
      <div className='Show-vehicle-buttton-container'>
        <button className="Show-vehicle-buttton"
          onClick={() => { onFlagChange(true) }}>
          Show All Vehicles
        </button>
      </div>
    </div>

    <div className="card">
      <div className="card-body">
        <div className="m-3">
          <span className='vehicle-subHeading' >
            Please fill the Information below
          </span>
        </div>
        <form >
          <div className="container">
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic" variant="standard" style={{ width: "100%" }}
                sx={{ input: { color: '#777e84',   } }}
                  label={
                    isMobile ? <Typography
                      variant="body2"
                      color="#777E84"
                         
                      fontSize="12px"
                    >
                      Vehicle Name *
                    </Typography> : <Typography
                      variant="body2"
                      color="#777E84"
                      fontSize="14px"
                         
                    >
                      Vehicle Name *
                    </Typography>
                  }
                  value={vehicleName} onChange={(e) => { setvehicleName(e.target.value.trimLeft()) }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                sx={{ input: { color: '#777e84',   } }}
                  label={
                    isMobile ? <Typography
                      variant="body2"
                      color="#777E84"
                         
                      fontSize="12px"
                    >
                      Vehicle Brand *
                    </Typography> : <Typography
                      variant="body2"
                      color="#777E84"
                      fontSize="14px"
                         
                    >
                      Vehicle Brand *
                    </Typography>
                  } variant="standard" style={{ width: "100%" }}
                  value={vehicleBrand} onChange={(e) => { setvehicleBrand(e.target.value.trimLeft()) }} />
              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                sx={{ input: { color: '#777e84',   } }}
                  label={
                    isMobile ? <Typography
                      variant="body2"
                      color="#777E84"
                         
                      fontSize="12px"
                    >
                      Vehicle Model *
                    </Typography> : <Typography
                      variant="body2"
                      color="#777E84"
                      fontSize="14px"
                         
                    >
                      Vehicle Model *
                    </Typography>
                  }
                  variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  value={vehicleModel} onChange={(e) => { setvehicleModel(e.target.value.trimLeft()) }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic" 
                sx={{ input: { color: '#777e84',   } }}
                label={
                  isMobile ? <Typography
                    variant="body2"
                    color="#777E84"
                       
                    fontSize="12px"
                  >
                    Vehicle License Plate Number *
                  </Typography> : <Typography
                    variant="body2"
                    color="#777E84"
                    fontSize="14px"
                       
                  >
                    Vehicle License Plate Number *
                  </Typography>
                }
                  variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  value={vehicleLicensePlateNo} onChange={(e) => { setvehicleLicensePlateNo(e.target.value.trimLeft()) }} />
              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                sx={{ input: { color: '#777e84',   } }}
                  label={
                    isMobile ? <Typography
                      variant="body2"
                      color="#777E84"
                         
                      fontSize="12px"
                    >
                      Vehicle Unique Number *
                    </Typography> : <Typography
                      variant="body2"
                      color="#777E84"
                      fontSize="14px"
                         
                    >
                      Vehicle Unique Number *
                    </Typography>
                  } variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  value={vehicleUniqueNo} onChange={(e) => { setvehicleUniqueNo(e.target.value.trimLeft()) }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                sx={{ input: { color: '#777e84',   } }}
                  label={
                    isMobile ? <Typography
                      variant="body2"
                      color="#777E84"
                         
                      fontSize="12px"
                    >
                      Beacon Unique Number *
                    </Typography> : <Typography
                      variant="body2"
                      color="#777E84"
                      fontSize="14px"
                         
                    >
                      Beacon Unique Number *
                    </Typography>
                  } variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  value={beaconUniqueNo} onChange={(e) => { setbeaconUniqueNo(e.target.value.trimLeft()) }} />
              </div>
            </div>
            <div className="save-button-container">
              <button className='save-button'
                onClick={() => { onSubmit() }}>
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>


  </div>;
};

export default EditVehicle;
