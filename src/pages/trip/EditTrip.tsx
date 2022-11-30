import React, { useState } from 'react';

import {  InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import swal from 'sweetalert';
import * as useractions from '../../redux/_redux/userMaster/userMasterActions';
import * as vechileactions from '../../redux/_redux/vehicleMaster/VehicleMasterActions';
import { editTripProps } from '../Types';
import * as actions from '../../redux/_redux/tripMaster/tripMasterActions';
import { useDispatch, useSelector } from 'react-redux';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './AddTrip/addtrip.css'
import Moment from 'moment'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import api from '../../redux/apis/axios';
/**
 * @type {interface} 
 * for props  type
 
 */
interface Props {
  flag: boolean;
  onFlagChange: (newValue: boolean) => void;
  row: editTripProps;
}
const EditTrip: React.FC<Props> = ({
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
 * @type {any}
 * for getting slice data(user data) 
 
 */
  const { userMaster }: any = useSelector((state) => state);
  /**
 * @type {any} 
 * for getting slice data(vechicle data)  
 */
  const { vehicleMaster }: any = useSelector((state) => state);
  /**
 * @type {string} 
 * for setting vechicle ID
 
 */
  const [vehicleId, setVehicleId] = useState<string>(row.vehicleId ? String(row.vehicleId) : '')
  /**
 * @type {string} 
 * for setting user ID
 */
  const [userId, setUserId] = useState<string>(row.userId ? String(row.userId) : '')
  /**
 * @type {string} 
 * for setting source
 
 */
  const [source, setSource] = useState<string>("")
  /**
 * @type {string} 
 * for setting source latitude
 
 */
  const [sourceLatitude, setSourceLatitude] = useState<string>(row.sourceLatitude ? row.sourceLatitude : "")
  /**
 * @type {string} 
 * for setting source longitude
 
 */
  const [sourceLongitude, setSourceLongitude] = useState<string>(row.sourceLongitude ? row.sourceLongitude : "")
  /**
 * @type {string} 
 
 */
/**
 * @type {string} 
 * for setting destination
 
 */
  const [destination, setDestination] = useState<string>("")
  /**
 * @type {string} 
 * for setting destintion latitude
 
 */
  const [destinationLatitude, setDestinationLatitude] = useState<string>(row.destinationLatitude ? row.destinationLatitude : "")
  /**
 * @type {string} 
 * for setting destination longitude
 
 */
  const [destinationLongitude, setDestinationLongitude] = useState<string>(row.destinationLongitude ? row.destinationLongitude : "")
  /**
 * @type {string} 
 * for setting end date
 
 */
  const [endDateTime, setEndDateTime] = useState<string>(row.endDateTime ? row.endDateTime : "")
  /**
 * @type {string} 
 * for setting start date
 
 */
  const [startDateTime, setStartDateTime] = useState<string>(row.startDateTime ? row.startDateTime : "")
  /**
 * @type {string} 
 * for setting source address
 
 */
  const [address, setAddress] = React.useState(row.source ? row.source : "")
  /**
 * @type {string} 
 * for setting destination address
 
 */
  const [address1, setAddress1] = React.useState(row.destination ? row.destination : "")
  /**
 * @type {number} 
 * for setting destination latitude
 
 */
  const [dL, setDl] = React.useState(row.destinationLatitude ? row.destinationLatitude : 0);
  /**
 * @type {number} 
 * for setting destination longitude
 
 */
  const [Dlong, setDlong] = React.useState(row.destinationLongitude ? row.destinationLongitude : 0);
  /**
 * @type {number} 
 * for setting source latitude
 
 */
  const [sourceLa, setSourceLa] = React.useState(row.sourceLatitude ? row.sourceLatitude : 0);
  /**
 * @type {number} 
 * for setting source longitude
 
 */
  const [sourceLon, setSourceLon] = React.useState(row.sourceLongitude ? row.sourceLongitude : 0);
 /**
 * @type {boolean} 
 * for setting flag(source)
 
 */
  const [Sflag, setsFlag] = React.useState(false)
  /**
 * @type {boolean} 
 * for setting flag(destination)
 
 */
  const [dFlag, setdFlag] = React.useState(false)
        /**
   * @async
   * @function geocodeByAddress
   * @param {string}  value - A string param.
   * for getting selected source
   */


  const handleSelect = async (value: string) => {
    setsFlag(true)
    const results = await geocodeByAddress(value);
    const li = await getLatLng(results[0])
    if (li.lat) {
      setsFlag(false)
    }
    setSourceLa(li.lat)
    setSourceLon(li.lng)
    setSource(value)
    setAddress(value)
    setSourceLatitude("0")

  }
  /**
   * @type {Function}
   * for getting all users and vechiles
   
   */
  React.useEffect(() => {
    dispatch(useractions.getAllUsers())
    dispatch(vechileactions.getAllVehicle())

  }, []);
  /**
   * @async
   * @function geocodeByAddress
   * @param {string}  value - A string param.
   * for getting selected destination
   */

  const handleSelectD = async (value: string) => {
    setdFlag(true)

    const results = await geocodeByAddress(value);

    const li = await getLatLng(results[0])
    setDl(li.lat)

    if (li.lat) {
      setdFlag(false)
      
    }
    setDlong(li.lng)
    setDestination(value)
    setAddress1(value)
    setDestinationLongitude("0")
  }
   /**
 * @type {Function}
 * @param {HTMLSelectElement}  SelectChangeEvent - A HTMLSelectElement param
 * for getting selected user id.
 */
  const handleChange = (event: SelectChangeEvent) => {
    setUserId(event.target.value);
    
  };
    /**
 * @type {Function}
 * @param {HTMLSelectElement}  SelectChangeEvent - A HTMLSelectElement param.
 * for getting selected vehicle id
 */
  const handleVehicleChange = (event: SelectChangeEvent) => {
    setVehicleId(event.target.value);

  };
    /**
 * @type {object}
 * for setting headers
 */


  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
 * @type {Function}
 * for getting form data and edit trip detail functionality
 */
  const onSubmit = () => {
     /**
 * @type {boolean}
 * for handling validation
 */
    let val = true
    if (!vehicleId) {
      val = false
      swal("Vehicle Name is Required")
    } else if (!userId) {
      val = false
      swal(" User Name is Required")
    }
    else if (!address) {
      val = false
      swal("source is Required")
    }
    else if (!address1) {
      val = false
      swal("Destination is Required")
    } else if (Sflag) {
      val = false
      swal("Source must be a valid city name")
    }
    else if (dFlag) {
      val = false
      swal("Destination must be a valid city name")
    }
    else if (!startDateTime) {
      val = false
      swal(" Start Date is Required")
    }
    else if (startDateTime < Moment(new Date()).format('YYYY-MM-DD')) {
      val = false
      swal("Invalid Start Date")
    }
    else if (!startDateTime) {
      val = false
      swal(" End Date is Required")
    }

    else if (endDateTime < startDateTime) {
      val = false
      swal("Invalid End Date")

    }


    if (val) {
         /**
 * @type {object}
 * for setting payload
 */
      const payload = {
        vehicleId: Number(vehicleId),
        userId: Number(userId),
        source: address,
        sourceLatitude: sourceLa ? String(sourceLa) : sourceLatitude,
        sourceLongitude: sourceLon ? String(sourceLon) : sourceLongitude,
        destination: address1,
        destinationLatitude: dL ? String(dL) : destinationLatitude,
        destinationLongitude: Dlong ? String(Dlong) : destinationLongitude,
        startDateTime: startDateTime,
        endDateTime: endDateTime
      }
         /**
 * @type {string}
 * for setting url
 */
      const URL = `/TripMaster/UpdateTrip?TripId=${row.tripId}`
      api.post(URL, payload, header)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.responseMessage === "Trip updated successfully") {
              swal(response.data.responseMessage);
              dispatch(actions.getAllTrips());
              onFlagChange(true)

            } else {
              swal(response.data.responseMessage);
            }
          }
        }).catch(function (error) {
          swal("Something Went Wrong");
        });
    }
  };

  //Design of the screen started
  return <>
    {userMaster.UserMasterData && vehicleMaster.vehicleMasterData && <div className="m-2">
      <div className="trip-info-header">
        <div className='trip-info-title'>
          Edit Trip Information
        </div>
        <div className='show-trips-container'>
          <button className="show-trips-btn"
            onClick={() => { onFlagChange(true) }}>Show All Trips
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className='tripSubHeading'>
            Please fill the Information below
          </div>
          <form>
            <div className="container">
              <div className="trip-info">
                <div className="trip-info-field">
                  <div className='mt-3'>
                    {isMobile ?
                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "12px",

                      }}>User Name</InputLabel> :

                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "14px",

                      }}>User Name</InputLabel>
                    }

                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      style={{ width: "100%" }}
                      value={userId}
                      onChange={handleChange} >
                      {userMaster.UserMasterData.map((row: any) => {
                        const name = row.firstName + ' ' + row.lastName;
                        return (
                          <MenuItem value={row.userId}
                            style={{
                              display: "block", color: "#777E84",
                              fontSize: "14px", margin: "3%"
                            }}
                          >{name}</MenuItem>
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

                      }}>Vehicle Name</InputLabel> :

                      <InputLabel id="demo-simple-select-standard-label" style={{
                        color: "#777E84",
                        fontSize: "14px",

                      }}>Vehicle Name</InputLabel>
                    }
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      variant="standard"
                      style={{ width: "100%" }}
                      value={vehicleId}
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
                    value={address}
                    onChange={setAddress}
                    onSelect={handleSelect}
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
                            className: 'location-search-input',
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                              ? 'suggestion-item--active'
                              : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
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
                    value={address1}
                    onChange={setAddress1}
                    onSelect={handleSelectD}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <TextField variant="standard" style={{ width: "100%" }}
                          sx={{ input: { color: '#777e84', } }} label={
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
                              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
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
                  <TextField type="date" id="standard-basic" sx={{ input: { color: '#777e84', } }}
                    variant="standard" style={{ width: "100%" }}
                    value={startDateTime.slice(0, 10)} onChange={(e) => { setStartDateTime(e.target.value) }} />
                </div>
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
                  <TextField type="date" id="standard-basic" sx={{ input: { color: '#777e84', } }} variant="standard" style={{ width: "100%" }}
                    value={endDateTime.slice(0, 10)} onChange={(e) => { setEndDateTime(e.target.value) }} />
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button className="save-btn"
                onClick={() => { onSubmit() }}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>}</>
};

export default EditTrip;












