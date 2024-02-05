import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { useSelector } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Addcategory from "../reports/Addnew_category";
import { notify } from "../../../shared/utils/notify";


export default function AlertDialog1(props) {
  const {updstate} = props;
  const [open, setOpen] = React.useState(true);
  const [closee, setclosee] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handleClose = () => {
    setOpen(false);  
    props.close(false);
  };

  const closepop = (message)=>{
    setUpdated(prev => !prev)
    handleClose()
    props.updstate(message)

  }
  const returnobj = (obj,img)=>{
    props.update(obj,img);
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Addcategory updstate = {closepop} closii={handleClose} update={returnobj}/>
          
      </Dialog>
    </div>
  );
}
