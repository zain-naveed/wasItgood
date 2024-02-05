import { React, useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@material-ui/core/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";


const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
  
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CancelIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

function FeedBackPopUp(props) {
    const data = props.resp;
    const [open, setOpen] = useState(true);
    const handleClose = () => {
      setOpen(false);
      props.close(false);
    };
  return (
    <div>  <Dialog
    onClose={handleClose}
    aria-labelledby="customized-dialog-title "
    className="ffeedback"
    open={open}
  >
    <IconButton aria-label="close" onClick={handleClose}>
      <CancelIcon />
    </IconButton>
    <div class="scrollbar scrollbar-lady-lips">
      <div class="force-overflow">
        <div className="lelel tittlwee">
          <h2>Report Detail</h2>
          <Divider />

          </div>
          <div className="detailss">
            
              <h3>
                  Product : 
              </h3>
              <p>{data.productId?.title}</p>
             
              <h3>
                  Message : 
              </h3>
              <p>{data.comment}</p>
              <div className="toptitle">
              <h3>
                  Report By : 
              </h3>
              <p>{data.reportBy.name}</p>
              </div>
          </div>
          </div>
          </div>
          </Dialog>
          
          </div>
  )
}

export default FeedBackPopUp