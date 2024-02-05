import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { Userapi_blockData } from "../../services/User_api_block";
import { ProviderDeactive } from "../../services/AllProviders";
import { JobStatus } from "../../services/AllPost";
import CircularProgress from "@mui/material/CircularProgress";
import { DelServices } from "../../services/Allservices";
import { actionOnLicense, GetLicense } from "../../services/GetLicense";
import PopUp from "../popup/index";

export default function AlertDialog(props) {
  const { updstate, id } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);
  const [spin, setSpin] = React.useState(false);
  console.log("props==>", props);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const yesHandle = () => {
    setSpin(true);

    ProviderDeactive(props.id)
      .then(({ data }) => {
        if (data.data.isDeactivated) {
          updstate("Successfully Deactivated");
        } else {
          updstate("Successfully Activated");
        }

        props.blocked(props.id);
        handleClose();
        setSpin(false);
      })
      .catch((err) => {
        handleClose();
        setSpin(false);
      });
  };

  return (
    <PopUp
      mainText={
        props.status == true
          ? "Are you sure to Activate this Service Provider?"
          : "Are you sure to Deactivate this Service Provider?"
      }
      handleYes={yesHandle}
      loader={spin}
      handleNo={handleClose}
      open={open}
    />
  );
}
