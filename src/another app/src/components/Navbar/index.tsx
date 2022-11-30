import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import logo from '../../assets/images/Go-App-btn.svg';
import profile from '../../assets/images/user.jpg';
import Avatar from '@mui/material/Avatar';
import { adminSlice } from "../../redux/_redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import SideBarMobile from '../LeftSideBar/SideBarMobile';
import Logout from '../../pages/auth/Logout';

export interface Props {
  value: boolean;
  onToggleChange: (newValue: boolean) => void;
}



export const Navbar: React.FC<Props> = ({
  value,
  onToggleChange,
}) => {
    /**
 * @type {unkonwn}
 * for changing path
 
 */
  let history = useHistory();
  
  /**
        * @type { HTMLElement | null}
        * for checking mobile view
        */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  /**
       * @type { HTMLElement | null}
       * for checking mobile view
       */
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  /**
 * @type {boolean}
 * for setting UI on mobile view
 
 */
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  /**
        * @type {boolean}
        */
  const isMenuOpen = Boolean(anchorEl);
  /**
        * @type {boolean}
        * for opening mobile menu 
        */
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  /**
        * @type {boolean}
        * for setting flag
        */
  const [flag, setFlag] = React.useState(true);
  /**
        * @type {Function}
        * * @param {HTMLElement}  MouseEvent - A MouseEvent param.
        * for handling menu open functionality 
        */
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  /**
          * @type {Function}
          * for handling menu close functionality
          */
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  /**
        * @type {Function}
        * for handling menu open functionality
        */

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  /**
         * @type {Function}
         * * @param {HTMLElement}  MouseEvent - A MouseEvent param.
         * for handling mobile menu open functionality
         */
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  /**
        * @type {Function}
        * for calling logout page
        */
  const handleLogout = () => { 
    setFlag(false)
    handleMenuClose()
    history.push('/logout');

  }

  const menuId = 'primary-search-account-menu';
   /**
        * @type {jsx}
        * for handling mobile menu
        */
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Avatar
          alt="Remy Sharp"
          src={profile}
          sx={{ width: 50, height: 50 }}
        />
      </MenuItem><br />
      
      <MenuItem onClick={() => { handleLogout() }}>
        <span style={{ marginLeft: "1px", marginRight: "1px" }}>Logout</span>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle /><span style={{ fontSize: "16px" }}>Profile</span>
        </IconButton>
        
      </MenuItem>
    </Menu>
  );
  return (<>
    {flag ?
      <div style={{ background: "#103E67" }}>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" style={{ background: "#103E67" }}>
            <Toolbar>
              {isMobile ? <SideBarMobile></SideBarMobile> : null}

              {!isMobile ?
                <Box sx={{ display: { xs: 'none', md: 'flex' } }} onClick={() => { onToggleChange(!value) }}>
                  <MenuIcon sx={{ color: "white" }} />
                </Box>
                : null}
              <span style={{ marginLeft: "20px" }}>
          
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <img style={{ height: "50px", width: "150px" }} src={logo} className="avatar-sm-2  mr-2 text-light" alt="" />
                </Typography>
              </span>
            
              <Box sx={{ flexGrow: 0.3 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              </Box>
              <Box sx={{ flexGrow: 0.3 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               
              </Box>
              <Box sx={{ flexGrow: 0.4 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={profile}

                  />
                </IconButton>


              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon sx={{ color: "white" }} />
                </IconButton>
              </Box>

            </Toolbar>
          </AppBar>

          {renderMobileMenu}
          {renderMenu}

        </Box>
      </div> : <Logout />}</>);
}