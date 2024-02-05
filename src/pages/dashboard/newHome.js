import React, { useState } from "react";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Outlet } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../shared/redux/reducers/userSlie";
import Logo from "../../assets/images/logo.svg";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GraphicEqOutlinedIcon from '@mui/icons-material/GraphicEqOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {['All mail', 'Trash', 'Spam'].map((text, index) => (
//           <ListItem button key={text}>
//             <ListItemIcon>
//               {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//             </ListItemIcon>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
const dispatch = useDispatch();
const location = useLocation();
const count = useSelector((state) => state.user.user);
const [drawerr, setDrawerr] = useState(false);
const [hover, setHover] = useState("Users");

console.log("location", location);
const drawerr1 = () => {
  setDrawerr(true);
};
const [account, setAccount] = useState(false);
const logout = () => {
  if (account) {
    setAccount(false);
  } else {
    setAccount(true);
  }
};

  return (
    <div>
        <div className="home">
      <div className="inner">
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <div className="bashboard">
            <div className="logo">
              <Link to="/dashboard/dash" className="lgoo">
                <img src={Logo}></img> <h4>Subsalon</h4>
              </Link>
            </div>

            <div className="listing">
              <ul>
                <Link to="/dashboard/userstable">
                  {" "}
                  <li
                    className={
                      location.pathname == "/dashboard/userstable"
                        ? "hoveron"
                        : ""
                    }
                  >
                    <PersonOutlineOutlinedIcon/> Users
                  </li>
                </Link>
                <Link to="/dashboard/reporttable">
                  <li
                    className={
                      location.pathname == "/dashboard/reporttable"
                        ? "hoveron"
                        : ""
                    }
                  >
                    <CategoryOutlinedIcon/> Categories
                  </li>
                </Link>
                <Link to="/dashboard/brands">
                  {" "}
                  <li
                    className={
                      location.pathname == "/dashboard/brands"
                        ? "hoveron"
                        : ""
                    }
                  >
                    <GraphicEqOutlinedIcon/> Brands
                  </li>
                </Link>
                <Link to="/dashboard/producttable">
                  {" "}
                  <li
                    className={
                      location.pathname == "/dashboard/producttable"
                        ? "hoveron"
                        : ""
                    }
                  >
                    <AddShoppingCartOutlinedIcon/> Products
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          </SwipeableDrawer>
        </React.Fragment>
          
      ))}
      <div className="top_bar">
          <div className="uperbar">
            <button onClick={drawerr1}>
              <PowerSettingsNewIcon />
            </button>
          </div>
          <div className="uperbar1">
            {/* {console.log(
              count.admin.lastName,
              count.admin.lastName,
              "counnttt"
            )}
            {count.admin.firstName}&nbsp;{count.admin.lastName} */}
            <button
              className="logoutt-btn"
              onClick={() => {
                dispatch(resetUser());
              }}
            >
              <PowerSettingsNewIcon />
            </button>
          </div>
        </div>

        <div className="Main_content">
          <Outlet />
        </div>
    </div>
    </div>
    </div>
  );
}
