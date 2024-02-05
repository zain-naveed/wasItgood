import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import { Outlet } from "react-router-dom";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../../shared/redux/reducers/userSlie";
import Logo from "../../assets/images/logo.svg";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import GraphicEqOutlinedIcon from "@mui/icons-material/GraphicEqOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AnnouncementPopUp from "../../shared/components/announcement/announcementPopUp";
import { SettingsInputCompositeOutlined } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PaymentsIcon from "@mui/icons-material/Payments";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    if (!open) {
      setDrawerr(false);
    } else {
      setDrawerr(true);
    }
  };
  const dispatch = useDispatch();
  const location = useLocation();
  const count = useSelector((state) => state?.user.user);
  const [drawerr, setDrawerr] = useState(false);
  const [hover, setHover] = useState("Users");

  console.log("location", location);

  const [account, setAccount] = useState(false);
  const logout = () => {
    if (account) {
      setAccount(false);
    } else {
      setAccount(true);
    }
  };
  const [open, setOpen] = useState(false);
  const [logoutpop, setlogout] = useState(false);
  console.log(logoutpop, "logoutpop");

  return (
    <div>
      <div className="home">
        <div className="inner">
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon />
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                <div className="bashboard">
                  <div className="logo">
                    <Link
                      to="/dashboard/index"
                      className="lgoo"
                      role="presentation"
                      onClick={toggleDrawer(anchor, false)}
                      onKeyDown={toggleDrawer(anchor, false)}
                    >
                      <img src={Logo}></img>
                      {/* <h4>Subsalon</h4> */}
                    </Link>
                  </div>

                  <div className="listing">
                    <ul>
                      <Link to="/dashboard/index">
                        {" "}
                        <li
                          className={
                            location.pathname == "/dashboard/index"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <DashboardIcon /> Dashboard
                        </li>
                      </Link>
                      <Link to="/dashboard/serviceProvider">
                        {" "}
                        <li
                          className={
                            location.pathname == "/dashboard/serviceProvider"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <PersonOutlineOutlinedIcon /> Service Provider
                        </li>
                      </Link>
                      <Link to="/dashboard/owner">
                        <li
                          className={
                            location.pathname == "/dashboard/owner"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <StorefrontIcon /> Salon Owner
                        </li>
                      </Link>
                      <Link to="/dashboard/license">
                        <li
                          className={
                            location.pathname == "/dashboard/license"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <CardMembershipIcon /> License
                        </li>
                      </Link>
                      <Link
                        to={{
                          pathname: "/dashboard/postedJobs",
                        }}
                      >
                        <li
                          className={
                            location.pathname == "/dashboard/postedJobs"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <WorkIcon /> Posted Jobs
                        </li>
                      </Link>
                      <Link to="/dashboard/newsLetter">
                        {" "}
                        <li
                          className={
                            location.pathname == "/dashboard/newsLetter"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <EmailIcon /> Subscribed E-mail
                        </li>
                      </Link>
                      <Link to="/dashboard/services">
                        {" "}
                        <li
                          className={
                            location.pathname == "/dashboard/services"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <GraphicEqOutlinedIcon /> Services
                        </li>
                      </Link>
                      <Link to="/dashboard/feedBack">
                        {" "}
                        <li
                          className={
                            location.pathname == "/dashboard/feedBack"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <SummarizeIcon /> FeedBack & Inquiry
                        </li>
                      </Link>
                      <Link to="/dashboard/payments">
                        <li
                          className={
                            location.pathname == "/dashboard/payments"
                              ? "hoveron"
                              : ""
                          }
                          role="presentation"
                          onClick={toggleDrawer(anchor, false)}
                          onKeyDown={toggleDrawer(anchor, false)}
                        >
                          <PaymentsIcon /> Payments
                        </li>
                      </Link>
                    </ul>
                  </div>
                  {console.log(anchor, "anchorr")}
                </div>
              </SwipeableDrawer>
            </React.Fragment>
          ))}
          <div className="top_bar">
            <div className="uperbar"></div>
            <div className="uperbar1">
              <button
                className="announcement-btn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Announcement
              </button>

              <button
                className="logoutt-btn"
                onClick={() => {
                  setlogout(true);
                }}
              >
                <PowerSettingsNewIcon />
              </button>
            </div>
          </div>

          <div className={drawerr ? "Main_content mrggg" : "Main_content"}>
            <Outlet />
          </div>
        </div>
      </div>
      {open ? <AnnouncementPopUp setOpen={setOpen} open={open} /> : ""}
      {logoutpop ? (
        <AnnouncementPopUp setlogout={setlogout} logoutpop={logoutpop} />
      ) : (
        ""
      )}
    </div>
  );
}
