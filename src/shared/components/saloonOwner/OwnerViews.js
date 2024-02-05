import { React, useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Typography from "@material-ui/core/Typography";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "../../../assets/images/avatar.png";

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

function OwnerViews(props) {
  const data = props;
  console.log("data==>", data);
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton aria-label="close" onClick={handleClose}>
          <CancelIcon />
        </IconButton>
        <div className="lelel">
          <h2>Owner Detail</h2>
          <div className="reportmainview">
            <div className="reportimg">
              <img
                src={data?.resp?.avatar ? data?.resp?.avatar : Avatar}
                className="rpimg"
              ></img>
            </div>
            <div className="reportcontent d-flex justify-content-between row">
              <div className="reportview col-3 p-0">
                <h6>Name</h6>
                {data?.resp?.Saloon_name ? (
                  <span className="elipsing">{data?.resp?.Saloon_name}</span>
                ) : (
                  <span className="text-muted">Not Added</span>
                )}
              </div>
              {/* <hr /> */}
              <div className="reportview col-5 p-0">
                <h6>Email</h6>
                {data?.resp?.email ? (
                  <span className="elipsing">{data?.resp?.email}</span>
                ) : (
                  <span className="text-muted">Not Added</span>
                )}
              </div>
              {/* <hr /> */}
              <div className="reportview col-4 p-0">
                <h6>Contact Information</h6>
                {data?.resp?.phoneNumber ? (
                  <span className="elipsing">{data?.resp?.phoneNumber}</span>
                ) : (
                  <span className="text-muted">Not Added</span>
                )}
              </div>
              {/* <hr /> */}
              <div className="reportview col-4 p-0">
                <h6>Location</h6>
                {data?.resp?.location?.address ? (
                  <span className="elipsing">
                    {data?.resp?.location?.address}
                  </span>
                ) : (
                  <span className="text-muted">Not Added</span>
                )}
              </div>

              {/* <hr/>
        <div className='reportview'><h6>Wave Size</h6><p>{data.waveSize}</p></div>
        <hr/>
        <div className='reportview'><h6>Wave Form</h6><p>{data.waveForm}</p></div> */}
            </div>
            <hr />
            <div className="reportview col-12 p-0 w-100 text-justify">
              <h6>About</h6>
              {data?.resp?.about ? (
                <span>{data?.resp?.about}</span>
              ) : (
                <span className="text-muted">Not Added</span>
              )}
            </div>
            <hr />
            <div className="reportview descrr w-100" style={{ marginTop: 0 }}>
              <h6>Acreditations & Awards of the Salon</h6>
              <div className={"imgBack d-flex"}>
                {data?.resp?.certification?.length > 0 ? (
                  data?.resp?.certification?.map((item, index) => {
                    return (
                      <div className="ml-2 mb-2">
                        <img
                          style={{
                            width: "100px",
                            objectFit: "contain",
                            borderRadius: "2px",
                          }}
                          src={item}
                        />
                      </div>
                    );
                  })
                ) : (
                  <div className="expDiv">
                    <p className="toBeAdded ml-2">Not Added!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
          <Grid item xs={2} sm={4} md={4}>
              <label>Title</label>
            <Item>{data.title}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Location Title</label>
            <Item>{data.locationTitle}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Wave Size</label>
            <Item>{data.waveSize}</Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
              <label>Wave Form</label>
            <Item>{data.waveForm}</Item>
          </Grid>
       
      </Grid>
    </Box> */}
        </div>
      </Dialog>
    </div>
  );
}
export default OwnerViews;
