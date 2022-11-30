import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import * as tripactions from '../../../redux/_redux/tripMaster/tripMasterActions';
import * as useractions from '../../../redux/_redux/userMaster/userMasterActions';
import * as vechileactions from '../../../redux/_redux/vehicleMaster/VehicleMasterActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import moment from 'moment'
import { editTripProps } from '../../Types';
import EditTrip from '../EditTrip';
import { makeStyles } from '@mui/styles';
import { IconButton, TableHead, Tooltip } from '@mui/material';
import { Modal } from 'react-bootstrap';
import DirectionsIcon from '@mui/icons-material/Directions';
import '../../../assets/css/Navbar.css'
import './tripdetails.css'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { tripMasterSlice } from '../../../redux/_redux/tripMaster/tripMasterSlice';
import Directions from "../../../components/Directions/DirectionsIndex";
import api from '../../../redux/apis/axios';


const useStyles = makeStyles((theme: any) => ({
  modal: {
    display: "flex",
    marginTop: "40%",
    marginLeft: "8%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },
  lmodal: {
    display: "flex",
    marginTop: "20%",
    marginLeft: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  map: {
    display: "flex",
    marginTop: "2%",
    marginBottom: "30%",
    marginLeft: "8%",
    alignItems: "center",
    justifyContent: "center",
    width: "80%"
  },

}))

/**
 * @type {interface} 
 * for column names type
 
 */

interface Column {
  id: 'USER' | 'VEHICLE' | 'SOURCE' | 'DESTINATION' | 'SOURCE LAT' | 'SOURCE LONG' | "DESTINATION LAT" |
  "DESTINATION LONG" | "START DATE" | "END DATE" | "MANAGE";
  label: string;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
/**
 * @type {array} 
 * for column names
 
 */
const columns: readonly Column[] = [
  { id: 'USER', label: 'User', maxWidth: 180 },
  { id: 'VEHICLE', label: 'Vehicle', maxWidth: 180 },
  { id: 'SOURCE', label: 'Source', maxWidth: 180 },
  { id: 'DESTINATION', label: 'Destination', maxWidth: 180 },
  { id: 'SOURCE LAT', label: 'Source Lat', maxWidth: 180 },
  { id: 'SOURCE LONG', label: 'Source Long', maxWidth: 180 },
  { id: 'DESTINATION LAT', label: 'Destination Lat', maxWidth: 180 },
  { id: 'DESTINATION LONG', label: 'Destination Long', maxWidth: 180 },
  { id: 'START DATE', label: 'Start Date', maxWidth: 180 },
  { id: 'END DATE', label: 'End Date', maxWidth: 180 },
  { id: 'MANAGE', label: 'Manage', maxWidth: 200 },

];


export default function TripDetails() {
  /**
 * @type {number} 
 * for setting page size
 
 */
  const [page, setPage] = React.useState(0);
  /**
 * @type {number} 
 * for setting row per page size
 
 */
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  /**
 * @type {boolean} 
 * for handling open close popup
 
 */
  const [open, setOpen] = React.useState(false);
  /**
 * @type {boolean} 
 * for handling open close map
 
 */
  const [mapopen, setMapopen] = React.useState(false);
  /**
 * @type {number} 
 * for setting trip Id
 
 */
  const [tripId, setTripId] = React.useState<number>(0);
  /**
 * @type {Function} 
 * for closing popup
 
 */
  const handleClose = () => setOpen(false);
  /**
 * @type {Function} 
 * for closing map
 
 */
  const handleMapClose = () => setMapopen(false);

  const classes = useStyles()
  /**
  * @type {unkonwn}
  * for changing path
  
  */
  let history = useHistory();
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {unkonwn}
 * for setting slice data
 
 */
  const dispatch = useDispatch();
  /**
 * @type {any}
 * for getting slice data
 
 */
  const { actions } = tripMasterSlice;
  /**
 * @type {boolean} 
 * for setting flag
 
 */

  const [flag, setFlag] = React.useState<boolean>(true);
  /**
 * @type {object} 
 * for sending props
 
 */
  const [updateTrip, setUpdateTrip] = React.useState<editTripProps>({} as editTripProps);
  /**
   *  * @callback Predicate
   * @param {boolean} flag}
   * for calling page on onChange 
   
   */

  const onFlagChange = React.useCallback(
    (newValue: boolean): void => setFlag(newValue),
    [setFlag]
  );
  /**
   * @type {object} 
   * for setting header
   
   */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
 * @type {Function}
 * @param {event?:unknown,newPage:string} 
 * for setting pagination on page change
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  /**
 * @type {Function}
 * @param {HTMLInputElement}  event - A ChangeEvent param.
 * for setting pagination on row change
 */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /**
 * @type {any} 
 * for getting slice data (trip data)
 
 */
  const { tripMaster }: any = useSelector((state) => state);
  /**
 * @type {Function}
 * @param {number}  id a number param
 * for handling popup
 */
  const handleOpen = (id: number) => {
    setTripId(id)
    setOpen(true);
  }
  /**
   * @type {Function}
   * for getting all users,trips and vechiles
   
   */
  React.useEffect(() => {
    dispatch(tripactions.getAllTrips());
    dispatch(useractions.getAllUsers())
    dispatch(vechileactions.getAllVehicle)

  }, []);
  /**
   * @type {Function}
   * for delete trip functionality
   */

  const handleDelete = () => {
    /**
 * @type {string}
 * for setting url
 */
    const URL = `/TripMaster/DeleteTrip?TripId=${tripId}`;
    api.post(URL, null, header).then((response) => {
      if (response.data.responseCode === 200) {
        dispatch(tripactions.getAllTrips());
        swal("Trip deleted successfully");
      } else {
        swal(response.data.responseMessage);
      }
    }).catch(function (error) {
      swal("something went wrong");
    });
    dispatch(tripactions.getAllTrips());
    handleClose()

  }

  /**
 * @type {Function}
 * @param {any}  row a any param
 * for getting form data and upadate trip detail functionality
 */
  const onUpdate = (row: any) => {
    setUpdateTrip(row)
    onFlagChange(false)
  }
  /**
 * @type {Function} 
 * @param {any}  row a any param
 * for opening map
 */
  const onMap = (row: any) => {
    dispatch(actions.setMapData({ row }))
    setMapopen(true)
  }
  /**
     * @type {Function}
     * for getting all trip on page render
     
     */
  React.useEffect(() => {

  }, [tripMaster.TripMasterData]);

  return (
    <div className="m-2">
      {flag ? <>
        <div className="trip-header">
          <div className='trip-title'>
            Trip Details Table
          </div>

          <div style={{ marginRight: "3%" }}>
            <div className='add-trips-container'>
              <button className="add-trips-btn"
                onClick={() => {
                  history.push('/trip_details/add')
                }}>Add Trip
              </button>
            </div>
          </div>
        </div>
        {tripMaster.TripMasterData ?
          <div className="card">
            <div className="card-body">
              <span className='tripDetailsSubHeading' >
                Trip Details
              </span>
              <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ maxWidth: column.maxWidth }}
                        >
                          <span className='tableheading'><span style={{ color: "#777E84" }}>{column.label}</span></span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className='tableheading'>

                    {tripMaster.TripMasterData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: any, index: any) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={index} sx={{ maxHeight: "5px" }}>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.userFullName} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.vehicleName}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.source}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.destination}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.sourceLatitude}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.sourceLongitude} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.destinationLatitude}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.destinationLongitude}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{moment(row.startDateTime).format("DD-MM-YYYY")}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{moment(row.endDateTime).format("DD-MM-YYYY")}</TableCell>
                            <TableCell style={{ minWidth: "180px", height: "100px", color: "#777E84" }}>

                              <Tooltip title="Edit">
                                <IconButton>
                                  <EditIcon className='text-dark' onClick={() => { onUpdate(row) }} /> {' '}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton>
                                  <DeleteIcon className='text-danger' onClick={() => { handleOpen(row.tripId) }} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Map">
                                <IconButton>
                                  <DirectionsIcon sx={{ color: '#24B1E3' }} onClick={() => { onMap(row) }} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>

                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10]}
                component="span"
                count={tripMaster.TripMasterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div></div> :
          < div className="spinner-border m-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }</> : <EditTrip flag={flag}
          onFlagChange={onFlagChange}
          row={updateTrip} />}

      <Modal
        show={mapopen}
        onHide={handleMapClose}
        backdrop="static"
        keyboard={false}
        style={{ maxHeight: "96%" }}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body >
          <Directions />
        </Modal.Body>

      </Modal>
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={isMobile ? classes.modal : classes.lmodal}
      >
        <Modal.Header closeButton>
          <Modal.Title><span className='title' style={{ color: "#777E84", fontSize: "14px" }}>Confirmation </span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='tableheading'>
            <span style={{ color: "#777E84", fontSize: "14px" }}>Are you sure you want to delete this trip?
            </span> </span>
        </Modal.Body>
        <Modal.Footer>
          <div > <button className="cancelBtn"
            onClick={() => { handleClose() }}>
            <b>    Cancel </b>
          </button>
          </div>
          <div style={{}}>
            <button className="Save-buttton"
              onClick={() => { handleDelete() }}>
              <b>    Confirm</b>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
