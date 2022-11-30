import  { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core"; // Material UI
import { Link } from "react-router-dom"; // React DOM
import Avatar from '@mui/material/Avatar'; // Avatar
import logo from '../../assets/images/user.jpg';   // User Image
import dashboardicon from '../../assets/images/dash.svg'  // Dash IMAGE
import usericon from '../../assets/images/User Master.svg'  // USer Master Image
import vehicle from '../../assets/images/Vehicle Master.svg'  // Vehicle Master Image
import assignvehicle from '../../assets/images/assign-icon.svg'  // Assign Icon Image
import trip from '../../assets/images/trip-master.svg'  // Trip Master Image
import report from '../../assets/images/report.svg'  // Report Image
import MenuIcon from '@mui/icons-material/Menu'; // Menu ICON Image
import '../../assets/css/Main.css'  // Main CSS
 
const useStyles = makeStyles(() => ({

  sidebar: {
    background: "primary",
    height: "100%",

  },
  icon: {
    color: "white"
  },
}));
// SideBar Function
function SideBarMobile() {
  const classes = useStyles();
  /**
        * @type {boolean}
        * for opening or closing drawer
        */
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List className={classes.sidebar}>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <div style={{ marginLeft: "35%" }}>
                <Avatar
                  alt="Remy Sharp"
                  src={logo}
                />

              </div>
              <span style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                color: "#103E67",
                fontSize: "20px",
                marginLeft: "4%"
              }} >
                {localStorage.getItem("userName")}
              </span>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className="link mt-3"
                style={{ fontFamily: "Montserrat", color: "#24B1E3" }} onClick={() => setOpenDrawer(false)}>
                <img src={dashboardicon} className="avatar-sm-2 rounded-circle p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' > Dashboard </span>
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/user_detail" className="link mt-3"
                style={{ fontFamily: "Montserrat", color: "#24B1E3" }}  >
                <img src={usericon} className="avatar-sm-2 rounded-circle p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' > User Master</span>
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/vehicleDetails" className="link mt-3" style={{ fontFamily: "Montserrat", color: "#24B1E3" }}
                onClick={() => setOpenDrawer(false)}>
                <img src={vehicle} className="avatar-sm-2 rounded-circle p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' >  Vehicle Master </span>
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/role_detail" className="link mt-3" style={{ fontFamily: "Montserrat", color: "#24B1E3" }}
                onClick={() => setOpenDrawer(false)} >
                <img src={assignvehicle} className="avatar-sm-2 rounded-circle p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' >Role Master </span>
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/trip_details" className="link mt-3" style={{ fontFamily: "Montserrat", color: "#24B1E3" }}
                onClick={() => setOpenDrawer(false)}>
                <img src={trip} className="avatar-sm-2  p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' > Trip Master</span>
              </Link>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/report" className="link mt-3" style={{ fontFamily: "Montserrat", color: "#24B1E3" }} onClick={() => setOpenDrawer(false)}>
                <img src={report} className="avatar-sm-2  p-2" alt="" />
                {' '} {' '} {' '}
                <span className='subHeading' >  Report </span>
              </Link>
            </ListItemText>
          </ListItem>

        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </div>
  );
}
export default SideBarMobile;
