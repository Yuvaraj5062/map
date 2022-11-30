import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../redux/_redux/roleMaster/roleMasterActions';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { editRoleProps } from '../../Types';
import EditRole from '../EditRole';
import { IconButton, TableHead, Tooltip } from '@mui/material';
import { Modal } from 'react-bootstrap';
import '../../../assets/css/Navbar.css'
import '../../../assets/css/Main.css'
import './RoleDetails.css'
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
    width: "90%"
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
  id: 'ID' | 'USER ROLE' | "MANAGE" | "MANAGE1" | "MANAGE2";
  label: string;
  maxWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}
/**
 * @type {interface[]} 
 * for column names 
 
 */
const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', maxWidth: 90 },
  { id: 'USER ROLE', label: 'User Role', maxWidth: 90 },
  { id: 'MANAGE', label: 'Manage', maxWidth: 90 },

];


export default function RoleDeatails() {
  const classes = useStyles()
  /**
 * @type {number} 
 * for setting pagination pages
 
 */
  const [page, setPage] = React.useState(0);
  /**
 * @type {number}
 * for handing pagination per page 
 
 */
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  /**
 * @type {boolean} 
 * for handling popup(open or close)
 
 */
  const [open, setOpen] = React.useState(false);
  /**
 * @type {number} 
 * for setting role Id
 
 */
  const [roleId, setRoleId] = React.useState<number>(0);

  const handleClose = () => setOpen(false);
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
   * @type {boolean} 
   * for setting flag
   
   */
  const [flag, setFlag] = React.useState<boolean>(true);
  /**
 * @type {object} 
 * for sending props
 
 */
  const [updateRole, setUpdateRole] = React.useState<editRoleProps>({} as editRoleProps);
  /**
 *  * @callback Predicate
 * @param {boolean} flag} 
 * for Calling function on onChange flag
 
 */
  const onFlagChange = React.useCallback(
    (newValue: boolean): void => setFlag(newValue),
    [setFlag]
  );
  /**
   * @type {object}
   * for setting headers
   
   */
  const header = { headers: { "Authorization": `Bearer ` + localStorage.getItem("token"), "Content-Type": "application/json" } }
  /**
 * @type {Function}
 * @param {event?:unknown,newPage:string}  
 * for getting selected value
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
 * @type {any}
 * for getting slice date(roles)
 */
  const { roleMaster }: any = useSelector((state) => state);

  /**
 * @type {Function}
 * @param {number}  id - A number param.
 * for handling popup
 */
  const handleOpen = (id: number) => {
    setRoleId(id)
    setOpen(true);
  }
  /**
 * @type {Function}
 * for getting all role
 
 */
  React.useEffect(() => {
    dispatch(actions.getAllRole());
  }, []);
  /**
 * @type {Function}
 * for getting all role on onChange roles
 
 */
  React.useEffect(() => {

  }, [roleMaster.RoleMasterData]);
  /**
 * @type {Function}
 * for delete role functionality
 
 */

  const handleDelete = () => {
    /**
     * @type {String}
     * for setting url
     
     */
    const URL = `/RoleMaster/DeleteRole?Id=${roleId}`;
    api.post(URL, null, header).then((response) => {
      if (response.data.responseCode === 200) {
        dispatch(actions.getAllRole());
        swal(response.data.responseMessage);
      } else {
        swal(response.data.responseMessage);
      }
    }).catch(function (error) {
      swal("Something Went Wrong ");
    });
    dispatch(actions.getAllRole());
    handleClose()

  }

  /**
   * @type{Function}
   * @param {any}  row - A any param.
   * for handling update role functionality
   */

  const onUpdate = (row: any) => {
    setUpdateRole(row)
    onFlagChange(false)
  }

  return (
    <div className="m-2">

      {flag ? <>
        <div className="role-data-table-header">
          <div className='role-data-table-text'>
            Role Details Table
          </div>
          <div style={{ marginRight: "3%" }}>
            <div className='Add-role-button-container'>
              <button className='Add-role-button'
                onClick={() => {
                  history.push('/role_details/add')
                }}>
                Add Role
              </button>
            </div>
          </div>
        </div>
        {roleMaster.RoleMasterData ?
          <div className="card">
            <div className="card-body">
              <span className='role-detail-subHeading'>
                Role Details
              </span>
            </div>
            <TableContainer >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ width: 20 }}
                      >
                        <span className='tableheading'><span style={{ color: "#777E84" }}>{column.label}</span></span>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody className='tableheading'>
                  {roleMaster.RoleMasterData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          <TableCell style={{ maxWidth: "90px", color: "#777E84" }}> {row.id} </TableCell>
                          <TableCell style={{ maxWidth: "90px", color: "#777E84" }}>{row.userRole}</TableCell>
                          <TableCell style={{ color: "#777E84" }}>
                            <Tooltip title="Edit">
                              <IconButton>
                                <EditIcon className='text-dark' onClick={() => { onUpdate(row) }} /> {' '}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton>
                                <DeleteIcon className='text-danger' onClick={() => { handleOpen(row.id) }} />
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
              component="div"
              count={roleMaster.RoleMasterData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div> :
          < div className="spinner-border m-4" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        }</> :
        <EditRole flag={flag}
          onFlagChange={onFlagChange}
          row={updateRole} />
      }

      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={isMobile ? classes.modal : classes.lmodal}
      >
        <Modal.Header closeButton >
          <Modal.Title><span className='title' style={{ color: "#777E84", fontSize: "14px" }}>Confirmation</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className='tableheading' >
            <span style={{ color: "#777E84", fontSize: "14px" }}>Are you sure you want to delete this role?
            </span> </span>
        </Modal.Body>
        <Modal.Footer>
          <div > <button className="cancelBtn"
            onClick={() => { handleClose() }}>
            <b>    Cancel </b>
          </button>
          </div>
          <div>
            <button className="Add-role-button"
              onClick={() => { handleDelete() }}>
              <b>    Confirm</b>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
