import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Reportapi_unblockData } from "../../services/Report_api_unblock";
import { brands_recover } from "../../services/Brands_recover";
import { Childrecover } from "../../services/ChildApiiAll";
import { SubChildAddnewapi, SubChildRecoverapi } from "../../services/Sub_Child";



export default function AddReportagain(props) {
  const { updstate } = props;
  console.log(props,"<==props")
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const loGinHandle = () => {
      Reportapi_unblockData(props.id)
      .then(({ data }) => {
        updstate("Add Successfully");
        props.unblocked(props.id);        
      })
      .catch((err) => { 
      });
  };
  const loGinHandle1 = () => {
    brands_recover(props.id)
    .then(({ data }) => {
      updstate("Add Successfully");
      props.unblocked(props.id);        
    })
    .catch((err) => { 
    });
};
const loGinHandle2 = () => {
  Childrecover(props.id)
  .then(({ data }) => {
    updstate("Add Successfully");
    props.unblocked(props.id);        
  })
  .catch((err) => { 
  });
};
const loGinHandle3 = () => {
  SubChildRecoverapi(props.id)
  .then(({ data }) => {
    updstate("Add Successfully");
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
            Are you sure to Add again ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              if(props.module == "brands"){
                handleClose();
                loGinHandle1();
              }
              else if(props.module == "child"){
                handleClose();
                loGinHandle2();
              }
              else if(props.module == "subchild"){
                handleClose();
                loGinHandle3();
              }
              else if(props.id){
                handleClose()
                props.setNewStats(props.newStats.isDeleted=false)
              }
              else{
                handleClose();
              loGinHandle();

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
