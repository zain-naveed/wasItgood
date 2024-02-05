import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import { userApi_delete } from "../../services/User_api_delete";
import { Userapi_blockData } from "../../services/User_api_block";

export default function AlertDialog(props) {

  const { updstate } = props;
  const [open, setOpen] = React.useState(true);
  const [dataUser, setdataUser] = useState([]);

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
       
  const loGinHandle = () => {
    console.log(props.id,"idd ye he")
      userApi_delete(props.id)
      .then(({ data }) => {
        updstate("Delete Successfully");
        props.delete(props.id); 
      })
      .catch((err) => { 

      });
  };

  const loGinHandle1 = () => {
      Userapi_blockData(props.id)
      .then(({ data }) => {
          updstate("Block Successfully");
        props.blocked(props.id);
        handleClose();        
      })
      .catch((err) => { 
        handleClose();        

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
        <DialogTitle id="alert-dialog-title">{"Delete !!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          
          <Button
            onClick={() => {
              handleClose();
              if(props.block == true){
                loGinHandle();

              }
              else{
                loGinHandle1();

              }
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
