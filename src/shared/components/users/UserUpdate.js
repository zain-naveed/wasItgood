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
import { UPdateUser } from "../../services/user.service";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { notify } from "../../utils/notify";
import Delete from "../../../assets/images/delete.svg";
import { setServices } from "../../redux/reducers/userSlie";

import {
  Autocomplete,
  fabClasses,
  FormControlUnstyledContext,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Tags from "../../utils/Tags";
import Services from "../../utils/Services.json";
import { ProviderUpdate } from "../../services/AllProviders";
import AutoComplete from "../../utils/AutoComplate";
import { ArrMap } from "../../utils/constant";
import { isFulfilled } from "@reduxjs/toolkit";
import {
  AddServices,
  EditServices,
  GetServices,
} from "../../services/Allservices";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import Product from "../../utils/Product.json";
import LicenseModal from "../../utils/LicenseModal";
import ExpModal from "../../utils/ExpModel";
import UpdateModal from "../../utils/UpdateModel";
import { useDispatch } from "react-redux";

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

function UserUpdate(props) {
  const dispatch = useDispatch();
  const { updstate } = props;
  const data = props?.id;
  const idd = data?._id;
  console.log("update data", data);
  const [dataUser, setdataUser] = useState([]);
  const [open, setOpen] = useState(true);
  const [name, setfirstName] = useState(data?.name);
  const [location, setlocation] = useState(data?.location?.address);
  const [services, setservices] = useState(data?.services);
  const [hourRate, sethourRate] = useState(data?.hourRate);
  const [profillle, setprofillle] = useState(null);
  const [seervicees, setseervicees] = useState(data?.service);
  const [addservicess, setaddservicess] = useState();
  const user = store.getState().root;
  const currencies = useSelector((state) => state.user.services);
  console.log(currencies, "loooooooo");
  const [licenseArr, setLicenseArr] = useState(
    data?.experience?.license ? data?.experience?.license : []
  );
  const handleLicense = (value) => {
    setLicenseArr(value);
  };

  const [form, setForm] = useState({
    address: data?.location?.address,
    coordinates: data?.location?.coordinates,
  });
  const [servicesTag, setServicesTags] = useState(
    data?.experience?.services ? data?.experience?.services : []
  );
  const [productsTag, setProductsTag] = useState(
    data?.experience?.familiarProducts ? data?.experience?.familiarProducts : []
  );
  const [profileUrl, setProfileUrl] = useState(
    data?.profilePic ? data?.profilePic : ""
  );
  const [updata, setUpdata] = useState(false);
  const [loader, setLoader] = useState(false);
  const [idddd, setidddd] = useState(data?._id);
  const [Countryname, setCountryname] = useState();
  const [Countrycode, setCountrycode] = useState();
  const [JobType, setJobType] = useState();
  const [additionalInfo, setadditionalInfo] = useState(
    data?.experience?.AdditionalInfo ? data?.experience?.AdditionalInfo : ""
  );
  const [experienceArr, setExperienceArr] = useState(
    data?.experience?.expYear ? data?.experience?.expYear : []
  );
  const handleExperience = (value) => {
    setExperienceArr(value);
  };

  const handleClose = () => {
    setOpen(false);
    props.close(false);
  };
  const handleState = (key, value) => {
    console.log(value, "valuesss");
    if (servicesTag.length != value.length) {
      setUpdata(true);
    }
    setServicesTags(value);
    console.log(updata, "boooll");
  };
  const handleProduct = (key, value) => {
    setProductsTag(value);
  };
  const uploadFiles = (e) => {
    console.log("click");
    let file = e.target.files[0];
    console.log("file", file.type.includes("image"));
    if (file.type.includes("image")) {
      if (file) {
        let url = URL.createObjectURL(file);
        setProfileUrl(url);
        setprofillle(file);
      }
    } else {
      notify("Please select just image type", "error");
    }
  };
  let codeLenght = Countrycode?.length;
  const handleSubmit = () => {
    if (props.services) {
      let obj = {
        service: seervicees,
      };

      EditServices(data?._id, obj)
        .then(({ data }) => {
          setLoader(false);
          setUpdata(false);
          notify("Sucessfully Updated the Service", "success");
          props.update(idd, "", "", "", "", seervicees);
          handleClose();
        })
        .catch((err) => {
          console.log("err", err);
          setLoader(false);
          handleClose();
        })
        .finally(() => setLoader(false));
    } else if (props.addservices) {
      let obj = {
        service: addservicess,
      };

      AddServices(obj)
        .then(({ data }) => {
          setLoader(false);
          setUpdata(false);
          notify("Sucessfully", "success");
          console.log("servicesAdd", data?.data);
          let neww = [...currencies];
          neww.unshift(data?.data);
          dispatch(setServices(neww));
          console.log(currencies, "loooooooo");
          props.update(addservicess);
          handleClose();
        })
        .catch((err) => {
          console.log("err", err);
          setLoader(false);
          handleClose();
        })
        .finally(() => setLoader(false));
    } else {
      let obj = {
        name: name,
        location: JSON.stringify(form),
        hourRate: hourRate,
        services: JSON.stringify(servicesTag),
      };
      if (profillle) {
        obj["profilePic"] = profillle;
      } else {
        let obj = {
          name: name,
          location: JSON.stringify(form),
          hourRate: hourRate,
          services: JSON.stringify(servicesTag),
        };
        if (profillle) {
          obj["profilePic"] = profillle;
        }

        ProviderUpdate(data?._id, obj)
          .then(({ data }) => {
            // console.log("data submit", data._id);
            setLoader(false);
            setUpdata(false);
            notify("Profile updated successfully", "success");
            props.update(idd, obj, form, profileUrl, servicesTag);
            handleClose();
          })
          .catch((err) => {
            console.log("err", err);
            setLoader(false);
            handleClose();
          })
          .finally(() => setLoader(false));
      }
    }
  };

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
  const JobTypes = [
    {
      value: "Full Time",
      label: "Full Time",
    },
    {
      value: "Part Time",
      label: "Part Time",
    },
  ];
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
          <h2>
            {props.services
              ? "Update Service"
              : props.addservices
              ? "Add Service"
              : "Update Provider"}
          </h2>
          <hr></hr>
          {/* <form> */}
          {props.services ? (
            <div className="useruPDATE">
              <div className="listingupdate adjust">
                <TextField
                  label="Name"
                  id="margin-none"
                  value={seervicees}
                  onChange={(e) => {
                    setseervicees(e.target.value);
                    if (seervicees != e.target.value) {
                      setUpdata(true);
                    } else {
                      setUpdata(false);
                    }
                    console.log(seervicees, "addservicess");
                  }}
                />
              </div>
            </div>
          ) : props.addservices ? (
            <div className="useruPDATE">
              <div className="listingupdate adjust">
                <TextField
                  label="Service"
                  id="margin-none"
                  value={addservicess}
                  onChange={(e) => {
                    setaddservicess(e.target.value);
                    if (addservicess) {
                      setUpdata(true);
                    } else {
                      setUpdata(false);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="useruPDATE">
              <div className="listingupdate">
                <TextField
                  label="Name"
                  id="margin-none"
                  value={name}
                  onChange={(e) => {
                    setfirstName(e.target.value);
                    if (data?.name != e.target.value) {
                      setUpdata(true);
                    } else {
                      setUpdata(false);
                    }
                  }}
                />
              </div>

              <div className="listingupdate">
                <TextField
                  label="Hourly Rate"
                  id="margin-none"
                  value={hourRate}
                  onChange={(e) => {
                    sethourRate(e.target.value);
                    if (data?.hourRate != e.target.value) {
                      setUpdata(true);
                    } else {
                      setUpdata(false);
                    }
                  }}
                />
              </div>
              <div className="listingupdate">
                <TextField
                  // id="outlined-select-currency"
                  className="flo chnne"
                  select
                  label="JobType"
                  value={JobType}
                  onChange={(e) => {
                    setJobType(e.target.value);
                  }}
                  required
                >
                  {JobTypes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                <label>Services</label>
                <Tags
                  className="tags"
                  handleState={handleState}
                  tags={servicesTag}
                  arr={currencies}
                />
              </div>
              <div className="listingupdate">
                <label>Familiar Products</label>
                <Tags
                  className="tags"
                  handleState={handleProduct}
                  tags={productsTag}
                  arr={Product}
                />
              </div>
              <div className="listingupdate">
                <AddSection
                  title="Your License"
                  buttonTxt="+ Add License"
                  handleLicense={handleLicense}
                  licenseArr1={licenseArr}
                />
              </div>
              <div className="listingupdate">
                <AddSection
                  title="Your Experience"
                  buttonTxt="+ Add Experience"
                  handleExperience={handleExperience}
                  expArr1={experienceArr}
                />
              </div>

              <div className="listingupdate">
                <label>Additonal Information</label>
                <div>
                  <textarea
                    className="textAdd"
                    rows="4"
                    cols="60"
                    resize="none"
                    value={additionalInfo}
                    onChange={(e) => setadditionalInfo(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="listingupdate">
                <label>Profile pic</label>
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
                    accept="image/*"
                    onChange={(e) => {
                      uploadFiles(e);
                      setUpdata(true);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {updata && (
            <button
              onClick={() => {
                handleSubmit();
                setLoader(true);
              }}
              className={
                loader
                  ? "btn float-right login_btn deactive btnupdate"
                  : props.addservices && addservicess === ""
                  ? "btn float-right login_btn deactive btnupdate"
                  : props.services && seervicees === ""
                  ? "btn float-right login_btn deactive btnupdate"
                  : "btn float-right login_btn btnupdate"
              }
            >
              {loader ? (
                // <CircularProgress className="circulerr" />
                <div className="spinner-border boot-loader" role="status"></div>
              ) : props.addservices ? (
                "Add Service"
              ) : (
                "Update"
              )}
            </button>
          )}
        </div>
      </Dialog>
    </div>
  );
}
export default UserUpdate;

const AddSection = ({
  handleLicense,
  handleExperience,
  title,
  licenseArr1,
  expArr1,
  props,
}) => {
  // const {
  //   // user: { user, status, tokens },
  // } = store.getState().root;
  // console.log(expArr1);
  const data = props?.id;

  const [check, setCheck] = useState(true);
  // const [show, setShow] = useState(true);
  const [licenseArr, setLicenseArr] = useState(licenseArr1 ? licenseArr1 : []);
  const [exp, setExp] = useState(expArr1 ? expArr1 : []);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [experienceArr, setExperienceArr] = useState(expArr1 ? expArr1 : []);

  const handleChange = (license) => {
    let temp = [...licenseArr];
    temp.push(license);
    setLicenseArr(temp);
    handleLicense(temp);
  };

  const handleDates = (value, id) => {
    // let cloneExp = [...expArr1];
    let Exper = [
      ...(data?.experience?.expYear ? data?.experience?.expYear : expArr1),
    ];

    let obj = {
      start: value.start,
      end: value.end,
      description: "I've 3 years of Experience in Tony n Guy.",
    };
    let objs = {
      ...Exper[id],
      start: Number(obj.start),
      end: Number(obj.end),
    };
    Exper[id] = objs;
    // cloneExp[id].start = Number(obj.start)
    // cloneExp[id].end = Number(obj.end)

    setExperienceArr(Exper);
    handleExperience(Exper);
  };

  const handleExp = (years) => {
    let clone = [...experienceArr];
    let obj = {
      start: years.start,
      end: years.end,
      description: "I've 3 years of Experience in Tony n Guy.",
    };
    clone.push(obj);

    setExperienceArr(clone);
    handleExperience(clone);
    // console.log(years)
    // if (years.startYear > years.endYear) {
    //   toastMessage('error', "Ending Year cant be earlier than Starting Year")
    // }
    // else {
    //   if (experienceArr.length > 0) {
    //     let temp = [...experienceArr];
    //     temp.push(years);
    //     setExperienceArr(temp);
    //     setExp(years)
    //     setEndYear(years.endYear);
    //     setStartYear(years.startYear);
    //   }
    //   else {
    //     let temp = [];
    //     temp.push(years);
    //     setExperienceArr(temp);
    //     setExp(years)
    //     setEndYear(years.endYear);
    //     setStartYear(years.startYear);
    //   }
    // }
    // handleExperience(experienceArr);
  };

  const handleDelete = (id) => {
    let temp = [
      ...(data?.experience?.license ? data?.experience?.license : licenseArr),
    ];
    temp.splice(id, 1);
    setLicenseArr(temp);
    handleLicense(temp);
  };

  const deleteExp = (e, id) => {
    let temp = [...expArr1];
    temp.splice(id, 1);
    setExperienceArr(temp);
    handleExperience(temp);
    setEndYear();
    setStartYear();
    setExp();
  };

  return (
    <>
      <div style={{ marginBottom: "8%" }}>
        <div className="headingDiv customme">
          <h1 className="headingSection">
            {title === "Your Experience" ? "Year of Experience" : title}
          </h1>
          {title == "Your License" ? (
            <LicenseModal handleChange={handleChange} />
          ) : (
            <ExpModal handleExp={handleExp} />
          )}
        </div>

        <div
          className="divSection"
          style={
            licenseArr.length == 0 && licenseArr.length == 1
              ? { height: "10px" }
              : { height: "auto" }
          }
        >
          {title === "Your License" ? (
            <>
              {licenseArr.length == 0 ? (
                <div className="expDiv">
                  <p className="toBeAdded"> No license added yet!</p>
                </div>
              ) : (
                licenseArr.map((i, key) => {
                  return (
                    <>
                      <div className="divDetail">
                        <div className="divLic">
                          <div>
                            <p
                              className="detailH1"
                              style={{ marginRight: "20px", marginTop: "35%" }}
                            >
                              {key + 1}.
                            </p>
                          </div>
                          <div>
                            <h1 className="detailH1">{i.name}</h1>
                            <p className="detailp">
                              License#{" "}
                              <span style={{ color: "black" }}>{i.number}</span>
                            </p>
                          </div>
                        </div>

                        <div
                          className="deletediv"
                          onClick={() => handleDelete(key)}
                        >
                          <img src={Delete} />
                        </div>
                      </div>
                    </>
                  );
                })
              )}
            </>
          ) : (
            ""
          )}
          {title === "Your Experience" ? (
            <>
              {experienceArr.length > 0 && experienceArr ? (
                experienceArr.map((resp, id) => {
                  return (
                    <>
                      <div
                        className="expDiv"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <h1 className="exp">
                          {resp.start} - {resp.end}{" "}
                          <span style={{ color: "#757575" }}>
                            {" "}
                            &nbsp; {resp.end - resp.start} years{" "}
                            <span className="expYears">experience</span>{" "}
                          </span>
                        </h1>
                        <div>
                          <UpdateModal
                            startingYear={resp.start}
                            endingYear={resp.end}
                            handleDates={handleDates}
                            id={id}
                          />
                          <img
                            src={Delete}
                            style={{
                              paddingRight: "25px",
                              paddingLeft: "25px",
                              cursor: "pointer",
                            }}
                            onClick={(e) => deleteExp(e, id)}
                          />
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <div className="expDiv">
                  <p className="toBeAdded">No experience added yet!</p>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
