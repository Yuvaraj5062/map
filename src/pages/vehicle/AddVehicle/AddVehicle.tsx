import { TextField, Typography } from '@mui/material';  // Material UI 
import { useForm } from "react-hook-form";   // Hook Dom For React
import swal from 'sweetalert';   // Alert Pop-up
import { useHistory } from 'react-router-dom';  // React Dom Imported
import '../../../assets/css/Main.css'  // Main Css Imported
import '../../../assets/css/Navbar.css'   // Navbar Css Imported
import './AddVehicle.css'  // Add Vehicle Css Imported
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";  // Material Core UI
import api from '../../../redux/apis/axios';   // API Calling Using AXIOS
// Add Vehicle Main Function
const AddVehicle = () => {
  /**
 * @type {unkonwn}
 * for changing path
 
 */
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
   * @type {object}
   * for setting header
   */

  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
   * @type {Function}
   * @param {object}  data - A object param.
   * for getting form value and add vechile add functionality
   */
  const onSubmit = (data: any) => {
    /**
   * @type {boolean}
   * for handling validation
   */
    let val = true

    if (!data.vehicleName) {
      val = false
      swal("Vehicle Name is Required")
    } else if (!data.vehicleBrand) {
      val = false
      swal(" Vehicle Brand is Required")
    }
    else if (!data.vehicleModel) {
      val = false
      swal("Vehicle Model is Required")
    } else if (!data.vehicleLicensePlateNo) {
      val = false
      swal("Vehicle License Plate Number is Required")
    }
    else if (!data.vehicleUniqueNo) {
      val = false
      swal("Vehicle Unique Number is Required")
    }
    else if (!data.beaconUniqueNo) {
      val = false
      swal("Beacon Unique Number is Required")
    }

    // API Calling of if we get 
    if (val) {
      /**
    * @type {string}
    * for setting url
     
    */
      const URL = `/VehicleMaster/AddVehicle`
      api.post(URL, data, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "Vehicle added successfully") {
              history.push('/vehicleDetails')
              swal(response.data.responseMessage);
              reset();
            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("Something Went Wrong");  // Erorr Popup
        });
    }
  };

  // Add Vehicle Main Design Started
  return <div className="m-2">
    <div className="vehicle-info-header">
      <div className='vehicle-info-text' >
        Vehicle Information
      </div>
      <div className='Show-vehicle-buttton-container'>
        <button className="Show-vehicle-buttton" onClick={() => {
          history.push('/vehicleDetails')
        }}>
          Show All Vehicles
        </button>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <div className='vehicle-subHeading' >
          Please fill the Information below
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777E84', } }}
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

                  variant="standard"
                  className={`form-control ${errors.vehicleName && "invalid"}`}
                  {...register("vehicleName")}
                  onSubmit={() => {
                    trigger("vehicleName");
                  }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777E84' } }}
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
                  }
                  variant="standard" style={{ width: "100%" }}
                  className={`form-control ${errors.vehicleBrand && "invalid"}`}
                  {...register("vehicleBrand")}
                  onSubmit={() => {
                    trigger("vehicleBrand");
                  }} />

              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777E84' } }}
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

                  variant="standard" style={{ width: "100%", marginTop: "4px" }} className={`form-control ${errors.vehicleModel && "invalid"}`}
                  {...register("vehicleModel")}
                  onSubmit={() => {
                    trigger("vehicleModel");
                  }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777E84' } }}
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
                  } variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  className={`form-control ${errors.vehicleLicensePlateNo && "invalid"}`}
                  {...register("vehicleLicensePlateNo")}
                  onSubmit={() => {
                    trigger("vehicleLicensePlateNo");
                  }} />
              </div>
            </div>
            <div className="vehicle-info">
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777e84' } }}
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
                  }

                  variant="standard" style={{ width: "100%", marginTop: "4px" }}
                  className={`form-control ${errors.vehicleUniqueNo && "invalid"}`}
                  {...register("vehicleUniqueNo")}
                  onSubmit={() => {
                    trigger("vehicleUniqueNo");
                  }} />
              </div>
              <div className="vehicle-info-field">
                <TextField id="standard-basic"
                  sx={{ input: { color: '#777e84' } }}
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
                  className={`form-control ${errors.beaconUniqueNo && "invalid"}`}
                  {...register("beaconUniqueNo")}
                  onSubmit={() => {
                    trigger("beaconUniqueNo");
                  }} />
              </div>
            </div>
            <div className="save-button-container">
              <button type="submit" className='save-button'>
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>


  </div>;
};

export default AddVehicle;
