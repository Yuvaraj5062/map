import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../redux/_redux/userMaster/userMasterActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import EditUser from '../EditUser';
import { editUserProps } from '../../Types';
import moment from 'moment'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Modal } from 'react-bootstrap';
import '../../../assets/css/Navbar.css'
import '../../../assets/css/Main.css'
import './userdetails.css'
import { makeStyles } from '@mui/styles';
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
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

}))

/**
 * @type {interface} 
 * for column names type
 
 */
interface Column {
  id: '#ID' | 'DATE OF BIRTH' | 'USER NAME' | 'FULL NAME' | 'EMAIL' | "PHONE NUMBER" | "DRIVING LICENSE NUMBER" | "MANAGE";
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
  { id: '#ID', label: '#ID', maxWidth: 180 },
  { id: 'DATE OF BIRTH', label: 'Birth Date', maxWidth: 180 },
  { id: 'USER NAME', label: 'User Name', maxWidth: 180 },
  { id: 'FULL NAME', label: 'Full Name', maxWidth: 180 },
  { id: 'EMAIL', label: 'Email ID', maxWidth: 180 },
  { id: 'PHONE NUMBER', label: 'Phone Number', maxWidth: 180 },
  { id: 'DRIVING LICENSE NUMBER', label: 'Driving License Number', maxWidth: 180 },
  { id: 'MANAGE', label: 'Manage', maxWidth: 180 },

];


export default function UsersDetail() {
  const classes = useStyles()
  /**
 * @type {number}
 * for setting pagination pages 
 
 */
  const [page, setPage] = React.useState(0);
  /**
 * @type {boolean} 
 * for maintaning edit user functionaliy
 
 */
  const [flag, setFlag] = React.useState<boolean>(true);
  /**
 * @type {object} 
 * sending props for edit user page 
 */
  const [updateUser, setUpdateUser] = React.useState<editUserProps>({} as editUserProps);
  /**
 * @type {boolean} 
 * for opening popup on onClick button
 
 */
  const [open, setOpen] = React.useState(false);
  /**
 * @type {number} 
 * for setting user id
 */
  const [userId, setUserId] = React.useState<number>(0);
  /**
 * @type {Function}
 * for closeing popup  
 */
  const handleClose = () => setOpen(false);
  /**
 *  * @callback Predicate
 * @param {boolean} flag a boolean param 
 
 */
  const onFlagChange = React.useCallback(
    (newValue: boolean): void => setFlag(newValue),
    [setFlag]
  );
  /**
 * @type {number} 
 * for setting pagination per page
 
 */
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const theme = useTheme();
  /**
* @type {boolean}
* for setting UI on mobile view
 
*/
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  /**
 * @type {unkonwn}
 * for changing path
 
 */
  let history = useHistory();
  /**
 * @type{unkonwn}
 * for getting slice data
 
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
     * for handling pagenation
     */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
     * @type {Function}
     * @param {HTMLInputElement}  event - A ChangeEvent param.
     * for handling pagination 
     */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  /**
 * @type {object}
 * for storing slice data
 */
  const { userMaster }: any = useSelector((state) => state);
  /**
       * @type {Function}
       * for getting all users
       */
  React.useEffect(() => {
    dispatch(actions.getAllUsers());
  }, []);

  /**
     * @type{Function}
     * @param {number}  id - A number param.
     * for handling open popup
     */
  const handleOpen = (id: number) => {
    setUserId(id)
    setOpen(true);
  }

  /**
   * @type {Function}
   * for delete user funtionality
   
   */
  const handleDelete = () => {

    /**
     * @type {string}
     * for delete user funtionality
     
     */
    const URL = `/UserMaster/DeleteUser?UserId=${userId}`;
    handleClose()
    api.post(URL, null, header).then((response) => {
      if (response.data.responseMessage === "User deleted successfully") {
        dispatch(actions.getAllUsers());
        swal(response.data.responseMessage);

      } else {
        swal(response.data.responseMessage);
      }
    }).catch(function (error) {
      swal(error, "error");
    });
    dispatch(actions.getAllUsers());
  }

  /**
     * @type {Function}
     * @param {any}  row - A any param.
     * for update uer funtionality
     */
  const onUpdate = (row: any) => {
    setUpdateUser(row)
    onFlagChange(false)
  }
  /**
   * @type {Function}
   * for getting all user data on Onchange
   */
  React.useEffect(() => {

  }, [userMaster.UserMasterData]);

  return (
    <div className="m-2">
      {flag ? <>
        <div className="user-header">
          <div className='user-title'>
            User Details Table
          </div>
          <div style={{ marginRight: "3%" }}>
            <div className='add-user-container'>
              <button className="add-user-btn"
                onClick={() => {
                  history.push('/user_detail/add')
                }}>
                Add User
              </button>
            </div>
          </div>
        </div>
        {/* If Screen Gets User Master Data Then this method should render */}
        {userMaster.UserMasterData ?
          <><div className="card">
            <div className="card-body">
              <span className='userDetailSubHeading' >
                User Details
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
                    {userMaster.UserMasterData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: any) => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.userId}>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.userId} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{moment(row.dob).format("DD-MM-YYYY")}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.userName}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.firstName} {' '} {row.lastName}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}> {row.emailId} </TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.mobile}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>{row.dlNo}</TableCell>
                            <TableCell style={{ maxWidth: "180px", height: "100px", color: "#777E84" }}>
                              <Tooltip title="Edit">
                                <IconButton>
                                  <EditIcon className='text-dark' onClick={() => { onUpdate(row) }} /> {' '}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton>
                                  <DeleteIcon className='text-danger' onClick={() => { handleOpen(row.userId) }} />
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
                count={userMaster.UserMasterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
          </> :
          <div className="spinner-border m-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }
      </> :
        <EditUser flag={flag}
          onFlagChange={onFlagChange}
          row={updateUser} />
      }

      {/* Modal Popup For Delete User */}
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
            <span style={{ color: "#777E84", fontSize: "14px" }}>Are you sure you want to delete this user?
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
