import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { Userapi_unblockData } from "../../services/User_api_unblock";

export default function AlertDialog(props) {
  const { updstate } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
 
  const loGinHandle = () => {
        Userapi_unblockData(props.id)
      .then(({ data }) => {
        updstate("Unblock Successfully");
        props.unblocked(props.id);       
      })
      .catch((err) => { 

      });
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Unblock  "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to Deactive ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              handleClose();
              loGinHandle();
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
