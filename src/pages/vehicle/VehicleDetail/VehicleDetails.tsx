import * as React from 'react';  // React Component
import Table from '@mui/material/Table';  // Table Material UI
import TableBody from '@mui/material/TableBody'; // Table Body For Material UI
import TableCell from '@mui/material/TableCell'; // Table Components Used For UI
import TableContainer from '@mui/material/TableContainer'; // Table Components Used For UI
import TablePagination from '@mui/material/TablePagination'; // Table Components Used For UI
import TableRow from '@mui/material/TableRow'; // Table Components Used For UI
import { useDispatch, useSelector } from "react-redux";  // Redux Imported
import * as actions from '../../../redux/_redux/vehicleMaster/VehicleMasterActions';
import DeleteIcon from '@mui/icons-material/Delete';   // Delete icon Used For Delete Vehicle From Material UI
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon Used For Edit Vehcile From Material UI
import swal from 'sweetalert';
import { editVehicleProps } from '../../Types';
import EditVehicle from '../EditVehicle';
import { IconButton, TableHead, Tooltip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

import { makeStyles } from '@mui/styles';
import './VehicleDetails.css'
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import api from '../../../redux/apis/axios';
// Styling for Modal
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

}))

/**
 * @type {interface} 
 * for columns  type
 
 */
