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
import { UPdateReport } from "../../services/reportservice";
import { EditSalon } from "../../services/EditSalon";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { notify } from "../../utils/notify";
import AutoComplete from "../../utils/AutoComplate";
// import { EditSalon } from "../../services/EditSalon";
import { ArrMap } from "../../utils/constant";
import MediaUpload from "../../utils/MediaUpload";

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

function OwnerUpdate(props) {
  const { updstate } = props;
  console.log(props, "<==props");
  const data = props.id;
  const iddd = data?._id;
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const [title, settitle] = useState(data.title);
  const [profillle, setprofillle] = useState();
  const [profileUrl, setProfileUrl] = useState(
    data.avatar ? data.avatar : Avatar
  );
  const [images, setImages] = useState(
    data?.certification ? data?.certification : []
  );
  const [isDisabled, setIsDisabled] = useState(true);
  const [filesArr, setFilesArr] = useState([]);
  const [removeArrImg, setRemoveArrImg] = useState([]);

  const [name1, setname] = useState(data?.Saloon_name ? data?.Saloon_name : "");
  const [email, setEmail] = useState(data?.about ? data?.about : "");
  const [contact, setContact] = useState(
    data?.phoneNumber ? data?.phoneNumber : ""
  );
  const [adres, setAdres] = useState({ address: "", bool: true });
  const [cover, setCover] = useState("");

  const [updata, setUpdata] = useState(false);
  const [loader, setLoader] = useState(false);
  const [idddd, setidddd] = useState(data.id);
  const [bolean, setBolean] = useState(false);
  const [form, setForm] = useState({
    address: data?.location?.address,
    coordinates: data?.location?.coordinates,
  });
  const [servicesTag, setServicesTags] = useState(
    data?.experience?.services ? data?.experience?.services : []
  );

  const handleImages = (images, URLs) => {
    setFilesArr(images);
  };
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
    if (file.type.includes("png") || file.type.includes("jpeg")) {
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
  console.log(data, "<==data");
  const handleSubmit = () => {
    let obj = {
      Saloon_name: name1,
      phoneNumber: contact,
      location: JSON.stringify(form),
      about: email,
      removeAvaBool: bolean,
    };
    if (removeArrImg) {
      obj["removeImg"] = JSON.stringify(removeArrImg);
    }
    if (filesArr) {
      obj["certifImg"] = filesArr;
    }
    if (profillle) {
      obj["avatar"] = profillle;
    }

    console.log("obj==>", obj);
    console.log(iddd, "loooo");

    EditSalon(iddd, obj)
      .then(({ data }) => {
        setLoader(true);
        updstate("Update Successfully");
        props.update(iddd, obj, profileUrl, form, images);
        handleClose();
      })
      .finally(() => setLoader(false));
  };
  console.log(props, "<==props");
  let bool = false;
  ArrMap?.map((i) => {
    if (form?.address?.toLowerCase().includes(i.toLowerCase().concat(", nc"))) {
      bool = bool || true;
    }
  });
  const setupUpdate = () => {
    if (!bool) {
      setUpdata(true);
    } else {
      setUpdata(false);
    }
  };
  console.log(profillle, "adaayyyyyy");

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
          <h2>Update Saloon</h2>
          <hr></hr>
          <div className="useruPDATE">
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
                  accept="image/jpeg,image/png"
                  onChange={(e) => {
                    uploadFiles(e);
                  }}
                />
              </div>
            </div>
            <div className="listingupdate">
              <TextField
                label="Name"
                required
                value={name1}
                id="margin-none"
                onChange={(e) => {
                  setname(e.target.value);
                  if (data?.Saloon_name != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            {/* <div className="listingupdate">
              <TextField
                label="Email"
                value={email}
                id="margin-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (data.email != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
              </div> */}

            <div className="listingupdate">
              <TextField
                label="Phone Number"
                value={contact}
                id="margin-none"
                required
                onChange={(e) => {
                  setContact(e.target.value);
                  if (data.phoneNumber != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>

            <div className="listingupdate">
              <label>Location</label>

              <AutoComplete
                form={form}
                setForm={setForm}
                setupUpdate={setupUpdate}
              />
              {/* {!form.locationName.includes("Wilmington") && form.locationName.length > 0 ? <p className='error_location'>We are currently operate only in Wilmington, North Carolina.</p> : ""} */}
              {!bool && form?.address?.length > 0 ? (
                <p className="error_location w-48">
                  We are currently operating in North Carolina only for{" "}
                  {ArrMap?.map((i) => {
                    return (
                      <>
                        <span>
                          {i.charAt(0).toUpperCase() + i.slice(1)}{" "}
                          <span>{i == "Wilmington" ? "." : ","}</span>{" "}
                        </span>
                      </>
                    );
                  })}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="listingupdate">
              <TextField
                label="About"
                value={email}
                required
                id="margin-none"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (data?.email != e.target.value) {
                    setUpdata(true);
                  } else {
                    setUpdata(false);
                  }
                }}
              />
            </div>
            <div className="listingupdate">
              <MediaUpload
                filesArr={filesArr}
                images={images}
                setImages={setImages}
                setFilesArr={setFilesArr}
                removeArrImg={removeArrImg}
                setRemoveArrImg={setRemoveArrImg}
                handleImages={handleImages}
                photoArr={{}}
                user={data.role}
                check
              />
            </div>
          </div>
          <div className="listingupdate">
            <button
              onClick={() => {
                handleSubmit();
                setLoader(true);
              }}
              className={
                loader
                  ? "btn float-right login_btn deactive"
                  : name1 == ""
                  ? "btn float-right login_btn deactive"
                  : contact == ""
                  ? "btn float-right login_btn deactive"
                  : form == ""
                  ? "btn float-right login_btn deactive"
                  : email == ""
                  ? "btn float-right login_btn deactive"
                  : profillle == "" && profileUrl == ""
                  ? "btn float-right login_btn deactive"
                  : "btn float-right login_btn"
              }
            >
              {loader ? (
                <div className="spinner-border boot-loader" role="status"></div>
              ) : (
                // <CircularProgress className="circulerr" />
                "Update"
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
export default OwnerUpdate;
