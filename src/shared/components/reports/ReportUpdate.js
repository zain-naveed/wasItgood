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
// import { UPdateReport } from "../../services/reportservice";
import { EditSalon } from "../../services/EditSalon";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { notify } from "../../utils/notify";

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

function ReportUpdate(props) {
  const { updstate } = props;
  const data = props.id;
  const iddd = data.id;
  console.log(data.id, "adaayyyyyy");
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const [title, settitle] = useState(data.title);
  const [profillle, setprofillle] = useState();
  const [profileUrl, setProfileUrl] = useState(
    data.categoryPic ? data.categoryPic : ""
  );
  const [name1, setname] = useState(data.name);

  const [updata, setUpdata] = useState(false);
  const [loader, setLoader] = useState(false);
  const [idddd, setidddd] = useState(data.id);

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
  const uploadFiles = (e) => {
    console.log("click");
    let file = e.target.files[0];
    console.log("file", file);
    if (file.type.includes("image/png")) {
      if (file) {
        let url = URL.createObjectURL(file);
        setProfileUrl(url);
        setprofillle(file);
        setUpdata(true);
      }
    } else {
      notify("Please select just image type .png", "error");
    }
  };
  console.log("last image url", profillle);
  const handleSubmit = () => {
    let obj = {
      name: name1,
    };
    if (profillle) {
      obj["categoryPic"] = profillle;
    }
    EditSalon(data)
      .then(({datas})=>{
        console.log("datas==>",datas)
      })
    // UPdateReport(data?.id, obj)
    //   .then(({ data }) => {
    //     updstate("Update Successfully");
    //     setLoader(false);
    //     handleClose();
    //     console.log(data.id, "loooo");
    //     props.update(iddd, obj, profileUrl);
    //   })
      .catch((err) => {
        console.log("err", err);
      });
  };
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
        <div className="maindivuser">
          <h2>Category Update</h2>
          <hr></hr>
          <div className="useruPDATE">
            <div className="listingupdate">
              <TextField
                label="Title"
                value={name1}
                id="margin-none"
                onChange={(e) => {
                  setname(e.target.value);
                  if (data.name != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>

            <div className="listingupdate">
              <label>Image</label>
              <br />
              <div className="imgflex">
                <label htmlFor="upload_image">
                  <img src={profileUrl ? profileUrl : Avatar} />
                </label>
                <input
                  type="file"
                  id="upload_image"
                  name="upload_image"
                  style={{ display: "none" }}
                  accept="image/png"
                  onChange={(e) => {
                    uploadFiles(e);
                  }}
                />
              </div>
            </div>
          </div>
          {updata ? (
            <button
              onClick={() => {
                handleSubmit();
                setLoader(true);
              }}
              className={
                loader
                  ? "btn float-right login_btn deactive"
                  : "btn float-right login_btn"
              }
            >
              {loader ? <CircularProgress className="circulerr" /> : "Update"}
            </button>
          ) : (
            ""
          )}
        </div>
      </Dialog>
    </div>
  );
}
export default ReportUpdate;
