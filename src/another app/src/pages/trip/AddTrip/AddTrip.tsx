
import { MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import InputLabel from '@mui/material/InputLabel';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as useractions from '../../../redux/_redux/userMaster/userMasterActions';
import * as vechileactions from '../../../redux/_redux/vehicleMaster/VehicleMasterActions';
import * as actionsTrip from '../../../redux/_redux/tripMaster/tripMasterActions';
import React, { useState } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import Demo from '../NewMap';
import { mapProps } from '../../Types';
import './addtrip.css'
import Moment from 'moment'
import api from '../../../redux/apis/axios';

const AddTrip = () => {
  const {
    handleSubmit,
    formState: { errors },
    reset,

  } = useForm();
  /**
 * @type {object} 
 * for getting start date
 
 */
  const [startDate, setStartDate] = React.useState({
    isError: false,
    value: "",
    msg: "",
  });
  /**
 * @type {object} 
 * for getting end date
 
 */
  const [endDate, setEndDate] = React.useState({
    isError: false,
    value: "",
    msg: "",
  });

  /**
 * @type {string} 
 * for getting user name 
 
 */
  const [userName, setUserName] = React.useState('');
  /**
 * @type {string} 
 * for getting vehicle name
 
 */
  const [vehicle, setVehicle] = React.useState('');
  /**
 * @type {string} 
 * for getting source
 
 */
  const [source, setSource] = React.useState('');
  /**
 * @type {string} 
 * for getting destination 
 
 */
  const [destination, setDistionation] = React.useState('');
  /**
 * @type {string}
 * for getting source latitude 
 
 */
  const [sourceLa, setSourceLa] = React.useState(0);
  /**
 * @type {number} 
 * for getting source longitude
 
 */
  const [sourceLon, setSourceLon] = React.useState(0);
  /**
 * @type {number} 
 * for getting destination latitude
 
 */
  const [dL, setDl] = React.useState(0);
  /**
 * @type {number} 
 * for getting destination longitude
 
 */
  const [Dlong, setDlong] = React.useState(0);
  /**
 * @type {unkonwn}
 * for setting slice data
 
 */
  const dispatch = useDispatch();
  /**
  * @type {unkonwn}
  * for changing path
  
  */
  let history = useHistory();
  /**
 * @type {object} 
 * for setting map data
 
 */
  const [mapData, setMapData] = React.useState<mapProps>({} as mapProps);
  /**
 * @type {number} 
 * for handling open or close map
 
 */
  const [showMap, setShowMap] = useState<boolean>(false)
  /**
 * @type {Function}
 * @param {HTMLSelectElement}  SelectChangeEvent - A HTMLSelectElement param.
 * for getting selected user name
 */
  const handleChange = (event: SelectChangeEvent) => {
    setUserName(event.target.value);

  };
  /**
 * @type {string} 
 * for getting current date
 
 */
  let date = new Date().toISOString().split("T")[0]
  /**
 * @type {any} 
 * for getting slice data (users)
 
 */
  const { userMaster }: any = useSelector((state) => state);
  /**
 * @type {any} 
 * for getting slice data(vehicle data)
 
 */
  const { vehicleMaster }: any = useSelector((state) => state);
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {Function}
 * @param {HTMLSelectElement}  SelectChangeEvent - A HTMLSelectElement param.
 * for getting selected vehicle name
 */
  const handleVehicleChange = (event: SelectChangeEvent) => {
    setVehicle(event.target.value);

  };
  /**
   * @type {Function}
   * @param {string}  value - A string param.
   * for setting source latitude and longitude
   */

  const handleSelect = async (value: string) => {
    const results = await geocodeByAddress(value);
    const li = await getLatLng(results[0])
    setSourceLa(li.lat)
    setSourceLon(li.lng)
    setSource(value)
  }
  /**
   * @type {Function}
   * @param {string}  value - A string param.
   * for setting destination latitude  and longitude
   */
  const handleSelectD = async (value: string) => {
    const results = await geocodeByAddress(value);
    const li = await getLatLng(results[0])
    setDl(li.lat)
    setDlong(li.lng)
    setMapData({ lat: li.lat, lng: li.lng })
    setDistionation(value)
  }
  /**
     * @type {object}
     * for setting headers
     
     */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
   * @type {Function}
   * for getting all users and vechiles
   
   */
  React.useEffect(() => {
    dispatch(useractions.getAllUsers())
    dispatch(vechileactions.getAllVehicle())

  }, []);
  /**
  * @type {Function} 
  * for getting form data and add trip functionality
  
  */
  const onSubmit = () => {
    /**
      * @type {boolean} 
      * for validation
      
      */
    let val = true
    if (!userName) {
      val = false
      swal("User Name is Reqiured")

    }

    else if (!vehicle) {
      val = false
      swal("Vehicle is Reqiured")

    }
    else if (!sourceLon) {
      swal("Source  must be a valid city name")
      val = false
    }
    else if (!Dlong) {
      swal("Destination must be a valid city name")
      val = false
    }
    else if (!startDate.value) {
      val = false
      swal("Start Date is Reqiured")
    }
    else if (startDate.value < Moment(new Date()).format('YYYY-MM-DD')) {
      swal("Invalid Start Date")
      val = false
    }
    else if (!endDate.value) {
      val = false
      swal(" End Date is Reqiured")
    }
    else if (endDate.value < startDate.value) {
      swal("Invalid End Date")
      val = false
    } else {
      val = true
    }
    if (val) {
      /**
  * @type {Object} 
  * for setting payload
  
  */
      const payload = {
        "vehicleId": vehicle,
        "userId": userName,
        "destination": destination,
        "endDateTime": endDate.value,
        "source": source,
        "destinationLatitude": String(dL),
        "destinationLongitude": String(Dlong),
        "sourceLatitude": String(sourceLa),
        "sourceLongitude": String(sourceLon),
        "startDateTime": startDate.value,
      }
      /**
        * @type {string} 
        * for setting url
        
        */
      const URL = `/TripMaster/CreateTrip`
      api.post(URL, payload, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "Trip created successfully") {
              dispatch(actionsTrip.getAllTrips());
              history.push('/trip_details')
              swal(response.data.responseMessage);
            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("something Went Wrong");
        });

      reset();
    }
  };


  return <div className="m-2">
    <div className="trip-info-header">
      <div className='trip-info-title'>
        Add Trip
      </div>
      <div className='show-trips-container'>
        <button className="show-trips-btn"
          onClick={() => {
            history.push('/trip_details')
          }}>Show All Trips
        </button>
      </div>
    </div>

    {userMaster.UserMasterData && vehicleMaster.vehicleMasterData ?
      <div className="card">
        <div className="card-body">
          <div className='tripSubHeading'>
            Please fill the Information below
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
              <div className="trip-info">
                <div className="trip-info-field">
                  <div className='mt-3'>
                    {isMobile ?
                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "12px",

                      }}>Select User</InputLabel> :

                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "14px",

                      }}>Select User</InputLabel>
                    }

                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      style={{ width: "100%" }}
                      value={userName}
                      onChange={handleChange}

                    >
                      {userMaster.UserMasterData.map((row: any) => {
                        const name = row.firstName + ' ' + row.lastName;
                        return (
                          <MenuItem value={row.userId} style={{
                            display: "block", color: "#777E84",
                            fontSize: "14px", margin: "3%"
                          }}>{name}</MenuItem>
                        );
                      })}

                    </Select>
                  </div>
                </div>
                <div className="trip-info-field">
                  <div className='mt-3'>
                    {isMobile ?
                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "12px",

                      }}>Select Vehicle</InputLabel> :

                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "14px",

                      }}>Select Vehicle</InputLabel>
                    }
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      style={{ width: "100%" }}
                      value={vehicle}
                      onChange={handleVehicleChange}

                    >
                      {vehicleMaster.vehicleMasterData.map((row: any) => {
                        return (
                          <MenuItem value={row.vehicleId} style={{
                            display: "block", color: "#777E84",
                            fontSize: "14px", margin: "3%"
                          }}>{row.vehicleName}</MenuItem>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="trip-info mt-2">
                <div className="trip-info-field">
                  <PlacesAutocomplete
                    onChange={handleSelect}

                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <TextField variant="standard" style={{ width: "100%" }}
                          sx={{ input: { color: '#777e84', } }}
                          label={
                            isMobile ? <Typography
                              variant="body2"
                              color="#777E84"

                              fontSize="12px"
                            >
                              Source *
                            </Typography> : <Typography
                              variant="body2"
                              color="#777E84"
                              fontSize="14px"

                            >
                              Source *
                            </Typography>
                          }
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            const style = suggestion.active
                              ? { backgroundColor: '#103E67', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
                <div className="trip-info-field">
                  <PlacesAutocomplete
                    onChange={handleSelectD}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <TextField variant="standard" style={{ width: "100%" }}
                          sx={{ input: { color: '#777e84', } }}
                          label={
                            isMobile ? <Typography
                              variant="body2"
                              color="#777E84"

                              fontSize="12px"
                            >
                              Destination *
                            </Typography> : <Typography
                              variant="body2"
                              color="#777E84"
                              fontSize="14px"

                            >
                              Destination *
                            </Typography>
                          }
                          {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            const style = suggestion.active
                              ? { backgroundColor: '#103E67', cursor: 'pointer' }
                              : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                </div>
              </div>
              <div className="trip-info mt-2">
                <div className="trip-info-field">
                  {isMobile ? <span style={{
                    color: "#777E84",
                    fontSize: "12px"
                  }}
                  >    Start Date *</span> :
                    <span style={{
                      color: "#777E84",

                      fontSize: "14px"
                    }}
                    >    Start Date *</span>}
                  <TextField
                    sx={{ input: { color: '#777e84', } }}
                    type="date"
                    className="rounded-sh"
                    variant="standard"
                    style={{ width: "100%" }}
                    inputProps={{ min: date }}
                    value={startDate.value}
                    onChange={(e) => {
                      setStartDate({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? "Start Date is Required" : "",
                      });

                    }}
                  />                </div>
                <div className="trip-info-field">
                  {isMobile ? <span style={{
                    color: "#777E84",

                    fontSize: "12px"
                  }}
                  >    End Date *</span> :
                    <span style={{
                      color: "#777E84",
                      fontSize: "14px"
                    }}
                    >    End Date *</span>}
                  <TextField
                    sx={{ input: { color: '#777e84', } }}
                    type="date"
                    className="rounded-sh"
                    variant="standard"
                    style={{ width: "100%" }}
                    inputProps={{ min: startDate.value }}
                    value={endDate.value}
                    onChange={(e) => {
                      setEndDate({
                        value: e.target.value,
                        isError: e.target.value === "",
                        msg:
                          e.target.value === "" ? "End Date is Required" : "",
                      });

                    }}
                  />
                </div>
              </div>
              <div className="btn-container">
                <Button
                  className="map-btn"
                  onClick={() => setShowMap(true)}>
                  Map
                </Button>

                <button
                  className="save-btn"
                  type="submit">
                  Save
                </button>
              </div>
              {
                showMap ?
                  <div>
                    <Demo mapData={mapData} />
                  </div>
                  : null
              }
            </div>
          </form>
        </div>
      </div>
      :
      < div className="spinner-border m-4" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    }

  </div>;
};

export default AddTrip;
