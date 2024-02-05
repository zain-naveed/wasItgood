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
import PopUp from "../popup/index";

export default function AlertDialog(props) {
  const { updstate, id } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);
  const [spin, setSpin] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const yesHandle = () => {
    setSpin(true);
    let statuss = "";
    if (props.status === "Closed") {
      statuss = "Open";
    } else {
      statuss = "Closed";
    }
    let obj = {
      status: statuss,
    };

    JobStatus(props.id, obj)
      .then(({ data }) => {
        if (
          data.data.jobStatus === "Closed" ||
          data.data.jobStatus === "closed"
        ) {
          updstate("Successfully Closed the Job");
        } else {
          updstate("Successfully Opened the Job");
        }
        props.blocked(props.id, data);
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
          ? "Are you sure to Open this Job?"
          : "Are you sure to Close this Job?"
      }
      handleYes={yesHandle}
      loader={spin}
      handleNo={handleClose}
      open={open}
    />
  );
}
