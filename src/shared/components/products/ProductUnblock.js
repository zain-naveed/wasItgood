import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Productapi_unblockData } from "../../services/Product_api_unverify";


export default function ProductUnblock(props) {
  const { updstate } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const loGinHandle = () => {
  Productapi_unblockData(props.id)
      .then(({ data }) => {
        updstate("UnVerify Successfully");
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
        <DialogTitle id="alert-dialog-title">{"Recover"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to Recover ?
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