interface Column {
  id: 'VEHICLE NAME' | 'VEHICLE BRAND' | 'VEHICLE MODLE' | 'LICENSE PLATE NUMBER' | "VEHICLE UNIQUE NUMBER"
  | 'BEACON UNIQUE NUMBER' | "MANAGE";
  label: string;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
/**
 * @type {array} 
 * for columns name
 
 */
const columns: readonly Column[] = [
  { id: 'VEHICLE NAME', label: 'Vehicle Name', maxWidth: 180 },
  { id: 'VEHICLE BRAND', label: 'Vehicle Brand', maxWidth: 180 },
  { id: 'VEHICLE MODLE', label: 'Vehicle Model', maxWidth: 180 },
  { id: 'LICENSE PLATE NUMBER', label: 'License Plate Number', maxWidth: 180 },
  { id: 'VEHICLE UNIQUE NUMBER', label: 'Vehicle Unique Number ', maxWidth: 180 },
  { id: 'BEACON UNIQUE NUMBER', label: ' Beacon Unique Number', maxWidth: 180 },
  { id: 'MANAGE', label: 'Manage', maxWidth: 180 },
];

export default function VehicleDetails() {
  /**
 * @type {number}
 * for setting pagination pages
 */
  const [page, setPage] = React.useState(0);
  const classes = useStyles()
  /**
 * @type {boolean}
 * for setting flag(for edit functionality)
 */
  const [flag, setFlag] = React.useState<boolean>(true);
  /**
 * @type {object}
 * for sending props
 */
  const [updateUser, setUpdateVehicle] = React.useState<editVehicleProps>({} as editVehicleProps);
  /**
   * @type {boolean}
   * for handling popup (open or close)
   */
  const [open, setOpen] = React.useState(false);
  /**
 * @type {number}
 * for setting vehicle ID
 */
  const [vehicleId, setVehicleId] = React.useState<number>(0);
  /**
 * @type{Function}
 * for popup closing functionality
 */
  const handleClose = () => setOpen(false);
  /**
 * @type{Function}
 * @param {number}  id - A number param.
 * for open popup
 */
  const handleOpen = (id: number) => {
    setVehicleId(id)
    setOpen(true);
  }
  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 *  * @callback Predicate
 * @param {boolean} flag a boolean param 
 * for rendering page on changing flag
 
 */
  const onFlagChange = React.useCallback(
    (newValue: boolean): void => setFlag(newValue),
    [setFlag]
  );
  /**
 * @type {number}
 * for setting row per page pagination
 */
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  /**
  * @type{unkonwn}
  * for changing path
  
  */
  let history = useHistory();
  /**
 * @type {unkonwn}
 * for setting slice data
 
 */
  const dispatch = useDispatch();
  /**
   * @type {object}
   * for setting header
   */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
 * @type {Function}
 * @param {event?:unknown,newPage:string} 
 * for handling pagination on page change 
 */

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  /**
  * @type {Function}
  * @param {HTMLInputElement}  event - A ChangeEvent param.
  * for handling pagination on row change
  */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /**
 * @type {object}
 * for getting slice date(vehicle data)
 
 */
  const { vehicleMaster }: any = useSelector((state) => state);

  /**
     * @type {Function}
     * for getting all vechile data
     */
  React.useEffect(() => {
    dispatch(actions.getAllVehicle());
  }, []);

  /**
   * @type {Function}
   * for delete vehicle functionality
   */
  const handleDelete = () => {
    /**
      * @type {string}
      * for setting url
      */

    const URL = `/VehicleMaster/DeleteVehicle?VehicleId=${vehicleId}`;
    handleClose()
    api.post(URL, null, header).then((response) => {
      if (response.data.responseMessage === "Vehicle deleted successfully") {
        dispatch(actions.getAllVehicle());
        swal(response.data.responseMessage);
        dispatch(actions.getAllVehicle());

      } else {
        swal("Vehicle deleted successfully");
      }
    }).catch(function (error) {
      swal(error, "error");
    });
    dispatch(actions.getAllVehicle());

  }

  /**
 * @type{Function}
 * @param {any}  row - A any param.
 * for update vehicle functionality
 */
  const onUpdate = (row: any) => {
    setUpdateVehicle(row)
    onFlagChange(false)
  }
  /**
     * @type {Function}
     * for getting all vechicle data on onChange
     */
  React.useEffect(() => {

  }, [vehicleMaster.vehicleMasterData]);


  return (
    <div className="m-2">
      {flag ? <>
        <div className="vehicle-data-table-header">
          <div className='vehicle-data-table-text' >
            Vehicle Data Table
          </div>
          <div style={{ marginRight: "3%" }}>
            <div className='Add-vehicle-button-container'>
              <button className='Add-vehicle-button'
                onClick={() => {
                  history.push('/vehicleDetails/add')
                }}>
                Add Vehicle
              </button>
            </div>
          </div>
        </div>

        {vehicleMaster.vehicleMasterData ?
          <div className="card">
            <div className="card-body">
              <span className='vehicle-subHeading' >
                Vehicle Details
              </span>

              <TableContainer >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>

                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ maxWidth: column.maxWidth }}>
                          <span className='tableheading'><span style={{ color: "#777E84" }}>{column.label}</span></span>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody className='tableheading'>

                    {vehicleMaster.vehicleMasterData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: any) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.vehicleId}>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.vehicleName} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.vehicleBrand}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.vehicleModel}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.vehicleLicensePlateNo} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.vehicleUniqueNo} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.beaconUniqueNo}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>
                              <Tooltip title="Edit">
                                <IconButton>
                                  <EditIcon className='text-dark' onClick={() => { onUpdate(row) }} /> {' '}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton>
                                  <DeleteIcon className='text-danger' onClick={() => { handleOpen(row.vehicleId) }} />
                                </IconButton>
                              </Tooltip>

                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination className='mt-2'
                rowsPerPageOptions={[10]}
                component="div"
                count={vehicleMaster.vehicleMasterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div> :
          <div className="spinner-border m-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      </> :
        <EditVehicle flag={flag}
          onFlagChange={onFlagChange}
          row={updateUser} />
      }


      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={isMobile ? classes.modal : classes.lmodal}
      >
        <Modal.Header closeButton>
          <Modal.Title><span className='title' style={{ color: "#777E84", fontSize: "14px" }}>Confirmation</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='tableheading'>
            <span style={{ color: "#777E84", fontSize: "14px" }}>Are you sure you want to delete this vehicle?
            </span> </span>
        </Modal.Body>
        <Modal.Footer>
          <div > <button className="cancelBtn"
            onClick={() => { handleClose() }}>
            <b>    Cancel </b>
          </button>
          </div>
          <div style={{}}>
            <button className='Save-buttton'

              onClick={() => { handleDelete() }}>
              <b>    Confirm</b>
            </button>
          </div>
        </Modal.Footer>
      </Modal>


    </div>

  );
}
