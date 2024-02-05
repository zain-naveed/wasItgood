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
import AddUser_popup from "../users/AddUser_popup";

export default function AlertDialog(props) {
  const { updstate, role } = props;
  const [open, setOpen] = React.useState(true);
  const [closee, setclosee] = useState(false);
  const [updated, setUpdated] = useState(false);
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };

  const closepop = () => {
    setUpdated((prev) => !prev);
    handleClose();
  };
  const backup = (obj) => {
    console.log(obj, "objject");
    props.update(obj);
  };
  const {
    user: { user },
  } = useSelector((state) => state);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="neewwww"
      >
        <AddUser_popup updstate={closepop} data={backup} neww role={role} />
      </Dialog>
    </div>
  );
}
